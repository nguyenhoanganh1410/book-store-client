import { DEFAULT_LIMIT_COMMENTS } from "@/constants";
import { useAuthState } from "@/contexts/auth";
import { db } from "@/firebase";
import { addComment, getComments } from "@/queries/comments";
import { IAddCommentData, ICommentData } from "@/queries/type";
import { toastError } from "@/utils";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useChapterCommentsHooks = () => {
  const { profile, setLoading } = useAuthState();
  const router = useRouter();
  const chapterId = router.query.chapterId as string;

  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [valueComment, setValueComment] = useState<string>("");
  const [listComments, setListComments] = useState<ICommentData[]>([]);

  const onChangeValueComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValueComment(value);
    },
    []
  );

  const onGetComments = useCallback(
    async (limit?: number) => {
      console.log("onGetComments...");
      setLoading(true);
      const comments = await getComments(chapterId, limit);
      setListComments(comments);
      setLoading(false);
      console.log("comments...", comments);
    },
    [chapterId]
  );

  const onLoadMore = useCallback(() => {
    setIsLoadMore(true);
    onGetComments();
  }, []);

  const onPostComment = useCallback(async () => {
    if (profile && valueComment !== "" && chapterId) {
      try {
        const newComment: IAddCommentData = {
          userId: profile.uid,
          userName: profile.firstName + " " + profile.lastName,
          chapterId: chapterId,
          comment: valueComment.trim(),
        };
        setValueComment("");
        await addComment(newComment);
        onGetComments(isLoadMore ? undefined : DEFAULT_LIMIT_COMMENTS);
      } catch (error) {
        toastError("Error while post comment");
      }
    }
  }, [profile, chapterId, valueComment, isLoadMore]);

  useEffect(() => {
    if (profile && chapterId) {
      onGetComments(DEFAULT_LIMIT_COMMENTS);
    }
  }, [chapterId]);

  return {
    isLoadMore,
    listComments,
    valueComment,
    onChangeValueComment,
    onPostComment,
    onLoadMore,
  };
};
