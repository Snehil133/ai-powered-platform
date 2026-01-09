"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  ShieldCheck,
  Users,
  Code2,
  BarChart3,
  MessageSquare,
  FileText,
  Video,
  ChevronRight,
  Terminal,
  Gamepad2,
  Lock
} from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">AI Proctor</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection("features")} className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Features</button>
                <button onClick={() => scrollToSection("roles")} className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Roles</button>
                <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">About</button>
              </div>
            </div>
            <div>
              <Link href="/login" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/20">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-none bg-white/5 text-xs font-medium text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next Gen Learning Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            The Future of <span className="text-gradient">AI Proctored</span><br /> Learning & Assessment
          </h1>

          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A comprehensive ecosystem for students, faculty, and administration. Experience personalized learning, secure exams, and real-time analytics powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login" className="h-12 px-8 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
              Start Learning <ChevronRight className="h-4 w-4" />
            </Link>
            <button className="h-12 px-8 rounded-full glass-card hover:bg-white/10 transition-all font-medium flex items-center gap-2 border border-white/10">
              <Video className="h-4 w-4" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From secure testing environments to personalized AI mentors, we cover every aspect of the modern educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-emerald-400" />}
              title="AI Proctoring"
              description="Secure exams with face detection, multi-person alerts, and active window tracking."
            />
            <FeatureCard
              icon={<Code2 className="h-6 w-6 text-blue-400" />}
              title="Coding Environment"
              description="Built-in IDE with test case validation, syntax highlighting, and live compilation."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-400" />}
              title="Personalized Learning"
              description="AI analyzes your performance to tailor curriculum and suggest relevant courses."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-pink-400" />}
              title="AI Interview Prep"
              description="Practice mock interviews with our AI avatar and get real-time feedback on your answers."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-orange-400" />}
              title="Advanced Analytics"
              description="Deep insights into student engagement, task completion rates, and performance trends."
            />
            <FeatureCard
              icon={<Gamepad2 className="h-6 w-6 text-yellow-400" />}
              title="Gamification"
              description="Earn badges, climb leaderboards, and stay motivated while learning complex topics."
            />
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Tailored for Everyone</h2>
            <p className="text-muted-foreground">Detailed access controls and features for every role in the institution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student */}
            <RoleCard
              role="Student"
              icon={<Users className="h-5 w-5" />}
              features={[
                "Access personalized learning materials",
                "Chat with peers in assigned sections",
                "View faculty contact details",
                "Take proctored exams & quizzes"
              ]}
            />

            {/* Faculty */}
            <RoleCard
              role="Faculty"
              icon={<FileText className="h-5 w-5" />}
              features={[
                "Monitor assigned students only",
                "View detailed performance reports",
                "Cannot remove/edit student records",
                "Generate subject-wise report cards"
              ]}
            />

            {/* HOD */}
            <RoleCard
              role="Head of Department"
              icon={<Terminal className="h-5 w-5" />}
              features={[
                "Oversee all students in the department",
                "Edit/Remove students & faculty mapping",
                "Generate faculty-wise performance reports",
                "Manage course curriculum"
              ]}
            />

            {/* Parent */}
            <RoleCard
              role="Parent"
              icon={<Lock className="h-5 w-5" />}
              features={[
                "View child's attendance & marks",
                "See feedback from faculty/HOD",
                "Track learning progress",
                "Receive important alerts"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-gray-400" />
            <span className="font-semibold text-gray-400">AI Proctor Platform</span>
          </div>
          <p className="text-sm text-gray-600">© 2026 AI Proctor Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-colors group cursor-default">
      <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function RoleCard({ role, icon, features }: { role: string, icon: React.ReactNode, features: string[] }) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{role}</h3>
      </div>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
