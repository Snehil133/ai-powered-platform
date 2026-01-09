"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams } from "next/navigation";
import { PlayCircle, CheckCircle, Lock, FileText, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data for a single course structure
const COURSE_CONTENT = [
    {
        id: 1,
        title: "Module 1: Introduction to Data Structures",
        lessons: [
            { id: 101, title: "What are Data Structures?", type: "video", duration: "10m", status: "completed" },
            { id: 102, title: "Big O Notation Explained", type: "video", duration: "25m", status: "completed" },
            { id: 103, title: "Quiz: Complexity Analysis", type: "quiz", duration: "10m", status: "completed" }
        ]
    },
    {
        id: 2,
        title: "Module 2: Arrays & Linked Lists",
        lessons: [
            { id: 201, title: "Memory Management in Arrays", type: "video", duration: "15m", status: "completed" },
            { id: 202, title: "Implementing Dynamic Arrays", type: "coding", duration: "45m", status: "in-progress" },
            { id: 203, title: "Singly Linked Lists", type: "video", duration: "20m", status: "locked" },
            { id: 204, title: "Doubly Linked Lists", type: "video", duration: "25m", status: "locked" },
            { id: 205, title: "Project: Browser History", type: "project", duration: "2h", status: "locked" }
        ]
    },
    {
        id: 3,
        title: "Module 3: Stacks & Queues",
        lessons: [
            { id: 301, title: "Stack Implementation", type: "code", duration: "30m", status: "locked" },
            { id: 302, title: "Queue Variations", type: "video", duration: "20m", status: "locked" }
        ]
    }
];

export default function CourseDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId;

    // Ideally fetch course details by ID here
    const courseTitle = courseId === "advanced-data-structures" ? "Advanced Data Structures" : "Course Details";

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <button onClick={() => router.push('/dashboard/student/courses')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                    <ChevronLeft size={16} /> Back to Courses
                </button>

                <div className="glass-card p-8 rounded-3xl mb-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">Semester 2</span>
                        <h1 className="text-4xl font-bold mb-4">{courseTitle}</h1>
                        <div className="flex items-center gap-6 text-sm text-gray-300">
                            <span className="flex items-center gap-2"><Clock size={16} /> 45 Hours Total</span>
                            <span className="flex items-center gap-2"><FileText size={16} /> 24 Lessons</span>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-300">Overall Progress</span>
                                <span className="text-white font-bold">45%</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {COURSE_CONTENT.map((module, moduleIndex) => (
                        <div key={module.id} className="glass-card rounded-2xl overflow-hidden border border-white/5">
                            <div className="bg-white/5 px-6 py-4 border-b border-white/5">
                                <h3 className="font-bold text-lg text-white">{module.title}</h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {module.lessons.map((lesson, index) => (
                                    <LessonItem key={lesson.id} lesson={lesson} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

function LessonItem({ lesson }: { lesson: any }) {
    const isLocked = lesson.status === "locked";
    const isCompleted = lesson.status === "completed";
    const isActive = lesson.status === "in-progress";
    const params = useParams();

    const Content = (
        <div className={`p-6 flex items-start gap-4 transition-colors ${isActive ? 'bg-primary/5' : 'hover:bg-white/5'} ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 
                ${isCompleted ? 'bg-emerald-500 text-white' :
                    isActive ? 'bg-primary text-white' : 'bg-zinc-800 text-gray-500'}`}>
                {isCompleted ? <CheckCircle size={16} /> :
                    isLocked ? <Lock size={16} /> :
                        <PlayCircle size={16} />}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className={`font-medium text-base ${isLocked ? 'text-gray-500' : 'text-white'}`}>{lesson.title}</h4>
                    <span className="text-xs text-gray-500 flex items-center gap-1 bg-black/20 px-2 py-1 rounded">
                        <Clock size={12} /> {lesson.duration}
                    </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 capitalize">{lesson.type}</span>
                    <span className="text-zinc-700">•</span>
                    <span className={`text-xs font-medium ${isCompleted ? 'text-emerald-400' :
                        isActive ? 'text-primary' : 'text-gray-500'
                        }`}>
                        {isCompleted ? 'Completed' : isActive ? 'Resume' : 'Locked'}
                    </span>
                </div>

                {/* The specific instruction requested by the user */}
                {isLocked && (
                    <p className="text-[11px] text-amber-500/70 mt-2 flex items-center gap-1.5">
                        <Lock size={10} />
                        Complete previous content to unlock.
                    </p>
                )}
            </div>
        </div>
    );

    if (isLocked) {
        return <div>{Content}</div>;
    }

    // Creating a slug for the lesson title/ID
    const lessonSlug = lesson.title.toLowerCase().replace(/\s+/g, '-');
    return (
        <Link href={`/dashboard/student/courses/${params.courseId}/lesson/${lessonSlug}`}>
            {Content}
        </Link>
    );
}
