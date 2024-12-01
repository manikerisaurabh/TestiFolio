"use client";

import React from 'react';
import Image from 'next/image';
import logoImage from '../../../public/logo2.png';
import NavbarProfile from './NavbarProfile';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 text-black">
            <div className="flex justify-center px-4">
                <nav className="flex items-center justify-between px-4 py-2 bg-[#ffffffd1] rounded-3xl w-full max-w-5xl mt-6">
                    <div className="flex items-center">
                        <Link href={'/dashboard'}>
                            <Image src={logoImage} alt="testifolio" className='font-extrabold' width={50} height={50} />

                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-6 text-lg">
                        <ul className="flex space-x-6">
                            <li className="relative group cursor-pointer ">
                                <Link href={'/dashboard'} className="transition-all duration-300 ease-in-out">
                                    Dashboard
                                </Link>
                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <li className="relative group cursor-pointer">
                                <Link href={'/features'} className="transition-all duration-300 ease-in-out">
                                    Features
                                </Link>
                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <li className="relative group cursor-pointer">
                                <Link href={'/pricing'} className="transition-all duration-300 ease-in-out">
                                    Pricing
                                </Link>
                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
                            </li>
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
