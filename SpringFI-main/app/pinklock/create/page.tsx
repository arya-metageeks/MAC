import React from "react";
import Pinklock from "./section/CreateLock";
import GradientBorderContainer from "@/components/GradientBorderContainer";

const page = () => {
  return (
    <div>
      <GradientBorderContainer heading="Create PinkLock">
        <Pinklock />
      </GradientBorderContainer>
    </div>
  );
};

export default page;
