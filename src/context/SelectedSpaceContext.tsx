"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Space } from "@/app/components/CreateNewSpace";

// Define the context type
interface SelectedSpaceContextType {
    selectedSpace: Space | null;
    setSelectedSpace: (space: Space) => void;
}

// Create the context with a default value of null
const SelectedSpaceContext = createContext<SelectedSpaceContextType | undefined>(undefined);

// Create the provider component
export const SelectedSpaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    return (
        <SelectedSpaceContext.Provider value={{ selectedSpace, setSelectedSpace }}>
            {children}
        </SelectedSpaceContext.Provider>
    );
};

// Custom hook to use the context
export const useSelectedSpace = (): SelectedSpaceContextType => {
    const context = useContext(SelectedSpaceContext);
    if (!context) {
        throw new Error("useSelectedSpace must be used within a SelectedSpaceProvider");
    }
    return context;
};
