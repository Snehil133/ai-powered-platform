"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, BookOpen, Settings, FileBarChart, Edit, Trash2, Plus } from "lucide-react";

export default function HODDashboard() {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [showAssignmentModal, setShowAssignmentModal] = React.useState(false);
    const [showCurriculumModal, setShowCurriculumModal] = React.useState(false);
    const [activeCurriculum, setActiveCurriculum] = React.useState<{ id: number; name: string; updated: string; } | null>(null);

    // Mock Data State
    const [assignments, setAssignments] = React.useState([
        { id: 1, faculty: "Dr. Faculty", section: "Section A", studentCount: 45, course: "Data Structures" },
        { id: 2, faculty: "Prof. Alan", section: "Section B", studentCount: 42, course: "Operating Systems" },
        { id: 3, faculty: "Dr. Sarah", section: "Section C", studentCount: 33, course: "Database Management" }
    ]);

    const [curriculums, setCurriculums] = React.useState([
        { id: 1, name: "Data Structures & Algo", updated: "2 days ago" },
        { id: 2, name: "System Design Patterns", updated: "1 week ago" }
    ]);

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Handlers
    const handleAddAssignment = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock add
        const formData = new FormData(e.target as HTMLFormElement);
        const newAssignment = {
            id: Date.now(),
            faculty: formData.get("faculty") as string,
            course: formData.get("course") as string,
            section: formData.get("section") as string,
            studentCount: Number(formData.get("students")) || 0
        };
        setAssignments([newAssignment, ...assignments]);
        setShowAssignmentModal(false);
    };

    const handleDeleteCurriculum = (id: number) => {
        if (confirm("Are you sure you want to delete this curriculum?")) {
            setCurriculums(curriculums.filter(c => c.id !== id));
        }
    };

    const handleEditCurriculum = (item: typeof curriculums[0]) => {
        setActiveCurriculum(item);
        setShowCurriculumModal(true);
    };

    return (
        <DashboardLayout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Department Overview (CS)</h1>
                    <p className="text-gray-400">Manage curriculum, faculty alignment, and overall department reports.</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-mono text-emerald-400 bg-zinc-900/80 px-3 py-1 rounded-lg border border-white/10 inline-block backdrop-blur-md">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        <span className="text-gray-500 mx-2">|</span>
                        <span className="text-gray-300">{currentTime.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Students" value="120" icon={<Users className="text-blue-400" />} />
                <StatCard title="Total Faculty" value="8" icon={<Users className="text-purple-400" />} />
                <StatCard title="Avg Dept Score" value="76%" icon={<FileBarChart className="text-emerald-400" />} />
                <StatCard title="Active Courses" value="12" icon={<BookOpen className="text-amber-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Manage Faculty-Student Alignment */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Faculty - Student Mapping</h3>
                        <button
                            onClick={() => setShowAssignmentModal(true)}
                            className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full hover:bg-primary/30 transition-colors"
                        >
                            + New Assignment
                        </button>
                    </div>

                    <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                        {assignments.map(item => (
                            <MappingItem
                                key={item.id}
                                faculty={item.faculty}
                                section={item.section}
                                studentCount={item.studentCount}
                                course={item.course}
                            />
                        ))}
                    </div>
                </div>

                {/* Course Curriculum Management */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Curriculum Management</h3>
                        <button
                            onClick={() => {
                                setActiveCurriculum(null);
                                setShowCurriculumModal(true);
                            }}
                            className="text-xs bg-zinc-800 text-white px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors"
                        >
                            View All / Manage
                        </button>
                    </div>
                    <div className="space-y-4">
                        {curriculums.map(item => (
                            <div key={item.id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex justify-between items-center group">
                                <div>
                                    <h4 className="font-medium text-white">{item.name}</h4>
                                    <p className="text-xs text-gray-500">Updated {item.updated}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEditCurriculum(item)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCurriculum(item.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {curriculums.length === 0 && (
                            <div className="text-center text-gray-500 text-sm py-4">No curriculums found.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* -- MODALS -- */}

            {/* Assignment Modal */}
            {showAssignmentModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-6">Assign Faculty to Course</h2>
                        <form onSubmit={handleAddAssignment} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Faculty Name</label>
                                <input name="faculty" required type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" placeholder="e.g. Dr. Roberts" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Course Name</label>
                                <input name="course" required type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" placeholder="e.g. Advanced AI" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Section</label>
                                    <input name="section" required type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" placeholder="e.g. A" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Est. Students</label>
                                    <input name="students" type="number" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none" placeholder="40" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAssignmentModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Curriculum Modal */}
            {showCurriculumModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg p-6">
                        <h2 className="text-xl font-bold mb-6">{activeCurriculum ? 'Edit Curriculum' : 'Manage Curriculums'}</h2>

                        {activeCurriculum ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Curriculum Name</label>
                                    <input
                                        type="text"
                                        defaultValue={activeCurriculum.name}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none"
                                    />
                                </div>
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                                    Note: Editing curriculum details will notify all assigned faculty members.
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        onClick={() => setShowCurriculumModal(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert("Changes saved (mock)");
                                            setShowCurriculumModal(false);
                                        }}
                                        className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Add New Input */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target as HTMLFormElement);
                                        const name = formData.get("newCurriculum") as string;
                                        if (name.trim()) {
                                            setCurriculums([...curriculums, { id: Date.now(), name, updated: "Just now" }]);
                                            (e.target as HTMLFormElement).reset();
                                        }
                                    }}
                                    className="flex gap-2 mb-6"
                                >
                                    <input
                                        name="newCurriculum"
                                        type="text"
                                        className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none text-sm"
                                        placeholder="Add new curriculum name..."
                                    />
                                    <button type="submit" className="bg-primary text-black p-2 rounded-lg hover:bg-primary/90 transition-colors">
                                        <Plus size={20} />
                                    </button>
                                </form>

                                {/* List */}
                                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {curriculums.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-white/5 group">
                                            <div>
                                                <p className="font-medium text-white text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.updated}</p>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditCurriculum(item)}
                                                    className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCurriculum(item.id)}
                                                    className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-400"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {curriculums.length === 0 && (
                                        <div className="text-center text-gray-500 text-sm py-8 border border-dashed border-white/10 rounded-lg">No curriculums found.</div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-white/10 flex justify-end">
                                    <button
                                        onClick={() => setShowCurriculumModal(false)}
                                        className="px-4 py-2 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="glass-card p-6 rounded-xl flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-400 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5">
                {icon}
            </div>
        </div>
    );
}

function MappingItem({ faculty, section, studentCount, course }: { faculty: string, section: string, studentCount: number, course: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-gray-400">
                    {faculty.charAt(0)}
                </div>
                <div>
                    <h4 className="font-medium text-white text-sm">{faculty}</h4>
                    <p className="text-xs text-gray-500">{course}</p>
                </div>
            </div>
            <div className="text-right">
                <span className="block text-sm font-medium text-white">{section}</span>
                <span className="block text-xs text-gray-500">{studentCount} Students</span>
            </div>
        </div>
    );
}
