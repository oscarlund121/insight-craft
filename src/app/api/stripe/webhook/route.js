import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: "price_1RT7hHGgptWSRgXWFSL3U1fy", // Real Stripe Price ID
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          clerk_user_id: userId,
        },
      },
      success_url: "https://insightcraft.dk/success",
      cancel_url: "https://insightcraft.dk/cancel",
      metadata: {
        clerk_user_id: userId,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
