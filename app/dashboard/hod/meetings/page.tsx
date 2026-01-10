"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar as CalendarIcon, Clock, Users, Plus, Check } from "lucide-react";

export default function MeetingPage() {
    const [meetings, setMeetings] = useState([
        { id: 1, title: "Department Monthly Review", date: "2024-03-15", time: "10:00 AM", attendees: "All Faculty", type: "General" },
        { id: 2, title: "Curriculum Optimization", date: "2024-03-18", time: "02:00 PM", attendees: "Senior Professors", type: "Academic" }
    ]);

    // Simple form state
    const [showModal, setShowModal] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Meeting Scheduler</h1>
                    <p className="text-gray-400">Manage and schedule department meetings</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                    <Plus size={18} />
                    Schedule Meeting
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Meetings List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Upcoming Meetings</h2>
                    {meetings.map(meeting => (
                        <div key={meeting.id} className="glass-card p-5 rounded-xl border border-white/5 hover:bg-zinc-900/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-xl bg-zinc-800 flex flex-col items-center justify-center text-center border border-white/5">
                                    <span className="text-xs text-red-400 font-bold uppercase">{new Date(meeting.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-lg font-bold text-white">{new Date(meeting.date).getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{meeting.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {meeting.time}</span>
                                        <span className="flex items-center gap-1"><Users size={14} /> {meeting.attendees}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-4 py-2 rounded-lg bg-zinc-800 text-gray-300 hover:text-white text-sm hover:bg-zinc-700 transition-colors">
                                View Details
                            </button>
                        </div>
                    ))}

                    {meetings.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-zinc-900/30 rounded-xl border border-dashed border-white/10">
                            No upcoming meetings
                        </div>
                    )}
                </div>

                {/* Quick Schedule / Calendar Placeholder */}
                <div className="glass-card p-6 rounded-xl border border-white/5 h-fit">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <CalendarIcon size={18} className="text-primary" />
                        Calendar
                    </h3>
                    <div className="w-full bg-zinc-900/50 rounded-lg p-4 text-center border border-white/5 min-h-[300px] flex items-center justify-center text-gray-500">
                        {/* Calendar Component Placeholder */}
                        Calendar Widget Placeholder
                    </div>
                </div>
            </div>

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-6">Schedule New Meeting</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Meeting Title</label>
                                <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" placeholder="e.g. Staff Meeting" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Date</label>
                                    <input type="date" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Time</label>
                                    <input type="time" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Attendees</label>
                                <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none text-white">
                                    <option>All Faculty</option>
                                    <option>Senior Professors Only</option>
                                    <option>Department Staff</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none h-24 resize-none" placeholder="Agenda items..."></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle submit logic
                                    setShowModal(false);
                                }}
                                className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
