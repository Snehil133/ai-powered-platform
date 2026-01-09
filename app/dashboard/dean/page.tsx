"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ShieldAlert, Activity, Server, Users, Eye } from "lucide-react";

export default function DeanDashboard() {
    return (
        <DashboardLayout>
            <div className="mb-8 bg-gradient-to-r from-amber-500/10 to-transparent p-6 rounded-2xl border border-amber-500/20">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                        <ShieldAlert size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Administrator Control Center</h1>
                        <p className="text-amber-200/70 text-sm">Full system access granted. Monitoring all departments.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <AdminStatCard title="Active Users" value="2,450" change="+12%" positive />
                <AdminStatCard title="System Load" value="34%" change="-2%" positive />
                <AdminStatCard title="Flagged Activities" value="5" change="+5" positive={false} />
                <AdminStatCard title="Revenue (MTD)" value="$45k" change="+8%" positive />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Activity size={18} className="text-blue-400" />
                        Live System Activity
                    </h3>
                    <div className="space-y-4">
                        {/* Simulating live logs */}
                        <LogEntry time="10:42:15 AM" action="New Assignment Posted" user="Prof. Alan (HOD)" details="System Design - Module 3" />
                        <LogEntry time="10:41:03 AM" action="Security Alert" user="AI Proctor System" details="Suspicious movement detected in ID: student_452" alert />
                        <LogEntry time="10:38:55 AM" action="User Login" user="Dean Admin" details="IP: 192.168.1.12" />
                        <LogEntry time="10:35:20 AM" action="Report Generated" user="Dr. Faculty" details="Section B - Mid Term Performance" />
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold mb-6 text-white">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center gap-3">
                            <Users size={18} className="text-gray-400" />
                            <span>Manage User Roles</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center gap-3">
                            <Server size={18} className="text-gray-400" />
                            <span>Database Maintenance</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors flex items-center gap-3">
                            <ShieldAlert size={18} />
                            <span>Emergency Lockdown</span>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function AdminStatCard({ title, value, change, positive }: { title: string, value: string, change: string, positive: boolean }) {
    return (
        <div className="glass-card p-6 rounded-xl">
            <p className="text-gray-400 text-sm mb-2">{title}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold">{value}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {change}
                </span>
            </div>
        </div>
    );
}

function LogEntry({ time, action, user, details, alert }: { time: string, action: string, user: string, details: string, alert?: boolean }) {
    return (
        <div className={`p-3 rounded-lg border flex items-center justify-between text-sm ${alert ? 'bg-red-500/5 border-red-500/20' : 'bg-black/20 border-white/5'}`}>
            <div className="flex items-center gap-4">
                <span className="text-gray-500 font-mono text-xs">{time}</span>
                <div>
                    <p className={`font-medium ${alert ? 'text-red-400' : 'text-white'}`}>{action}</p>
                    <p className="text-gray-500 text-xs">{user}</p>
                </div>
            </div>
            <span className="text-gray-500 text-xs hidden sm:block max-w-[150px] truncate">{details}</span>
        </div>
    );
}
