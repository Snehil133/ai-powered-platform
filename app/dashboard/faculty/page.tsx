"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Users, FileBarChart2, Search, Filter, AlertCircle,
    Phone, Mail, X, MessageSquare, Send, CheckCircle, Download
} from "lucide-react";

type PerformanceLevel = "Strong" | "Average" | "Weak";

interface Student {
    id: string;
    name: string;
    section: string;
    attendance: number;
    avgScore: number;
    performance: PerformanceLevel;
    engagement: string;
    email: string;
    phone: string;
    parentPhone: string;
    collegeEmail: string;
    course: string;
    year: string;
    semester: string;
}

// Mock Data
const ALL_STUDENTS: Student[] = [
    {
        id: "1", name: "Alex Student", section: "A", attendance: 92, avgScore: 88, performance: "Strong", engagement: "High",
        email: "alex@example.com", collegeEmail: "alex.st@college.edu", phone: "+91 234 567 8901", parentPhone: "+1 234 567 8902",
        course: "Computer Science", year: "2nd", semester: "3rd"
    },
    {
        id: "2", name: "John Doe", section: "A", attendance: 75, avgScore: 62, performance: "Average", engagement: "Medium",
        email: "john@example.com", collegeEmail: "john.doe@college.edu", phone: "+91 234 567 8903", parentPhone: "+1 234 567 8904",
        course: "Computer Science", year: "2nd", semester: "3rd"
    },
    {
        id: "3", name: "Jane Smith", section: "A", attendance: 45, avgScore: 35, performance: "Weak", engagement: "Low",
        email: "jane@example.com", collegeEmail: "jane.smith@college.edu", phone: "+91 234 567 8905", parentPhone: "+1 234 567 8906",
        course: "Computer Science", year: "2nd", semester: "3rd"
    },
    {
        id: "4", name: "Mike Johnson", section: "B", attendance: 88, avgScore: 79, performance: "Average", engagement: "Medium",
        email: "mike@example.com", collegeEmail: "mike.j@college.edu", phone: "+1 234 567 8907", parentPhone: "+1 234 567 8908",
        course: "Information Tech", year: "3rd", semester: "5th"
    },
    {
        id: "5", name: "Sarah Connor", section: "A", attendance: 98, avgScore: 95, performance: "Strong", engagement: "High",
        email: "sarah@example.com", collegeEmail: "sarah.c@college.edu", phone: "+1 234 567 8909", parentPhone: "+1 234 567 8910",
        course: "Computer Science", year: "2nd", semester: "3rd"
    },
];

export default function FacultyDashboard() {
    const [filter, setFilter] = useState<PerformanceLevel | "All">("All");
    const [showExamAlert, setShowExamAlert] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Student | null>(null);
    const [messagingStudent, setMessagingStudent] = useState<Student | null>(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [messageText, setMessageText] = useState("");

    const filteredStudents = filter === "All"
        ? ALL_STUDENTS
        : ALL_STUDENTS.filter(s => s.performance === filter);

    useEffect(() => {
        // Check for students not meeting criteria (e.g., performance 'Weak')
        const atRiskStudents = ALL_STUDENTS.filter(s => s.performance === "Weak" || s.attendance < 50);
        if (atRiskStudents.length > 0) {
            // Setup a small delay for better UX
            const timer = setTimeout(() => setShowExamAlert(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const sendMessage = (target: 'student' | 'parent' | 'both') => {
        // Mock send
        alert(`Message sent to ${target} for ${messagingStudent?.name}:\n"${messageText}"`);
        setMessagingStudent(null);
        setMessageText("");
    };

    const downloadReport = (type: 'assigned' | 'course') => {
        // Simulate report generation
        const date = new Date().toISOString().split('T')[0];
        const filename = `${type}_students_report_${date}.csv`;

        // Create mock content
        let content = "Student ID,Name,Course,Status,Attendance\n";
        filteredStudents.forEach(s => {
            content += `${s.id},${s.name},${s.course},${s.performance},${s.attendance}%\n`;
        });

        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        setShowReportModal(false);
    };

    const emailReport = (type: 'assigned' | 'course') => {
        // Simulate email
        alert(`Report for ${type === 'assigned' ? 'Assigned Students' : 'Course Students'} has been sent to your registered email (faculty@college.edu).`);
        setShowReportModal(false);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Assigned Students</h1>
                    <p className="text-gray-400">View performance, attendance and reports for your section.</p>
                </div>
                <button
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                >
                    <FileBarChart2 size={18} />
                    Generate Section Report
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                <FilterButton label="All Students" active={filter === "All"} onClick={() => setFilter("All")} />
                <FilterButton label="Strong Performers" active={filter === "Strong"} onClick={() => setFilter("Strong")} count={ALL_STUDENTS.filter(s => s.performance === "Strong").length} color="text-emerald-400" />
                <FilterButton label="Average" active={filter === "Average"} onClick={() => setFilter("Average")} count={ALL_STUDENTS.filter(s => s.performance === "Average").length} color="text-yellow-400" />
                <FilterButton label="Weak / At Risk" active={filter === "Weak"} onClick={() => setFilter("Weak")} count={ALL_STUDENTS.filter(s => s.performance === "Weak").length} color="text-red-400" />
            </div>

            {/* Student List */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 mb-12">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Student Name</th>
                                <th className="p-4 font-medium">Section</th>
                                <th className="p-4 font-medium">Attendance</th>
                                <th className="p-4 font-medium">Avg Score</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 font-medium flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-gray-400">
                                            {student.name.charAt(0)}
                                        </div>
                                        {student.name}
                                    </td>
                                    <td className="p-4 text-gray-400">{student.section}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-zinc-800 rounded-full h-1.5">
                                                <div className={`h-1.5 rounded-full ${student.attendance < 75 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${student.attendance}%` }}></div>
                                            </div>
                                            <span className="text-xs text-gray-400">{student.attendance}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-white font-medium">{student.avgScore}%</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${student.performance === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            student.performance === 'Weak' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            {student.performance}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedContact(student)}
                                                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
                                                title="View Details"
                                            >
                                                <Phone size={16} />
                                            </button>
                                            <button
                                                onClick={() => setMessagingStudent(student)}
                                                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
                                                title="Send Message"
                                            >
                                                <MessageSquare size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 italic text-xs">
                                        Read-only
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredStudents.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No students found for this filter.
                    </div>
                )}
            </div>

            {/* Department Footer Info */}
            <div className="mt-8 border-t border-white/5 pt-8">
                <h3 className="text-lg font-semibold text-white mb-6">Department Contacts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5 flex gap-4 items-start">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Users size={20} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">Head of Department (HOD)</h4>
                            <p className="text-gray-400 text-sm mt-1">Prof. Robert Williams</p>
                            <div className="mt-3 text-sm space-y-1">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Phone size={14} /> +1 (555) 123-4567
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Mail size={14} /> robert.w@college.edu
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5 flex gap-4 items-start">
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <GraduationCapIcon size={20} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">Dean of Academics</h4>
                            <p className="text-gray-400 text-sm mt-1">Dr. Eleanor Rigby</p>
                            <div className="mt-3 text-sm space-y-1">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Phone size={14} /> +1 (555) 987-6543
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Mail size={14} /> dean.academics@college.edu
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Criteria Alert Modal */}
            {showExamAlert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-zinc-900 border border-red-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                        <button onClick={() => setShowExamAlert(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                        <div className="flex items-center gap-3 text-red-500 mb-4">
                            <AlertCircle size={32} />
                            <h3 className="text-xl font-bold">Exam Eligibility Alert</h3>
                        </div>
                        <p className="text-gray-300 mb-4">
                            One or more assigned students are currently below the required criteria for upcoming exams (Attendance &lt; 75% or Poor Performance).
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <p className="text-red-400 text-sm font-medium">Action Required:</p>
                            <p className="text-red-300/80 text-xs mt-1">Please review "Weak/At Risk" students and send performance feedback immediately.</p>
                        </div>
                        <button
                            onClick={() => { setShowExamAlert(false); setFilter("Weak"); }}
                            className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                            View At-Risk Students
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Details Modal */}
            {selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                        <button onClick={() => setSelectedContact(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-6">Student Details</h3>

                        <div className="flex flex-col items-center mb-6">
                            <div className="h-20 w-20 rounded-full bg-zinc-800 text-2xl flex items-center justify-center text-gray-400 mb-3">
                                {selectedContact.name.charAt(0)}
                            </div>
                            <h4 className="text-lg font-semibold text-white">{selectedContact.name}</h4>
                            <p className="text-gray-400 text-sm">Reg: {selectedContact.id.padStart(8, '2024000')}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 uppercase">Course</div>
                                    <div className="text-sm text-gray-200 truncate" title={selectedContact.course}>{selectedContact.course}</div>
                                </div>
                                <div className="bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 uppercase">Year / Sem</div>
                                    <div className="text-sm text-gray-200">{selectedContact.year} / {selectedContact.semester}</div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3 text-sm p-3 hover:bg-white/5 rounded-lg transition-colors">
                                    <Mail className="text-gray-400" size={18} />
                                    <div>
                                        <div className="text-xs text-gray-500">College Email</div>
                                        <div className="text-gray-200">{selectedContact.collegeEmail}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm p-3 hover:bg-white/5 rounded-lg transition-colors">
                                    <Phone className="text-gray-400" size={18} />
                                    <div>
                                        <div className="text-xs text-gray-500">Mobile Number</div>
                                        <div className="text-gray-200">{selectedContact.phone}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {messagingStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
                        <button onClick={() => setMessagingStudent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/20 text-primary rounded-xl">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Send Feedback</h3>
                                <p className="text-sm text-gray-400">To {messagingStudent.name}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Message Content</label>
                                <textarea
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 min-h-[120px]"
                                    placeholder="Write your feedback regarding performance or attendance..."
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={() => sendMessage('student')}
                                disabled={!messageText.trim()}
                                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm text-gray-300"
                            >
                                <Send size={16} />
                                Send to Student
                            </button>
                            <button
                                onClick={() => sendMessage('parent')}
                                disabled={!messageText.trim()}
                                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm text-gray-300"
                            >
                                <Users size={16} />
                                Send to Parents
                            </button>
                            <button
                                onClick={() => sendMessage('both')}
                                disabled={!messageText.trim()}
                                className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 p-3 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-lg shadow-primary/20"
                            >
                                Send to Both
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Generation Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                        <button onClick={() => setShowReportModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <div className="mx-auto w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-4">
                                <FileBarChart2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Generate Report</h3>
                            <p className="text-gray-400 text-sm">Choose how you would like to receive the report.</p>
                        </div>

                        <div className="space-y-4">
                            {/* Assigned Students */}
                            <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-white">Assigned Students Report</span>
                                    <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded">Section A</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => downloadReport('assigned')}
                                        className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors border border-white/5 group"
                                    >
                                        <Download size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                                        Download
                                    </button>
                                    <button
                                        onClick={() => emailReport('assigned')}
                                        className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors border border-white/5 group"
                                    >
                                        <Mail size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                        Email
                                    </button>
                                </div>
                            </div>

                            {/* Course Students */}
                            <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-white">Course Students Report</span>
                                    <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded">All Sections</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => downloadReport('course')}
                                        className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors border border-white/5 group"
                                    >
                                        <Download size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                                        Download
                                    </button>
                                    <button
                                        onClick={() => emailReport('course')}
                                        className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors border border-white/5 group"
                                    >
                                        <Mail size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                        Email
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

function FilterButton({ label, active, onClick, count, color }: { label: string, active: boolean, onClick: () => void, count?: number, color?: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${active
                ? 'bg-zinc-800 text-white border-white/20 shadow-lg'
                : 'bg-transparent text-gray-500 border-transparent hover:bg-zinc-900/50 hover:text-gray-300'
                }`}
        >
            {label}
            {count !== undefined && (
                <span className={`bg-zinc-900 px-1.5 py-0.5 rounded text-xs ${color || 'text-gray-400'}`}>
                    {count}
                </span>
            )}
        </button>
    );
}

function GraduationCapIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    )
}
