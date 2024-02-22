import { IFooterFormValues } from '@/queries/type';
import sgMail from '@sendgrid/mail';

export const sendEmail = async (
  to: string,
  subject: string,
  data: IFooterFormValues
) => {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

  const msg = {
    to,
    from: process.env.NEXT_PUBLIC_EMAIL_FROM as string,
    subject,
    html: `<p style={{color: black}}>Email: ${data.email}<p/></br /><p style={{color: black}}>Full name: ${data.fullName}<p/></br /><p style={{color: black}}>Adventure: ${data.adventure}<p/>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};
