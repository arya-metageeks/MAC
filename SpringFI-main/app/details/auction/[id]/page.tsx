"use client";
import Faq from "@/components/Faq";
import FinishDetails from "../components/FinishDetails";
import TokenMetrics from "../components/TokenMetrics";
import React, { useEffect, useState } from "react";
import { useConnect, useReadContract } from "wagmi";
import {
  createAbi,
  createAddress,
  dutchAuctionAbi,
  dutchAuctionAddress,
  ERC20Abi,
  fairLaunchAbi,
  fairLaunchAddress,
  subAbi,
  subAddress,
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import DisqusComments from "@/components/Disqus";
import { useAccount } from "wagmi";

import Cards2 from "../components/Cards2";
import Button from "../components/Button";
import ChartComponent from "../components/ChartComponent";
import SidePanel from "../components/SidePanel";
import axios from "@/constants/axio";
import FinishDisqusWrapper from "@/components/FinishDisqusWrapper";
import DetailContainer from "@/components/DetailContainer";

const Auction = ({ params }: { params: { id: string } }) => {
  const [dataIndex, setDataIndex] = useState<number>(0);
  const router = useRouter();
  const pathName = usePathname();
  const { id } = params;
  const { address, isConnected } = useAccount();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const url = `${origin}${pathName}`;

  useEffect(() => {
    if (typeof id === "string") {
      setDataIndex(parseInt(id));
    }
  }, [id]);

  //Web2 Presale
  const [presale, setPresale] = useState<any>([]);
  //Web2 Fair Launch
  const [fairLaunch, setFairLaunch] = useState<any>([]);

  //Web2 Auction
  const [auction, setAuction] = useState<any>([]);
  //Web2 Subscription
  const [subscription, setSubscription] = useState<any>([]);

  //Length of the array

  const fetchWeb2DataPresale = async () => {
    try {
      const response = await axios.get("/presale-fetch-data/Ethereum");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/fairLaunch-fetch-data/Ethereum");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get("/dutchAuction-fetch-data/Ethereum");
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get("/Subscription-fetch-data/Ethereum");
      setSubscription(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeb2DataFairLaunch();
    fetchWeb2DataAuction();
    fetchWeb2DataPresale();
    fetchWeb2DataSubscription();
  }, []);

  // Web2 Auction
  const web2DataAuction = auction;
  const idWeb2Auction = web2DataAuction.map((auction: any) => auction.id);

  // Web2 Fair Launch
  const web2DataFair = fairLaunch;
  const idWeb2Fair = web2DataFair.map((fairLaunch: any) => fairLaunch.id);

  // Web2 Presale
  const web2DataPresale = presale;
  const idWeb2Presale = web2DataPresale.map((presale: any) => presale.id);

  // Web2 Subscription
  const web2DataSubscription = subscription;
  const idWeb2Subscription = web2DataSubscription.map(
    (subscription: any) => subscription.id
  );

  //✅ Step0: Set the length of the array
  //🚀 Presale
  const { data: returnLength } = useReadContract({
    address: createAddress,
    abi: createAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });
  const dataLengthPresales: any = returnLength?.toString();

  const lengthPresales = parseInt(dataLengthPresales);

  //🚀 Fair Launch

  const { data: returnLengthFair } = useReadContract({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });

  const dataLengthFair: any = returnLengthFair?.toString();

  const lengthFair = parseInt(dataLengthFair);

  //🚀 Auction

  const { data: returnLengthAuction } = useReadContract({
    address: dutchAuctionAddress,
    abi: dutchAuctionAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });

  const dataLengthAuction: any = returnLengthAuction?.toString();

  const lengthAuction = parseInt(dataLengthAuction);

  //🚀 Subscription

  const { data: returnLengthSub } = useReadContract({
    address: subAddress,
    abi: subAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });

  const dataLengthSub: any = returnLengthSub?.toString();
  const lengthSub = parseInt(dataLengthSub);

  //✅ Step1: Get the data from the contract
  //🚀 Presale
  const presalesArray = Array.from(
    { length: lengthPresales || 1 },
    (_, index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: presales } = useReadContract({
        address: createAddress,
        abi: createAbi,
        functionName: "presales",
        args: [index],
        // onError(error: any) {
        //   console.log("Error", error);
        //   enqueueSnackbar(`Error creating presale ${error}`, {
        //     variant: "error",
        //   });
        // },
      });
      return presales;
    }
  );

  //🚀 Fair Launch
  const fairLaunchArray = Array.from({ length: lengthFair }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: fairLaunch } = useReadContract({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "fairLaunch",
      args: [index],
      // onError(error: any) {
      //   console.log("Error", error);
      //   enqueueSnackbar(`Error creating presale ${error}`, {
      //     variant: "error",
      //   });
      // },
    });
    return fairLaunch;
  });

  //🚀 Auction
  const auctionsLaunchArray = Array.from(
    { length: lengthAuction },
    (_, index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: Auctions } = useReadContract({
        address: dutchAuctionAddress,
        abi: dutchAuctionAbi,
        functionName: "Auctions",
        args: [index],
        // onError(error: any) {
        //   console.log("Error", error);
        //   enqueueSnackbar(`Error creating presale ${error}`, {
        //     variant: "error",
        //   });
        // },
      });
      return Auctions;
    }
  );

  //🚀 Subscription
  const subsLaunchArray = Array.from({ length: lengthSub }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: subs } = useReadContract({
      address: subAddress,
      abi: subAbi,
      functionName: "subs",
      args: [index],
      // onError(error: any) {
      //   console.log("Error", error);
      //   enqueueSnackbar(`Error creating presale ${error}`, {
      //     variant: "error",
      //   });
      // },
    });
    return subs;
  });

  //✅ Step2: Convert the data to JSON format

  //🚀 Subscription
  const dataSubString = JSON.stringify(subsLaunchArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //🚀 Auction
  const dataStringAuction = JSON.stringify(
    auctionsLaunchArray,
    (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    }
  );

  //🚀 Fair Launch
  const dataStringFair = JSON.stringify(fairLaunchArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //🚀 Presale
  const PresaleDataString = JSON.stringify(presalesArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //✅ Step3: Check if the data is available
  if (
    !dataSubString ||
    !dataStringAuction ||
    !dataStringFair ||
    !PresaleDataString
  ) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✅ Step4: Parse the data to JSON format

  //🚀 Subscription
  const parsedDataSub = JSON.parse(dataSubString);
  //🚀 Auction
  const parsedDataAuction = JSON.parse(dataStringAuction);
  //🚀 Fair Launch
  const parsedDataFair = JSON.parse(dataStringFair);
  //🚀 Presale
  const parsedDataPresale = JSON.parse(PresaleDataString);

  //✅ Step5: Create the key for the data
  //🚀 Presale

  if (!web2DataPresale) {
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
  const Web3keyPresale = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "burnOrRefund",
    "burnedOrRefunded",
    "vestingEnabled",
    "devFeeInToken",
    "softCap",
    "hardCap",
    "presaleRate",
    "moneyRaised",
    "tokensSold",
    "devCommission",
    "devCommissionInToken",
    "affiliateCommissionAmount",
    "minBuy",
    "maxBuy",
    "startTime",
    "endTime",
    "affiliateRate",
    "firstReleasePercentage",
    "vestingPeriod",
    "cycleReleasePercentage",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "listingRate",
  ];
  //✅ Step6: Map the data to the key
  const dataMainPresale = parsedDataPresale.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keyPresale.length; i++) {
      if (item) {
        obj[Web3keyPresale[i]] = item[i];
      } else {
        obj[Web3keyPresale[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //🚀 Subscription

  if (!web2DataSubscription) {
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
  const Web3keySubscription = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "finalizedPool",
    "devFeeInToken",
    "softCap",
    "hardCap",
    "hardCapPerUser",
    "subRate",
    "listingRate",
    "finHardCap",
    "finMoneyPer",
    "moneyRaised",
    "tokensSold",
    "devCommission",
    "devCommissionInToken",
    "startTime",
    "endTime",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "investors",
  ];
  //✅ Step6: Map the data to the key
  const dataMainSubscription = parsedDataSub.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keySubscription.length; i++) {
      if (item) {
        obj[Web3keySubscription[i]] = item[i];
      } else {
        obj[Web3keySubscription[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //🚀 Auction

  if (!web2DataAuction) {
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
  const Web3keyAuction = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "burnOrRefund",
    "burnedOrRefunded",
    "vestingEnabled",
    "devFeeInToken",
    "auctionFinalized",
    "tokensToSell",
    "softCap",
    "hardCap",
    "startPrice",
    "endPrice",
    "moneyRaised",
    "actualMoneyRaised",
    "tokensSold",
    "devCommission",
    "devCommissionInToken",
    "minBuy",
    "maxBuy",
    "decPriceCycle",
    "startTime",
    "endTime",
    "lastPrice",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "firstReleasePercentage",
    "vestingPeriod",
    "cycleReleasePercentage",
  ];
  //✅ Step6: Map the data to the key
  const dataMainAuction = parsedDataAuction.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keyAuction.length; i++) {
      if (item) {
        obj[Web3keyAuction[i]] = item[i];
      } else {
        obj[Web3keyAuction[i]] = null;
      }
    }
    return obj;
  });

  //🚀 Fair Launch

  if (!web2DataFair) {
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
  const Web3keyFair = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "fundsCollected",
    "devFeeInToken",
    "softCap",
    "maxBuy",
    "tokensToSell",
    "moneyRaised",
    "devCommission",
    "affiliateCommissionAmount",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "startTime",
    "endTime",
    "affiliateRate",
  ];
  //✅ Step6: Map the data to the key
  const dataMainFair = parsedDataFair.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keyFair.length; i++) {
      if (item) {
        obj[Web3keyFair[i]] = item[i];
      } else {
        obj[Web3keyFair[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //✅ Step7: Decimals & Name & Symbol

  //✔️ Decimals
  //🚀 Presale
  //normal
  const tokenArrayPrivateSale = dataMainPresale.map((item: any) => {
    return item?.token;
  });

  const decimalsPrivateSale = tokenArrayPrivateSale.map(
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

  const decimalPrivateSale = decimalsPrivateSale.map((item: any) => {
    return item?.data;
  });

  //for softcap value
  const tokenArrayDecimalsPrivateSale = dataMainPresale.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsPrivateSale = tokenArrayDecimalsPrivateSale.map(
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

  const purchaseTokenDecimals = purchaseTokenDecimalsPrivateSale.map(
    (item: any) => {
      return item.data;
    }
  );

  //🚀 Auction
  //normal
  const tokenArrayAuction = dataMainAuction.map((item: any) => {
    return item.token;
  });

  const decimalsAuction = tokenArrayAuction.map(
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

  const decimalAuction = decimalsAuction.map((item: any) => {
    return item.data;
  });

  //for softcap value
  const tokenArrayDecimalsAuction = dataMainAuction.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsAuction = tokenArrayDecimalsAuction.map(
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

  const purchaseTokenDecimalsAuctionSoft = purchaseTokenDecimalsAuction.map(
    (item: any) => {
      return item.data || 18;
    }
  );

  //🚀 Fair Launch
  //normal
  const tokenArrayFair = dataMainFair.map((item: any) => {
    return item.token;
  });

  const decimalsFair = tokenArrayFair.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: decimals } = useReadContract({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "decimals",
    });
    // return an object with the data property
    return { data: decimals };
  });

  const decimalFair = decimalsFair.map((item: any) => {
    return item.data;
  });

  //for softcap value
  const tokenArrayDecimalsFair = dataMainFair.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsFair = tokenArrayDecimalsFair.map(
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

  const purchaseTokenDecimalsFairSoft = purchaseTokenDecimalsFair.map(
    (item: any) => {
      return item.data;
    }
  );

  //🚀 Subscription
  //normal
  const tokenArraySub = dataMainSubscription.map((item: any) => {
    return item.token;
  });

  const decimalsSub = tokenArraySub.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: decimals } = useReadContract({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "decimals",
    });
    // return an object with the data property
    return { data: decimals };
  });

  const decimalSub = decimalsSub.map((item: any) => {
    return item.data;
  });

  //for softcap value

  const tokenArrayDecimalsSub = dataMainSubscription.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsSub = tokenArrayDecimalsSub.map(
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

  const purchaseTokenDecimalsSubSoft = purchaseTokenDecimalsSub.map(
    (item: any) => {
      return item.data;
    }
  );

  //✔️ Name
  //🚀 Presale
  const tokenArrayPrivateSaleName = dataMainPresale.map((item: any) => {
    return item.token;
  });

  const namesPrivateSale = tokenArrayPrivateSaleName.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: name } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "name",
      });
      // return an object with the data property
      return { data: name };
    }
  );

  const namePrivateSale = namesPrivateSale.map((item: any) => {
    return item.data;
  });

  //🚀 Auction
  const tokenArrayAuctionName = dataMainAuction.map((item: any) => {
    return item.token;
  });

  const namesAuction = tokenArrayAuctionName.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: name } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "name",
      });
      // return an object with the data property
      return { data: name };
    }
  );

  const nameAuction = namesAuction.map((item: any) => {
    return item.data;
  });

  //🚀 Fair Launch

  const tokenArrayFairName = dataMainFair.map((item: any) => {
    return item.token;
  });

  const namesFair = tokenArrayFairName.map((token: string, index: number) => {
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

  const nameFair = namesFair.map((item: any) => {
    return item.data;
  });

  //🚀 Subscription

  const tokenArraySubName = dataMainSubscription.map((item: any) => {
    return item.token;
  });

  const namesSub = tokenArraySubName.map((token: string, index: number) => {
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

  const nameSub = namesSub.map((item: any) => {
    return item.data;
  });

  //✔️ Symbol
  //🚀 Presale

  const tokenArrayPrivateSaleSymbol = dataMainPresale.map((item: any) => {
    return item.token;
  });

  const symbolsPrivateSale = tokenArrayPrivateSaleSymbol.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: symbol } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "symbol",
      });
      // return an object with the data property
      return { data: symbol };
    }
  );

  const symbolPrivateSale = symbolsPrivateSale.map((item: any) => {
    return item.data;
  });

  const softCapCurrencyTokenArrayPrivateSaleSymbol = dataMainPresale.map(
    (item: any) => {
      return item?.purchaseToken;
    }
  );

  const softCapCurrencySymbolsPrivateSale =
    softCapCurrencyTokenArrayPrivateSaleSymbol.map(
      (token: string, index: number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: symbol } = useReadContract({
          //@ts-ignore
          address: token,
          abi: ERC20Abi,
          functionName: "symbol",
        });
        // return an object with the data property
        return { data: symbol };
      }
    );

  const softCapCurrencySymbolPrivateSale =
    softCapCurrencySymbolsPrivateSale.map((item: any) => {
      return item.data;
    });

  //🚀 Auction

  const tokenArrayAuctionSymbol = dataMainAuction.map((item: any) => {
    return item.token;
  });

  const symbolsAuction = tokenArrayAuctionSymbol.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: symbol } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "symbol",
      });
      // return an object with the data property
      return { data: symbol };
    }
  );

  const symbolAuction = symbolsAuction.map((item: any) => {
    return item.data;
  });

  const softCapCurrencyTokenArrayAuctionSymbol = dataMainAuction.map(
    (item: any) => {
      return item?.purchaseToken;
    }
  );

  const softCapCurrencySymbolsAuction =
    softCapCurrencyTokenArrayAuctionSymbol.map(
      (token: string, index: number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: symbol } = useReadContract({
          //@ts-ignore
          address: token,
          abi: ERC20Abi,
          functionName: "symbol",
        });
        // return an object with the data property
        return { data: symbol };
      }
    );

  const softCapCurrencySymbolAuction = softCapCurrencySymbolsAuction.map(
    (item: any) => {
      return item.data;
    }
  );

  //🚀 Fair Launch
  const tokenArrayFairSymbol = dataMainFair.map((item: any) => {
    return item.token;
  });

  const symbolsFair = tokenArrayFairSymbol.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: symbol } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "symbol",
      });
      // return an object with the data property
      return { data: symbol };
    }
  );

  const symbolFair = symbolsFair.map((item: any) => {
    return item.data;
  });

  const softCapCurrencyTokenArrayFairSymbol = dataMainFair.map((item: any) => {
    return item?.purchaseToken;
  });

  const softCapCurrencySymbolsFair = softCapCurrencyTokenArrayFairSymbol.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: symbol } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "symbol",
      });
      // return an object with the data property
      return { data: symbol };
    }
  );

  const softCapCurrencySymbolFair = softCapCurrencySymbolsFair.map(
    (item: any) => {
      return item.data;
    }
  );

  //🚀 Subscription
  const tokenArraySubSymbol = dataMainSubscription.map((item: any) => {
    return item.token;
  });

  const symbolsSub = tokenArraySubSymbol.map((token: string, index: number) => {
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

  const symbolSub = symbolsSub.map((item: any) => {
    return item.data;
  });

  const softCapCurrencyTokenArraySubSymbol = dataMainSubscription.map(
    (item: any) => {
      return item?.purchaseToken;
    }
  );

  const softCapCurrencySymbolsSub = softCapCurrencyTokenArraySubSymbol.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: symbol } = useReadContract({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "symbol",
      });
      // return an object with the data property
      return { data: symbol };
    }
  );

  const softCapCurrencySymbolSub = softCapCurrencySymbolsSub.map(
    (item: any) => {
      return item.data;
    }
  );

  //✅ Step8: Total Supply
  const totalSupplies = tokenArrayPrivateSale.map((token: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: totalSupply } = useReadContract({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "totalSupply",
    });
    // return an object with the data property
    return { data: totalSupply };
  });

  const totalSupplyString = JSON.stringify(totalSupplies, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const totalSupply = JSON.parse(totalSupplyString).map((item: any) => {
    return item?.data;
  });

  const totalSuppliesAuction = totalSupply[dataIndex];

  //❗Finish Details Logic
  const name = nameAuction[dataIndex];
  const symbolToken = symbolAuction[dataIndex];
  const tokenDecimals = decimalAuction[dataIndex];
  const tokenAddress = dataMainAuction[dataIndex]?.token;
  const tokenTotalSupply = totalSuppliesAuction;
  const tokenForPresale = dataMainAuction[dataIndex]?.tokensToSell;
  const liquidityAdditionPercents =
    dataMainAuction[dataIndex]?.liquidityAdditionPercent;
  const tokenToSell = dataMainAuction[dataIndex]?.tokensToSell;
  const startPrice = dataMainAuction[dataIndex]?.startPrice;
  const endPrice = dataMainAuction[dataIndex]?.endPrice;
  const decreasePriceCycle = dataMainAuction[dataIndex]?.decPriceCycle;

  let purchaseTokenDecimalAuction = !isNaN(purchaseTokenDecimalsAuctionSoft)
    ? 18
    : purchaseTokenDecimalsAuctionSoft;

  const softCap = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal =
      purchaseTokenDecimalsAuctionSoft &&
      purchaseTokenDecimalsAuctionSoft[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const hardCap = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal =
      purchaseTokenDecimalsAuctionSoft &&
      purchaseTokenDecimalsAuctionSoft[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.hardCap / 10 ** TokenDecimal;
  });
  const burnOrRefund = dataMainAuction[dataIndex]?.burnOrRefund;
  const startTime = dataMainAuction[dataIndex]?.startTime;
  const endTime = dataMainAuction[dataIndex]?.endTime;
  const liquidityPercent = dataMainAuction[dataIndex]?.liquidityAdditionPercent;
  const liquidityUnlockTime = dataMainAuction[dataIndex]?.liquidityUnlockTime;
  const imgHref = web2DataPresale[dataIndex]?.logoUrl;
  //❗Chart Logic
  const labels = ["Presale", "Liquidity", "Unlocked"];

  const Presale = (tokenForPresale / tokenTotalSupply) * 100;

  const Liquidity =
    (((liquidityPercent / 100) * tokenToSell) / tokenTotalSupply) * 100;

  const data = [Presale, Liquidity, 100 - Presale - Liquidity];
  const darkTheme = true;

  //❗Card 2 Logic
  const purchaseTokenAddress = dataMainAuction[dataIndex]?.purchaseToken;
  const card2Symbol = symbolAuction[dataIndex];
  const EndTime = dataMainAuction[dataIndex]?.endTime;
  const Index = dataIndex;
  const amountDecimal = tokenDecimals;
  const queryParams = new URLSearchParams(url);
  let AffiliateAddress;
  if (queryParams.has("refId")) {
    const refId = queryParams.get("refId");
    if (refId && /^0x[a-fA-F0-9]{40}$/.test(refId)) {
      AffiliateAddress = refId;
    } else {
      AffiliateAddress = "0x0000000000000000000000000000000000000000";
    }
  } else {
    AffiliateAddress = "0x0000000000000000000000000000000000000000";
  }
  const MoneyRaised = dataMainAuction[dataIndex]?.moneyRaised;

  const softCapCurrency = softCap;
  const softCapHardCapCurrencyAuction = dataMainAuction.map(
    (item: any, index: number) => {
      if (
        item?.purchaseToken !== "0x0000000000000000000000000000000000000000"
      ) {
        return softCapCurrencySymbolAuction[index];
      } else {
        return "ETH";
      }
    }
  );
  //❗Button Logic
  const createTokenAddress = dataMainAuction[dataIndex]?.token;
  const userWalletAddress = address;
  const argsValue = dataIndex;
  const endTimeButton = dataMainAuction[dataIndex]?.endTime;
  const moneyRaised = dataMainAuction[dataIndex]?.moneyRaised;
  const softCapCurrencyButton = softCap;
  const whitelistedEnabled = dataMainAuction[dataIndex]?.whitelistedEnabled;
  //❗Chart Inner Logic
  const chartStartTime = startTime;
  const chartEndTime = endTimeButton;
  const chartStartPrice =
    startPrice / 10 ** purchaseTokenDecimalsAuctionSoft[dataIndex];
  const chartEndPrice =
    endPrice / 10 ** purchaseTokenDecimalsAuctionSoft[dataIndex];
  //❗Side Panel Logic
  const preSaleStartTime = dataMainAuction[dataIndex]?.startTime;
  const preSaleEndTime = dataMainAuction[dataIndex]?.endTime;
  const maximumBuy =
    dataMainAuction[dataIndex]?.maxBuy /
    10 ** purchaseTokenDecimalsAuctionSoft[dataIndex];
  const minimumBuy =
    dataMainAuction[dataIndex]?.minBuy /
    10 ** purchaseTokenDecimalsAuctionSoft[dataIndex];

  //Id FOR DATA of Web2
  const idWeb3Auction = dataIndex + 1;
  const matchingIndex = idWeb2Auction.indexOf(idWeb3Auction);

  const dummylabels = ["Token A", "Token B", "Token C"]; // Dummy labels
  const dummydata = [30, 50, 20]; // Dummy data

  const dummyCardProps = {
    purchaseTokenAddress: "0x1234567890abcdef1234567890abcdef12345678",
    symbolToken: "DUMMY",
    EndTime: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    index: 1,
    amountDecimal: 18,
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
    dataIndex: 0,
    moneyRaised: 5000000000000000000, // 5 DUMMY tokens raised
    softCap: 10000000000000000000, // 10 DUMMY tokens soft cap
    softCapCurrency: "DUMMY",
  };

  const dummyButtonProps = {
    createTokenAddress: "0x1234567890abcdef1234567890abcdef12345678",
    userWalletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
    argsValue: 0,
    endTime: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    moneyRaised: 5000000000000000000, // 5 tokens raised
    softCapCurrency: 500,
    whitelistedEnabled: true,
  };

  const dummyChartProps = {
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    startPrice: 100,
    endPrice: 200,
  };

  const dummySidePanelProps = {
    preSaleStartTime: Math.floor(Date.now() / 1000),
    preSaleEndTime: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
    maximumBuy: 1000,
    minimumBuy: 100,
    softCapCurrency: "ETH",
  };

  return (
    <>
      <div className="lg:flex flex-col mt-8 ">
        <div className="flex-col ">
          <FinishDetails
            tokenName={name || ""}
            symbolToken={symbolToken || "SDK"}
            tokenDecimals={tokenDecimals || 0}
            purchaseTokenDecimal={
              purchaseTokenDecimalsAuctionSoft[dataIndex] || 0
            }
            tokenAddress={tokenAddress || "0x......90"}
            totalSupply={tokenTotalSupply || 0}
            tokenForPresale={tokenForPresale || 0}
            liquidityAdditionPercent={liquidityAdditionPercents || 0}
            tokenToSell={tokenToSell || 0}
            startPrice={startPrice || 0}
            endPrice={endPrice || 0}
            decreasePriceCycle={decreasePriceCycle || 0}
            softCap={softCap[dataIndex] || 0}
            hardCap={hardCap[dataIndex] || 0}
            burnOrRefund={burnOrRefund || false}
            startTime={startTime || 0}
            endTime={endTime || 0}
            liquidityPercent={liquidityPercent || 0}
            liquidityUnlockTime={liquidityUnlockTime || 0}
            dataIndex={dataIndex || 0}
            imgHref={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.logoUrl
                : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
            }
            description={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.description
                : "www.google.com"
            }
            facebook={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.facebook
                : "www.facebook.com"
            }
            twitter={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.twitter
                : "www.twitter.com"
            }
            github={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.github
                : "www.github.com"
            }
            website={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.website
                : "www.google.com"
            }
            instagram={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.instagram
                : "www.instagram.com"
            }
            discord={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.discord
                : "www.discord.com"
            }
            reddit={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.reddit
                : "www.reddit.com"
            }
            youtube={
              matchingIndex !== -1
                ? web2DataAuction[matchingIndex]?.youtube
                : "www.youtube.com"
            }
            softCapCurrency={softCapHardCapCurrencyAuction[dataIndex] || "ETH"}
            hardCapCurrency={softCapHardCapCurrencyAuction[dataIndex] || "ETH"}
          />

          <TokenMetrics
            data={dummydata}
            labels={dummylabels}
            darkTheme={darkTheme}
          />
          <ChartComponent {...dummyChartProps} />
          <Faq />
        </div>
        <div>
          <FinishDisqusWrapper>
            <DisqusComments className="bg-white dark:bg-[#242525] p-4 " />
          </FinishDisqusWrapper>
        </div>
      </div>

      <div>
        <div className="w-full ">
          {/* <Cards2
            purchaseTokenAddress={purchaseTokenAddress}
            symbolToken={card2Symbol}
            EndTime={EndTime}
            index={Index}
            amountDecimal={amountDecimal}
            address={AffiliateAddress}
            dataIndex={dataIndex}
            moneyRaised={MoneyRaised}
            softCap={softCapCurrency[dataIndex]}
            softCapCurrency={softCapHardCapCurrencyAuction[dataIndex]}
          /> */}
          <Cards2 {...dummyCardProps} />
        </div>
        {/* <Button
          createTokenAddress={createTokenAddress}
          userWalletAddress={userWalletAddress}
          argsValue={argsValue}
          endTime={endTimeButton}
          moneyRaised={moneyRaised}
          softCapCurrency={softCapCurrencyButton}
          whitelistedEnabled={whitelistedEnabled}
        /> */}
        <Button {...dummyButtonProps} />
        {/* <ChartComponent
          startTime={chartEndTime}
          endTime={chartStartTime}
          startPrice={chartStartPrice}
          endPrice={chartEndPrice}
        /> */}

        {/* <SidePanel
          preSaleStartTime={preSaleStartTime}
          preSaleEndTime={preSaleEndTime}
          maximumBuy={maximumBuy}
          minimumBuy={minimumBuy}
          softCapCurrency={softCapHardCapCurrencyAuction[dataIndex]}
        /> */}
        <SidePanel {...dummySidePanelProps} />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Auction), { ssr: false });
