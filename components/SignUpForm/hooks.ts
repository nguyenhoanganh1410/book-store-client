import { LOCAL_STORAGE_KEYS, ROUTERS } from "@/constants";
import { useAuthState } from "@/contexts/auth";
import { ISignUpFormValues } from "@/queries/type";
import { setItemLocalStorage } from "@/utils";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface IProps {
}

export const useSignUpFormHooks = () => {
  const router = useRouter();
  const { signUpWithEmail } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const inititalValues: ISignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  };

  const onClickSignIn = useCallback(() => {
    router.replace(ROUTERS.login);
  }, [router]);

  const onSubmitForm = useCallback(async (values: ISignUpFormValues) => {
    try {
      values.rememberMe && setItemLocalStorage(LOCAL_STORAGE_KEYS.rememberMe, values.rememberMe + "");
      signUpWithEmail(values);
    } catch (error) {
      //@ts-ignore
      toastError(error.message);
    }
  }, []);

  const onResetValueEmail = useCallback((props: FormikProps<ISignUpFormValues>) => () => {
    props.setFieldValue('email', '');
  }, []);

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onToggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);


  return {
    inititalValues,
    showPassword,
    showConfirmPassword,
    onClickSignIn,
    onSubmitForm,
    onResetValueEmail,
    onToggleShowPassword,
    onToggleShowConfirmPassword,
  }
}