import { BirdEyeItem } from "@/components";
import React, { FC } from "react";
import { useBirdsEyeOverviewHooks } from "./hooks";
import { useChapterState } from "@/contexts/chapters";

interface IProps {}

const BirdsEyeOverview: FC<IProps> = () => {
  const { chapters } = useChapterState();

  return (
    <div className="p-6 grid-cols-1 sm:p-10 overflow-hidden w-full space-y-8 md:space-y-0 grid md:grid-cols-2 md:gap-x-4 md:gap-y-8 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:gap-x-8 xl:gap-y-10 2xl:gap-x-10 2xl:gap-y-14">
      {chapters &&
        chapters.map((chapter, index) => (
          <BirdEyeItem key={chapter.id} index={index} item={chapter} />
        ))}
    </div>
  );
};

export default BirdsEyeOverview;
