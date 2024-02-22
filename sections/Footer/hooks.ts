// import { sendEmail } from "@/lib/sendgrid";
import { IFooterFormValues } from "@/queries/type";
import { toastSuccess } from "@/utils";
import { useCallback, useState } from "react";


export const useFooterHooks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: IFooterFormValues = {
    email: "",
    fullName: "",
    adventure: "",
  };

  const onSubmitForm = useCallback(async (values: IFooterFormValues, helpers: any) => {
    if(loading) return;
    try {
      setLoading(true);
      await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(values)
      });
      helpers.resetForm();
      toastSuccess('Information sent successfully!');
    } catch (error) {
      //@ts-ignore
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    initialValues,
    loading,
    onSubmitForm,
  }
}