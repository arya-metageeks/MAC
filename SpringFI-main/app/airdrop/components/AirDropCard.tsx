import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCircleDot } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import GlowingButton from "@/components/GlowingButton";

interface CountdownProps {
  startDate: number;
}
interface CardProps {
  id: number;
  imgHref: string;
  title: string;
  token: string;
  totalTokens: number;
  participants: number;
  starTime: number;
  currency: string;
  bg: string;
}

const SaleStatus = ({ startDate }: CountdownProps) => {
  const [saleState, setSaleState] = useState<string>("");

  const calculateSaleState = () => {
    const now = new Date().getTime();
    const startTime = startDate * 1000;

    if (now < startTime) {
      // Sale has not started yet
      setSaleState("UPCOMING");
    } else if (now >= startTime) {
      // Sale is ongoing
      setSaleState("LIVE");
    }
  };

  useEffect(() => {
    calculateSaleState();
    const interval = setInterval(calculateSaleState, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate]);

  let textClass = "";

  // Determine the text color class based on the sale state
  switch (saleState) {
    case "UPCOMING":
      textClass = "text-yellow-500 bg-white";
      break;
    case "LIVE":
      textClass = " text-green-500 bg-green-500";
      break;
    case "ENDED":
      textClass = "text-red-500 bg-red-500";
      break;
    default:
      textClass = "text-gray-500 bg-gray-500";
  }

  return (
    <span
      className={`mt-2 w-18 gap-0.5 h-5 pr-2 flex justify-between font-bold text-xs items-center mr-2 rounded-full p-0.5 bg-white text-black ${textClass}`}
    >
      <FaCircleDot className={`text-lg ${textClass} rounded-full`} />

      {saleState}
    </span>
  );
};

const CountdownTimer = ({ startDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const formatTime = (timeDifference: number) => {
    const seconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}:${hours}:${minutes}:${remainingSeconds}`;
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const timeDifference = startDate * 1000 - now;

    if (timeDifference <= 0) {
      // Sale has already started or ended
      setTimeLeft("Ongoing");
    } else {
      // Sale has not started yet
      setTimeLeft(formatTime(timeDifference));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    calculateTimeLeft(); // Calculate time left immediately when the component mounts.

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <span className="text-gray-300 dark:text-gray-300">
      {timeLeft === "Ongoing" ? "Ongoing" : timeLeft || "Upcoming"}{" "}
      {/* Default to Upcoming text */}
    </span>
  );
};

const AirDropCard = ({
  id,
  imgHref,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  currency,
  bg,
}: CardProps) => {
  const router = useRouter();

  return (
    <div className="w-full bg-black bg-opacity-70 border border-[rgb(255,255,255,0.2)] rounded-lg p-[10px] pb-4">
      <div className="pt-[90%] relative overflow-hidden rounded-lg border border-[rgb(255,255,255,0.1)]">
          <Image
            fill={true}
            className="object-cover object-center"
            src={imgHref || "https://picsum.photos/seed/picsum/800/600.png"}
            alt="cartImage"
          />
      </div>
      {/* <div className="bg-card-status">
          <SaleStatus startDate={starTime} />
        </div> */}
      <div className="px-3 mt-5 ">
        <div className=" from-transparent via-[rgb(255,255,255,0.1)] to-transparent w-full h-[2px] bg-gradient-to-r"></div>
        <h5 className="text-medium my-1.5">{title}</h5>
        <div className=" from-transparent via-[rgb(255,255,255,0.1)] to-transparent w-full h-[2px] bg-gradient-to-r mb-3"></div>
        <GlowingButton>Participate Now</GlowingButton>
      </div>
      {/* <div className="px-4">
        <hr className="card-ruler"></hr>

        <div className="card-value-grid">
          <div className="card-value-bg">
            <div className="card-flex">
              <p className="card-title">Token</p>
              <p className="card-value"> {token}</p>
            </div>
          </div>
          <div className="card-value-bg">
            <div className="card-flex">
              <p className="card-title"> Total Tokens</p>
              <p className="card-value"> {totalTokens}</p>
            </div>
          </div>
          <div className="card-value-bg">
            <div className="card-flex">
              <p className="card-title"> Participants</p>
              <p className="card-value"> {participants}</p>
            </div>
          </div>
        </div>
        <hr className="card-ruler"></hr>

        <div className="card-button-flex">
          <div>
            <p className="card-start">Sale Starts In</p>
            <p className="card-start-bg">
              <span className="card-start-span">
                <CountdownTimer startDate={starTime} />
              </span>
            </p>
          </div>
          <button
            className="card-button-secondary"
            onClick={() => {
              router.push({
                pathname: "/details/airdrop/[id]",
                query: { id: id },
              });
            }}
          >
            View
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AirDropCard;
