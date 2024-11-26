"use client";

import ClientSideUserProvider from "@/context/ClientSideUserProvider";
import { SelectedSpaceProvider } from "@/context/SelectedSpaceContext";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-custom">
            <SelectedSpaceProvider>
                <ClerkProvider>
                    <ClientSideUserProvider>
                        {children}
                    </ClientSideUserProvider>
                </ClerkProvider>
            </SelectedSpaceProvider>
        </div>
    )
}