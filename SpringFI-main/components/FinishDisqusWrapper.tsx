import DetailContainer from "@/components/DetailContainer";
import { ReactNode } from "react";

const FinishDisqusWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <DetailContainer>
      <div
        className={`mt-6 -ms-1 mb-6 mx-4  text-xl font-medium py-4 flex flex-col text-white w-full items-left gap-x-28 dark:bg-stone-600/25 h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-600/25 rounded-2xl`}
      >
        {children}
      </div>
    </DetailContainer>
  );
};

export default FinishDisqusWrapper;
