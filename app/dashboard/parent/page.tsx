"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Activity, BookOpen, AlertCircle, CalendarCheck, CreditCard,
    GraduationCap, Mail, Phone, ChevronRight, Download, CheckCircle, XCircle, FileText, User, X, Loader2, Pencil, Camera, Save, Upload, Trash2
} from "lucide-react";
import jsPDF from "jspdf";
import { formatDate } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";

type Tab = "overview" | "attendance" | "fees" | "results" | "contact";


export default function ParentDashboard() {
    const searchParams = useSearchParams();
    const activeTab = (searchParams.get('view') as Tab) || "overview";

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Parent Portal</h1>
                <p className="text-gray-400">Monitoring progress for: <span className="text-white font-medium">Alex Student</span> (Class 12-A)</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "overview" && <OverviewView />}
                {activeTab === "attendance" && <AttendanceView />}
                {activeTab === "fees" && <FeesView />}
                {activeTab === "results" && <ResultsView />}
                {activeTab === "contact" && <ContactView />}
            </div>
        </DashboardLayout>
    );
}

// --- Views ---

// --- Views ---

function OverviewView() {
    const router = useRouter();
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [scores, setScores] = useState({
        math: 80,
        physics: 65,
        cs: 92,
        english: 70,
        history: 55
    });
    const [isEditing, setIsEditing] = useState(false);
    const [parentProfile, setParentProfile] = useState({
        name: "John Student",
        relation: "Father",
        contact: "+91 987 654 3210",
        email: "parent@example.com",
        image: null as string | null
    });

    const [tempProfile, setTempProfile] = useState(parentProfile);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const saveProfile = () => {
        setParentProfile(tempProfile);
        setIsEditing(false);
    };

    // Simulate live score updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            setScores(prev => ({
                ...prev,
                math: Math.min(100, Math.max(70, prev.math + (Math.random() > 0.5 ? 1 : -1))), // Math fluctuates
                cs: Math.min(100, Math.max(85, prev.cs + (Math.random() > 0.7 ? 1 : 0))) // CS tends to go up
            }));
        }, 2000); // Update every 2 seconds
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        const loadFeedback = () => {
            const stored = localStorage.getItem('student_feedback');
            if (stored) {
                setFeedbacks(JSON.parse(stored));
            } else {
                // Default mock if empty
                setFeedbacks([{
                    id: 0,
                    subject: "Computer Science",
                    message: "Alex is showing great aptitude for algorithms...",
                    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                    sender: "Dr. Faculty"
                }]);
            }
        };

        loadFeedback();
        window.addEventListener('storage', loadFeedback);
        // Also listen for custom same-tab events
        // Note: The event name used in Faculty page was 'storage' manually dispatched

        return () => window.removeEventListener('storage', loadFeedback);
    }, []);

    return (
        <div className="space-y-6">
            {/* Profile Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                        <User size={120} />
                    </div>

                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                <User size={20} />
                            </div>
                            Parent Details
                        </h3>
                        <button
                            onClick={() => { setTempProfile(parentProfile); setIsEditing(true); }}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                            title="Edit Profile"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                        <div className="shrink-0 flex justify-center sm:justify-start">
                            <div className="h-24 w-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-zinc-900/50 relative group/img">
                                {parentProfile.image ? (
                                    <img src={parentProfile.image} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User size={40} className="text-gray-500" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 flex-1">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-gray-400 text-sm">Name</span>
                                <span className="text-white font-medium text-right">{parentProfile.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-gray-400 text-sm">Relation</span>
                                <span className="text-white font-medium text-right">{parentProfile.relation}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-gray-400 text-sm">Contact</span>
                                <span className="text-white font-medium text-right">{parentProfile.contact}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Email</span>
                                <span className="text-white font-medium text-right text-xs sm:text-base truncate ml-4">{parentProfile.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Edit Parent Profile</h3>
                                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col items-center gap-3 mb-6">
                                    <div className="h-24 w-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-black/40 relative">
                                        {tempProfile.image ? (
                                            <img src={tempProfile.image} alt="Preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <User size={32} className="text-gray-500" />
                                        )}
                                        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                            <Camera size={20} className="text-white mb-1" />
                                            <span className="text-[10px] text-white">Change</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                    {tempProfile.image && (
                                        <button
                                            onClick={() => setTempProfile(prev => ({ ...prev, image: null }))}
                                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                                        >
                                            <Trash2 size={12} /> Remove
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase font-bold">Full Name</label>
                                    <input
                                        type="text"
                                        value={tempProfile.name}
                                        onChange={e => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase font-bold">Relation</label>
                                    <select
                                        value={tempProfile.relation}
                                        onChange={e => setTempProfile(prev => ({ ...prev, relation: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    >
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Guardian">Guardian</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase font-bold">Contact Number</label>
                                    <input
                                        type="text"
                                        value={tempProfile.contact}
                                        onChange={e => setTempProfile(prev => ({ ...prev, contact: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase font-bold">Email Address</label>
                                    <input
                                        type="email"
                                        value={tempProfile.email}
                                        onChange={e => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <button
                                    onClick={saveProfile}
                                    className="w-full mt-4 py-3 bg-primary hover:bg-primary/90 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <GraduationCap size={120} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <GraduationCap size={20} />
                        </div>
                        Student Details
                    </h3>
                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Name</span>
                            <span className="text-white font-medium">Alex Student</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Student ID</span>
                            <span className="text-white font-medium">ST-2024-001</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Class / Section</span>
                            <span className="text-white font-medium">12 - A</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Course</span>
                            <span className="text-white font-medium">Computer Science</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl md:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Activity size={100} />
                    </div>
                    <h3 className="font-bold mb-6 flex items-center gap-2 text-xl">
                        <div className="relative">
                            <Activity className="text-emerald-400" />
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </div>
                        Performance Overview
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-3 px-2 mt-8">
                        <ChartBar label="Math" current={scores.math} total={100} color="bg-blue-500" />
                        <ChartBar label="Physics" current={scores.physics} total={100} color="bg-purple-500" />
                        <ChartBar label="CS" current={scores.cs} total={100} color="bg-emerald-500" />
                        <ChartBar label="English" current={scores.english} total={100} color="bg-yellow-500" />
                        <ChartBar label="History" current={scores.history} total={100} color="bg-red-500" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-white/5">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                            <AlertCircle size={18} className="text-amber-400" />
                            Quick Actions Needed
                        </h3>
                        <div className="space-y-3">
                            <div
                                className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex justify-between items-center cursor-pointer hover:bg-amber-500/20 transition-colors"
                                onClick={() => router.push('/dashboard/parent?view=attendance')}
                            >
                                <div className="text-xs">
                                    <p className="font-medium text-amber-200 mb-1">Low Attendance</p>
                                    <p className="text-amber-100/70">Physics (65%)</p>
                                </div>
                                <ChevronRight size={16} className="text-amber-400" />
                            </div>
                            <div
                                className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex justify-between items-center cursor-pointer hover:bg-blue-500/20 transition-colors"
                                onClick={() => router.push('/dashboard/parent?view=fees')}
                            >
                                <div className="text-xs">
                                    <p className="font-medium text-blue-200 mb-1">Fee Due</p>
                                    <p className="text-blue-100/70">Term 2 Tuition</p>
                                </div>
                                <ChevronRight size={16} className="text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-white/5 max-h-[300px] overflow-y-auto">
                        <h3 className="font-bold mb-4 text-white flex items-center justify-between">
                            Latest Feedback
                            <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-gray-400">Live</span>
                        </h3>
                        <div className="space-y-3">
                            {feedbacks.map((fb, i) => (
                                <div key={i} className="p-3 bg-zinc-900/50 rounded-lg border border-white/5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-emerald-400">{fb.subject || "General"}</span>
                                        <span className="text-[10px] text-gray-500">{new Date(fb.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-300 italic">"{fb.message}"</p>
                                    <div className="mt-2 text-[10px] text-gray-500 text-right">- {fb.sender}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AttendanceView() {
    const data = [
        { subject: "Advanced Data Structures", total: 48, attended: 42, color: "emerald" },
        { subject: "System Design", total: 40, attended: 26, color: "red" },
        { subject: "Graph Theory", total: 36, attended: 30, color: "emerald" },
        { subject: "Computer Networks", total: 45, attended: 38, color: "emerald" },
        { subject: "Database Management", total: 42, attended: 31, color: "yellow" }
    ];

    return (
        <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                    <CalendarCheck className="text-primary" />
                    Detailed Attendance Report
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item, idx) => {
                        const pct = Math.round((item.attended / item.total) * 100);
                        return (
                            <div key={idx} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-sm text-gray-200">{item.subject}</h4>
                                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${pct >= 75 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                        pct >= 65 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                        {pct}%
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mb-2">
                                    {item.attended} / {item.total} Classes Attended
                                </div>
                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${pct >= 75 ? 'bg-emerald-500' :
                                            pct >= 65 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                        style={{ width: `${pct}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

function FeesView() {
    type Invoice = { id: string, desc: string, amount: number, date: string, status: "Paid" | "Due" };

    // Converted to roughly equivalent INR amounts
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: "INV-2024-001", desc: "Term 1 Tuition Fee", amount: 150000, date: "15/Aug/2024", status: "Paid" },
        { id: "INV-2024-002", desc: "Lab Consumables", amount: 15000, date: "01/Sep/2024", status: "Paid" },
        { id: "INV-2024-003", desc: "Term 2 Tuition Fee", amount: 150000, date: "10/Jan/2025", status: "Due" },
    ]);

    const [isProcessing, setIsProcessing] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleDownloadReceipt = (invoice: Invoice) => {
        const doc = new jsPDF();

        // Colors
        const primaryColor = "#6366f1"; // Indigo-500

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("AI Powered Platform", 105, 20, { align: "center" });

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("School Management System", 105, 26, { align: "center" });

        // Receipt Title
        doc.setFillColor(99, 102, 241); // Primary color
        doc.rect(0, 35, 210, 15, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("PAYMENT RECEIPT", 105, 45, { align: "center" });

        // Details 
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        let y = 65;
        const col1 = 20;
        const col2 = 60;
        const col3 = 130;
        const col4 = 160;

        // Basic Info
        doc.text("Receipt No:", col1, y);
        doc.setFont("helvetica", "bold");
        doc.text(`${invoice.id}-REC`, col2, y);

        doc.setFont("helvetica", "normal");
        doc.text("Date:", col3, y);
        doc.text(formatDate(new Date()), col4, y);

        y += 10;
        doc.text("Student:", col1, y);
        doc.setFont("helvetica", "bold");
        doc.text("Alex Student", col2, y);

        doc.setFont("helvetica", "normal");
        doc.text("Class:", col3, y);
        doc.text("12-A", col4, y);

        y += 20;

        // Table Header
        doc.setFillColor(245, 245, 245);
        doc.rect(20, y - 6, 170, 10, "F");
        doc.line(20, y + 4, 190, y + 4);

        doc.setFont("helvetica", "bold");
        doc.text("Description", 25, y);
        doc.text("Amount", 170, y, { align: "right" });

        y += 15;

        // Item
        doc.setFont("helvetica", "normal");
        doc.text(invoice.desc, 25, y);
        doc.text(formatCurrency(invoice.amount), 170, y, { align: "right" });

        y += 20;

        // Total
        doc.setDrawColor(220, 220, 220);
        doc.line(20, y, 190, y);
        y += 10;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Total Paid:", 120, y);
        doc.setTextColor(16, 185, 129); // Emerald
        doc.text(formatCurrency(invoice.amount), 170, y, { align: "right" });

        // Status Stamp like effect
        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(1);
        doc.roundedRect(150, 60, 40, 12, 1, 1, "D");
        doc.setTextColor(16, 185, 129);
        doc.setFontSize(10);
        doc.text("PAID", 170, 67, { align: "center" });

        // Footer
        y = 270;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.setFont("helvetica", "normal");
        doc.text("Thank you for your payment.", 105, y, { align: "center" });
        doc.text("This is a computer generated receipt and does not require a signature.", 105, y + 5, { align: "center" });

        doc.save(`${invoice.id}_Receipt.pdf`);
    };

    const initiatePayment = (invoice: Invoice) => {
        if (invoice.status === 'Paid') return;
        setActiveInvoice(invoice);
        setShowPaymentModal(true);
    };

    const confirmPayment = async () => {
        if (!activeInvoice) return;
        setIsProcessing(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setInvoices(prev => prev.map(inv =>
            inv.id === activeInvoice.id ? { ...inv, status: 'Paid' } : inv
        ));

        setIsProcessing(false);
        setShowPaymentModal(false);
        setActiveInvoice(null);
    };

    return (
        <>
            <div className="glass-card p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                        <CreditCard className="text-blue-400" />
                        Fee Status & Payments
                    </h3>
                    <div className="text-sm text-gray-400">
                        Academic Year 2024-25
                    </div>
                </div>

                <div className="space-y-3">
                    {invoices.map((inv) => (
                        <div key={inv.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-4 mb-3 md:mb-0">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-white">{inv.desc}</p>
                                    <p className="text-xs text-gray-500">{inv.id} • Due {inv.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                <span className="font-bold text-white text-lg">{formatCurrency(inv.amount)}</span>
                                <div className="flex items-center gap-3">
                                    {inv.status === 'Paid' ? (
                                        <>
                                            <span className="text-xs font-bold px-2 py-1 rounded uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Paid
                                            </span>
                                            <button
                                                onClick={() => handleDownloadReceipt(inv)}
                                                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                                title="Download Receipt"
                                            >
                                                <Download size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => initiatePayment(inv)}
                                            className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-colors shadow-lg shadow-primary/20"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && activeInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 text-center">
                            <div className="h-16 w-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                                <CreditCard size={32} className="text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Confirm Payment</h3>
                            <p className="text-gray-400 text-sm">You are about to pay for {activeInvoice.desc}</p>
                        </div>

                        <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-3 border border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Amount Due</span>
                                <span className="text-white font-medium">{formatCurrency(activeInvoice.amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Convenience Fee</span>
                                <span className="text-white font-medium">{formatCurrency(0)}</span>
                            </div>
                            <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                                <span className="text-white">Total Payable</span>
                                <span className="text-emerald-400 text-lg">{formatCurrency(activeInvoice.amount)}</span>
                            </div>
                        </div>

                        <button
                            disabled={isProcessing}
                            onClick={confirmPayment}
                            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    Proceed to Pay
                                </>
                            )}
                        </button>

                        <p className="text-center text-[10px] text-gray-500 mt-4">
                            Secured by 256-bit SSL Encryption.
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

function ResultsView() {
    return (
        <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                    <GraduationCap className="text-purple-400" />
                    Academic Results
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400 text-sm">
                                <th className="py-3 px-4 font-medium">Subject</th>
                                <th className="py-3 px-4 font-medium">Mid-Term</th>
                                <th className="py-3 px-4 font-medium">Finals</th>
                                <th className="py-3 px-4 font-medium">Grade</th>
                                <th className="py-3 px-4 font-medium">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <ResultRow subject="Mathematics" mid="85/100" final="88/100" grade="A" remark="Excellent" />
                            <ResultRow subject="Physics" mid="62/100" final="68/100" grade="B-" remark="Good" />
                            <ResultRow subject="Computer Science" mid="92/100" final="95/100" grade="A+" remark="Outstanding" />
                            <ResultRow subject="English" mid="75/100" final="78/100" grade="A-" remark="Good" />
                            <ResultRow subject="History" mid="55/100" final="58/100" grade="C" remark="Average" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function ResultRow({ subject, mid, final, grade, remark }: { subject: string, mid: string, final: string, grade: string, remark: string }) {
    return (
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td className="py-3 px-4 text-white font-medium">{subject}</td>
            <td className="py-3 px-4 text-gray-400">{mid}</td>
            <td className="py-3 px-4 text-gray-400">{final}</td>
            <td className="py-3 px-4">
                <span className={`font-bold ${grade.startsWith('A') ? 'text-emerald-400' : grade.startsWith('B') ? 'text-blue-400' : 'text-yellow-400'}`}>{grade}</span>
            </td>
            <td className="py-3 px-4 text-gray-500 italic">{remark}</td>
        </tr>
    );
}

function ContactView() {
    return (
        <div className="glass-card p-6 rounded-2xl border border-white/5 max-w-2xl mx-auto">
            <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                <Mail className="text-pink-400" />
                Contact Faculty / Administration
            </h3>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Department</label>
                        <select className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors">
                            <option>Administration</option>
                            <option>Computer Science Dept.</option>
                            <option>Physics Dept.</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Urgency</label>
                        <select className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors">
                            <option>Normal</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Subject</label>
                    <input type="text" placeholder="Regarding..." className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Message</label>
                    <textarea rows={5} placeholder="Type your message here..." className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20">
                    Send Message
                </button>
            </form>
        </div>
    );
}

function ChartBar({ label, current, total, color }: { label: string, current: number, total: number, color: string }) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="flex flex-col items-center gap-2 w-full h-full justify-end group relative">
            <div className="w-full flex flex-col justify-end items-center h-full relative">
                <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] px-3 py-2 rounded-lg mb-2 whitespace-nowrap z-10 border border-white/10 shadow-xl flex flex-col items-center pointer-events-none">
                    <span className="font-bold text-base">{current}<span className="text-gray-500 text-xs font-normal">/{total}</span></span>
                    <span className="text-emerald-400 font-bold">{percentage}%</span>
                </div>
                <div
                    className={`w-full max-w-[40px] rounded-t-lg ${color} opacity-80 hover:opacity-100 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden`}
                    style={{ height: `${percentage}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            </div>
            <span className="text-xs text-gray-400 hidden md:block font-medium">{label}</span>
            <span className="text-xs text-gray-400 md:hidden">{label.substring(0, 2)}</span>
            <span className="text-[10px] text-gray-500 font-mono mt-[-4px] group-hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100">{percentage}%</span>
        </div>
    );
}
