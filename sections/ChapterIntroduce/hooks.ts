import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "@/contexts/auth";
import { getUser, updateUser } from "@/queries/users";
import { UserData } from "@/queries/type";

export const useChapterIntroduceHooks = () => {
  const router = useRouter();
  const chapterId = router.query.chapterId as string;
  const { profile, onSetProfile } = useAuthState();

  const isMarkedChapter = useMemo(() => {
    return profile?.markedChapters?.includes(chapterId);
  }, [profile, chapterId]);

  const onClickMark = useCallback(async () => {
    if (profile?.uid) {
      const userData = (await getUser(profile.uid)) as UserData;
      const markedChapters = userData?.markedChapters || [];
      if (!markedChapters?.includes(chapterId)) {
        const res = await updateUser(profile.uid, {
          markedChapters: [...markedChapters, chapterId],
        });
        console.log("res", res);
        const userData = await getUser(profile.uid);
        userData && onSetProfile(userData as UserData);
      }
    }
  }, []);

  return {
    isMarkedChapter,
    onClickMark,
  };
};
