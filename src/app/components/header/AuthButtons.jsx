"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal" asChild>
            <Button variant="ghost">
              Log ind
            </Button>
          </SignInButton>

          <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
            <Button>
              Start gratis
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
