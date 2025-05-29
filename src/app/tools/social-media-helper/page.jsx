"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardCheck, Clipboard } from "lucide-react";

const MAX_FREE_REQUESTS = 3;

export default function SocialMediaHelper() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [usageLeft, setUsageLeft] = useState(MAX_FREE_REQUESTS);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const usage = JSON.parse(localStorage.getItem("someUsage")) || {
      count: 0,
      month: new Date().getMonth(),
    };

    if (usage.month !== new Date().getMonth()) {
      localStorage.setItem(
        "someUsage",
        JSON.stringify({ count: 0, month: new Date().getMonth() })
      );
      setUsageLeft(MAX_FREE_REQUESTS);
    } else {
      setUsageLeft(MAX_FREE_REQUESTS - usage.count);
    }

    const checkUserStatus = async () => {
      try {
        const res = await fetch("/api/user-status");
        const data = await res.json();
        setIsPro(data.status === "pro");
      } catch (err) {
        console.error("Fejl ved hentning af brugerstatus:", err);
      }
    };

    checkUserStatus();
  }, []);

  const handleGenerate = async () => {
    const usage = JSON.parse(localStorage.getItem("someUsage")) || {
      count: 0,
      month: new Date().getMonth(),
    };

    if (!isPro && usage.count >= MAX_FREE_REQUESTS) {
      setError("Du har brugt dine 3 gratis genereringer for denne måned.");
      return;
    }

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/generate-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error("Der opstod en fejl under genereringen. Prøv igen.");
      }

      const data = await res.json();
      setOutput(data.result);

      const newUsage = {
        count: usage.count + 1,
        month: usage.month,
      };
      localStorage.setItem("someUsage", JSON.stringify(newUsage));
      setUsageLeft(MAX_FREE_REQUESTS - newUsage.count);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">SoMe Indhold</h1>
      <p className="text-sm text-gray-600 mb-6">
        Skriv hvad du gerne vil fortælle, og få forslag til opslag til LinkedIn, Instagram og Facebook.
      </p>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Skriv fx: Vi lancerer en ny AI-guide målrettet soloselvstændige..."
        rows={5}
        className="mb-4"
      />

      <Button
        onClick={handleGenerate}
        disabled={loading || !input || (!isPro && usageLeft <= 0)}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Generér opslag
      </Button>

      {!isPro && (
        <p className="text-sm text-gray-500 mt-2">
          Du har {usageLeft} gratis generering{usageLeft !== 1 && "er"} tilbage i denne måned.
        </p>
      )}

      {error && (
        <div className="mt-6 text-red-600 bg-red-50 border border-red-200 rounded p-4 text-sm">
          {error}
        </div>
      )}

      {output && (
        <div className="mt-10 bg-gray-50 p-6 rounded-xl border text-sm relative">
          <pre className="whitespace-pre-line">{output}</pre>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Kopiér"
          >
            {copied ? <ClipboardCheck className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
          </button>
        </div>
      )}
    </main>
  );
}
