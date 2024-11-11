import React, { ReactNode } from 'react'
const 
GlowingButton = ({children}:{children:ReactNode}) => {
  return (
        <div
    className="rounded-lg relative overflow-visible w-fit text-sm font-medium"
    style={{
      padding: "1px",
      border:"1.5px solid rgba(255, 255, 255, 0.2)"
    //   background:"linear-gradient(180deg,  0%, rgba(255, 255, 255, 0.2) 100%)"
    }}
  >
    <div
    style={{
      background: "conic-gradient(from 195.7deg at 50% 50%, #7147FF 0deg, rgba(66, 232, 255, 0) 95.01deg, rgba(255, 126, 171, 0.5) 185.59deg, #3083FF 274.88deg, #7147FF 360deg)"
  
  }}
  className='w-full h-full absolute top-[0%] left-[0%] blur-xl opacity-70'
    ></div>
    <div className="rounded-lg px-3 py-2 relative">{children}</div>

  </div>
  )
}

export default GlowingButton