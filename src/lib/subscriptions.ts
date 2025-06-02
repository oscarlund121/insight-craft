import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28" as any, // eller bare fjern linjen
});

export async function checkUserHasSubscription() {
  const { userId } = await auth();
  if (!userId) return false;

  const user = await clerkClient.users.getUser(userId);
  const customerId = user.publicMetadata.stripeCustomerId;

  if (!customerId || typeof customerId !== "string") return false;

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
  });

  const active = subscriptions.data.find(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

  return !!active;
}
