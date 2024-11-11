import React from 'react'
import temp from "@i/temp/Airdrop.svg"
import Image from 'next/image'
const Page = () => {
  return (
    <div className='pb-60'>
      <Image src={temp} alt="" className="w-full opacity-0"/>
    <div className='absolute top-0 left-0 w-full '>
      <Image src={temp} priority={true} alt="" className="w-full"/>
    </div>
    </div>
  )
}

export default Page