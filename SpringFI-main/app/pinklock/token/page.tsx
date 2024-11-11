import React from "react";
import List from "./section/List";
import dynamic from "next/dynamic";
import Image from "next/image";
import bg from "@i/airdrop-bg.png";
import banner1 from "@i/airdrop-banner-1.png";
import banner2 from "@i/airdrop-banner-2.png";
import Hero from "./section/Hero";
const Index = () => {
  return (
    <div className="px-[5%] py-20">
      <Image
        src={bg}
        alt=""
        fill={true}
        className="top-0 left-0 object-cover opacity-50"
      />
      <List />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
