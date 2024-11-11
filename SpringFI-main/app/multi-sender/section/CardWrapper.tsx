import React from 'react'

const CardWrapper = ({title,description}:{title:string,description:string}) => {
  return (
    <div className="border-[rgb(255,255,255,0.1)] border rounded-lg overflow-hidden py-6 relative px-6 flex items-center justify-center flex-col flex-1">
          <div className="bg-[rgb(255,255,255,0.1)] blur-md absolute top-0 left-0 w-full h-full"></div>
          <h1 className="text-2xl font-medium mb-2">
            {title}
          </h1>
          <p className="text-[#999999] text-xs">
            {description}
          </p>
        </div>
  )
}

export default CardWrapper
