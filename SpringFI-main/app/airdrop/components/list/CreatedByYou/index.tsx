import React, { useEffect, useState } from "react";
import AirDrop from "./../../AirDropCard";
import {
  airdropAbi,
  airdropAddress,
} from "@/constants/Ethereum/createConstants";
import {  useReadContract } from "wagmi";
import dynamic from "next/dynamic";
import { notifyError } from "@/app/utils/notify";
import CardsWrapper from "../../CardsWrapper";

interface airdropProps {
  id: number[];
  imgHref: string[];
  title: string[];
  token: string[];
  totalTokens: number[];
  participants: number[];
  starTime: number[];
  selectedIndices2: number[];
  idWeb2privsales: number[];
  idWeb3Presale: any;
  web2Data: any;
  airdropDatas: any;
}

const CreatedByYou = ({
  id,
  imgHref,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  selectedIndices2,
  idWeb2privsales,
  airdropDatas,
  web2Data,
}: airdropProps) => {
  //✅ Step0: Return Length of the Array
  const { data: returnLength } = useReadContract({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "returnLength",
    // onError(error: any) {
    //   console.log("Error", error);
    //   notifyError(`Error creating presale ${error}`);
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
      <CardsWrapper>
        {selectedIndices2.map((item: any, index: any) => {
          const idWeb3AirDrop = index + 1;
          const matchingIndex = idWeb2privsales.indexOf(idWeb3AirDrop);

          return (
            <AirDrop
              currency={"BNB"}
              key={index || 0}
              id={id[index] || 0}
              imgHref={
                matchingIndex !== -1
                  ? web2Data[index]?.logoUrl
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
  );
};

export default dynamic(() => Promise.resolve(CreatedByYou), { ssr: false });
