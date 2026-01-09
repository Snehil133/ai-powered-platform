"use client";

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Mic, MicOff, Video, VideoOff, MessageSquare, Hand, PhoneOff, Users, MoreVertical, Send } from "lucide-react";
import { useRouter } from "next/navigation";

const STUDENT_NAME = "Alex River";

const PARTICIPANTS = [
    { id: 1, name: "Dr. Faculty", role: "host", isMuted: false, isHandRaised: false },
    { id: 2, name: STUDENT_NAME, role: "student", isMuted: true, isHandRaised: false },
    { id: 3, name: "John Doe", role: "student", isMuted: true, isHandRaised: false },
    { id: 4, name: "Sarah Connor", role: "student", isMuted: true, isHandRaised: true },
    { id: 5, name: "Michael Smith", role: "student", isMuted: true, isHandRaised: false },
    { id: 6, name: "Emily Watson", role: "student", isMuted: true, isHandRaised: false },
    { id: 7, name: "David Chen", role: "student", isMuted: true, isHandRaised: false },
];

export default function LiveSessionPage() {
    const router = useRouter();
    const [micOn, setMicOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const [isHandRaised, setIsHandRaised] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
    const [chatRecipient, setChatRecipient] = useState("everyone");
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [showClassDetails, setShowClassDetails] = useState(false);
    const [layoutMode, setLayoutMode] = useState<'focused' | 'grid'>('focused');

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Initialize Media
    useEffect(() => {
        let stream: MediaStream;

        const initMedia = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setLocalStream(stream);

                // Initial state sync
                stream.getAudioTracks().forEach(track => track.enabled = micOn);
                stream.getVideoTracks().forEach(track => track.enabled = cameraOn);

            } catch (err) {
                console.error("Error accessing media devices", err);
            }
        };

        if (!localStream) {
            initMedia();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Sync Toggle States with Tracks
    useEffect(() => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => track.enabled = micOn);
            localStream.getVideoTracks().forEach(track => track.enabled = cameraOn);
        }
    }, [micOn, cameraOn, localStream]);

    // Attach Stream to Video Element (Handle Layout Changes)
    useEffect(() => {
        if (videoRef.current && localStream) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream, layoutMode, cameraOn]); // Re-run when view might change

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) setIsParticipantsOpen(false);
    };

    const toggleParticipants = () => {
        setIsParticipantsOpen(!isParticipantsOpen);
        if (!isParticipantsOpen) setIsChatOpen(false);
    }

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setShowMoreOptions(false);
    };

    const handleClassDetails = () => {
        setShowClassDetails(true);
        setShowMoreOptions(false);
    };

    const toggleLayout = () => {
        setLayoutMode(prev => prev === 'focused' ? 'grid' : 'focused');
        setShowMoreOptions(false);
    };

    const handleLeave = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        router.push('/dashboard/student/live-classes');
    };

    return (
        <DashboardLayout>
            <>
                {/* Class Details Modal Overlay */}
                {showClassDetails && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={() => setShowClassDetails(false)}>
                        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl w-96 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setShowClassDetails(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                                <span className="text-xl">×</span>
                            </button>
                            <h2 className="text-xl font-bold mb-1">Advanced Algorithms</h2>
                            <p className="text-sm text-primary font-medium mb-4">Live Coding Session</p>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                    <span className="text-gray-400">Instructor</span>
                                    <span className="text-white">Dr. Faculty</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                    <span className="text-gray-400">Section</span>
                                    <span className="text-white">A - Computer Science</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                    <span className="text-gray-400">Duration</span>
                                    <span className="text-white">10:45 AM - 12:15 PM</span>
                                </div>
                                <div className="flex justify-between text-sm py-2">
                                    <span className="text-gray-400">Topic</span>
                                    <span className="text-white text-right max-w-[60%]">Dynamic Programming & Graph Theory</span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 rounded-lg text-sm font-medium transition-colors">Copy Link</button>
                                <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-sm font-medium transition-colors">Resources</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`flex h-[calc(100vh-8rem)] gap-4 relative transition-all duration-300 ${showClassDetails ? 'blur-md scale-[0.98] opacity-50 pointer-events-none' : ''}`}>
                    {/* Main Stage */}
                    <div className="flex-1 flex flex-col gap-4 relative">
                        {/* Main Video Feed Area */}
                        <div className="flex-1 rounded-2xl bg-black relative overflow-hidden glass-card border flex items-center justify-center group">

                            {layoutMode === 'focused' ? (
                                <>
                                    <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-2 z-10">
                                        <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div> LIVE
                                    </div>

                                    {/* Faculty Video */}
                                    <img
                                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1587&auto=format&fit=crop"
                                        alt="Dr. Faculty"
                                        className="w-full h-full object-cover opacity-80"
                                    />

                                    {/* Hand Raise Notification */}
                                    {isHandRaised && (
                                        <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-4 py-2 rounded-full font-bold text-sm animate-bounce flex items-center gap-2 z-20 shadow-lg shadow-yellow-500/20">
                                            <Hand size={16} /> You raised your hand
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4 z-10">
                                        <span className="bg-black/60 px-3 py-1.5 rounded-lg text-white font-medium text-sm backdrop-blur-md">Dr. Faculty (Instructor)</span>
                                    </div>

                                    {/* Self View (Picture-in-Picture) */}
                                    <div className="absolute bottom-4 right-4 w-48 h-32 bg-zinc-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl z-20">
                                        {cameraOn ? (
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full h-full object-cover transform scale-x-[-1]"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-zinc-800">
                                                <div className="h-12 w-12 rounded-full bg-zinc-700 flex items-center justify-center text-xl font-bold text-gray-400">{STUDENT_NAME.split(' ').map(n => n[0]).join('')}</div>
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 left-2 flex gap-1">
                                            {!micOn && <div className="bg-red-500/80 p-1 rounded text-white"><MicOff size={10} /></div>}
                                            {isHandRaised && <div className="bg-yellow-500/80 p-1 rounded text-black"><Hand size={10} /></div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Grid Layout */
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full h-full overflow-y-auto">
                                    <div className="relative bg-zinc-800 rounded-xl overflow-hidden border border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                                        <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1587&auto=format&fit=crop" className="w-full h-full object-cover" />
                                        <div className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">Dr. Faculty</div>
                                        <div className="absolute top-2 left-2 bg-red-500 h-2 w-2 rounded-full"></div>
                                    </div>
                                    <div className="relative bg-zinc-800 rounded-xl overflow-hidden border border-white/10">
                                        {cameraOn ? (
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full h-full object-cover transform scale-x-[-1]"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <div className="h-12 w-12 rounded-full bg-zinc-700 flex items-center justify-center text-xl font-bold text-gray-400">{STUDENT_NAME.split(' ').map(n => n[0]).join('')}</div>
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">{STUDENT_NAME} (You)</div>
                                        <div className="absolute bottom-2 right-2 flex gap-1">
                                            {!micOn && <div className="bg-red-500/80 p-1 rounded text-white"><MicOff size={10} /></div>}
                                            {isHandRaised && <div className="bg-yellow-500/80 p-1 rounded text-black"><Hand size={10} /></div>}
                                        </div>
                                    </div>
                                    {PARTICIPANTS.slice(2, 8).map(p => (
                                        <div key={p.id} className="relative bg-zinc-800 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                                            <div className="h-16 w-16 rounded-full bg-zinc-700 flex items-center justify-center text-xl font-bold text-gray-500">
                                                {p.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">{p.name}</div>
                                            <div className="absolute bottom-2 right-2 bg-red-500/80 p-1 rounded text-white"><MicOff size={10} /></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="h-20 glass-card rounded-2xl flex items-center justify-center gap-4 px-8 relative z-30">
                            <button onClick={() => setMicOn(!micOn)} className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                            </button>
                            <button onClick={() => setCameraOn(!cameraOn)} className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${cameraOn ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                                {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                            </button>
                            <button onClick={() => setIsHandRaised(!isHandRaised)} className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${isHandRaised ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                                <Hand size={20} />
                            </button>
                            <button onClick={toggleChat} className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${isChatOpen ? 'bg-primary text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                                <MessageSquare size={20} />
                            </button>
                            <button onClick={handleLeave} className="h-12 w-20 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors mx-4 shadow-lg shadow-red-600/20">
                                <PhoneOff size={24} />
                            </button>
                            <button onClick={toggleParticipants} className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${isParticipantsOpen ? 'bg-primary text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                                <Users size={20} />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                                    className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${showMoreOptions ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                                >
                                    <MoreVertical size={20} />
                                </button>

                                {showMoreOptions && (
                                    <div className="absolute bottom-16 right-0 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden py-1 transform origin-bottom-right animate-in fade-in zoom-in-95 duration-200 z-50">
                                        <button
                                            onClick={toggleLayout}
                                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            {layoutMode === 'focused' ? 'Grid Layout' : 'Focus Layout'}
                                        </button>
                                        <button
                                            onClick={toggleFullScreen}
                                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            Full Screen
                                        </button>
                                        <button
                                            onClick={handleClassDetails}
                                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 text-sm text-gray-300 hover:text-white transition-colors border-t border-zinc-800"
                                        >
                                            Class Details
                                        </button>
                                        <div className="px-4 py-2 text-xs text-gray-500 bg-black/20">
                                            Version 1.2.0 • 45ms Latency
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Side Panel (Chat / Participants) */}
                    {(isChatOpen || isParticipantsOpen) && (
                        <div className="w-80 rounded-2xl glass-card flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 border-l border-white/5 bg-black/40 backdrop-blur-xl">
                            {isChatOpen ? (
                                <>
                                    <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-white/5">
                                        <h3 className="font-bold text-sm">Class Chat</h3>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><Users size={12} /> {PARTICIPANTS.length}</span>
                                    </div>

                                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                        <ChatMessage sender="John Doe" message="Will the array size be dynamic?" time="10:48 AM" />
                                        <ChatMessage sender="Dr. Faculty" message="Yes, effectively, but in implementation we handle resizing manually." time="10:49 AM" isFaculty />
                                        <ChatMessage sender="Sarah Connor" message="Got it, thanks!" time="10:50 AM" />
                                        <ChatMessage sender="You" message="What about memory complexity?" time="10:50 AM" isMe />
                                        {chatRecipient === 'faculty' && (
                                            <div className="text-center my-4">
                                                <span className="text-[10px] bg-zinc-800 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest font-bold">Private with Faculty</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 border-t border-white/10 bg-white/5 space-y-3">
                                        <div className="flex items-center gap-2 px-2">
                                            <span className="text-xs text-gray-500">To:</span>
                                            <select
                                                className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer hover:text-primary transition-colors"
                                                value={chatRecipient}
                                                onChange={(e) => setChatRecipient(e.target.value)}
                                            >
                                                <option value="everyone" className="bg-zinc-900 text-white">Everyone</option>
                                                <option value="faculty" className="bg-zinc-900 text-white">Direct to Faculty</option>
                                            </select>
                                        </div>
                                        <div className="relative">
                                            <input type="text" placeholder={`Message ${chatRecipient === 'faculty' ? 'Instructor' : 'Everyone'}...`} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-primary transition-colors" />
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors">
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-white/5">
                                        <h3 className="font-bold text-sm">Participants ({PARTICIPANTS.length})</h3>
                                        <button onClick={() => setIsParticipantsOpen(false)} className="text-gray-400 hover:text-white">
                                            <Users size={16} />
                                        </button>
                                    </div>
                                    <div className="flex-1 p-2 overflow-y-auto">
                                        {PARTICIPANTS.map((user) => (
                                            <div key={user.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg group transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${user.role === 'host' ? 'bg-red-500/20 text-red-500' : 'bg-zinc-800 text-gray-300'}`}>
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm font-medium ${user.role === 'host' ? 'text-red-400' : 'text-gray-200'} ${user.name === STUDENT_NAME ? 'font-bold' : ''}`}>
                                                            {user.name} {user.name === STUDENT_NAME && '(Me)'}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500 capitalize">{user.role}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    {user.isHandRaised && <Hand size={14} className="text-yellow-500" />}
                                                    {user.isMuted ? <MicOff size={14} /> : <Mic size={14} className="text-green-500" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Invite Button */}
                                    <div className="p-4 border-t border-white/10 bg-white/5">
                                        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                            Invite Others
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </>
        </DashboardLayout>
    );
}

function ChatMessage({ sender, message, time, isMe, isFaculty }: { sender: string, message: string, time: string, isMe?: boolean, isFaculty?: boolean }) {
    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-xs font-bold ${isFaculty ? 'text-emerald-400' : 'text-gray-300'}`}>{sender}</span>
                <span className="text-[10px] text-gray-600">{time}</span>
            </div>
            <div className={`px-3 py-2 rounded-lg text-sm max-w-[90%] ${isMe ? 'bg-primary text-white rounded-tr-none' : isFaculty ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20' : 'bg-zinc-800 text-gray-300 rounded-tl-none'}`}>
                {message}
            </div>
        </div>
    )
}
