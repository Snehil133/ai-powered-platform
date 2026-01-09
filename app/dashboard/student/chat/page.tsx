"use client";

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, MoreVertical, Phone, Video, Image, Smile, Paperclip, Send, MicOff, PhoneOff, VideoOff } from "lucide-react";

// Types
type Message = {
    id: number;
    sender: string;
    content: string;
    time: string;
    avatar: string;
    role?: 'faculty' | 'student';
    isMe?: boolean;
};

type ChatData = {
    [key: string]: Message[];
};

// Mock Data
const INITIAL_MESSAGES: ChatData = {
    "Section A - Official": [
        { id: 1, sender: "Dr. Faculty", content: "Good morning everyone. Please note that the midterm syllabus has been updated.", time: "10:30 AM", avatar: "F", role: "faculty" },
        { id: 2, sender: "Sarah Connor", content: "Is Graph Theory still included?", time: "10:32 AM", avatar: "S", role: "student" },
        { id: 3, sender: "You", content: "Yes, check the announcement PDF.", time: "10:33 AM", avatar: "A", isMe: true, role: "student" },
    ],
    "Project Group 4": [
        { id: 1, sender: "You", content: "I'll handle the frontend components.", time: "Yesterday", avatar: "A", isMe: true },
        { id: 2, sender: "John Doe", content: "Great! I'll start on the API content.", time: "Yesterday", avatar: "J" },
        { id: 3, sender: "Jane Smith", content: "I'll set up the database schema.", time: "Yesterday", avatar: "J" },
    ],
    "Sarah Connor": [
        { id: 1, sender: "Sarah Connor", content: "Hey, did you finish the quiz?", time: "5m ago", avatar: "S" },
        { id: 2, sender: "You", content: "Yeah, it was tricky!", time: "Recently", avatar: "A", isMe: true },
    ],
    "John Doe": [
        { id: 1, sender: "John Doe", content: "Can you help me with this bug?", time: "1h ago", avatar: "J" },
    ],
    "Jane Smith": [
        { id: 1, sender: "Jane Smith", content: "Thanks for sharing the notes!", time: "Yesterday", avatar: "J" },
    ]
};

const CHANNELS = [
    { name: "Section A - Official", lastMessage: "Dr. Faculty: Remember to submit assignments..." },
    { name: "Project Group 4", lastMessage: "You: I'll handle the frontend." },
];

const DMS = [
    { name: "Sarah Connor", lastMessage: "Hey, did you finish the quiz?", online: true },
    { name: "John Doe", lastMessage: "Can you help me with this bug?", online: true },
    { name: "Jane Smith", lastMessage: "Thanks!", online: false },
];

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState("Section A - Official");
    const [messages, setMessages] = useState<ChatData>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeChat]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: "You",
            content: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: "A",
            isMe: true,
            role: "student"
        };

        setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newMessage]
        }));

        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Filter Logic
    const filteredChannels = CHANNELS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredDms = DMS.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle');
    const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCall = async (type: 'audio' | 'video') => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: type === 'video'
            });
            setLocalStream(stream);
            setCallType(type);
            setCallStatus('calling');
        } catch (err) {
            console.error("Error accessing media devices:", err);
            alert("Could not access microphone/camera. Please check permissions.");
        }
    };

    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setLocalStream(null);
        setCallStatus('idle');
        setCallType(null);
    };

    useEffect(() => {
        if (videoRef.current && localStream) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream, callStatus]);

    return (
        <DashboardLayout>
            {/* Call Overlay */}
            {callStatus !== 'idle' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-[400px] flex flex-col items-center shadow-2xl relative">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                            {activeChat.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">{activeChat}</h2>
                        <p className="text-sm text-indigo-400 animate-pulse mb-6">
                            {callStatus === 'calling' ? 'Calling...' : 'Connected'}
                        </p>

                        {/* Video Preview */}
                        {callType === 'video' && (
                            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-6 border border-zinc-700 relative group">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                                <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">You</div>
                            </div>
                        )}

                        <div className="flex items-center gap-6">
                            <button className="h-12 w-12 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                <MicOff size={20} />
                            </button>
                            <button
                                onClick={endCall}
                                className="h-14 w-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 transform hover:scale-110 duration-200"
                            >
                                <PhoneOff size={24} />
                            </button>
                            {callType === 'video' && (
                                <button className="h-12 w-12 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                    <VideoOff size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className={`h-[calc(100vh-8rem)] glass-card rounded-2xl overflow-hidden flex border border-white/5 transition-all duration-300 ${callStatus !== 'idle' ? 'blur-sm scale-[0.98]' : ''}`}>
                {/* Contacts Sidebar */}
                <div className="w-80 border-r border-white/10 bg-black/20 flex flex-col">
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search peers..."
                                className="w-full bg-zinc-900 border-none rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary text-gray-300 placeholder-gray-600 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredChannels.length > 0 && (
                            <>
                                <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Channels</div>
                                {filteredChannels.map(channel => (
                                    <ChatItem
                                        key={channel.name}
                                        name={channel.name}
                                        lastMessage={channel.lastMessage}
                                        time=""
                                        active={activeChat === channel.name}
                                        onClick={() => setActiveChat(channel.name)}
                                        channel
                                    />
                                ))}
                            </>
                        )}

                        {filteredDms.length > 0 && (
                            <>
                                <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase mt-2">Direct Messages</div>
                                {filteredDms.map(dm => (
                                    <ChatItem
                                        key={dm.name}
                                        name={dm.name}
                                        lastMessage={dm.lastMessage}
                                        time=""
                                        active={activeChat === dm.name}
                                        onClick={() => setActiveChat(dm.name)}
                                        online={dm.online}
                                    />
                                ))}
                            </>
                        )}

                        {filteredChannels.length === 0 && filteredDms.length === 0 && (
                            <div className="p-4 text-center text-gray-500 text-sm">No results found</div>
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-zinc-950/30">
                    {/* Header */}
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
                        <div className="flex items-center gap-3">
                            {activeChat.includes("Section") || activeChat.includes("Group") ? (
                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">#</div>
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">{activeChat.charAt(0)}</div>
                            )}
                            <div>
                                <h3 className="font-bold text-white">{activeChat}</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div> Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <button onClick={() => startCall('audio')} className="hover:text-white transition-colors" title="Start Audio Call"><Phone size={20} /></button>
                            <button onClick={() => startCall('video')} className="hover:text-white transition-colors" title="Start Video Call"><Video size={20} /></button>
                            <button className="hover:text-white transition-colors"><MoreVertical size={20} /></button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages[activeChat] ? (
                            messages[activeChat].map((msg) => (
                                <MessageComponent
                                    key={msg.id}
                                    sender={msg.sender}
                                    time={msg.time}
                                    content={msg.content}
                                    avatar={msg.avatar}
                                    role={msg.role}
                                    isMe={msg.isMe}
                                />
                            ))
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-500 text-sm">
                                No messages yet. Start the conversation!
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/5 bg-black/20">
                        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 focus-within:border-primary/50 transition-colors">
                            <button className="text-gray-400 hover:text-white transition-colors"><Paperclip size={20} /></button>
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-500"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="text-gray-400 hover:text-white transition-colors"><Smile size={20} /></button>
                            <button className="text-gray-400 hover:text-white transition-colors"><Image size={20} /></button>
                            <button
                                className={`transition-colors ${inputValue.trim() ? 'text-primary' : 'text-gray-600'}`}
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <div className="text-right mt-2">
                            <span className="text-[10px] text-gray-500">Press Enter to send</span>
                        </div>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
}

function ChatItem({ name, lastMessage, time, active, online, channel, onClick }: { name: string, lastMessage: string, time: string, active: boolean, online?: boolean, channel?: boolean, onClick: () => void }) {
    return (
        <div onClick={onClick} className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors ${active ? 'bg-primary/10 border-r-2 border-primary' : 'hover:bg-white/5 border-r-2 border-transparent'}`}>
            <div className="relative">
                {channel ? (
                    <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400">#</div>
                ) : (
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${active ? 'from-indigo-500 to-purple-500' : 'from-zinc-700 to-zinc-600'}`}>
                        {name.charAt(0)}
                    </div>
                )}
                {online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black"></div>}
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                    <h4 className={`text-sm font-medium truncate ${active ? 'text-primary' : 'text-gray-300'}`}>{name}</h4>
                    {time && <span className="text-[10px] text-gray-500">{time}</span>}
                </div>
                <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
            </div>
        </div>
    );
}

function MessageComponent({ sender, time, content, avatar, isMe, role }: { sender: string, time: string, content: string, avatar: string, isMe?: boolean, role?: string }) {
    return (
        <div className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1 ${role === 'faculty' ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                {avatar}
            </div>
            <div className={`max-w-[70%] rounded-2xl p-3 text-sm ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-zinc-800 text-gray-200 rounded-tl-none'}`}>
                {!isMe && <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold text-xs ${role === 'faculty' ? 'text-emerald-400' : 'text-gray-300'}`}>{sender}</span>
                    {role === 'faculty' && <span className="bg-emerald-500/20 text-emerald-400 px-1 rounded text-[10px]">Faculty</span>}
                </div>}
                <p className="leading-relaxed">{content}</p>
                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-primary-foreground/70' : 'text-gray-500'}`}>{time}</p>
            </div>
        </div>
    );
}
