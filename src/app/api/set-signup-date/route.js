import { clerkClient, auth } from "@clerk/nextjs/server";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        signupDate: new Date().toISOString().split("T")[0],
      },
    });
    return new Response("Signup date set", { status: 200 });
  } catch (err) {
    console.error("Failed to set signup date", err);
    return new Response("Error setting signup date", { status: 500 });
  }
}
