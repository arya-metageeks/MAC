import React from "react";
import heroImage2 from "@i/temp/Dashboard Hero2.png";
import heroImage3 from "@i/temp/Dashboard Hero3.png";
import Image from "next/image";
import FeaturedDealTag from "@/components/FeaturedDealTag";
import NewDealsSection from "../dashboard/components/NewDealsSection";

const tempData = {
  heading: "NewDeals",
  cardsData: [
    {
      title: "Cluster Protocol",
      status: "New IDO",
      description:
        "Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
      image: {
        src: "https://picsum.photos/seed/234233/800/600.jpg",
      },
    },
    {
      title: "Cluster Protocol",
      status: "New IDO",
      description:
        "Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
      image: {
        src: "https://picsum.photos/seed/2333/800/600.jpg",
      },
    },
    {
      title: "Cluster Protocol",
      status: "New IDO",
      description:
        "Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
      image: {
        src: "https://picsum.photos/seed/23423/800/600.jpg",
      },
    },
    {
      title: "Cluster Protocol",
      status: "New IDO",
      description:
        "Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
      image: {
        src: "https://picsum.photos/seed/4233/800/600.jpg",
      },
    },
    {
      title: "Cluster Protocol",
      status: "New IDO",
      description:
        "Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
      image: {
        src: "https://picsum.photos/seed/23/800/600.jpg",
      },
    },
    {
      title: "Cluster Protocol",
      status: "New IDO",
      description:
        "Introducing a collection of fully designed and functional AI GPU Platfor , tailored to enhance your AI",
      image: {
        src: "https://picsum.photos/seed/234233/800/600.jpg",
      },
    },
  ],
};
const HeroSection = () => {
  return (
    <div className="flex gap-x-[5%] gap-y-6 items-center">
      <div className="flex-1 relative">
        <FeaturedDealTag className="z-10 absolute top-0 right-4 -translate-y-1/2" />
        <div className="relative pt-[40%] rounded-lg overflow-hidden">
          <Image
            src={heroImage2}
            priority={true}
            alt=""
            fill={true}
            className="object-center object-cover"
          />
        </div>
      </div>
      <div className="flex-1 relative">
        <FeaturedDealTag className="z-10 absolute top-0 right-4 -translate-y-1/2" />
        <div className="relative pt-[40%] rounded-lg overflow-hidden">
          <Image
            src={heroImage3}
            priority={true}
            alt=""
            fill={true}
            className="object-center object-cover"
          />
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <div className="page-padding overflow-x-hidden">
      <HeroSection />
      <div className="mb-8"></div>
      <NewDealsSection data={tempData} />
    </div>
  );
};

export default Page;
