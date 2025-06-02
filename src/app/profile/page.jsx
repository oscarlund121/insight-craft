"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ProfilPage() {
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userProfile"));
    if (stored) {
      setCompany(stored.name || "");
      setType(stored.description || "");
      setSpecialty(stored.specialty || "");
      setGoal(stored.goal || "");
    }
  }, []);

  const handleSave = () => {
    const profile = {
      name: company,
      description: type,
      specialty,
      goal,
    };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">Din virksomhedsprofil</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Virksomhedens navn</label>
          <Input aria-label="input" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Hvilken type virksomhed er det?</label>
          <Input aria-label="input" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Hvad har I speciale i?</label>
          <Textarea rows={3} value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Hvad ønsker I at opnå?</label>
          <Textarea rows={3} value={goal} onChange={(e) => setGoal(e.target.value)} />
        </div>

        <Button onClick={handleSave}>Gem profil</Button>
        {saved && <p className="text-green-600 text-sm mt-2">Profil gemt!</p>}
      </div>
    </main>
  );
}
