import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-[#ffcd4d] via-purple-300/[var(--tw-bg-opacity)] to-white h-full w-full '>
      <Navbar />
      <HeroSection />

    </div>
  )
}

export default Home