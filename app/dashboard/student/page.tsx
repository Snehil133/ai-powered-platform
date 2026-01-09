"use client";

import Link from "next/link";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Clock, AlertTriangle, Play, CheckCircle2, MessageCircle } from "lucide-react";

export default function StudentDashboard() {
    const [accountDisabled, setAccountDisabled] = useState(false);

    if (accountDisabled) {
        return (
            <DashboardLayout>
                <div className="h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
                    <div className="h-24 w-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                        <AlertTriangle className="h-12 w-12 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Account Restricted</h2>
                    <p className="text-gray-400 mb-6 text-lg">
                        Our AI Proctor detected suspicious activity:
                        <span className="text-red-400 font-medium"> Rapid Bulk Submission Detected.</span>
                    </p>
                    <div className="p-4 bg-zinc-900 rounded-lg border border-red-500/20 text-sm text-gray-400">
                        Your session has been flagged for review by the Dean. Please contact administration to restore access.
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Welcome Card */}
                <div className="md:col-span-2 glass-card p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
                    <p className="text-gray-400 mb-8 max-w-md">You have 2 pending assignments and an upcoming proctored exam in Algorithms.</p>

                    <div className="flex gap-4">
                        <Link href="/dashboard/student/courses" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Play size={16} fill="currentColor" />
                            Resume Learning
                        </Link>
                        <button
                            // Simulating the "Complete Everything At Once" anti-cheat trigger
                            onClick={() => setAccountDisabled(true)}
                            className="px-6 py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors"
                        >
                            Simulate "Bulk Submit" (Test Anti-Cheat)
                        </button>
                    </div>
                </div>

                {/* Analytics Summary */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        AI Performance Analytics
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end text-sm">
                            <span className="text-gray-400">Engagement</span>
                            <span className="text-emerald-400 font-bold">High</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
                        </div>

                        <div className="flex justify-between items-end text-sm mt-2">
                            <span className="text-gray-400">Task Completion</span>
                            <span className="text-blue-400 font-bold">72%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full w-[72%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CourseCard
                    title="Advanced Data Structures"
                    instructor="Dr. Faculty"
                    progress={45}
                    nextLesson="Graph Theory: BFS & DFS"
                />
                <CourseCard
                    title="System Design"
                    instructor="Prof. Head"
                    progress={12}
                    nextLesson="Scalability Basics"
                />
                <CourseCard
                    title="AI Ethics"
                    instructor="Dean Admin"
                    progress={89}
                    nextLesson="Responsible AI"
                />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <MessageCircle size={20} className="text-primary" />
                        Classroom Chat (Section A)
                    </h3>
                    <div className="h-48 bg-black/20 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-sm border border-white/5">
                        [Encrypted Chat Channel for Section A Students Only]
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                        />
                        <button className="bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-700">Send</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function CourseCard({ title, instructor, progress, nextLesson }: { title: string, instructor: string, progress: number, nextLesson: string }) {
    // Creating a mock slug from the title for demonstration
    const courseSlug = title.toLowerCase().replace(/\s+/g, '-');

    return (
        <Link href={`/dashboard/student/courses/${courseSlug}`} className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-white/5 hover:border-primary/30 block">
            <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <BookOpen size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-gray-400">Active</span>
            </div>

            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-xs text-gray-400 mb-4">Instructor: {instructor}</p>

            <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-white">{progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 bg-zinc-900/50 p-3 rounded-lg">
                <Clock size={14} />
                <span>Next: {nextLesson}</span>
            </div>
        </Link>
    );
}
