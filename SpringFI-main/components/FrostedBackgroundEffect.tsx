import React, { ReactNode } from "react";

const FrostedBackgroundEffect = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="border border-[rgb(255,255,255,0.2)] relative rounded-lg overflow-hidden"
      style={{
        background:
          "linear-gradient(360deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
      }}
    >
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-[0.09] 
blur"
        ></div>
        <div className="relative">
        {children}
        </div>
        
      </div>
    </div>
  );
};

export default FrostedBackgroundEffect;
