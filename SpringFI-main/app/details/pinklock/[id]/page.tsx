"use client";
import React, { useEffect, useState } from "react";
import TopBox from "../components/TopBox";
import ButtonBox from "../components/ButtonBox";
import dynamic from "next/dynamic";
import axios from "@/constants/axio";
import { useAccount, useConnect, useReadContract } from "wagmi";
import {
  ERC20Abi,
  pinkLockABI,
  pinkLockAddress,
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import { usePathname, useRouter } from "next/navigation";
import GradientBorderContainer from "@/components/GradientBorderContainer";

interface Props {
  title: string;
}
const PinkLockDetails = ({ params }: { params: { id: string } }) => {
  const [dataIndex, setDataIndex] = useState<number>(0);
  const router = useRouter();
  const { id } = params;
  const { address, isConnected } = useAccount();
  const pathName = usePathname();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const url = `${origin}${pathName}`;

  useEffect(() => {
    if (typeof id === "string") {
      setDataIndex(parseInt(id) - 1);
    }
  }, [id]);
  const [title, setTitle] = useState<Props[]>([]);

  useEffect(() => {
    axios
      .get(`/fetch-data-pinklock/Ethereum`)
      .then((response: any) => {
        setTitle(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  //✅ Step 0: Get the length of the array
  const { data: returnLength } = useReadContract({
    address: pinkLockAddress,
    abi: pinkLockABI,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    // },
  });

  const dataLength: any = returnLength?.toString();
  const number = parseInt(dataLength);

  //✅ Step1: Data from the contract
  const pinkLockArray = Array.from({ length: number }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: pinklock } = useReadContract({
      address: pinkLockAddress,
      abi: pinkLockABI,
      functionName: "locks",
      args: [index],
      //   onError(error: any) {
      //     console.log("Error", error);
      //     enqueueSnackbar(`Error creating presale ${error}`, {
      //       variant: "error",
      //     });
      //   },
    });
    return pinklock;
  });

  //✅ Step2: Convert the data to JSON format
  const dataPinkLockString = JSON.stringify(pinkLockArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
  //✅ Step3: Check if the data is available
  if (!dataPinkLockString) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }
  //✅ Step4: Parse the data to JSON format
  const dataPinkLock = JSON.parse(dataPinkLockString);
  //✅ Step5: Create the key for the data

  if (!dataPinkLock) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✔️ Blockchain
  const Web3key = [
    "token",
    "beneficiary",
    "amount",
    "unlockTime",
    "claimedAmount",
    "vesting",
    "firstReleasePercentage",
    "vestingPeriod",
    "cycleReleasePercentage",
  ];
  //✅ Step6: Map the data to the key
  const dataMainPresale = dataPinkLock.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3key.length; i++) {
      if (item) {
        obj[Web3key[i]] = item[i];
      } else {
        obj[Web3key[i]] = null;
      }
    }
    return obj;
  });

  //✅ Step6: Name & Symbol & Decimals

  const presaleToken = dataMainPresale.map((item: any) => {
    return item.token;
  });
  //Decimals
  const decimalsPrivateSale = presaleToken.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: decimals } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "decimals",
      });
      // return an object with the data property
      return { data: decimals };
    }
  );

  const decimal = decimalsPrivateSale.map((item: any) => {
    return item.data;
  });

  //Symbol
  const symbolPrivateSale = presaleToken.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: symbol } = useReadContract({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "symbol",
    });
    // return an object with the data property
    return { data: symbol };
  });

  const symbol = symbolPrivateSale.map((item: any) => {
    return item.data;
  });

  //Name
  const namePrivateSale = presaleToken.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: name } = useReadContract({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "name",
    });
    // return an object with the data property
    return { data: name };
  });

  const name = namePrivateSale.map((item: any) => {
    return item.data;
  });

  //✅ Step8: Additional logic

  const amount = dataMainPresale[dataIndex]?.amount;
  const amounts = dataMainPresale.map((item: any) => {
    return item?.amount;
  });
  const dividedAmount = amounts.map((item: any, index: any) => {
    if (decimal[index] !== 0) {
      return item / 10 ** decimal[index];
    } else {
      return 0;
    }
  });
  const tokenAddress = dataMainPresale[dataIndex]?.token;

  const tokenName = name[dataIndex];
  const tokenSymbol = symbol[dataIndex];
  const tokenDecimals = decimal[dataIndex];
  const wallet = title[dataIndex];
  const titles = wallet?.title;
  const cycle = Math.floor(
    dataMainPresale[dataIndex]?.vestingPeriod / (60 * 60 * 24)
  );
  const cycleRelease = dataMainPresale[dataIndex]?.cycleReleasePercentage;
  const tge = dataMainPresale[dataIndex]?.firstReleasePercentage;
  const view = "/details/pinklock/record/" + (dataIndex + 1);
  //Unlock time
  const convertUnixTimestampToDateTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const unlockTime: string = convertUnixTimestampToDateTime(
    dataMainPresale[dataIndex]?.unlockTime
  );

  const dummyData = {
    lockedAmount: 1000, // Example locked amount
    tokenAddress: "0x1234567890abcdef1234567890abcdef12345678", // Example token address
    tokenName: "Dummy Token", // Example token name
    tokenSymbol: "DUM", // Example token symbol
    tokenDecimals: 18, // Example token decimals
  };
  const dummyButtonData = {
    lockedAmount: 5000, // Example locked amount
    wallet: "0xabcdef1234567890abcdef1234567890abcdef12", // Example wallet address
    cycle: 12, // Example cycle in days
    cycleRelease: 75, // Example cycle release percentage
    tge: 10, // Example TGE percentage
    unlockTime: "2023-12-31T23:59:59Z", // Example unlock time
    view: "/details/example",
  };

  return (
    <div className="mt-8">
      <GradientBorderContainer>
        {/* <TopBox
        lockedAmount={dividedAmount[dataIndex]}
        tokenAddress={tokenAddress}
        tokenName={tokenName}
        tokenSymbol={tokenSymbol}
        tokenDecimals={tokenDecimals}
      /> */}
        <TopBox {...dummyData} />
        {/* <ButtonBox
        lockedAmount={dividedAmount[dataIndex]}
        wallet={titles}
        cycle={cycle}
        cycleRelease={cycleRelease}
        tge={tge}
        unlockTime={unlockTime}
        view={view}
      /> */}
        <ButtonBox {...dummyButtonData} />
      </GradientBorderContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PinkLockDetails), { ssr: false });
