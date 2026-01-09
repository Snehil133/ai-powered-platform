"use client";

import { useAuth, UserRole } from "@/components/AuthContext";
import { Brain, Users, FileText, Terminal, ShieldCheck, Lock } from "lucide-react";

export default function LoginPage() {
    const { login, isLoading } = useAuth();

    const handleLogin = (role: UserRole) => {
        login(role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center noise-bg p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">AI Proctor Login</h1>
                    </div>
                    <p className="text-muted-foreground">Select your role to access the platform simulation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <LoginCard
                        role="student"
                        title="Student"
                        icon={<Users className="h-6 w-6 text-blue-400" />}
                        desc="Access courses, exams, and community."
                        onClick={() => handleLogin("student")}
                        loading={isLoading}
                    />
                    <LoginCard
                        role="faculty"
                        title="Faculty"
                        icon={<FileText className="h-6 w-6 text-emerald-400" />}
                        desc="Manage students, view reports, and analytics."
                        onClick={() => handleLogin("faculty")}
                        loading={isLoading}
                    />
                    <LoginCard
                        role="hod"
                        title="HOD"
                        icon={<Terminal className="h-6 w-6 text-purple-400" />}
                        desc="Department oversight and curriculum management."
                        onClick={() => handleLogin("hod")}
                        loading={isLoading}
                    />
                    <LoginCard
                        role="dean"
                        title="Dean"
                        icon={<ShieldCheck className="h-6 w-6 text-amber-400" />}
                        desc="Full platform administration and oversight."
                        onClick={() => handleLogin("dean")}
                        loading={isLoading}
                    />
                    <LoginCard
                        role="parent"
                        title="Parent"
                        icon={<Lock className="h-6 w-6 text-pink-400" />}
                        desc="View child's progress and attendance."
                        onClick={() => handleLogin("parent")}
                        loading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

function LoginCard({ role, title, icon, desc, onClick, loading }: { role: string, title: string, icon: React.ReactNode, desc: string, onClick: () => void, loading: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="glass-card p-8 rounded-2xl text-left hover:border-primary/50 transition-all hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-12 w-12 rounded-xl bg-zinc-900/50 flex items-center justify-center mb-4 border border-white/5">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 capitalize">{title}</h3>
            <p className="text-sm text-gray-400">{desc}</p>
        </button>
    );
}
