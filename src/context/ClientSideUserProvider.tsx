import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user data
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

// Define the context value type
interface UserContextType {
    user: User | null;
    updateUser: (userData: User) => void;
    clearUser: () => void;
}

// Create the context with a default value of `null`
export const ClientSideUserContext = createContext<UserContextType | null>(null);

interface ClientSideUserProviderProps {
    children: ReactNode;
}

const ClientSideUserProvider: React.FC<ClientSideUserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Fetch user info from sessionStorage when the provider initializes
    useEffect(() => {
        const storedUser = sessionStorage.getItem("userSession");
        if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
        }
    }, []);

    // Save user info to sessionStorage when the user state changes
    const updateUser = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem("userSession", JSON.stringify(userData));
    };

    // Clear user info from sessionStorage
    const clearUser = () => {
        setUser(null);
        sessionStorage.removeItem("userSession");
    };

    return (
        <ClientSideUserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </ClientSideUserContext.Provider>
    );
};

export default ClientSideUserProvider;
