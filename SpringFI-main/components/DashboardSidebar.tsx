import Image from 'next/image'
import React from 'react'
import Logo from "@/assets/images/Logo.svg"
import Navbar from './Navbar'
const DashboardSidebar = () => {
  return (
    <div className='bg-[#1A1C22] w-full max-w-[250px] sticky top-0 left-0 min-h-screen py-6 z-10'>
      <Image src={Logo} alt="Logo" className='w-[75%] mx-auto mb-10'/>
      <Navbar/>
    </div>
  )
}
export default DashboardSidebar