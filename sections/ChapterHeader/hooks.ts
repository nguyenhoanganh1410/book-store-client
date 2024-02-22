import { ROUTERS } from "@/constants";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { useAuthState } from "@/contexts/auth";
import { useChapterState } from "@/contexts/chapters";

export const useChapterHeaderHooks = () => {
  const router = useRouter();
  const { chapters } = useChapterState();


  const chapterId = router.query.chapterId as string;

  const indexChapter = useMemo(() => {
    return chapters && chapters.findIndex((it) => it.id === chapterId);
  }, [chapters, chapterId]);

  const isFirstChapter = useMemo(() => {
    return indexChapter === 0;
  }, [chapterId, chapters, indexChapter]);

  const isLastChapter = useMemo(() => {
    return indexChapter === (chapters && chapters.length - 1);
  }, [chapterId, indexChapter]);

  const onPreviousChapter = useCallback(() => {
    const chapter = chapters?.[indexChapter - 1];
    router.push(ROUTERS.chapter + `/${chapter.id}`);
  }, [chapterId, chapters, indexChapter]);

  const onNextChapter = useCallback(() => {
    const chapter = chapters?.[indexChapter + 1];
    router.push(ROUTERS.chapter + `/${chapter.id}`);
  }, [chapterId, chapters]);

  const onBack = useCallback(() => {
    router.replace(ROUTERS.home);
  }, []);

  return {
    isFirstChapter,
    isLastChapter,
    chapterId,
    onBack,
    onPreviousChapter,
    onNextChapter,
  };
};
