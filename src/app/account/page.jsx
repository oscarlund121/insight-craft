import { auth } from "@clerk/nextjs/server";
import { checkUserSubscription } from "@/lib/checkSubscription";
import ManageSubscriptionButton from "../components/account/ManageSubscriptionButton";

export default async function AccountPage() {
  const { userId } = await auth();
  const subscription = await checkUserSubscription(userId);

  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-4">Din konto</h1>

      {subscription ? (
        <div>
          <p className="mb-2">Du har et aktivt abonnement.</p>
          <p>
            Status: <strong>{subscription.status}</strong>
          </p>
          <p>
            Næste betaling:{" "}
            <strong>
              {new Date(subscription.current_period_end * 1000).toLocaleDateString("da-DK")}
            </strong>
          </p>
          <ManageSubscriptionButton />
        </div>
      ) : (
        <p>Du har ikke et aktivt abonnement.</p>
      )}
    </main>
  );
}
