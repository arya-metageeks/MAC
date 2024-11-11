import React, { ReactNode } from "react";
const GradientBorderContainer = ({ children ,heading}: { children: ReactNode,heading?:string }) => {
  return (
    <div
      className="p-[1px] relative rounded-2xl overflow-hidden max-w-4xl mx-auto"
      style={{
        background:"linear-gradient(198.92deg, #5C34FF 12.77%, #00FFB3 93.2%)",
      }}
    >
      <div className="bg-black rounded-2xl p-10">
        {heading && <h3 className="font-bold w-fit text-2xl mb-6 gradient-heading">{heading}</h3> }
        {children}
      </div>
    </div>
  );
};

export default GradientBorderContainer;
