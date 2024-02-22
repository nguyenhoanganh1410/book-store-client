import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { buffer } from "micro";
import admin from "@/firebase/firebaseAdmin";

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", { apiVersion: '2023-08-16' });
  const signature = req.headers["stripe-signature"]!;
  const signingSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_KEY || "";
  const reqBuffer = await buffer(req);

  let event: Stripe.Event;
  const db = admin.firestore();

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const dataSession = event.data.object as Stripe.Checkout.Session;
      const customerDetail = dataSession.customer_details;
      const userDocument = await db
        .collection("users")
        .where("email", "==", customerDetail?.email)
        .get();
      if (userDocument && userDocument.docs && dataSession.payment_status === 'paid') {
        const userId = userDocument.docs[0].id;
        const userRef = db.collection("users").doc(userId);
        await userRef.update({
          isPurchasedCourse: true,
          customerStripeId: dataSession.customer,
        });
      }
    default:
      break;
  }
  res.send({ received: true });
};

export default handler;
