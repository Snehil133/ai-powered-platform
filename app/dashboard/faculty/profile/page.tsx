"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { User, Mail, Phone, BookOpen, Briefcase, BadgeCheck, Shield, Camera, Edit2, Save } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

export default function FacultyProfile() {
    const { user } = useAuth();

    // Mock extended data since AuthContext is simple
    const [profileData, setProfileData] = useState({
        name: user?.name || "Dr. Faculty",
        designation: "Senior Professor",
        department: "Computer Science & Engineering",
        courses: ["CS101: Intro to AI", "CS205: Data Structures"],
        subjects: ["Artificial Intelligence", "Python Programming", "Algorithms"],
        phone: "+1 (555) 123-4567",
        email: "faculty.mem@college.edu", // Read only
        photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faculty", // Mock avatar
        joinDate: "August 2018"
    });

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [tempPhone, setTempPhone] = useState(profileData.phone);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSavePhone = () => {
        // Validate phone simple check
        if (tempPhone.length < 10) {
            setMessage({ type: 'error', text: "Please enter a valid phone number." });
            return;
        }

        setProfileData(prev => ({ ...prev, phone: tempPhone }));
        setIsEditingPhone(false);
        setMessage({ type: 'success', text: "Contact number updated successfully! This will be visible to students." });

        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                <p className="text-gray-400 mb-8">Manage your personal information and view assigned courses.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Photo & Brief */}
                    <div className="md:col-span-1">
                        <div className="glass-card p-6 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/20 to-purple-600/20"></div>

                            <div className="relative mt-8 mb-4 inline-block">
                                <div className="h-32 w-32 rounded-full border-4 border-black bg-zinc-800 overflow-hidden mx-auto shadow-2xl relative">
                                    <img
                                        src={profileData.photoUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                <div className="absolute bottom-1 right-1 bg-emerald-500 h-6 w-6 rounded-full border-4 border-black flex items-center justify-center" title="Active">
                                    <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-white mb-1">{profileData.name}</h2>
                            <p className="text-primary text-sm font-medium mb-1">{profileData.designation}</p>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">{profileData.department}</p>

                            <div className="mt-6 flex justify-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-gray-300 text-xs border border-white/5 flex items-center gap-1">
                                    <Briefcase size={12} /> Full Time
                                </span>
                            </div>
                        </div>

                        {/* Quick Stats or Status */}
                        <div className="glass-card mt-6 p-4 rounded-xl border border-white/10 space-y-3">
                            <div className="flex items-center justify-between text-sm p-2 hover:bg-white/5 rounded transition-colors">
                                <span className="text-gray-400">Status</span>
                                <span className="text-emerald-400 font-medium flex items-center gap-1">
                                    <BadgeCheck size={14} /> Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-2 hover:bg-white/5 rounded transition-colors">
                                <span className="text-gray-400">Joined</span>
                                <span className="text-white font-medium">{profileData.joinDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Personal Information */}
                        <div className="glass-card p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <User size={20} className="text-primary" />
                                Personal Information
                            </h3>

                            {message && (
                                <div className={`mb-6 p-3 rounded-lg text-sm border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Name Field */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/5">
                                    <label className="text-sm text-gray-400 font-medium self-center">Full Name</label>
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            disabled
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Department Field */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/5">
                                    <label className="text-sm text-gray-400 font-medium self-center">Department</label>
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            value={profileData.department}
                                            disabled
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Phone Field (Editable) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/5">
                                    <label className="text-sm text-gray-400 font-medium self-center">Contact Number</label>
                                    <div className="md:col-span-2">
                                        {isEditingPhone ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={tempPhone}
                                                    onChange={(e) => setTempPhone(e.target.value)}
                                                    className="w-full bg-zinc-900 border border-primary/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                                                    autoFocus
                                                />
                                                <button onClick={handleSavePhone} className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors" title="Save">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={() => { setIsEditingPhone(false); setTempPhone(profileData.phone); }} className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 p-2 rounded-lg transition-colors">
                                                    <XIcon />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center group bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5">
                                                <span className="text-white">{profileData.phone}</span>
                                                <button
                                                    onClick={() => setIsEditingPhone(true)}
                                                    className="text-gray-500 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Edit Phone Number"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">This number will be visible to students for academic queries.</p>
                                    </div>
                                </div>

                                {/* Email Field (Read-only) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="text-sm text-gray-400 font-medium self-center">Official Email</label>
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={profileData.email}
                                                disabled
                                                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed pr-10"
                                            />
                                            <Shield className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <Shield size={10} /> To update official email, please contact the administrator.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="glass-card p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <BookOpen size={20} className="text-blue-400" />
                                Academic Details
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm text-gray-400 font-medium mb-3 uppercase tracking-wider text-xs">Assigned Courses</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.courses.map((course, idx) => (
                                            <span key={idx} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm text-gray-400 font-medium mb-3 uppercase tracking-wider text-xs">Subjects Handling</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.subjects.map((subject, idx) => (
                                            <span key={idx} className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function XIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
