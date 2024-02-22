import { ROUTERS } from "@/constants";
import { useAuthState } from "@/contexts/auth";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

export const useNavBarHooks = () => {
  const router = useRouter();
  const { profile, logout } = useAuthState();

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const onGoHome = useCallback(() => {
    router.replace(ROUTERS.home);
  }, []);

  const renderAvatarName = useMemo(() => {
    if (profile) {
      const firstNameCharacter = profile.firstName.charAt(0);
      const lastNameCharacter = profile.lastName.charAt(0);
      return firstNameCharacter + lastNameCharacter;
    }
    return "";
  }, [profile]);

  const toggleMenu = useCallback(() => {
    setIsOpenMenu((prevState) => !prevState);
  }, []);

  return {
    renderAvatarName,
    profile,
    logout,
    onGoHome,
    isOpenMenu,
    toggleMenu,
  };
};
