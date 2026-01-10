"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    ShieldAlert, Activity, Server, Users, Eye,
    Building2, GraduationCap, FileText, Plus,
    Search, Trash2, Edit, MoreVertical, CheckCircle, AlertTriangle, X, RefreshCw, FileBarChart, Download
} from "lucide-react";

// --- Types ---
type Department = {
    id: string;
    name: string;
    hod: string;
    facultyCount: number;
    studentCount: number;
    budget: string;
};

type FacultyMembers = {
    id: string;
    name: string;
    role: string;
    department: string;
    status: 'Active' | 'On Leave';
    email: string;
};

type Log = {
    id: number;
    time: string;
    action: string;
    user: string;
    details: string;
    alert?: boolean;
};

// --- Mock Initial Data ---
const INITIAL_DEPARTMENTS: Department[] = [
    { id: "dept_01", name: "Computer Science", hod: "Dr. Sarah Connor", facultyCount: 24, studentCount: 850, budget: "$450,000" },
    { id: "dept_02", name: "Mechanical Eng.", hod: "Prof. John Doe", facultyCount: 18, studentCount: 620, budget: "$320,000" },
    { id: "dept_03", name: "Electrical Eng.", hod: "Dr. Emily Blunt", facultyCount: 20, studentCount: 700, budget: "$380,000" },
];

const INITIAL_FACULTY: FacultyMembers[] = [
    { id: "fac_01", name: "Dr. Alan Turing", role: "Professor", department: "Computer Science", status: "Active", email: "alan@uni.edu" },
    { id: "fac_02", name: "Prof. Marie Curie", role: "HOD", department: "Physics", status: "Active", email: "marie@uni.edu" },
    { id: "fac_03", name: "Dr. Richard Feynman", role: "Assistant Prof", department: "Physics", status: "On Leave", email: "richard@uni.edu" },
    { id: "fac_04", name: "Dr. Rosalind Franklin", role: "Associate Prof", department: "Biology", status: "Active", email: "rosalind@uni.edu" },
];

const EXCHANGE_RATE = 90.22; // 1 USD = 90.22 INR

export default function DeanDashboard() {
    // --- State Management ---
    const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'faculty'>('overview');
    const [isLockdown, setIsLockdown] = useState(false);
    const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
    const [faculty, setFaculty] = useState<FacultyMembers[]>(INITIAL_FACULTY);
    const [logs, setLogs] = useState<Log[]>([
        { id: 1, time: "10:42:15 AM", action: "New Assignment Posted", user: "Prof. Alan (HOD)", details: "System Design - Module 3" },
        { id: 2, time: "10:41:03 AM", action: "Security Alert", user: "AI Proctor System", details: "Suspicious movement detected in ID: student_452", alert: true },
        { id: 3, time: "10:38:55 AM", action: "User Login", user: "Dean Admin", details: "IP: 192.168.1.12" },
    ]);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // Edit State
    const [editingDept, setEditingDept] = useState<Department | null>(null);
    const [editBudgetUSD, setEditBudgetUSD] = useState<string>("");
    const [editBudgetINR, setEditBudgetINR] = useState<string>("");

    // Report State
    const [reportDept, setReportDept] = useState<Department | null>(null);
    const [reportType, setReportType] = useState<'Monthly' | 'Quarterly' | 'Annual'>('Monthly');
    const [isGenerating, setIsGenerating] = useState(false);

    // Faculty Action State
    const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyMembers | null>(null);
    const [facultyModalMode, setFacultyModalMode] = useState<'view' | 'edit'>('view');

    // Profile State


    // --- Effects ---
    // Check initial State
    useEffect(() => {
        const locked = localStorage.getItem('sys_lockdown') === 'true';
        setIsLockdown(locked);
    }, []);

    // Initialize edit form when opening modal
    useEffect(() => {
        if (editingDept) {
            // Parse "$450k" or "$450,000" -> 450000
            let rawVal = 0;
            const cleanStr = editingDept.budget.replace(/[$,]/g, "");
            if (cleanStr.toLowerCase().endsWith("k")) {
                rawVal = parseFloat(cleanStr) * 1000;
            } else {
                rawVal = parseFloat(cleanStr);
            }

            if (!isNaN(rawVal)) {
                setEditBudgetUSD(rawVal.toFixed(0));
                setEditBudgetINR((rawVal * EXCHANGE_RATE).toFixed(0));
            } else {
                setEditBudgetUSD("0");
                setEditBudgetINR("0");
            }
        }
    }, [editingDept]);

    // Simulate Live Logs
    useEffect(() => {
        const interval = setInterval(() => {
            const actions = ["User Login", "File Upload", "Grade Update", "System Check"];
            const users = ["Student_88", "Prof. X", "Admin", "HOD_Mech"];

            const newLog: Log = {
                id: Date.now(),
                time: new Date().toLocaleTimeString(),
                action: actions[Math.floor(Math.random() * actions.length)],
                user: users[Math.floor(Math.random() * users.length)],
                details: "Automatic logging event",
                alert: Math.random() > 0.95 // 5% chance of alert
            };
            setLogs(prev => [newLog, ...prev].slice(0, 8)); // Keep last 8
        }, 12000); // Slower updates
        return () => clearInterval(interval);
    }, []);
    // Handle outside clicks to close dropdown
    useEffect(() => {
        const handleClickOutside = () => setOpenActionMenuId(null);
        if (openActionMenuId) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openActionMenuId]);

    // --- Handlers ---
    const handleAddDepartment = () => {
        // In a real app, this would be a Modal. Using prompt for simplicity of 'logic' demonstration.
        const name = prompt("Enter Department Name:");
        if (!name) return;
        const newDept: Department = {
            id: `dept_${Date.now()}`,
            name,
            hod: "Not Assigned",
            facultyCount: 0,
            studentCount: 0,
            budget: "$0"
        };
        setDepartments([...departments, newDept]);
    };

    const handleDeleteDept = (id: string) => {
        if (confirm("Are you sure you want to dissolve this department?")) {
            setDepartments(departments.filter(d => d.id !== id));
        }
    };

    const handleSaveDept = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDept) return;

        // Save USD value formatted
        const finalBudget = `$${parseInt(editBudgetUSD || "0").toLocaleString()}`;
        const updatedDept = { ...editingDept, budget: finalBudget };

        setDepartments(departments.map(d => d.id === editingDept.id ? updatedDept : d));
        setEditingDept(null);
    };

    const handleBudgetChange = (amount: string, type: 'USD' | 'INR') => {
        const val = parseFloat(amount);
        if (isNaN(val) || amount === "") {
            if (type === 'USD') {
                setEditBudgetUSD(amount);
                setEditBudgetINR("");
            } else {
                setEditBudgetINR(amount);
                setEditBudgetUSD("");
            }
            return;
        }

        if (type === 'USD') {
            setEditBudgetUSD(amount);
            setEditBudgetINR((val * EXCHANGE_RATE).toFixed(0));
        } else {
            setEditBudgetINR(amount);
            setEditBudgetUSD((val / EXCHANGE_RATE).toFixed(0));
        }
    };

    const handleLockdownToggle = () => {
        const newState = !isLockdown;

        if (newState) {
            if (confirm("ACTIVATE EMERGENCY LOCKDOWN? This will freeze all non-admin access.")) {
                setIsLockdown(true);
                localStorage.setItem('sys_lockdown', 'true');
                window.dispatchEvent(new Event('lockdown-change')); // Trigger immediate local update
            }
        } else {
            setIsLockdown(false);
            localStorage.setItem('sys_lockdown', 'false');
            window.dispatchEvent(new Event('lockdown-change'));
        }
    };

    const handleMaintenance = () => {
        setMaintenanceMode(true);
        setTimeout(() => {
            setMaintenanceMode(false);
            alert("Database optimization complete. Storage freed: 450MB.");
        }, 2000);
    };



    const handleGenerateReport = () => {
        if (!reportDept) return;
        setIsGenerating(true);
        // Simulate API call / PDF generation time
        setTimeout(() => {
            setIsGenerating(false);
            alert(`${reportType} Report for ${reportDept.name} generated successfully!\nFile: ${reportDept.id}_${reportType.toLowerCase()}_report.pdf`);
            setReportDept(null);
        }, 2000);
    };

    const handleToggleStatus = (id: string) => {
        setFaculty(faculty.map(f => {
            if (f.id === id) {
                return { ...f, status: f.status === 'Active' ? 'On Leave' : 'Active' };
            }
            return f;
        }));
        setOpenActionMenuId(null);
    };

    const handleDeleteFaculty = (id: string) => {
        if (confirm("Remove this faculty member from directory?")) {
            setFaculty(faculty.filter(f => f.id !== id));
        }
        setOpenActionMenuId(null);
    };

    const handleUpdateFaculty = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFaculty) return;
        setFaculty(faculty.map(f => f.id === selectedFaculty.id ? selectedFaculty : f));
        setSelectedFaculty(null);
    };

    return (
        <DashboardLayout>
            {/* Faculty View/Edit Modal */}
            {selectedFaculty && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="glass-card w-full max-w-md p-6 rounded-2xl relative">
                        <button
                            onClick={() => setSelectedFaculty(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            {facultyModalMode === 'edit' ? <Edit size={24} className="text-primary" /> : <Eye size={24} className="text-blue-400" />}
                            {facultyModalMode === 'edit' ? 'Edit Faculty Details' : 'Faculty Profile'}
                        </h3>

                        <form onSubmit={handleUpdateFaculty} className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                                    {selectedFaculty.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Employee ID</p>
                                    <p className="font-mono text-white">{selectedFaculty.id.toUpperCase()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Full Name</label>
                                    {facultyModalMode === 'edit' ? (
                                        <input
                                            type="text"
                                            value={selectedFaculty.name}
                                            onChange={(e) => setSelectedFaculty({ ...selectedFaculty, name: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-lg font-medium text-white">{selectedFaculty.name}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Department</label>
                                    {facultyModalMode === 'edit' ? (
                                        <input
                                            type="text"
                                            value={selectedFaculty.department}
                                            onChange={(e) => setSelectedFaculty({ ...selectedFaculty, department: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-300">{selectedFaculty.department}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Role</label>
                                    {facultyModalMode === 'edit' ? (
                                        <input
                                            type="text"
                                            value={selectedFaculty.role}
                                            onChange={(e) => setSelectedFaculty({ ...selectedFaculty, role: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                                        />
                                    ) : (
                                        <span className="inline-block px-2 py-1 bg-zinc-800 rounded text-xs border border-zinc-700 text-gray-300">{selectedFaculty.role}</span>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email Address</label>
                                    {facultyModalMode === 'edit' ? (
                                        <input
                                            type="email"
                                            value={selectedFaculty.email}
                                            onChange={(e) => setSelectedFaculty({ ...selectedFaculty, email: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-300 flex items-center gap-2">
                                            {selectedFaculty.email}
                                            <CheckCircle size={14} className="text-emerald-500" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-800 flex gap-3">
                                {facultyModalMode === 'edit' ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFaculty(null)}
                                            className="flex-1 py-2 rounded-lg border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-2 rounded-lg bg-primary hover:bg-violet-600 text-white font-medium"
                                        >
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setFacultyModalMode('edit')}
                                        className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium border border-zinc-700"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Report Generation Modal */}
            {reportDept && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="glass-card w-full max-w-sm p-6 rounded-2xl relative">
                        <button
                            onClick={() => setReportDept(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <FileBarChart size={24} className="text-emerald-400" />
                            Generate Report
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">Create a performance summary for <span className="text-white font-medium">{reportDept.name}</span>.</p>

                        <div className="space-y-3 mb-6">
                            <label className="block text-sm text-gray-500 mb-1">Report Period</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['Monthly', 'Quarterly', 'Annual'] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setReportType(type)}
                                        className={`px-2 py-2 rounded-lg text-xs font-medium border transition-colors ${reportType === type ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-transparent border-zinc-700 text-gray-400 hover:border-zinc-500'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateReport}
                            disabled={isGenerating}
                            className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="animate-spin" size={18} /> Generating...
                                </>
                            ) : (
                                <>
                                    <Download size={18} /> Download Report
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingDept && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="glass-card w-full max-w-md p-6 rounded-2xl relative">
                        <button
                            onClick={() => setEditingDept(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Edit size={20} className="text-primary" />
                            Edit Department
                        </h3>
                        <form onSubmit={handleSaveDept} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Department Name</label>
                                <input
                                    type="text"
                                    value={editingDept.name}
                                    onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Head of Department (HOD)</label>
                                <input
                                    type="text"
                                    value={editingDept.hod}
                                    onChange={(e) => setEditingDept({ ...editingDept, hod: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            {/* Dual Currency Input */}
                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 space-y-3">
                                <label className="block text-sm text-gray-400">Annual Budget</label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            value={editBudgetUSD}
                                            onChange={(e) => handleBudgetChange(e.target.value, 'USD')}
                                            className="w-full bg-black/40 border border-zinc-700 rounded-lg pl-8 pr-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                            placeholder="USD"
                                        />
                                    </div>
                                    <RefreshCw size={16} className="text-gray-500" />
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                        <input
                                            type="number"
                                            value={editBudgetINR}
                                            onChange={(e) => handleBudgetChange(e.target.value, 'INR')}
                                            className="w-full bg-black/40 border border-zinc-700 rounded-lg pl-8 pr-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                            placeholder="INR"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-right">Rate: 1 USD ≈ {EXCHANGE_RATE} INR</p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingDept(null)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-violet-600 text-white font-medium transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Header / Emergency Banner */}
            <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${isLockdown ? 'bg-red-950/40 border-red-500 animate-pulse' : 'bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/20'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${isLockdown ? 'bg-red-500 text-white' : 'bg-amber-500/20 text-amber-500'}`}>
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{isLockdown ? "EMERGENCY LOCKDOWN ACTIVE" : "Dean's Control Center"}</h1>
                            <p className={`${isLockdown ? 'text-red-200' : 'text-amber-200/70'} text-sm`}>
                                {isLockdown ? "System access restricted. Only Administrator accounts active." : "Full system privileges active. Monitoring campus operations."}
                            </p>
                        </div>
                    </div>
                    {isLockdown && (
                        <button onClick={handleLockdownToggle} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-red-900/50 transition-all">
                            DEACTIVATE LOCKDOWN
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 border-b border-zinc-800 pb-1 overflow-x-auto">
                <NavTab label="Overview" icon={<Activity size={18} />} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <NavTab label="Departments" icon={<Building2 size={18} />} active={activeTab === 'departments'} onClick={() => setActiveTab('departments')} />
                <NavTab label="Faculty Directory" icon={<GraduationCap size={18} />} active={activeTab === 'faculty'} onClick={() => setActiveTab('faculty')} />
            </div>

            {/* --- VIEW: OVERVIEW --- */}
            {activeTab === 'overview' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <AdminStatCard title="Total Faculty" value={`${faculty.length}`} change="+2" positive />
                        <AdminStatCard title="Total Depts" value={`${departments.length}`} change="0" positive />
                        <AdminStatCard title="Avg Attendance" value="87%" change="+1.5%" positive />
                        <AdminStatCard title="Pending Requests" value="12" change="+3" positive={false} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                <Activity size={20} className="text-blue-400" />
                                Live System Activity
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 mt-1">
                                Real-time monitoring of all user interactions, security alerts, and system events across the campus network.
                            </p>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {logs.map((log) => (
                                    <LogEntry key={log.id} {...log} />
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl h-fit">
                            <h3 className="font-bold text-xl text-white">System Actions</h3>
                            <p className="text-gray-400 text-sm mb-6 mt-1">
                                Critical administrative controls for managing users, database intervals, and emergency protocols.
                            </p>

                            <div className="space-y-3">
                                <button onClick={() => setActiveTab('faculty')} className="w-full text-left px-4 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-start gap-3 group">
                                    <Users size={18} className="text-gray-400 group-hover:text-white mt-1" />
                                    <div>
                                        <span className="block font-medium text-gray-200 group-hover:text-white">Manage User Roles</span>
                                        <span className="text-xs text-gray-500 mt-1 block">View faculty directory, assign permissions, and track active staff status.</span>
                                    </div>
                                </button>

                                <button
                                    onClick={handleMaintenance}
                                    disabled={maintenanceMode}
                                    className="w-full text-left px-4 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-start gap-3 disabled:opacity-50 group"
                                >
                                    <Server size={18} className="text-gray-400 group-hover:text-white mt-1" />
                                    <div>
                                        <span className="block font-medium text-gray-200 group-hover:text-white">{maintenanceMode ? "Optimizing..." : "Database Maintenance"}</span>
                                        <span className="text-xs text-gray-500 mt-1 block">Run optimization scripts to clear cache and free up server storage.</span>
                                    </div>
                                </button>

                                {!isLockdown && (
                                    <button onClick={handleLockdownToggle} className="w-full text-left px-4 py-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors flex items-start gap-3 group">
                                        <ShieldAlert size={18} className="mt-1" />
                                        <div>
                                            <span className="block font-medium">Emergency Lockdown</span>
                                            <span className="text-xs text-red-400/60 mt-1 block">Instantly restrict system access for all non-admin users during security threats.</span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VIEW: DEPARTMENTS --- */}
            {activeTab === 'departments' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Academic Departments</h2>
                        <button onClick={handleAddDepartment} className="flex items-center gap-2 bg-primary hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Plus size={18} /> Add Department
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {departments.map((dept) => (
                            <div key={dept.id} className="glass-card p-6 rounded-2xl relative group">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    <button onClick={() => { setReportDept(dept); setReportType('Monthly'); }} className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors" title="Generate Report">
                                        <FileBarChart size={16} />
                                    </button>
                                    <button onClick={() => setEditingDept(dept)} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Edit Department">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteDept(dept.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Delete Department">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mb-4">
                                    <Building2 className="text-white" size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{dept.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">HOD: <span className="text-white">{dept.hod}</span></p>

                                <div className="space-y-2 border-t border-zinc-700/50 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Faculty</span>
                                        <span className="font-mono">{dept.facultyCount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Students</span>
                                        <span className="font-mono">{dept.studentCount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-start">
                                        <span className="text-gray-500 mt-1">Budget</span>
                                        <div className="text-right">
                                            <div className="font-mono text-emerald-400">{dept.budget}</div>
                                            <div className="font-mono text-xs text-emerald-600">
                                                {(() => {
                                                    const val = parseFloat(dept.budget.replace(/[$,]/g, ""));
                                                    return isNaN(val) ? "₹0" : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val * EXCHANGE_RATE);
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- VIEW: FACULTY --- */}
            {activeTab === 'faculty' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="glass-card rounded-2xl">
                        <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold">Faculty Directory</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search details..."
                                    className="bg-zinc-900 border border-zinc-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-primary w-full sm:w-64"
                                />
                            </div>
                        </div>
                        <div className="overflow-visible min-h-[400px]">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-900/50 text-gray-400 text-sm">
                                    <tr>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Department</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {faculty.map((member) => (
                                        <tr key={member.id} className="hover:bg-zinc-800/30 transition-colors">
                                            <td className="p-4 font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
                                                        {member.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    {member.name}
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-400">{member.department}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-zinc-800 rounded text-xs border border-zinc-700">
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`flex items-center gap-2 text-sm ${member.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                    <span className={`h-2 w-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></span>
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="p-4 relative">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setOpenActionMenuId(openActionMenuId === member.id ? null : member.id); }}
                                                    className={`p-2 rounded-lg transition-colors ${openActionMenuId === member.id ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'}`}
                                                >
                                                    <MoreVertical size={18} />
                                                </button>

                                                {/* Action Dropdown */}
                                                {openActionMenuId === member.id && (
                                                    <div className="absolute right-8 top-8 z-50 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                        <button
                                                            onClick={() => handleToggleStatus(member.id)}
                                                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors border-b border-zinc-800"
                                                        >
                                                            <Activity size={16} className={member.status === 'Active' ? 'text-amber-400' : 'text-emerald-400'} />
                                                            {member.status === 'Active' ? 'Mark On Leave' : 'Mark Active'}
                                                        </button>
                                                        <button
                                                            onClick={() => { setSelectedFaculty(member); setFacultyModalMode('view'); setOpenActionMenuId(null); }}
                                                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                                                        >
                                                            <Eye size={16} className="text-blue-400" />
                                                            View Profile
                                                        </button>
                                                        <button
                                                            onClick={() => { setSelectedFaculty(member); setFacultyModalMode('edit'); setOpenActionMenuId(null); }}
                                                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                                                        >
                                                            <Edit size={16} className="text-gray-400" />
                                                            Edit Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteFaculty(member.id)}
                                                            className="w-full text-left px-4 py-3 hover:bg-red-900/20 flex items-center gap-2 text-sm text-red-400 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                            Remove Faculty
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VIEW: PROFILE --- */}

        </DashboardLayout>
    );
}

// --- Sub-Components ---

function NavTab({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${active ? 'bg-zinc-800 text-white border-b-2 border-primary' : 'text-gray-500 hover:text-gray-300 hover:bg-zinc-800/50'}`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}

function AdminStatCard({ title, value, change, positive }: { title: string, value: string, change: string, positive: boolean }) {
    return (
        <div className="glass-card p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={48} />
            </div>
            <p className="text-gray-400 text-sm mb-2">{title}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{value}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${positive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                    {change}
                </span>
            </div>
        </div>
    );
}

function LogEntry({ time, action, user, details, alert }: { time: string, action: string, user: string, details: string, alert?: boolean }) {
    return (
        <div className={`p-3 rounded-lg border flex items-center justify-between text-sm transition-all hover:scale-[1.01] ${alert ? 'bg-red-500/10 border-red-500/30' : 'bg-black/20 border-white/5 hover:bg-zinc-800/50'}`}>
            <div className="flex items-center gap-4">
                <span className="text-gray-500 font-mono text-xs">{time}</span>
                <div>
                    <p className={`font-medium ${alert ? 'text-red-400' : 'text-white'}`}>{action}</p>
                    <p className="text-gray-500 text-xs">{user}</p>
                </div>
            </div>
            <span className="text-gray-500 text-xs hidden sm:block max-w-[150px] truncate">{details}</span>
        </div>
    );
}
