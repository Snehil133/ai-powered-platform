"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, BookOpen, Settings, FileBarChart, Edit, Trash2 } from "lucide-react";

export default function HODDashboard() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Department Overview (CS)</h1>
                <p className="text-gray-400">Manage curriculum, faculty alignment, and overall department reports.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Students" value="120" icon={<Users className="text-blue-400" />} />
                <StatCard title="Total Faculty" value="8" icon={<Users className="text-purple-400" />} />
                <StatCard title="Avg Dept Score" value="76%" icon={<FileBarChart className="text-emerald-400" />} />
                <StatCard title="Active Courses" value="12" icon={<BookOpen className="text-amber-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Manage Faculty-Student Alignment */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Faculty - Student Mapping</h3>
                        <button className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full hover:bg-primary/30 transition-colors">
                            + New Assignment
                        </button>
                    </div>

                    <div className="space-y-4">
                        <MappingItem faculty="Dr. Faculty" section="Section A" studentCount={45} course="Data Structures" />
                        <MappingItem faculty="Prof. Alan" section="Section B" studentCount={42} course="Operating Systems" />
                        <MappingItem faculty="Dr. Sarah" section="Section C" studentCount={33} course="Database Management" />
                    </div>
                </div>

                {/* Course Curriculum Management */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Curriculum Management</h3>
                        <button className="text-xs bg-zinc-800 text-white px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex justify-between items-center group">
                            <div>
                                <h4 className="font-medium text-white">Data Structures & Algo</h4>
                                <p className="text-xs text-gray-500">Updated 2 days ago</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Edit size={16} /></button>
                                <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex justify-between items-center group">
                            <div>
                                <h4 className="font-medium text-white">System Design Patterns</h4>
                                <p className="text-xs text-gray-500">Updated 1 week ago</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Edit size={16} /></button>
                                <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="glass-card p-6 rounded-xl flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-400 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5">
                {icon}
            </div>
        </div>
    );
}

function MappingItem({ faculty, section, studentCount, course }: { faculty: string, section: string, studentCount: number, course: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-gray-400">
                    {faculty.charAt(0)}
                </div>
                <div>
                    <h4 className="font-medium text-white text-sm">{faculty}</h4>
                    <p className="text-xs text-gray-500">{course}</p>
                </div>
            </div>
            <div className="text-right">
                <span className="block text-sm font-medium text-white">{section}</span>
                <span className="block text-xs text-gray-500">{studentCount} Students</span>
            </div>
        </div>
    );
}
