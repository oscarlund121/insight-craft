"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardCheck, Clipboard } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

export default function NewsletterGenerator() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Venlig");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useCompanyProfile, setUseCompanyProfile] = useState(false);

  const profile = useProfile();

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        tone,
        profile: useCompanyProfile ? profile : null,
      }),
    });

    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Nyhedsbrev Generator</h1>

      <label className="block mb-2">Tone of voice</label>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="border rounded px-3 py-2 mb-4"
      >
        <option>Venlig</option>
        <option>Professionel</option>
        <option>Kreativ</option>
        <option>Formel</option>
      </select>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Hvad skal nyhedsbrevet handle om?"
        className="mb-4"
      />

      <label className="flex items-center mb-4 gap-2">
        <input
          type="checkbox"
          checked={useCompanyProfile}
          onChange={(e) => setUseCompanyProfile(e.target.checked)}
        />
        Brug virksomhedsprofil
      </label>

      <Button onClick={handleGenerate} disabled={loading || !input}>
        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        Generér
      </Button>

      {output && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <pre className="whitespace-pre-line">{output}</pre>
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => {
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? <ClipboardCheck className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
            Kopiér
          </Button>
        </div>
      )}
    </main>
  );
}
