import React from "react";
import tempHero1 from "@i/temp/Dashboard Hero1.png";
import tempHero2 from "@i/temp/Dashboard Hero2.png";

import GridBG from "@i/grid-bg.svg";
import Image from "next/image";
import NewDealsSection from "./components/NewDealsSection";

const tempData={heading:"NewDeals",cardsData:[{
  title:"Cluster Protocol",
  status:"New IDO",
  description:"Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
  image:{
      src:"https://picsum.photos/seed/234233/800/600.jpg"
  }
},
{
  title:"Cluster Protocol",
  status:"New IDO",
  description:"Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
  image:{
      src:"https://picsum.photos/seed/2333/800/600.jpg"
  }
},
{
  title:"Cluster Protocol",
  status:"New IDO",
  description:"Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
  image:{
      src:"https://picsum.photos/seed/23423/800/600.jpg"
  }
},
{
  title:"Cluster Protocol",
  status:"New IDO",
  description:"Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
  image:{
      src:"https://picsum.photos/seed/4233/800/600.jpg"
  }
},
{
  title:"Cluster Protocol",
  status:"New IDO",
  description:"Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
  image:{
      src:"https://picsum.photos/seed/23/800/600.jpg"
  }
},
{
  title:"Cluster Protocol",
  status:"New IDO",
  description:"Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
  image:{
      src:"https://picsum.photos/seed/234233/800/600.jpg"
  }
}]}
const HeroSection = () => {
  return (
    <div className="flex gap-x-[5%] gap-y-6 items-center">
      <div className="flex-1 relative">

        <Image src={tempHero1} priority={true} alt="" className="relative w-[80%] mx-auto" />
      </div>
      <div className="flex-1">
        <Image src={tempHero2} priority={true} alt="" className="w-full" />
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <div className="w-full px-[5%] py-12 overflow-hidden relative">
        <Image
        src={GridBG}
        alt=""
        className="w-1/3 absolute left-[27%] -translate-x-1/2"
      />
      <div className="relative">

      <HeroSection />
      <div className="mb-10"></div>
      <NewDealsSection data={tempData}/>
      </div>
    </div>
  );
};

export default Page;
