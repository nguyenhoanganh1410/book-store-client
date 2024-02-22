import { ROUTERS } from "@/constants";
import { useAuthState } from "@/contexts/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const usePurchaseSuccessHooks = () => {
  const { profile } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (profile && profile.isPurchasedCourse) {
      const timeout = setTimeout(() => {
        router.replace(ROUTERS.home);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [router, profile?.isPurchasedCourse]);

  return {

  }
};

export default usePurchaseSuccessHooks;