import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "../icons/fontawesome";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "@/utils";
import AuthProvider from "@/contexts/auth";
import ChapterProvider from "@/contexts/chapters";
import LockTemplatePage from "@/components/LockPage";

export default function App ({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div>
      <AuthProvider>
        <ChapterProvider>
          <Component {...pageProps} />
        </ChapterProvider>
      </AuthProvider>
      <ToastContainer {...toastConfig} />
    </div>
  );
}
