"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "student" | "faculty" | "hod" | "dean" | "parent" | null;

interface User {
    id: string;
    name: string;
    role: UserRole;
    section?: string; // For students
    department?: string; // For HOD/Faculty
    assignedStudents?: string[]; // For Faculty
    childrenIds?: string[]; // For Parents
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = (role: UserRole) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            let mockUser: User | null = null;

            switch (role) {
                case "student":
                    mockUser = { id: "s1", name: "Alex Student", role: "student", section: "A" };
                    break;
                case "faculty":
                    mockUser = { id: "f1", name: "Dr. Faculty", role: "faculty", department: "CS", assignedStudents: ["s1", "s2"] };
                    break;
                case "hod":
                    mockUser = { id: "h1", name: "Prof. Head", role: "hod", department: "CS" };
                    break;
                case "dean":
                    mockUser = { id: "d1", name: "Dean Admin", role: "dean" };
                    break;
                case "parent":
                    mockUser = { id: "p1", name: "Mr. Parent", role: "parent", childrenIds: ["s1"] };
                    break;
            }

            setUser(mockUser);
            setIsLoading(false);
            if (mockUser) {
                router.push(`/dashboard/${role}`);
            }
        }, 800);
    };

    const logout = () => {
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
