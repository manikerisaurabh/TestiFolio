"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-custom">

            <ClerkProvider>
                {children}
            </ClerkProvider>
        </div>
    )
}