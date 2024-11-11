import React from "react";
import List from "./components/list";
import dynamic from "next/dynamic";
import Image from "next/image";
import bg from "@i/airdrop-bg.png"
import banner1 from "@i/airdrop-banner-1.png"
import banner2 from "@i/airdrop-banner-2.png"
import Hero from "./components/Hero";
const Index = () => {
  return (
    <div className="px-[5%] py-20">
      <Image src={bg} alt="" fill={true} className="top-0 left-0 object-cover opacity-50"/>
      <div className="relative">
        <Hero/>
        <div className="flex gap-[5%] mt-20 mb-20">
          <div className="flex-1">
            <div className="pt-[25%] rounded-lg overflow-hidden relative">
            <Image src={banner1} alt="" className="object-cover object-center" fill={true}/>
            </div>
          </div>
          <div className="flex-1">
            <div className="pt-[25%] rounded-lg overflow-hidden relative">
            <Image src={banner2} alt="" className="object-cover object-center" fill={true}/>
            </div>

          </div>
        </div>
      <List/>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
