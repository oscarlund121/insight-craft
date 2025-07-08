import { auth } from "@clerk/nextjs/server";
import { getSupabaseClient } from "@/lib/supabase";



export async function POST(req) {
  try {
    const { userId } = auth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Ikke logget ind" }), {
        status: 401,
      });
    }

    const supabase = getSupabaseClient();
    const body = await req.json();
    const { type, prompt, result } = body;

    if (!type || !result) {
      console.error("Manglende data:", body);
      return new Response(JSON.stringify({ error: "Ugyldige data" }), {
        status: 400,
      });
    }

    const { error } = await supabase.from("saved_tools").insert({
      user_id: userId,
      type,
      prompt,
      result,
    });

    if (error) {
      console.error("Supabase-fejl:", error);
      return new Response(JSON.stringify({ error: "Database-fejl" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Intern serverfejl:", err);
    return new Response(JSON.stringify({ error: "Intern fejl" }), {
      status: 500,
    });
  }
}
