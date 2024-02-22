import { ICommentData, IReplyData } from "@/queries/type";
import React, { FC } from "react";
import moment from "moment";
import { FORMAT_DATE } from "@/constants";
import { useCommentItemHooks } from "./hooks";

interface IProps {
  item?: ICommentData;
  isReplay?: boolean;
  itemReply?: IReplyData;
}

const CommentItem: FC<IProps> = ({ item, isReplay, itemReply }) => {
  const {
    isEnableReply,
    toggleEnableReply,
    valueReplay,
    replyList,
    onChangeValueReply,
    onPostReply,
    isLoadMore,
    onLoadMore,
  } = useCommentItemHooks(item);

  return (
    <div className="flex flex-row relativ space-x-3.5">
      <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-primary text-xl font-bold  text-primary">
        {item?.userName.charAt(0)}
        {itemReply?.userName.charAt(0)}
      </div>
      <div className="flex flex-col flex-1 relative">
        <p className="text-sm sm:text-base 2xl:text-lg text-darkGrey font-semibold uppercase">
          {item?.userName}
          {itemReply?.userName}
        </p>
        <div className="flex sm:hidden">
          <p className="text-xs mt-0.5 text-darkGrey font-medium">
            {item &&
              moment(item.createdAt.seconds * 1000).format(
                FORMAT_DATE.formatFullDate
              )}
            {itemReply &&
              moment(itemReply.createdAt.seconds * 1000).format(
                FORMAT_DATE.formatFullDate
              )}
          </p>
        </div>
        <p className="mt-3 text-sm sm:text-base 2xl:text-lg text-primaryText font-medium">
          {item?.comment}
          {itemReply?.reply}
        </p>
        {replyList?.length > 0 && (
          <div className=" flex flex-col mt-4 gap-4">
            {replyList.map((replyData) => (
              <CommentItem key={replyData.id} itemReply={replyData} isReplay />
            ))}
          </div>
        )}
        {isEnableReply && (
          <div className="mt-2">
            <textarea
              value={valueReplay}
              onChange={onChangeValueReply}
              className="min-h-[50px] w-full rounded-md border text-sm sm:text-base 2xl:text-xl border-gray-300 placeholder:text-gray-400"
              placeholder="Say something..."
            />
            <button
              onClick={onPostReply}
              className="w-fit bg-primary text-sm sm:text-base 2xl:text-xl text-white font-medium px-4 py-2 sm:py-1.5 rounded-md"
            >
              Post Reply
            </button>
          </div>
        )}
        {!isReplay && (
          <p
            className="mt-3 text-primary text-xs sm:text-sm 2xl:text-base font-bold cursor-pointer"
            onClick={toggleEnableReply}
          >
            {isEnableReply ? "Cancel" : "Reply"}
          </p>
        )}
        <div className="absolute right-0 top-0 hidden sm:flex">
          <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-darkGrey font-medium">
            {item &&
              moment(item.createdAt.seconds * 1000).format(
                FORMAT_DATE.formatFullDate
              )}
            {itemReply &&
              moment(itemReply.createdAt.seconds * 1000).format(
                FORMAT_DATE.formatFullDate
              )}
          </p>
        </div>
        {/* {replyList?.length > 0 && !isLoadMore && (
          <div className="flex justify-center items-center">
            <button
              onClick={onLoadMore}
              className="w-fit border-2 border-primary rounded-full py-1 px-5 text-sx sm:text-sm 2xl:base text-primary font-medium"
            >
              Show more
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CommentItem;
