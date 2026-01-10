"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Edit, Save, Mail, Phone, MapPin, Briefcase, FileText, Camera } from "lucide-react";

export default function DeanProfilePage() {
    // Profile State
    const [deanProfile, setDeanProfile] = useState({
        name: "Dr. Robert Ford",
        qualification: "Ph.D. in Artificial Intelligence",
        email: "robert.ford@uni.edu",
        phone: "+1 (555) 000-1111",
        office: "Admin Block, A-101",
        bio: "Dedicated academic leader with over 20 years of experience in higher education administration and research.",
        joiningDate: "2015-08-15",
        profileImage: null as string | null
    });
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDeanProfile(prev => ({ ...prev, profileImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditingProfile(false);
        // In a real app, this would send an API request
        alert("Profile updated successfully!");
    };

    return (
        <DashboardLayout>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden mt-8">
                    <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center text-4xl font-bold text-white shadow-2xl overflow-hidden">
                                    {deanProfile.profileImage ? (
                                        <img src={deanProfile.profileImage} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        deanProfile.name.substring(0, 2).toUpperCase()
                                    )}
                                </div>
                                {isEditingProfile && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" size={24} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            {!isEditingProfile && (
                                <button
                                    onClick={() => setIsEditingProfile(true)}
                                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
                                >
                                    <Edit size={16} /> Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="pt-20 px-8 pb-8">
                        <form onSubmit={handleSaveProfile}>
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    {isEditingProfile ? (
                                        <input
                                            type="text"
                                            value={deanProfile.name}
                                            onChange={(e) => setDeanProfile({ ...deanProfile, name: e.target.value })}
                                            className="text-3xl font-bold bg-zinc-900/50 border border-zinc-700 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-primary w-full md:w-96"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-bold">{deanProfile.name}</h1>
                                    )}
                                    <p className="text-primary font-medium mt-1">Dean of Academics</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm text-gray-400">Employee ID</p>
                                    <p className="font-mono text-white text-lg">DEAN_001</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold border-b border-zinc-800 pb-2 mb-4">Contact Information</h3>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400">
                                            <Mail size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 uppercase">Email Address</label>
                                            {isEditingProfile ? (
                                                <input
                                                    type="email"
                                                    value={deanProfile.email}
                                                    onChange={(e) => setDeanProfile({ ...deanProfile, email: e.target.value })}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-sm"
                                                />
                                            ) : (
                                                <p className="text-white">{deanProfile.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400">
                                            <Phone size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 uppercase">Phone Number</label>
                                            {isEditingProfile ? (
                                                <input
                                                    type="text"
                                                    value={deanProfile.phone}
                                                    onChange={(e) => setDeanProfile({ ...deanProfile, phone: e.target.value })}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-sm"
                                                />
                                            ) : (
                                                <p className="text-white">{deanProfile.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400">
                                            <MapPin size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 uppercase">Office Location</label>
                                            {isEditingProfile ? (
                                                <input
                                                    type="text"
                                                    value={deanProfile.office}
                                                    onChange={(e) => setDeanProfile({ ...deanProfile, office: e.target.value })}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-sm"
                                                />
                                            ) : (
                                                <p className="text-white">{deanProfile.office}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold border-b border-zinc-800 pb-2 mb-4">Academic Details</h3>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400">
                                            <Briefcase size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 uppercase">Qualification</label>
                                            {isEditingProfile ? (
                                                <input
                                                    type="text"
                                                    value={deanProfile.qualification}
                                                    onChange={(e) => setDeanProfile({ ...deanProfile, qualification: e.target.value })}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-sm"
                                                />
                                            ) : (
                                                <p className="text-white">{deanProfile.qualification}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400 shrink-0">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 uppercase">Bio</label>
                                            {isEditingProfile ? (
                                                <textarea
                                                    value={deanProfile.bio}
                                                    onChange={(e) => setDeanProfile({ ...deanProfile, bio: e.target.value })}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white text-sm h-24 resize-none"
                                                />
                                            ) : (
                                                <p className="text-gray-300 text-sm leading-relaxed">{deanProfile.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isEditingProfile && (
                                <div className="mt-8 pt-8 border-t border-zinc-800 flex justify-end gap-4 animate-in fade-in slide-in-from-bottom-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingProfile(false)}
                                        className="px-6 py-2 rounded-lg border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/20"
                                    >
                                        <Save size={18} /> Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
