"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { LayoutDashboard, LogOut, GraduationCap, Video, MessageSquare, CalendarCheck, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (isLoading) return <div className="h-screen w-screen flex items-center justify-center text-white">Loading...</div>;

    if (!user) {
        // In a real app we'd redirect, but client side render might flash
        return <div className="p-10 text-center"><Link href="/login" className="text-primary underline">Please Login</Link></div>;
    }

    const isActive = (path: string) => pathname === path;

    return (
        <div className="min-h-screen bg-black flex">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-black/95 glass border-r border-white/10 p-6 flex flex-col 
                    transform transition-transform duration-200 ease-in-out 
                    md:translate-x-0 md:sticky md:top-0 md:h-screen
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex items-center justify-between mb-10 text-white">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold">AI</div>
                        <span className="font-bold text-lg">Proctor</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden p-1 text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-8 flex-1 overflow-y-auto">
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

                    {user.role === 'faculty' && (
                        <div className="mt-8">
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
                </div>

                <div className="mt-auto pt-4 border-t border-white/10">
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
            <main className="flex-1 min-h-screen noise-bg w-full">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-zinc-900/20 backdrop-blur-sm sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-lg font-medium text-white capitalize truncate">
                            {user.role === 'faculty' ? `Welcome, ${user.name}` : `${user.role} Portal`}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-sm text-gray-400">Current Session: {new Date().toLocaleDateString()}</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse sm:hidden" title="Online"></div>
                    </div>
                </header>
                <div className="p-4 md:p-8 text-white">
                    {children}
                </div>
            </main>
        </div>
    );
}

