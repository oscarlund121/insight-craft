import Stripe from "stripe";
import { clerkClient } from "@clerk/clerk-sdk-node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function checkUserSubscription(userId) {
  const user = await clerkClient.users.getUser(userId);
  const customerId = user.publicMetadata.stripeCustomerId;

  if (!customerId || typeof customerId !== "string") return null;

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
  });

  const activeSub = subscriptions.data.find(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

  return activeSub || null;
}
