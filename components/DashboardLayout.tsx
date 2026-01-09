"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { LayoutDashboard, LogOut, GraduationCap, Video, MessageSquare, CalendarCheck } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    if (isLoading) return <div className="h-screen w-screen flex items-center justify-center text-white">Loading...</div>;

    if (!user) {
        // In a real app we'd redirect, but client side render might flash
        return <div className="p-10 text-center"><Link href="/login" className="text-primary underline">Please Login</Link></div>;
    }

    const isActive = (path: string) => pathname === path;

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full glass z-10 bg-black/50">
                <div className="flex items-center gap-2 mb-10 text-white">
                    <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold">AI</div>
                    <span className="font-bold text-lg">Proctor</span>
                </div>

                <div className="mb-8">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu</div>
                    <nav className="space-y-2">
                        <Link
                            href={`/dashboard/${user.role}`}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive(`/dashboard/${user.role}`) ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'}`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        {user.role === 'student' && (
                            <>
                                <Link
                                    href="/dashboard/student/courses"
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/dashboard/student/courses') ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'}`}
                                >
                                    <GraduationCap size={18} />
                                    My Courses
                                </Link>
                                <Link
                                    href="/dashboard/student/live-classes"
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/dashboard/student/live-classes') ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'}`}
                                >
                                    <Video size={18} />
                                    Live Classes
                                </Link>
                                <Link
                                    href="/dashboard/student/attendance"
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/dashboard/student/attendance') ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'}`}
                                >
                                    <CalendarCheck size={18} />
                                    Attendance
                                </Link>
                                <Link
                                    href="/dashboard/student/chat"
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/dashboard/student/chat') ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'}`}
                                >
                                    <MessageSquare size={18} />
                                    Chat
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                {user.role === 'faculty' && (
                    <div className="mb-8">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Faculty Overview</div>
                        <div className="space-y-3">
                            <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Section Assigned:</span>
                                    <span className="text-white font-medium">A</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Total Students:</span>
                                    <span className="text-white font-medium">42</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400" title="Present in current section">Present Today:</span>
                                    <span className="text-emerald-400 font-medium">38</span>
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-400 mb-2">My Courses</div>
                                <div className="space-y-1">
                                    <div className="text-sm bg-zinc-900/30 px-2 py-1.5 rounded border border-white/5 text-gray-300 truncate">
                                        CS101: Intro to AI
                                    </div>
                                    <div className="text-sm bg-zinc-900/30 px-2 py-1.5 rounded border border-white/5 text-gray-300 truncate">
                                        CS205: Data Structures
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-auto">
                    <Link href={`/dashboard/${user.role}/profile`}>
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-900 border border-zinc-800 mb-4 cursor-pointer hover:bg-zinc-800 transition-colors group">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white group-hover:scale-105 transition-transform">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="pl-64 flex-1 min-h-screen noise-bg">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/20 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-lg font-medium text-white capitalize">
                        {user.role === 'faculty' ? `Welcome, ${user.name}` : `${user.role} Portal`}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Current Session: {new Date().toLocaleDateString()}</span>
                    </div>
                </header>
                <div className="p-8 text-white">
                    {children}
                </div>
            </main>
        </div>
    );
}
