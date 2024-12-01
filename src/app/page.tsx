import React from 'react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#ffcd4d] via-purple-300/[var(--tw-bg-opacity)] to-white min-h-screen w-full">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
