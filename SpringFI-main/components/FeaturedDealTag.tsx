import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const FeaturedDealTag = ({className}:{className?:string}) => {
  return (
    <div className={className}>
        <div className='text-white bg-[#007aff] rounded py-1 px-2 flex gap-2 items-center'>
        <span>Featured Deal</span>
        <IoIosArrowForward size={16}/>
    </div>
    </div>
  )
}

export default FeaturedDealTag