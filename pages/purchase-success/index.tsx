import { Container } from "@/components";
import withAuth from "@/components/AuthHOC";
import { NextPage } from "next";
import usePurchaseSuccessHooks from "./hooks";
import Lottie from "lottie-react";
import checkDoneAnimation from "@/public/lotties/check_done.json";

const PurchaseSuccessPage: NextPage = () => {
  const { } = usePurchaseSuccessHooks();
  return (
    <Container
      headTitle="Purchase Success"
      className="flex flex-col items-center justify-center h-screen bg-lightWhite space-y-1"
    >
      <div className="relative w-20 h-20">
        <Lottie animationData={checkDoneAnimation} loop={false} />
      </div>
      <p className="text-primaryText font-semibold text-2xl">Thanks for your payment</p>
      <p className="text-primaryText font-normal text-base">We will direct you to all courses now. Let's go!</p>
    </Container>
  );
};

export default withAuth(PurchaseSuccessPage, "all");
