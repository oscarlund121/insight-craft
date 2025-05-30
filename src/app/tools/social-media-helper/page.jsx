'use client';

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardCheck, Clipboard, Download, ThumbsUp, ThumbsDown } from "lucide-react";

const MAX_FREE_REQUESTS = 3;

export default function SocialMediaHelper() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Venlig");
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
      localStorage.setItem("someUsage", JSON.stringify({ count: 0, month: new Date().getMonth() }));
      setUsageLeft(MAX_FREE_REQUESTS);
    } else {
      setUsageLeft(MAX_FREE_REQUESTS - usage.count);
    }

    const checkUserStatus = async () => {
      const res = await fetch("/api/user-status");
      const data = await res.json();
      setIsPro(data.status === "pro");
    };

    checkUserStatus();
  }, []);

  const handleGenerate = async () => {
    const usage = JSON.parse(localStorage.getItem("someUsage")) || { count: 0, month: new Date().getMonth() };
    if (!isPro && usage.count >= MAX_FREE_REQUESTS) {
      setError("Du har brugt dine 3 gratis genereringer for denne måned.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/generate-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, tone }),
      });

      if (!res.ok) throw new Error("Der opstod en fejl under genereringen.");

      const data = await res.json();
      setOutput(data.result);

      const newUsage = { count: usage.count + 1, month: usage.month };
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

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "social-content.txt";
    document.body.appendChild(element);
    element.click();
  };

  const examplePrompts = [
    "Vi lancerer en ny e-bog til soloselvstændige",
    "Vi holder udsalg på webshoppen hele weekenden",
    "Vi søger nye samarbejdspartnere indenfor marketing",
  ];

  return (
    <main className="bg-gradient-to-br from-purple-50 to-emerald-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">SoMe Indhold</h1>
        <p className="text-sm text-gray-600 mb-6">
          Skriv hvad du gerne vil fortælle – og få færdige opslag til LinkedIn, Instagram og Facebook.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tone of voice</label>
          <select
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full sm:w-60"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Venlig</option>
            <option>Professionel</option>
            <option>Kreativ</option>
            <option>Formel</option>
          </select>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv fx: Vi lancerer en ny AI-guide målrettet soloselvstændige..."
          rows={5}
          className="mb-4"
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {examplePrompts.map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {ex}
            </button>
          ))}
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !input || (!isPro && usageLeft <= 0)}
          className="mb-4"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Generér opslag
        </Button>

        {!isPro && (
          <div className="text-sm text-gray-500 mb-6">
            Du har <span className="font-semibold">{usageLeft}</span> gratis generering{usageLeft !== 1 && "er"} tilbage i denne måned.
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 text-sm mb-6">
            {error}
          </div>
        )}

        {output && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-sm relative">
            <pre className="whitespace-pre-line text-gray-800">{output}</pre>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={handleCopy}>
                {copied ? <ClipboardCheck className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                Kopiér
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Gem som txt
              </Button>
              <Button variant="ghost">
                <ThumbsUp className="w-4 h-4 mr-1 text-green-600" />
              </Button>
              <Button variant="ghost">
                <ThumbsDown className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        )}

        {!isPro && (
          <div className="text-center mt-10 text-sm text-gray-500">
            <span className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl inline-block border border-yellow-300">
              Opgrader til Pro for ubegrænset adgang
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
