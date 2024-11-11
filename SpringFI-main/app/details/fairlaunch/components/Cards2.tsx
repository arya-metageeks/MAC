import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { BiWalletAlt } from "react-icons/bi";
import { useWriteContract } from "wagmi";
import {
  createAbi,
  createAddress,
  fairLaunchAbi,
  fairLaunchAddress,
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import { useFormContext } from "@/context/FormContext";
import DetailContainer from "@/components/DetailContainer";

interface CountdownProps {
  Dates: string;
}
interface CardProps {
  purchaseTokenAddress: string;
  symbolToken: string;
  EndTime: number;
  index: number;
  amountDecimal: number;
  address: string | undefined;
  dataIndex: number;
  Affiliate: number;
  moneyRaised: number;
  softCapCurrency: number;
  currency: string;
}

interface SwipeTextProps {
  affiliateValues: number[];
}
const CountdownTimer = ({ timestamp }: { timestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const timeDifference = timestamp - now;

    if (timeDifference > 0) {
      setTimeLeft(timeDifference);
    } else {
      setTimeLeft(0);
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timestamp]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${days.toString().padStart(2, "0")} : ${hours
      .toString()
      .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeComponents = formatTime(timeLeft).split(" : ");

  return (
    <div className="flex space-x-2">
      {timeComponents.map((component, index) => (
        <p
          key={index}
          className="dark:bg-[#aca4ff] bg-[#aca4ff] p-1 rounded text-center"
        >
          <span className="text-lg font-bold">{component}</span>
        </p>
      ))}
    </div>
  );
};

const SwipeText = ({ affiliateValues }: SwipeTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % affiliateValues.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [affiliateValues]);

  return (
    <div className="flex justify-center text-white border border-[#aca4ff] bg-[#aca4ff]/75 dark:bg-[#aca4ff] dark:border-[#aca4ff] mx-32 w-32 rounded-full transition-transform duration-500 transform -translate-y-1/2 z-20">
      {affiliateValues[currentIndex]}
    </div>
  );
};

const Cards: React.FC<CardProps> = ({
  purchaseTokenAddress,
  symbolToken,
  EndTime,
  index,
  amountDecimal,
  address,
  dataIndex,
  Affiliate,
  moneyRaised,
  softCapCurrency,
  currency,
}) => {
  const router = useRouter();

  const { setInfoData, infoData } = useFormContext();

  //Args logic
  const amountDecimalData =
    purchaseTokenAddress == "0x0000000000000000000000000000000000000000"
      ? 18
      : amountDecimal;

  const presaleIndex = index;
  const AmountData = infoData.launchpadDetailsAmount * 10 ** amountDecimalData;

  const affiliatAddress = address;

  //Data Collection
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  const { writeContract } = useWriteContract();
  const handleBuyToken = () => {
    writeContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "buyToken",
      args: [presaleIndex, AmountData, affiliatAddress],
      //   onError(error: any) {
      //     console.log("Error", error);
      //     enqueueSnackbar(`Error creating presale ${error}`, {
      //       variant: "error",
      //     });
      //   },
    });
  };

  return (
    <DetailContainer>
      <div className="relative mt-8">
        <div className="absolute z-20 transform -translate-x-8 lg:translate-x-0 -translate-y-1/2 inset-0 bg-gradient-to-r from-[#aca4ff] to-lime-500 dark:from-[#aca4ff] dark:to-[#aca4ff] rounded-lg shadow-lg">
          <div className="flex justify-center text-white border border-[#aca4ff] bg-[#aca4ff] dark:bg-[#aca4ff] dark:border-[#aca4ff] mx-32 w-32 rounded-full transition-transform duration-500 transform -translate-y-1/2 z-20">
            {Affiliate}
          </div>
        </div>
      </div>

      <div className="flex border border-[#aca4ff]/25 py-2 rounded-2xl justify-between">
        <p className="font-bold text-sm p-1 pl-2 dark:text-[#aca4ff] text-[#aca4ff]">
          Make sure the website is purplesale finance!
        </p>
      </div>
      <div className=" flex mt-4 justify-between">
        <p className="ml-4 mt-3 text-sm font-bold mb-2 text-gray-300 dark:text-gray-100">
          Presale Starts In
        </p>
        <div className="text-sm font-normal text-gray-300 dark:text-gray-100">
          <div>
            <CountdownTimer timestamp={EndTime} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-sm font-bold text-gray-300 dark:text-white">
          Progress ({moneyRaised / softCapCurrency}%)
        </p>
        <div className="w-full bg-gray-300 rounded-full">
          <div
            className={`h-2 rounded-full bg-gradient-to-r from-[#aca4ff] to-lime-500`}
            style={{ width: `min(${moneyRaised / softCapCurrency}%, 100%)` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="mb-3 text-sm font-normal text-gray-300 dark:text-gray-400">
            0 {currency}
          </p>
          <p className="mb-3 text-sm font-normal text-gray-300 dark:text-gray-400">
            {softCapCurrency} {currency}
          </p>
        </div>
        <input
          onChange={handleOnChange}
          id="launchpadDetailsAmount"
          name="launchpadDetailsAmount"
          type="number"
          placeholder="Ex:1000000000000000000"
          className="w-full p-2 border border-[#aca4ff] rounded-sm bg-stone-800"
        />
      </div>

      <button
        className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#aca4ff] rounded-lg hover:bg-[#aca4ff] focus:ring-4 focus:outline-none focus:ring-[#aca4ff] dark:bg-[#aca4ff] dark:hover:bg-[#aca4ff] dark:focus:ring-[#aca4ff]"
        onClick={() => {
          handleBuyToken();
        }}
      >
        {purchaseTokenAddress ===
        "0x0000000000000000000000000000000000000000" ? (
          <p>Buy with Matic</p>
        ) : (
          <p>Buy with {currency}</p>
        )}
        <BiWalletAlt className="ml-2" />
      </button>
    </DetailContainer>
  );
};

export default Cards;
