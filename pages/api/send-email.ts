// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '../../lib/sendgrid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sendEmail(
      process.env.NEXT_PUBLIC_EMAIL_TO as string,
      'Journey Authentically',
      JSON.parse(req.body)
    );
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
