import { ROUTERS } from "@/constants";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { Chapter } from "@/queries/type";
import { useAuthState } from "@/contexts/auth";

interface IProps {
  chapter: Chapter;
}

export const useBirdEyeItemHooks = ({ chapter }: IProps) => {
  const router = useRouter();
  const { profile, onSetProfile } = useAuthState();

  const isMarkedChapter = useMemo(() => {
    return profile?.markedChapters?.includes(chapter.id);
  }, [profile, chapter]);

  const onSelectItem = useCallback(async () => {
    router.push(ROUTERS.chapter + `/${chapter.id}`);
  }, [chapter]);

  return {
    isMarkedChapter,
    onSelectItem,
  };
};
