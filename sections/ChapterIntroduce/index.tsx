import React, { FC } from "react";
import { useChapterIntroduceHooks } from "./hooks";
import { Chapter } from "@/queries/type";

const ChapterIntroduce = ({ chapter }: { chapter?: Chapter }) => {
  const { isMarkedChapter, onClickMark } = useChapterIntroduceHooks();

  return (
    <div className="flex flex-col font-Inter p-6 sm:p-10 bg-white rounded-lg drop-shadow-custom-4-4 space-y-8">
      <div className="text-primaryText font-semibold text-lg sm:text-xl 2xl:text-2xl">
        Chapter {chapter?.indexChapter}
        <p className="inline font-normal"> | </p>
        {chapter?.title}
      </div>
      <p className="text-sm sm:text-base 2xl:text-lg text-primaryText font-normal">
        {chapter?.description}
      </p>
      {!isMarkedChapter && (
        <button
          onClick={onClickMark}
          className="w-full border-2 border-primary rounded-md py-3 text-sm sm:text-base 2xl:text-xl text-primary font-medium"
        >
          Mark as complete
        </button>
      )}
    </div>
  );
};

export default ChapterIntroduce;
