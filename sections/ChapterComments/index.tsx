import React, { FC } from "react";
import { useChapterCommentsHooks } from "./hooks";
import CommentItem from "@/components/CommentItem";
import { Chapter } from "@/queries/type";
import { DEFAULT_LIMIT_COMMENTS } from "@/constants";

const ChapterComments = ({ chapter }: { chapter?: Chapter }) => {
  const {
    isLoadMore,
    listComments,
    valueComment,
    onChangeValueComment,
    onPostComment,
    onLoadMore,
  } = useChapterCommentsHooks();

  return (
    <div className="flex flex-col font-Inter p-6 sm:p-10 bg-white rounded-lg drop-shadow-custom-4-4 space-y-8">
      <p className="text-primaryText font-semibold text-lg sm:text-xl 2xl:text-2xl">
        Comments ({listComments?.length || 0})
      </p>
      <textarea
        value={valueComment}
        onChange={onChangeValueComment}
        className="min-h-[100px] w-full rounded-md border text-sm sm:text-base 2xl:text-xl border-gray-300 placeholder:text-gray-400"
        placeholder="Say something..."
      />
      <button
        onClick={onPostComment}
        className="w-fit bg-primary text-sm sm:text-base 2xl:text-xl text-white font-medium px-4 py-2 sm:py-1.5 rounded-md"
      >
        Post Comment
      </button>
      {listComments && listComments.length > 0 &&
        listComments.map((commentData) => (
          <CommentItem key={commentData.id} item={commentData} />
        ))}
      {listComments && listComments.length >= DEFAULT_LIMIT_COMMENTS && !isLoadMore && (
        <div className="flex justify-center items-center">
          <button
            onClick={onLoadMore}
            className="w-fit border-2 border-primary rounded-full py-2 px-10 text-sm sm:text-base 2xl:text-xl text-primary font-medium"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterComments;
