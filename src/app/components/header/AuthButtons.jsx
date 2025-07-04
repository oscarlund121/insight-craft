"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-3">
          <SignInButton mode="modal" asChild>
            <Button 
              variant="ghost"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hover:bg-gray-100 rounded-lg"
            >
              Log ind
            </Button>
          </SignInButton>

          <SignUpButton mode="modal" afterSignUpUrl="/dashboard" asChild>
            <Button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5">
              Start gratis
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="relative">
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200"
              }
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}
