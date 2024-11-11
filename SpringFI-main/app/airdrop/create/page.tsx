"use client";
import React, { useState } from "react";
import CreateAirdropContent from "./components/CreateAirdropContent";
import StepperContainer from "@/components/StepperContainer";
import AirdropAdditionalInformation from "./components/AirdropAdditionalInformation";
import GradientBorderContainer from "@/components/GradientBorderContainer";

const Page = () => {
  const [isFormValid, setIsFormValid] = useState(false);

  const steps = ["Verify Token", "Finish"];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <GradientBorderContainer heading="Create Airdrop">
      <StepperContainer steps={steps}>
        <AirdropAdditionalInformation onStepValidation={handleStepValidation} />
        <CreateAirdropContent onStepValidation={handleStepValidation} />
      </StepperContainer>
    </GradientBorderContainer>
  );
};

export default Page;
