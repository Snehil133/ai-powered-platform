"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { User, Phone, CheckCircle, XCircle, AlertTriangle, CalendarCheck, BarChart3 } from "lucide-react";

export default function AttendancePage() {
    // Mock Data
    const attendanceData = [
        {
            id: 1,
            subject: "Advanced Data Structures",
            faculty: "Dr. Faculty",
            contact: "+91 98765 43210",
            totalClasses: 48,
            attendedClasses: 42,
        },
        {
            id: 2,
            subject: "System Design",
            faculty: "Prof. Head",
            contact: "+91 98765 43211",
            totalClasses: 40,
            attendedClasses: 28, // Low attendance
        },
        {
            id: 3,
            subject: "Graph Theory",
            faculty: "Dr. Alan Turing",
            contact: "+91 98765 43212",
            totalClasses: 36,
            attendedClasses: 30,
        },
        {
            id: 4,
            subject: "Computer Networks",
            faculty: "Prof. Ada Lovelace",
            contact: "+91 98765 43213",
            totalClasses: 45,
            attendedClasses: 38,
        },
        {
            id: 5,
            subject: "Database Management",
            faculty: "Dr. Codd",
            contact: "+91 98765 43214",
            totalClasses: 42,
            attendedClasses: 31, // Borderline
        }
    ];

    // Calculations
    const totalClassesOverall = attendanceData.reduce((acc, curr) => acc + curr.totalClasses, 0);
    const totalAttendedOverall = attendanceData.reduce((acc, curr) => acc + curr.attendedClasses, 0);
    const overallPercentage = Math.round((totalAttendedOverall / totalClassesOverall) * 100);
    const isEligible = overallPercentage >= 75;

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <CalendarCheck className="text-primary" size={32} />
                        Attendance Overview
                    </h1>
                    <p className="text-gray-400">Track your class attendance and exam eligibility.</p>
                </div>

                {/* Overall Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overall Percentage */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className={`absolute inset-0 opacity-10 ${overallPercentage >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <div className="relative z-10">
                            <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs">Overall Attendance</h3>
                            <div className={`text-5xl font-bold mb-2 ${overallPercentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {overallPercentage}%
                            </div>
                            <div className="text-sm text-gray-500">
                                {totalAttendedOverall} / {totalClassesOverall} Classes
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Status */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center md:col-span-2 relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${isEligible ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <div className="flex items-center gap-6">
                            <div className={`h-16 w-16 rounded-full flex items-center justify-center ${isEligible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                {isEligible ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {isEligible ? "Eligible for Exams" : "Not Eligible for Exams"}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {isEligible
                                        ? "Great job! You have maintained the required attendance threshold."
                                        : "Your attendance is below the 75% threshold required for exam eligibility."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subject Wise Cards */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="text-indigo-400" size={24} /> Subject Breakdown
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {attendanceData.map((subject) => {
                            const percentage = Math.round((subject.attendedClasses / subject.totalClasses) * 100);
                            const statusColor = percentage >= 75 ? 'emerald' : percentage >= 65 ? 'yellow' : 'red';

                            return (
                                <div key={subject.id} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-white mb-1">{subject.subject}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <User size={12} /> {subject.faculty}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                <Phone size={12} /> {subject.contact}
                                            </div>
                                        </div>
                                        <div className={`text-lg font-bold px-3 py-1 rounded-lg bg-${statusColor}-500/10 text-${statusColor}-400 border border-${statusColor}-500/20`}>
                                            {percentage}%
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-auto pt-4 space-y-2">
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Progress</span>
                                            <span>{subject.attendedClasses}/{subject.totalClasses} Classes</span>
                                        </div>
                                        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${percentage >= 75 ? 'bg-emerald-500' :
                                                        percentage >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        {percentage < 75 && (
                                            <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1">
                                                <XCircle size={10} /> Needs Improvement
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
