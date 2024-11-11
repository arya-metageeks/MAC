"use client"
import { MagnifyingGlassIcon } from "@/assets/icons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { PiSpinnerBold } from "react-icons/pi";
import FramerLogo from "@i/Framer-Logo.png";
import React from "react";
import Image from "next/image";
import GlowingButton from "@/components/GlowingButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel
} from "@/components/ui/Carousel";
interface CardsData {
  title: string;
  status: string;
  description: string;
  image: {
    src: string;
    alt?: "";
  };
}
interface props {
  heading: string;
  cardsData: CardsData[];
}
const NewDealsSection = ({ data }: { data: props }) => {
  return (
    <div>
      <Carousel opts={{slidesToScroll:1}}>
        <TopBar data={data}/>
        <div className="w-full">
          <CarouselContent>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-6"> */}
            {data.cardsData.map((d, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="base-1 md:basis-1/2 lg:basis-1/4"
                >
                  <Card data={d} />
                </CarouselItem>
              );
            })}
            {/* </div> */}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
};
const TopBar = ({ data }: { data: props }) => {
  const {scrollPrev,scrollNext} = useCarousel()
  return (
    <div className="flex justify-between mb-6">
      <h1>{data.heading}</h1>
      <div className="flex gap-4 items-stretch">
        <div className="relative max-w-40">
          <input
            type="text"
            className="w-full h-full text-sm border custom-white-border bg-gradient-to-b bg-transparent from-transparent to-[rgb(255,255,255,0.1)] rounded-full py-1 px-4 placeholder:text-white pr-5"
            placeholder="Search"
          />
          <div className="w-4 absolute right-3 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon />
          </div>
        </div>
        <div className="flex rounded-full border border-white-10">
          <button className="px-4 py-2" onClick={scrollPrev}>
            <FaArrowLeft />
          </button>
          <button className="px-4 py-2 border-l border-white-10"  onClick={scrollNext}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
const Card = ({ data }: { data: CardsData }) => {
  return (
    <div className="relative w-full p-2  rounded-md border border-white-10">
      {/* gradient */}
      <div
        className="absolute -top-4 opacity-50 blur-3xl -left-4 w-full h-full"
        style={{
          background: `conic-gradient(from 90deg at 40.63% 50.41%, rgba(159, 115, 241, 0) -48.92deg, rgba(242, 98, 181, 0) 125.18deg, #5FC5FF 193.41deg, #FFAC89 216.02deg, #8155FF 236.07deg, #789DFF 259.95deg, rgba(159, 115, 241, 0) 311.08deg, rgba(242, 98, 181, 0) 485.18deg)`,
        }}
      ></div>
      <div className="relative pt-[80%] rounded-md overflow-hidden border border-white-10 mb-3">
        <Image
          src={data.image.src}
          alt=""
          fill={true}
          className="object-center object-cover z-[1]"
        />
        <Image
          src={FramerLogo}
          alt=""
          className="absolute top-2 left-2 w-[25%] z-[2]"
        />
      </div>
      <div className="px-4">
        <div className="flex items-center gap-2">
          <PiSpinnerBold />
          <span className="text-sm text-gray-300">{data.status}</span>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgb(255,255,255,0.2)] to-transparent my-2"></div>
        <h3 className="mt-3 mb-4 font-medium">{data.title}</h3>
        <p className="text-gray-400 text-sm mb-3">
          {data.description.slice(0, 102)}...
        </p>
        <GlowingButton>Coming Soon</GlowingButton>
      </div>
    </div>
  );
};
export default NewDealsSection;
