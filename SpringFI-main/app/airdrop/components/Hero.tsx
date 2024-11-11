import React from "react";
import NFTCards from "@i/Airdrop NFT Cards.png";
import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import GlowingButton from "@/components/GlowingButton";
const Hero = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="flex flex-col gap-3 items-start">
          <Image src={Logo} alt="Logo" className="w-60 mb-2" />
          <h1 className="text-[52px] leading-tight">
            Earn With <br /> Every{" "}
            <span className="font-extrabold gradient-heading">Engagements</span>
          </h1>
          <button className="py-3 px-4 rounded-lg border border-[rgb(255,255,255,0.1)] bg-black bg-opacity-25">
            <span className="text-xl">Key Features</span>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Image src={NFTCards} alt="" />
      </div>
    </div>
  );
};

export default Hero;
