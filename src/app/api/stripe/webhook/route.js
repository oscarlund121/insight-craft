import { headers } from "next/headers";
/* import { Webhook } from "svix"; */
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const clerkUserId = session.metadata?.clerk_user_id;
    const customerId = session.customer;

    if (clerkUserId && customerId) {
      await clerkClient.users.updateUserMetadata(clerkUserId, {
        publicMetadata: {
          stripeCustomerId: customerId,
        },
      });
    }
  }

  return new Response("OK", { status: 200 });
}
