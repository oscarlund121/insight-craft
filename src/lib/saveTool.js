// src/lib/saveTool.js
import { getSupabaseClient } from "./supabase";
import { getAuth } from "@clerk/nextjs/server";

export async function saveTool({ title, content, req }) {
  const { userId } = getAuth(req);

  if (!userId) throw new Error("Bruger ikke logget ind");

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("saved_tools").insert([
    {
      user_id: userId,
      title,
      content,
    },
  ]);

  if (error) throw error;
  return data;
}
