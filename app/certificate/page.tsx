"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function CertificatePage() {
    return (
        <React.Suspense fallback={<div>Loading certificate...</div>}>
            <CertificateContent />
        </React.Suspense>
    );
}

function CertificateContent() {
    const searchParams = useSearchParams();

    // Dynamic data from URL or defaults
    const courseName = searchParams.get("course") || "Introduction to Python";
    const studentName = searchParams.get("student") || "Alex Student";
    const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-8 print:block print:p-0 print:m-0 print:bg-white print:overflow-hidden">
            <div className="w-[1000px] bg-white text-black p-12 relative shadow-2xl overflow-hidden print:shadow-none print:w-full print:h-screen print:rounded-none print:m-0 print:border-0">

                {/* Decorative Border */}
                <div className="absolute inset-4 border-4 border-double border-amber-600/30"></div>
                <div className="absolute inset-6 border border-amber-600/10"></div>

                {/* Corner Ornaments */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-amber-600 rounded-tl-3xl"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-amber-600 rounded-tr-3xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-amber-600 rounded-bl-3xl"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-amber-600 rounded-br-3xl"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-6 py-10">

                    {/* Header */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            {/* Placeholder for Logo - Using a Text Block for 'Seal' look if no image */}
                            <div className="h-20 w-20 rounded-full border-4 border-amber-600 flex items-center justify-center bg-amber-50">
                                <div className="text-center">
                                    <div className="text-[8px] font-bold uppercase tracking-widest text-amber-800">Estd.</div>
                                    <div className="text-xl font-serif font-bold text-amber-700">2010</div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-amber-800 uppercase tracking-wide">Centurion University</h1>
                        <h2 className="text-xl font-serif text-amber-700 uppercase tracking-widest">Of Technology and Management</h2>
                    </div>

                    <div className="w-full max-w-2xl border-b border-amber-200 py-4"></div>

                    {/* Title */}
                    <div className="py-6">
                        <h3 className="text-5xl font-serif italic text-zinc-800 font-bold mb-2">Certificate of Completion</h3>
                        <p className="text-lg text-zinc-600 font-serif italic">This is to certify that</p>
                    </div>

                    {/* Student Name */}
                    <div className="py-2">
                        <h2 className="text-5xl font-script text-amber-600 font-bold px-8 py-2 border-b-2 border-zinc-200 inline-block min-w-[400px]">
                            {studentName}
                        </h2>
                    </div>

                    {/* Body Text */}
                    <div className="max-w-3xl space-y-4">
                        <p className="text-xl text-zinc-700 font-serif leading-relaxed">
                            from the <strong>Department of Computer Science</strong> has successfully completed the course requirements for
                        </p>
                        <h3 className="text-3xl font-bold text-zinc-800 font-serif py-2">{courseName}</h3>
                        <p className="text-lg text-zinc-600 font-serif">
                            during the <strong>Academic Year 2025-2026</strong>, <strong>Semester 6</strong>.
                        </p>
                    </div>

                    {/* Signatures */}
                    <div className="flex justify-between w-full max-w-4xl pt-16 px-12 mt-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className="font-signature text-3xl text-blue-900 -rotate-6">Dr. Alan Turing</div>
                            <div className="w-48 h-px bg-zinc-400"></div>
                            <p className="text-sm font-bold uppercase text-zinc-500 tracking-widest">Head of Department</p>
                        </div>

                        {/* Gold Seal Element */}
                        <div className="relative">
                            <div className="h-32 w-32 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                <div className="h-28 w-28 border border-white/50 rounded-full flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <div className="text-[10px] uppercase font-bold tracking-widest mb-1">Official</div>
                                        <div className="text-2xl font-serif font-bold">SEAL</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest mt-1">Excellence</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-700 -z-10 rotate-45 transform origin-center"></div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="font-signature text-3xl text-blue-900 -rotate-3">Prof. Ada Lovelace</div>
                            <div className="w-48 h-px bg-zinc-400"></div>
                            <p className="text-sm font-bold uppercase text-zinc-500 tracking-widest">Dean of Academics</p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="pt-8 text-zinc-400 font-serif text-sm">
                        Issued on {date}
                    </div>

                </div>

                {/* Print Hint */}
                <div className="absolute top-6 right-6 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-700 transition"
                    >
                        Print / Save PDF
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-script { font-family: 'Great Vibes', cursive; }
                .font-signature { font-family: 'Great Vibes', cursive; }

                @media print {
                    @page {
                        size: landscape;
                        margin: 0;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>
        </div>
    );
}
