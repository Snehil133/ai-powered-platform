"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Video, Calendar, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function LiveClassesPage() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = React.useState<Date | null>(null);

    React.useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Format date string
    const timeString = currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";
    const dateString = currentTime ? formatDate(currentTime) : "---";

    return (
        <DashboardLayout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Live Classroom</h1>
                    <p className="text-gray-400">Join interactive sessions with faculty and peers.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-2xl font-bold text-white transition-all">{timeString}</p>
                    <p className="text-gray-500 text-sm">{dateString}</p>
                </div>
            </div>

            {/* Currently Live */}
            <div className="mb-10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-500">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    Happening Now
                </h2>
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/5 to-transparent relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div className="flex gap-4">
                            <div className="h-16 w-16 rounded-xl bg-zinc-800 flex items-center justify-center text-red-400">
                                <Video size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Advanced Algorithms: Live Coding</h3>
                                <p className="text-gray-400 text-lg">Dr. Faculty • Section A</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                    <span className="flex items-center gap-1"><Users size={16} /> 42 watching</span>
                                    <span className="flex items-center gap-1"><Clock size={16} /> Started 15m ago</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/student/live-classes/session')}
                            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20 w-full md:w-auto"
                        >
                            Join Class
                        </button>
                    </div>
                </div>
            </div>

            {/* Upcoming Schedule */}
            <h2 className="text-lg font-bold mb-4">Upcoming Schedule</h2>
            <div className="space-y-4">
                <ScheduleItem
                    time="02:00 PM"
                    title="System Design: Load Balancers"
                    instructor="Prof. Head"
                    duration="1 hr 30 min"
                    status="upcoming"
                />
                <ScheduleItem
                    time="04:30 PM"
                    title="AI Ethics Seminar"
                    instructor="Dean Admin"
                    duration="1 hr"
                    status="upcoming"
                />
                <ScheduleItem
                    time="09:00 AM (Tomorrow)"
                    title="Project Review"
                    instructor="Dr. Faculty"
                    duration="45 min"
                    status="future"
                />
            </div>

        </DashboardLayout>
    );
}

function ScheduleItem({ time, title, instructor, duration, status }: { time: string, title: string, instructor: string, duration: string, status: 'upcoming' | 'future' }) {
    return (
        <div className="glass-card p-4 rounded-xl flex items-center gap-6 hover:bg-white/5 transition-colors">
            <div className={`w-24 text-center ${status === 'upcoming' ? 'text-white' : 'text-gray-500'}`}>
                <p className="font-bold">{time.split(' ')[0]}</p>
                <p className="text-xs uppercase">{time.split(' ').slice(1).join(' ')}</p>
            </div>
            <div className="h-10 w-0.5 bg-zinc-800 hidden sm:block"></div>
            <div className="flex-1">
                <h4 className={`font-bold ${status === 'upcoming' ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
                <p className="text-sm text-gray-500">{instructor}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                <Clock size={14} /> {duration}
            </div>
            <button
                disabled={status === 'future'}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${status === 'upcoming'
                    ? 'bg-zinc-800 border-zinc-700 text-white hover:border-primary hover:text-primary'
                    : 'bg-transparent border-transparent text-zinc-600 cursor-not-allowed'
                    }`}
            >
                {status === 'upcoming' ? 'Notify Me' : 'Pending'}
            </button>
        </div>
    );
}
