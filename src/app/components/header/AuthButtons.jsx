"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function AuthButtons() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal" asChild>
            <button className="text-sm hover:text-black">Log ind</button>
          </SignInButton>

          <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
            <button className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition shadow">
              Start gratis
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
