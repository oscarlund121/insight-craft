import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response(JSON.stringify({ status: "free" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await clerkClient.users.getUser(userId);
    const plan = user.publicMetadata?.plan || "free";

    return new Response(JSON.stringify({ status: plan }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("user-status error", err);
    return new Response(JSON.stringify({ status: "error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
