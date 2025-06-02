"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Clipboard, ClipboardCheck } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";


export default function SeoOptimizer() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Professionel");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [twoProfile, setTwoProfile] = useState(false);
 
  
    const profile = useProfile();

    

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate-seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        tone,
        profile: twoProfile ? profile : null,
      }),
    });

    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">SEO-Optimering</h1>

      <div className="mb-4">
        <label className="block mb-1">Tone of voice</label>
        <select
          className="border rounded px-3 py-2"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option>Professionel</option>
          <option>Kreativ</option>
          <option>Formel</option>
          <option>Informativ</option>
        </select>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        placeholder="Skriv hvad din side handler om ..."
        className="mb-4"
      />

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="useProfile"
          checked={twoProfile}
          onChange={(e) => setTwoProfile(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="useProfile" className="text-sm">
          Brug virksomhedsprofil
        </label>
      </div>

      <Button onClick={handleGenerate} disabled={loading || !input}>
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Generér SEO
      </Button>

      {output && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <pre className="whitespace-pre-line">{output}</pre>
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="mt-3"
          >
            {copied ? (
              <ClipboardCheck className="w-4 h-4 mr-2" />
            ) : (
              <Clipboard className="w-4 h-4 mr-2" />
            )}
            Kopiér
          </Button>
        </div>
      )}
    </main>
  );
}
