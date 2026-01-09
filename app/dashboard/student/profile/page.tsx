"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { User, BookOpen, GraduationCap, Calendar, Hash, Building2, Mail, ShieldAlert } from "lucide-react";

export default function ProfilePage() {
    const studentData = {
        name: "Alex River",
        college: "Tech Institute of Advanced Studies",
        regNo: "2023-CS-042",
        semester: "6th Semester",
        year: "3rd Year",
        program: "Bachelor of Technology - Computer Science",
        overallCompletion: 75,
        email: "alex.river@student.tias.edu",
        courses: [
            { id: 1, name: "Advanced Algorithms", progress: 85, status: "In Progress" },
            { id: 2, name: "Web Development Bootcamp", progress: 100, status: "Completed" },
            { id: 3, name: "Introduction to Machine Learning", progress: 45, status: "In Progress" },
            { id: 4, name: "Database Management Systems", progress: 90, status: "Completed" },
            { id: 5, name: "Cloud Computing Fundamentals", progress: 20, status: "Started" }
        ]
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Student Profile</h1>
                    <p className="text-gray-400">View your academic information and course progress.</p>
                </div>

                {/* Main Profile Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Identity Card */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center space-y-4">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] mb-2">
                            {studentData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{studentData.name}</h2>
                            <span className="text-indigo-400 font-medium">{studentData.regNo}</span>
                        </div>
                        <div className="w-full pt-4 border-t border-white/5 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Mail size={16} className="text-gray-500" />
                                {studentData.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Building2 size={16} className="text-gray-500" />
                                {studentData.college}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Academic Details */}
                    <div className="md:col-span-2 glass-card p-8 rounded-2xl border border-white/5 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <GraduationCap className="text-primary" size={20} /> Academic Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoItem label="Program" value={studentData.program} icon={<BookOpen size={16} />} />
                                <InfoItem label="Current Semester" value={studentData.semester} icon={<Calendar size={16} />} />
                                <InfoItem label="Academic Year" value={studentData.year} icon={<Calendar size={16} />} />
                                <InfoItem label="Registration No." value={studentData.regNo} icon={<Hash size={16} />} />
                            </div>
                        </div>

                        {/* Overall Progress */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-gray-400 font-medium">Overall Course Completion</span>
                                <span className="text-xl font-bold text-primary">{studentData.overallCompletion}%</span>
                            </div>
                            <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${studentData.overallCompletion}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses List */}
                <div className="glass-card p-8 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <BookOpen className="text-green-500" size={20} /> Enrolled Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {studentData.courses.map((course) => (
                            <div key={course.id} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-semibold text-gray-200">{course.name}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${course.status === 'Completed' ? 'border-green-500/20 text-green-400 bg-green-500/10' :
                                            course.status === 'In Progress' ? 'border-indigo-500/20 text-indigo-400 bg-indigo-500/10' :
                                                'border-gray-500/20 text-gray-400 bg-gray-500/10'
                                        }`}>
                                        {course.status}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${course.status === 'Completed' ? 'bg-green-500' : 'bg-indigo-500'}`}
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Read Only Notice */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-4">
                    <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="text-sm font-bold text-amber-400 mb-1">Profile Locked</h4>
                        <p className="text-xs text-amber-200/70 leading-relaxed">
                            Your profile information is managed by the university administration.
                            Students cannot edit these details directly to ensure data integrity.
                            If you notice any discrepancies, please contact the <a href="#" className="underline hover:text-amber-300">admin office</a>.
                        </p>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

function InfoItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5">
            <div className="p-2 rounded bg-zinc-800 text-gray-400">
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
            </div>
        </div>
    );
}
