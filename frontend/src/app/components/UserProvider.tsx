// UserProvider.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
    username: string;
    isAdmin: boolean;
    setUsername: (username: string) => void;
    setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [username, setUsername] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
                    cache: 'no-store',
                    credentials: 'include',
                });
                const result = await response.json();
                if (response.status === 200) {
                    setUsername(result.data.nickname);
                    setIsAdmin(result.data.role === 'ROLE_ADMIN');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUsername();
    }, []);

    return (
        <UserContext.Provider value={{ username, isAdmin, setUsername, setIsAdmin }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}