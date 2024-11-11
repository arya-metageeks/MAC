import { cn } from "@/app/utils/Tailwind";
import { ReactNode } from "react";

const CardsWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        (className =
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[3%] gap-y-8 justify-items-center"),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardsWrapper;
