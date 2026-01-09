"use client";

import Link from "next/link";
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Clock, Star, Download, ChevronRight } from "lucide-react";

export default function CoursesPage() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Learning Path</h1>
                <p className="text-gray-400">Track progress, access materials, and continue your education.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Courses */}
                <div className="space-y-6">
                    <h2 className="font-bold text-xl flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        In Progress
                    </h2>
                    <DetailedCourseCard
                        title="Advanced Data Structures"
                        instructor="Dr. Faculty"
                        progress={45}
                        totalLessons={24}
                        completedLessons={11}
                        nextLesson="Graph Theory: BFS & DFS"
                        thumbnailColor="bg-blue-500"
                    />
                    <DetailedCourseCard
                        title="System Design"
                        instructor="Prof. Head"
                        progress={12}
                        totalLessons={18}
                        completedLessons={2}
                        nextLesson="Scalability Basics"
                        thumbnailColor="bg-purple-500"
                    />
                </div>

                {/* Completed / Up Next */}
                <div className="space-y-6">
                    <h2 className="font-bold text-xl text-gray-400">Past & Upcoming</h2>

                    <div className="glass-card p-6 rounded-2xl border border-white/5 opacity-70 hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">Introduction to Python</h3>
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold">Completed</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Mastered the basics of Python syntax, loops, and functions.</p>
                        <div className="flex items-center gap-4 text-xs">
                            <Link
                                href="/certificate?course=Introduction to Python&student=Alex River"
                                target="_blank"
                                className="flex items-center gap-1 text-gray-300 hover:text-white hover:underline transition-all"
                            >
                                <Download size={14} /> Certificate
                            </Link>
                            <span className="text-yellow-500 flex items-center gap-1"><Star size={12} fill="currentColor" /> 4.8/5</span>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-dashed border-white/10 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-gray-400">Machine Learning Basics</h3>
                            <span className="bg-zinc-800 text-gray-500 px-2 py-1 rounded text-xs font-bold">Locked</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Prerequisite: Complete "Advanced Data Structures" to unlock.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function DetailedCourseCard({ title, instructor, progress, totalLessons, completedLessons, nextLesson, thumbnailColor }: { title: string, instructor: string, progress: number, totalLessons: number, completedLessons: number, nextLesson: string, thumbnailColor: string }) {
    const courseSlug = title.toLowerCase().replace(/\s+/g, '-');
    return (
        <Link href={`/dashboard/student/courses/${courseSlug}`} className="glass-card p-0 rounded-2xl overflow-hidden group block">
            <div className="h-32 bg-zinc-900 relative">
                <div className={`absolute inset-0 ${thumbnailColor}/20`}></div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-medium text-white border border-white/10">Semester 2</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-gray-400 mb-4">Instructor: {instructor}</p>

                <div className="mb-6">
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-300">{completedLessons} / {totalLessons} Lessons</span>
                        <span className="font-bold text-primary">{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full">
                        <div className={`h-2 rounded-full ${thumbnailColor}`} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock size={16} />
                            <span className="truncate max-w-[180px]">Next: {nextLesson}</span>
                        </div>
                        <p className="text-[10px] text-amber-500/80">Complete previous content to unlock next section.</p>
                    </div>

                    <button className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
