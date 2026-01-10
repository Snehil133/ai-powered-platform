"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { User, Mail, Phone, MapPin, BadgeCheck, Shield } from "lucide-react";

export default function HODProfilePage() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [hodData, setHodData] = React.useState({
        name: "Dr. Robert Smith",
        designation: "Head of Department",
        department: "Computer Science & Engineering",
        email: "hod.cse@university.edu",
        phone: "+1 123 456 7890",
        joinDate: "01/Aug/2015",
        specialization: "Artificial Intelligence, Machine Learning",
        location: "Block A, Room 301",
        image: null as string | null
    });

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHodData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Here you would typically make an API call to save the changes
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="relative mb-20">
                    <div className="h-48 w-full bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center"></div>
                    </div>
                    <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                        <div className="h-32 w-32 rounded-3xl bg-zinc-950 p-1">
                            <div className="h-full w-full rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                                {hodData.image ? (
                                    <img src={hodData.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={48} className="text-gray-400" />
                                )}
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <span className="text-xs text-white">Change Photo</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={hodData.name}
                                        onChange={(e) => setHodData({ ...hodData, name: e.target.value })}
                                        className="text-3xl font-bold text-white bg-zinc-900/50 border border-white/10 rounded px-2 w-full focus:outline-none focus:border-primary/50"
                                    />
                                    <input
                                        type="text"
                                        value={hodData.designation}
                                        onChange={(e) => setHodData({ ...hodData, designation: e.target.value })}
                                        className="text-blue-200 bg-zinc-900/50 border border-white/10 rounded px-2 w-full text-sm focus:outline-none focus:border-primary/50"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                        {hodData.name}
                                        <BadgeCheck className="text-blue-400" size={24} />
                                    </h1>
                                    <p className="text-blue-200">{hodData.designation}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                            <h3 className="font-semibold text-lg border-b border-white/5 pb-4">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-sm">
                                    <Mail className="text-gray-500 mt-0.5" size={16} />
                                    <div className="w-full">
                                        <p className="text-gray-400 text-xs">Email Address</p>
                                        <p className="text-white break-all">{hodData.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-sm">
                                    <Phone className="text-gray-500 mt-0.5" size={16} />
                                    <div className="w-full">
                                        <p className="text-gray-400 text-xs">Phone Number</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={hodData.phone}
                                                onChange={(e) => setHodData({ ...hodData, phone: e.target.value })}
                                                className="bg-black border border-white/10 rounded px-2 py-1 w-full text-white focus:outline-none focus:border-primary/50"
                                            />
                                        ) : (
                                            <p className="text-white">{hodData.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-sm">
                                    <MapPin className="text-gray-500 mt-0.5" size={16} />
                                    <div className="w-full">
                                        <p className="text-gray-400 text-xs">Office</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={hodData.location}
                                                onChange={(e) => setHodData({ ...hodData, location: e.target.value })}
                                                className="bg-black border border-white/10 rounded px-2 py-1 w-full text-white focus:outline-none focus:border-primary/50"
                                            />
                                        ) : (
                                            <p className="text-white">{hodData.location}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 bg-gradient-to-b from-blue-900/10 to-transparent">
                            <div className="flex items-center gap-3">
                                <Shield className="text-blue-400" size={24} />
                                <div>
                                    <h4 className="font-bold text-white">Department Admin</h4>
                                    <p className="text-xs text-gray-400">You have full access to department settings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* General Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card p-8 rounded-2xl border border-white/5">
                            <h3 className="font-semibold text-lg mb-6">Professional Details</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Department</label>
                                        <div className="p-3 bg-zinc-900/50 rounded-lg border border-white/5 text-white">
                                            {hodData.department}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Date Joined</label>
                                        <div className="p-3 bg-zinc-900/50 rounded-lg border border-white/5 text-white">
                                            {hodData.joinDate}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Specialization</label>
                                    <div className={`p-3 bg-zinc-900/50 rounded-lg border border-white/5 text-white ${isEditing ? 'p-0 border-none' : ''}`}>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={hodData.specialization}
                                                onChange={(e) => setHodData({ ...hodData, specialization: e.target.value })}
                                                className="w-full p-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-primary/50"
                                            />
                                        ) : (
                                            hodData.specialization
                                        )}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="font-medium mb-4">Account Settings</h4>
                                    <div className="flex gap-4">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    className="px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-colors text-sm"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                                >
                                                    Edit Profile
                                                </button>
                                                <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-sm">
                                                    Change Password
                                                </button>
                                            </>
                                        )}
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
