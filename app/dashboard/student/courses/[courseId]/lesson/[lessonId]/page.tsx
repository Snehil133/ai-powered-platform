"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle, ChevronRight, Play, Pause, AlertCircle } from "lucide-react";

// Mock Data (Shared with Course Detail page ideally)
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

export default function LessonPage() {
    const router = useRouter();
    const params = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

    // Flatten all lessons to finding prev/next easy
    const allLessons = React.useMemo(() => {
        return COURSE_CONTENT.flatMap(module => module.lessons);
    }, []);

    // Find current lesson
    const currentLessonIndex = allLessons.findIndex(l =>
        l.title.toLowerCase().replace(/\s+/g, '-') === params.lessonId
    );

    const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
    const nextLesson = allLessons[currentLessonIndex + 1];
    const prevLesson = allLessons[currentLessonIndex - 1];

    const lessonTitle = currentLesson?.title || "Lesson Not Found";
    const courseTitle = "Advanced Data Structures"; // Mock title

    const handleNext = () => {
        if (nextLesson) {
            const nextSlug = nextLesson.title.toLowerCase().replace(/\s+/g, '-');
            router.push(`/dashboard/student/courses/${params.courseId}/lesson/${nextSlug}`);
        }
    };

    const handlePrev = () => {
        if (prevLesson) {
            const prevSlug = prevLesson.title.toLowerCase().replace(/\s+/g, '-');
            router.push(`/dashboard/student/courses/${params.courseId}/lesson/${prevSlug}`);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.push(`/dashboard/student/courses/${params.courseId}`)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} /> Back to Course
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm hidden md:inline">
                            {currentLessonIndex + 1} of {allLessons.length} Lessons
                        </span>

                        <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${prevLesson ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-transparent text-gray-600 cursor-not-allowed'}`}
                            onClick={handlePrev}
                            disabled={!prevLesson}
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>

                        <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${nextLesson ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-zinc-800 text-gray-500 cursor-not-allowed'}`}
                            onClick={handleNext}
                            disabled={!nextLesson}
                        >
                            Next Lesson <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Video Player Section */}
                <div className="glass-card p-1 rounded-2xl overflow-hidden mb-8 relative group">
                    {/* Custom Video Container */}
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                        {/* 
                 For creating a secure player as requested (no download):
                 1. Using standard video tag but with controlsList="nodownload" (Chrome/Edge/Firefox)
                 2. Disabling context menu (right click)
                 3. Overlaying a transparent div to capture simple clicks to prevent easy native saving
               */}
                        <video
                            className="w-full h-full object-cover"
                            poster="https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop"
                            controlsList="nodownload" // Prevents download button
                            onContextMenu={(e) => e.preventDefault()} // Disables Right Click
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setVideoEnded(true)}
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Sample Video
                        >
                            <track kind="captions" />
                        </video>

                        {/* Custom Play/Pause Overlay for better UX if needed, or just let native controls handle it but protected */}
                    </div>

                    <div className="p-4 flex items-center justify-between bg-zinc-900 border-t border-white/5">
                        <div className="flex flex-col">
                            <span className="text-xs text-primary font-bold mb-1">{courseTitle}</span>
                            <h1 className="text-xl font-bold">{lessonTitle}</h1>
                        </div>

                        {videoEnded && (
                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-300">
                                <CheckCircle size={16} /> Completed
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Tabs / Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-lg mb-4">Lesson Notes</h3>
                            <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                                <p>In computer science, a data structure is a data organization, management, and storage format that is usually chosen for efficient access to data.</p>
                                <ul className="list-disc pl-4 space-y-2 mt-4">
                                    <li>More precise control over memory usage</li>
                                    <li>Efficient data manipulation</li>
                                    <li>Essential for algorithm design</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">Resources</h3>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors group">
                                    <div className="h-8 w-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <FileIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">Lecture Slides.pdf</p>
                                        <p className="text-xs text-gray-500">2.4 MB</p>
                                    </div>
                                </a>
                            </div>

                            <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg border border-yellow-500/20 flex items-start gap-2">
                                <AlertCircle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-yellow-500/80">Downloads are watermark protected with your Student ID: <strong>STU-4921</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function FileIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
    )
}
