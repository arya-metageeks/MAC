"use client";
import React, { useState } from "react";
import KeyFeaturesTab from "./KeyFeaturesTab";
import MarketTraction from "./MarketTraction";
import TokenUtility from "./TokenUtility";
import Revenue from "./Revenue";
import TokenMetrics from "./TokenMetrics";

const BottomSection = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabData = [
    {
      text: "Keys Features",
      element: <KeyFeaturesTab />,
    },
    {
      text: "Market Traction",
      element: (
        <MarketTraction
          stats={{
            uniqueUsers: 0,
            totalVolume: 0,
            feesGenerated: 0,
            tvl: 0,
          }}
          partnerships={[]}
        />
      ),
    },
    {
      text: "Utility",
      element: <TokenUtility />,
    },
    {
      text: "Revenue",
      element: <Revenue />,
    },
    {
      text: "Metrics",
      element: <TokenMetrics />,
    },
  ];
  return (
    <div className="w-full">
      <div className="flex gap-3 mb-6">
        {tabData.map((t, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setCurrentTab(i);
              }}
              className={`py-2 px-3 rounded-lg ${
                i == currentTab
                  ? "border-2 border-white"
                  : "white-gradient-border"
              }`}
            >
              {t.text}
            </button>
          );
        })}
      </div>
      <div>{tabData[currentTab].element}</div>
    </div>
  );
};

export default BottomSection;
