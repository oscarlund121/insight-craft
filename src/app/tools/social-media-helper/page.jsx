"use client";

import React from "react";
import SocialMediaHeader from "@/app/components/tools/social-media/SocialMediaHeader";
import SocialMediaForm from "@/app/components/tools/social-media/SocialMediaForm";

export default function SocialMediaHelper() {
  return (
    <main className="min-h-screen">
      <SocialMediaHeader />
      <SocialMediaForm />
    </main>
  );
}
