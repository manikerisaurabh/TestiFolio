"use client";

import React from 'react';
import Image from 'next/image';
import logoImage from '../../../public/logo.png';
import NavbarProfile from './NavbarProfile';

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 text-black">
            <div className="flex justify-center">
                <nav className="flex items-center justify-between px-8 py-2 bg-[#ffffffd1] rounded-3xl w-[80%] mt-6">
                    <div className="flex items-center">
                        <Image
                            src={logoImage}
                            alt="website logo"
                            width={50}
                            height={50}
                        />
                    </div>

                    <div>
                        <ul className="flex space-x-6 text-lg">
                            <li className="cursor-pointer hover:underline">Products</li>
                            <li className="cursor-pointer hover:underline">Features</li>
                            <li className="cursor-pointer hover:underline">Pricing</li>
                        </ul>
                    </div>

                    <div className="flex space-x-4">
                        <NavbarProfile />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
