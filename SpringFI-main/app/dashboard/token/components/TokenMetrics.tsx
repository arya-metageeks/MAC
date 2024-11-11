import React from "react";

interface TokenMetricsProps {}

const TokenMetrics: React.FC<TokenMetricsProps> = () => {
  return (
    <section className="w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col max-md:ml-0 w-full">
          <TokenMetricsTable />
        </div>
        {/* <div className="flex flex-col ml-5 w-[34%] max-md:ml-0 max-md:w-full">
          <PriceTable />
        </div> */}
      </div>
    </section>
  );
};

export default TokenMetrics;

interface TokenMetricsTableProps {}

const TokenMetricsTable: React.FC<TokenMetricsTableProps> = () => {
  const tableData = [
    { label: "Allocation", value: "Allocation", price: "Price" },
    { label: "Seed", value: "2", price: "$0.017" },
    { label: "Private", value: "4", price: "$0.018" },
    { label: "KOL", value: "6", price: "$0.015" },
    { label: "Public", value: "8", price: "$0.015" },
    { label: "Community", value: "10", price: "$0" },
    { label: "Market", value: "12", price: "$0" },
    { label: "Marketing", value: "16", price: "12" },
    { label: "Team", value: "20", price: "$0" },
    { label: "AirDrop", value: "24", price: "$0" },
  ];

  return (
    <div className="flex flex-col w-full text-base leading-loose text-white">
      <h2 className="self-start text-xl mb-4 leading-none">Token Metrics</h2>
      {tableData.map((row, index) => (
        <div key={index} className="flex w-full whitespace-nowrap">
          <div
            className={`flex-1 shrink gap-2.5 self-stretch px-3.5 py-1.5 border-b border-white border-opacity-10 ${
              index == 0 && "text-[#A9A9A9]"
            }`}
          >
            {row.label}
          </div>
          <div
            className={`flex-1 shrink gap-2.5 self-stretch px-3.5 py-1.5 border-b border-white border-opacity-10 ${
              index == 0 && "text-[#A9A9A9]"
            }`}
          >
            {row.value}
          </div>
          <div
            className={`flex-1 shrink gap-2.5 self-stretch px-3.5 py-1.5 border-b border-white border-opacity-10 ${
              index == 0 && "text-[#A9A9A9]"
            }`}
          >
            {row.price}
          </div>
        </div>
      ))}
    </div>
  );
};

interface PriceTableProps {}

const PriceTable: React.FC<PriceTableProps> = () => {
  const priceData = [
    { label: "Price", value: "$0.017" },
    { value: "$0.018" },
    { value: "$0.015" },
    { value: "$0.015" },
    { value: "$0" },
    { value: "$0" },
    { value: "12" },
    { value: "$0" },
    { value: "$0" },
  ];

  return (
    <div className="flex flex-wrap items-start mt-9 w-full text-base font-medium leading-loose text-white whitespace-nowrap rounded-xl h-[316px] shadow-[0px_1px_0px_rgba(0,0,0,0.05)]">
      {priceData.map((item, index) => (
        <div
          key={index}
          className={`flex-1 grow shrink gap-2.5 self-stretch py-1.5 pr-3.5 pl-3.5 border-b border-white border-opacity-10 w-[135px] ${
            index === 0 ? "text-white text-opacity-70" : ""
          }`}
        >
          {item.label || item.value}
        </div>
      ))}
    </div>
  );
};
