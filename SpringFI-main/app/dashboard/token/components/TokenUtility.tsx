import React from "react";

interface TokenUtilityCardProps {
  title: string;
  description: string;
}

const TokenUtilityCard: React.FC<TokenUtilityCardProps> = ({
  title,
  description,
}) => (
  <div
    className="flex flex-col grow justify-center px-8 py-7 w-full font-medium rounded-xl border-solid shadow-md backdrop-blur-[10.472454071044922px] bg-black bg-opacity-50 border-[1.047px] border-white border-opacity-10 min-h-[131px] min-w-[293px] max-md:px-5 bg-cover bg-center"
    style={{ backgroundImage: "url(/temp/Testimonial.png)" }}
  >
    <div className="flex flex-col w-full">
      <h3 className="text-lg text-white">{title}</h3>
      <p className="mt-2 text-base leading-none text-white text-opacity-70">
        {description}
      </p>
      <div className="flex mt-2 w-full rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20_0%,rgba(255,255,255,0.00)_100%))] min-h-[1px]" />
      <div className="flex mt-2 w-full rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20_0%,rgba(255,255,255,0.00)_100%))] min-h-[1px]" />
    </div>
  </div>
);

interface TokenUtilityData {
  title: string;
  description: string;
}

const TokenUtility: React.FC = () => {
  const tokenUtilityData: TokenUtilityData[] = [
    { title: "Platform fees", description: "Decentralised Feature 01" },
    { title: "Revenue share", description: "Decentralised Feature 01" },
    { title: "Staking", description: "Decentralised Feature 01" },
    { title: "Governance", description: "Decentralised Feature 01" },
  ];

  return (
    <section className="flex flex-col rounded-xl max-w-[644px]">
      <header className="w-full max-md:max-w-full">
        <h2 className="self-start text-xl leading-none text-white">
          Token Utility
        </h2>
      </header>
      <div className="mt-5 w-full justify-evenly max-md:max-w-full">
        <div className="flex flex-wrap gap-5  max-md:flex-col">
          {tokenUtilityData.map((data, index) => (
            <div
              key={index}
              className={`flex flex-col w-5/12 mr-8  max-md:w-full `}
            >
              <TokenUtilityCard
                title={data.title}
                description={data.description}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 mt-7 max-w-full h-px border-white w-[622px]" />
    </section>
  );
};

export default TokenUtility;
