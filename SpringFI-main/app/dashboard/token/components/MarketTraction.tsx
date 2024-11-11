import React from "react";

interface MarketTractionProps {
  stats: {
    uniqueUsers: number;
    totalVolume: number;
    feesGenerated: number;
    tvl: number;
  };
  partnerships: string[];
}

 const MarketTraction: React.FC<MarketTractionProps> = ({
  stats,
  partnerships,
}) => {
  return (
    <section className="flex flex-col rounded-none max-w-[622px]">
      <h2 className="self-start mb-5 text-xl  leading-none text-white">
        Market Traction
      </h2>
      <Stats stats={stats} />
      <Partnerships partnerships={partnerships} />
    </section>
  );
};

interface StatsProps {
  stats: {
    uniqueUsers: number;
    totalVolume: number;
    feesGenerated: number;
    tvl: number;
  };
}
 const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="self-start mt-1.5 text-base leading-6 text-neutral-400 max-md:max-w-full">
      Stats: {stats.uniqueUsers.toLocaleString()} unique users & growing fast,{" "}
      {stats.totalVolume.toLocaleString()} in total volume,{" "}
      {stats.feesGenerated.toLocaleString()} In fees generated,{" "}
      {stats.tvl.toLocaleString()} in TVL
    </div>
  );
};

interface PartnershipsProps {
  partnerships: string[];
}

 const Partnerships: React.FC<PartnershipsProps> = ({ partnerships }) => {
  return (
    <div className="self-start mt-1.5 text-base leading-6 text-neutral-400 max-md:max-w-full">
      <p>Partnerships: {partnerships.join(", ")}</p>
    </div>
  );
};

export default MarketTraction
