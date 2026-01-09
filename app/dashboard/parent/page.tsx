"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Activity, BookOpen, AlertCircle } from "lucide-react";

export default function ParentDashboard() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Parent Portal</h1>
                <p className="text-gray-400">Monitoring progress for: <span className="text-white font-medium">Alex Student</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-2xl md:col-span-2">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-emerald-400" />
                        Performance Overview
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-2 px-4">
                        {/* Mock Chart Bars */}
                        <ChartBar label="Math" height="80%" color="bg-blue-500" />
                        <ChartBar label="Physics" height="65%" color="bg-purple-500" />
                        <ChartBar label="CS" height="92%" color="bg-emerald-500" />
                        <ChartBar label="English" height="70%" color="bg-yellow-500" />
                        <ChartBar label="History" height="55%" color="bg-red-500" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Alerts */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                            <AlertCircle size={18} className="text-amber-400" />
                            Recent Alerts
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                                <p className="font-medium text-amber-200 mb-1">Attendance Warning</p>
                                <p className="text-amber-100/70">Missed "Advanced Physics" class on Monday.</p>
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                                <p className="font-medium text-emerald-200 mb-1">Achievement Unlocked</p>
                                <p className="text-emerald-100/70">Top 5% in "Data Structures" Mid-term.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="font-bold mb-4 text-xl">Faculty Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeedbackCard
                    subject="Computer Science"
                    faculty="Dr. Faculty"
                    date="2 days ago"
                    message="Alex is showing great aptitude for algorithms. His participation in the coding bootcamp was excellent."
                />
                <FeedbackCard
                    subject="Physics"
                    faculty="Prof. Newton"
                    date="1 week ago"
                    message="Needs to improve attendance. Homework submissions are good but consistency is key."
                    improvementNeeded
                />
            </div>

        </DashboardLayout>
    );
}

function ChartBar({ label, height, color }: { label: string, height: string, color: string }) {
    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div className={`w-full rounded-t-lg ${color} opacity-80 hover:opacity-100 transition-opacity`} style={{ height }}></div>
            <span className="text-xs text-gray-400">{label}</span>
        </div>
    );
}

function FeedbackCard({ subject, faculty, date, message, improvementNeeded }: { subject: string, faculty: string, date: string, message: string, improvementNeeded?: boolean }) {
    return (
        <div className={`glass-card p-6 rounded-xl border ${improvementNeeded ? 'border-red-500/20' : 'border-white/5'}`}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-bold text-white shadow-sm">{subject}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="h-5 w-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-gray-400">
                            {faculty.charAt(0)}
                        </div>
                        <p className="text-xs text-gray-400">{faculty}</p>
                    </div>
                </div>
                <span className="text-xs text-gray-500">{date}</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed bg-black/20 p-3 rounded-lg">
                "{message}"
            </p>
        </div>
    );
}
