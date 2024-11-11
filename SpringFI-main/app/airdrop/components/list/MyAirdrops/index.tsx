import React, { useEffect, useState } from "react";
import AirDrop from "./../../AirDropCard";
import {
  airdropAbi,
  airdropAddress,
} from "@/constants/Ethereum/createConstants";
import { useReadContract } from "wagmi";
import dynamic from "next/dynamic";
import CardsWrapper from "../../CardsWrapper";

interface airdropProps {
  id: number[];
  imgHref: string[];
  title: string[];
  token: string[];
  totalTokens: number[];
  participants: number[];
  starTime: number[];
  selectedIndices: number[];
  idWeb2privsales: number[];
  idWeb3Presale: any;
  web2Data: any;
  airdropDatas: any;
}

const MyAirdrops = ({
  id,
  imgHref,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  selectedIndices,
  idWeb2privsales,
  idWeb3Presale,
  web2Data,
  airdropDatas,
}: airdropProps) => {
  //✅ Step0: Return Length of the Array
  const { data: returnLength } = useReadContract({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   enqueueSnackbar(`Error creating presale ${error}`, {
    //     variant: "error",
    //   });
    // },
  });
  const [airDropLength, setAirDropLength] = useState<any>(
    returnLength?.toString(),
  );
  useEffect(() => {
    setAirDropLength(returnLength?.toString());
  }, []);

  const dataLength: any = airDropLength;
  const number = parseInt(dataLength);
  return (
    <div>
      <CardsWrapper>
        {selectedIndices.map((index: number) => {
          const idWeb3AirDrop = index + 1;
          const matchingIndex = idWeb2privsales.indexOf(idWeb3AirDrop);
          return (
            <AirDrop
              currency={"BNB"}
              key={index || 0}
              id={id[index] || 0}
              imgHref={
                matchingIndex !== -1
                  ? web2Data[matchingIndex]?.logoUrl
                  : "/PlaceHolder.svg"
              }
              title={title[index] || "AirDrop 1"}
              token={token[index] || "Token 1"}
              totalTokens={totalTokens[index] || 100}
              participants={participants[index] || 100}
              starTime={starTime[index] || 100}
              bg={
                matchingIndex !== -1
                  ? web2Data[matchingIndex]?.bgLogoUrl
                  : "/PlaceholderCardBg.png"
              }
            />
          );
        })}
      </CardsWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MyAirdrops), { ssr: false });
