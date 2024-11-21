"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'



export interface User {
    firstName: string;
    id: string;
    imageUrl: string;
    lastName: string;
}

const NavbarProfile = () => {
    const pathname = usePathname()
    const [user, setUser] = useState<User | null>(null);
    const [retryCount, setRetryCount] = useState(0); // Track retries

    const getUserInfo = async () => {
        try {
            console.log("API call attempt");
            const response = await fetch("/api/get-clerk-user");
            if (response.status === 401) {
                console.log("Unauthorized, retrying...");
                throw new Error("Unauthorized");
            }

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.log("Error while fetching user data: ", error);

            // Retry only if retryCount is less than 1
            if (retryCount < 1) {
                setRetryCount((prev) => prev + 1);
            }
        }
    };

    useEffect(() => {
        console.log("Current route:", pathname);
    }, []);


    useEffect(() => {
        if (retryCount <= 1) {
            getUserInfo();
        }
    }, [retryCount]); // Re-trigger the effect if retryCount changes

    // Sync user to sessionStorage whenever it updates
    useEffect(() => {
        if (user) {
            sessionStorage.setItem("userSession", JSON.stringify(user));
        }
    }, [user]);

    return (
        <div className="flex items-center">
            {pathname === '/' ? <Link
                href={"/dashboard"}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Lets Get Started
            </Link> :
                <>
                    {user ? (
                        <img
                            src={user.imageUrl}
                            alt={"profile image"}
                            width={40}
                            height={40}
                            className="rounded"
                            style={{ borderRadius: "50%" }}
                        />
                    ) : (
                        <Link
                            href={"/dashboard"}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Lets Get Started
                        </Link>
                    )}
                </>

            }
        </div>
    );
};

export default NavbarProfile;
