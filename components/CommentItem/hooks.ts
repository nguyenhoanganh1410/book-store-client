import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IAddReplyData, ICommentData, IReplyData } from "@/queries/type";
import { addReply, getReplies } from "@/queries/comments";
import { toastError } from "@/utils";
import { useAuthState } from "@/contexts/auth";
import { useRouter } from "next/router";

export const useCommentItemHooks = (item?: ICommentData) => {
  const { profile, setLoading } = useAuthState();
  const router = useRouter();
  const chapterId = router.query.chapterId as string;

  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [isEnableReply, setIsEnableReply] = useState<boolean>(false);
  const [valueReplay, setValueReply] = useState<string>("");
  const [replyList, setReplyList] = useState<IReplyData[]>([]);

  const toggleEnableReply = useCallback(
    () => setIsEnableReply((prevState) => !prevState),
    []
  );

  const onChangeValueReply = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValueReply(value);
    },
    []
  );

  const onGetReplies = useCallback(
    async (limit?: number) => {
      if (item) {
        try {
          setLoading(true);
          const replies = await getReplies(item?.id);
          setReplyList(replies);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    },
    [profile, item]
  );

  const onLoadMore = useCallback(() => {
    setIsLoadMore(true);
    onGetReplies();
  }, []);

  const onPostReply = useCallback(async () => {
    if (profile && valueReplay !== "" && chapterId && item) {
      try {
        setLoading(true);
        const newReply: IAddReplyData = {
          userId: profile.uid,
          userName: profile.firstName + " " + profile.lastName,
          chapterId: chapterId,
          commentId: item.id,
          reply: valueReplay.trim(),
        };
        setValueReply("");
        await addReply(newReply);
        await onGetReplies();
      } catch (error) {
        toastError("Error while post reply");
      } finally {
        setLoading(false);
      }
    }
  }, [profile, chapterId, valueReplay, item]);

  useEffect(() => {
    onGetReplies();
  }, [onGetReplies]);

  return {
    isEnableReply,
    toggleEnableReply,
    valueReplay,
    replyList,
    onChangeValueReply,
    onPostReply,
    isLoadMore,
    onLoadMore,
  };
};
