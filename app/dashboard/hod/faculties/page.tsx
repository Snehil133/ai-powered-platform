"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { User, Users, BookOpen, Clock, Mail, Phone, Calendar, Search, Trash2, Edit, FileText, ChevronRight, X, Download } from "lucide-react";

// Mock Data for Faculties with Students
const mockFaculties = [
    {
        id: 1,
        name: "Dr. Sarah Wilson",
        designation: "Professor",
        department: "Computer Science",
        email: "sarah.wilson@university.edu",
        phone: "+1 234 567 8900",
        image: null,
        courses: [
            {
                id: 101,
                name: "Data Structures",
                code: "CS201",
                sections: ["A", "B"],
                studentsCount: 85,
                students: [
                    { id: "S001", name: "Alice Johnson", regNo: "2023CS001", section: "A" },
                    { id: "S002", name: "Bob Smith", regNo: "2023CS002", section: "A" },
                    { id: "S003", name: "Charlie Brown", regNo: "2023CS003", section: "B" },
                ]
            },
            {
                id: 102,
                name: "Advanced Algorithms",
                code: "CS401",
                sections: ["A"],
                studentsCount: 40,
                students: [
                    { id: "S004", name: "David Lee", regNo: "2023CS004", section: "A" }
                ]
            }
        ],
        classes: [
            { day: "Today", time: "10:00 AM - 11:30 AM", room: "LH-101", course: "CS201" },
            { day: "Today", time: "02:00 PM - 03:30 PM", room: "LAB-2", course: "CS201 Lab" }
        ],
        stats: {
            classesTaken: 45,
            attendanceRate: "92%"
        }
    },
    {
        id: 2,
        name: "Prof. Alan Turing",
        designation: "Associate Professor",
        department: "Computer Science",
        email: "alan.turing@university.edu",
        phone: "+1 987 654 3210",
        image: null,
        courses: [
            {
                id: 103,
                name: "Operating Systems",
                code: "CS301",
                sections: ["C"],
                studentsCount: 42,
                students: [
                    { id: "S005", name: "Eve Hacker", regNo: "2023CS005", section: "C" }
                ]
            }
        ],
        classes: [
            { day: "Today", time: "09:00 AM - 10:30 AM", room: "LH-102", course: "CS301" }
        ],
        stats: {
            classesTaken: 38,
            attendanceRate: "88%"
        }
    },
    // ... other faculty data can be similar structure
    {
        id: 3,
        name: "Dr. Grace Hopper",
        designation: "Assistant Professor",
        department: "IT",
        email: "grace.hopper@university.edu",
        phone: "+1 555 123 4567",
        image: null,
        courses: [],
        classes: [],
        stats: { classesTaken: 42, attendanceRate: "95%" }
    },
    {
        id: 4,
        name: "Prof. James Gosling",
        designation: "Senior Lecturer",
        department: "Software Engineering",
        email: "james.gosling@university.edu",
        phone: "+1 777 888 9999",
        image: null,
        courses: [],
        classes: [],
        stats: { classesTaken: 50, attendanceRate: "89%" }
    }
];

export default function FacultyListPage() {
    const [allFaculties, setAllFaculties] = useState(mockFaculties);
    const [selectedFaculty, setSelectedFaculty] = useState<typeof mockFaculties[0] | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const filteredFaculties = allFaculties.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // -- Handlers --

    const handleGenerateReport = (type: 'overall' | 'faculty') => {
        const title = type === 'overall' ? "Department Overall Report" : `Report for ${selectedFaculty?.name}`;
        // In a real app, this would trigger a PDF generation or API call
        alert(`Generating ${title}...\n\nIncludes: Performance metrics, Student Attendance, Course Completion status.`);
    };

    const handleRemoveCourse = (courseId: number) => {
        if (!selectedFaculty) return;
        if (confirm("Are you sure you want to remove this course assignment? This will unassign the faculty.")) {
            const updatedFaculty = {
                ...selectedFaculty,
                courses: selectedFaculty.courses.filter(c => c.id !== courseId)
            };
            // Update local state and 'allFaculties' list
            setSelectedFaculty(updatedFaculty);
            setAllFaculties(prev => prev.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
        }
    };

    const handleRemoveStudent = (studentId: string) => {
        if (!selectedCourse) return;
        if (confirm("Are you sure you want to remove this student from the course?")) {
            const updatedCourse = {
                ...selectedCourse,
                students: selectedCourse.students.filter((s: any) => s.id !== studentId)
            };
            setSelectedCourse(updatedCourse);

            // Also update the parent faculty object to reflect changes
            if (selectedFaculty) {
                const updatedFaculty = {
                    ...selectedFaculty,
                    courses: selectedFaculty.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
                };
                setSelectedFaculty(updatedFaculty);
                setAllFaculties(prev => prev.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Faculty Supervision
                    </h1>
                    <p className="text-sm text-gray-400">Monitor faculty assignments, students, and generate reports</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleGenerateReport('overall')}
                        className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <FileText size={16} />
                        Overall Report
                    </button>
                    <div className="px-4 py-2 bg-zinc-900/50 rounded-xl border border-white/5 flex items-center gap-2 text-emerald-400 shadow-lg shadow-emerald-500/5">
                        <Clock size={16} />
                        <span className="font-mono font-medium">
                            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
                {/* Left Side: List of Faculties */}
                <div className="lg:col-span-4 flex flex-col glass-card rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search faculty..."
                                className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                        {filteredFaculties.map((faculty) => (
                            <button
                                key={faculty.id}
                                onClick={() => {
                                    setSelectedFaculty(faculty);
                                    setSelectedCourse(null);
                                }}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group border
                                    ${selectedFaculty?.id === faculty.id
                                        ? "bg-primary/20 border-primary/30 shadow-[0_0_15px_-5px_var(--primary)]"
                                        : "bg-transparent border-transparent hover:bg-zinc-800/50 hover:border-white/5"
                                    }`}
                            >
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105
                                    ${selectedFaculty?.id === faculty.id ? "bg-primary text-white" : "bg-zinc-800 text-gray-400"}`}>
                                    {faculty.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className={`font-medium text-sm ${selectedFaculty?.id === faculty.id ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                                        {faculty.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate">{faculty.designation}</p>
                                </div>
                                <ChevronRight className={`ml-auto text-gray-500 transition-transform ${selectedFaculty?.id === faculty.id ? "text-primary translate-x-1" : ""}`} size={16} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Screen: Details View */}
                <div className="lg:col-span-8 glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
                    {selectedFaculty ? (
                        <div className="h-full overflow-y-auto custom-scrollbar">
                            {/* Drill-down View: Course Students */}
                            {selectedCourse && (
                                <div className="absolute inset-0 z-20 bg-zinc-950 flex flex-col animate-in slide-in-from-right-10 duration-200">
                                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setSelectedCourse(null)}
                                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            >
                                                <ChevronRight className="rotate-180" size={20} />
                                            </button>
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{selectedCourse.name}</h3>
                                                <p className="text-xs text-gray-400">Student List ({selectedCourse.students.length})</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1.5 text-xs bg-zinc-800 text-white rounded-lg border border-white/10 hover:bg-zinc-700">
                                                Add Student
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 overflow-y-auto">
                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedCourse.students.map((student: any) => (
                                                <div key={student.id} className="group flex items-center justify-between p-4 bg-zinc-900/30 border border-white/5 rounded-xl hover:bg-zinc-900/60 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-gray-400">
                                                            {student.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-white">{student.name}</h4>
                                                            <div className="flex gap-3 text-xs text-gray-500">
                                                                <span>ID: {student.regNo}</span>
                                                                <span className="bg-white/5 px-2 rounded">Sec {student.section}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                            title="Edit Details"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveStudent(student.id)}
                                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Remove from Course"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {selectedCourse.students.length === 0 && (
                                                <div className="text-center py-10 text-gray-500">
                                                    No students assigned to this course yet.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Profile Header */}
                            <div className="relative h-32 bg-gradient-to-r from-zinc-800 to-zinc-900">
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => handleGenerateReport('faculty')}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-md border border-white/10 text-white text-xs rounded-lg hover:bg-black/40 transition-colors"
                                    >
                                        <Download size={14} />
                                        Export Faculty Report
                                    </button>
                                </div>
                                <div className="absolute -bottom-10 left-8 flex items-end gap-4">
                                    <div className="h-20 w-20 rounded-2xl bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center shadow-xl">
                                        <User size={32} className="text-gray-400" />
                                    </div>
                                    <div className="mb-2">
                                        <h2 className="text-xl font-bold text-white">{selectedFaculty.name}</h2>
                                        <p className="text-primary text-sm">{selectedFaculty.designation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-14 px-8 pb-8 space-y-8">
                                {/* Contact & Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-zinc-900/30 rounded-xl p-4 border border-white/5 space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <Mail size={16} className="text-gray-500" />
                                            {selectedFaculty.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <Phone size={16} className="text-gray-500" />
                                            {selectedFaculty.phone}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-white/5 text-center">
                                            <div className="text-2xl font-bold text-white">{selectedFaculty.stats.classesTaken}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">Classes</div>
                                        </div>
                                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-white/5 text-center">
                                            <div className="text-2xl font-bold text-emerald-400">{selectedFaculty.stats.attendanceRate}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">Avg. Attendance</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Courses Management */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <BookOpen size={18} className="text-primary" />
                                            Assigned Courses & Students
                                        </h3>
                                        <button className="text-xs bg-zinc-800 text-white px-3 py-1 rounded-full border border-white/10 hover:bg-zinc-700">
                                            + Assign Course
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedFaculty.courses.length > 0 ? selectedFaculty.courses.map((course) => (
                                            <div key={course.id} className="bg-zinc-900/30 p-4 rounded-xl border border-white/5 hover:bg-zinc-900/50 transition-colors group relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-2 relative z-10">
                                                    <div>
                                                        <h4 className="font-medium text-white text-lg">{course.name}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs font-mono text-gray-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/10">{course.code}</span>
                                                            <div className="flex gap-1">
                                                                {course.sections.map(sec => (
                                                                    <span key={sec} className="text-xs bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded">
                                                                        Sec {sec}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedCourse(course)}
                                                            className="text-xs flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                                                        >
                                                            <Users size={12} />
                                                            View Students ({course.students ? course.students.length : course.studentsCount})
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs flex items-center gap-1"
                                                    >
                                                        <Edit size={14} /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveCourse(course.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-xs flex items-center gap-1"
                                                    >
                                                        <Trash2 size={14} /> Unassign
                                                    </button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-gray-500 text-sm">
                                                No courses assigned to this faculty member.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Schedule - Reduced emphasis */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">TODAY'S SCHEDULE</h3>
                                    {selectedFaculty.classes.length > 0 ? (
                                        <div className="space-y-2">
                                            {selectedFaculty.classes.map((cls, idx) => (
                                                <div key={idx} className="flex items-center gap-4 bg-zinc-900/20 p-2 rounded-lg border border-white/5">
                                                    <div className="text-xs font-mono text-gray-500 w-24">
                                                        {cls.time}
                                                    </div>
                                                    <div className="w-px h-8 bg-white/5"></div>
                                                    <div>
                                                        <p className="text-white text-sm">{cls.course}</p>
                                                        <p className="text-xs text-gray-500">{cls.room}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-500 italic">No classes today</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <div className="h-20 w-20 bg-zinc-900/50 rounded-full flex items-center justify-center border border-white/5">
                                <Users size={32} className="opacity-50" />
                            </div>
                            <p>Select a faculty member to manage their view</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
