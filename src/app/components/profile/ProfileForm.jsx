'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ProfileMultiSelect from './ProfileMultiSelect';
import { Save, CheckCircle } from 'lucide-react';

// Foruddefinerede valg
const virksomhedstyper = [
  "Konsulentvirksomhed",
  "E-commerce/Webshop", 
  "Software/Tech",
  "Sundhed/Wellness",
  "Marketing/Reklame",
  "Finans/Økonomi",
  "Ejendom",
  "Restaurant/Catering",
  "Fitness/Sport",
  "Uddannelse",
  "Håndværk",
  "Detailhandel",
  "Service",
  "Andet"
];

const specialer = {
  "Konsulentvirksomhed": ["Strategi", "HR", "IT-rådgivning", "Marketing", "Økonomi", "Ledelse", "Proces-optimering"],
  "E-commerce/Webshop": ["Mode", "Elektronik", "Hjem & Have", "Sport", "Skønhed", "Mad & Drikke", "Børn"],
  "Software/Tech": ["Webudvikling", "App udvikling", "AI/ML", "Cybersikkerhed", "Cloud", "Data analyse", "SaaS"],
  "Sundhed/Wellness": ["Fysioterapi", "Massage", "Coaching", "Ernæring", "Mental sundhed", "Alternativ behandling"],
  "Marketing/Reklame": ["SEO", "SoMe marketing", "Content marketing", "PPC", "Branding", "PR", "Email marketing"],
  "Finans/Økonomi": ["Regnskab", "Investering", "Forsikring", "Skat", "Pension", "Rådgivning"],
  "Ejendom": ["Mægling", "Udlejning", "Ejendomsservice", "Vurdering", "Investering"],
  "Restaurant/Catering": ["Restaurant", "Catering", "Take-away", "Food truck", "Bar/Café"],
  "Fitness/Sport": ["Personlig træning", "Gruppetræning", "Yoga", "Pilates", "Crossfit", "Sportsmassage"],
  "Uddannelse": ["Kurser", "Workshops", "Online undervisning", "Coaching", "Certificering"],
  "Håndværk": ["VVS", "El", "Maler", "Tømrer", "Service", "Renovering"],
  "Detailhandel": ["Butik", "Online salg", "Grossist", "Import/Export"],
  "Service": ["Rengøring", "IT-support", "Vedligeholdelse", "Konsultation"]
};

const maal = [
  "Øge salget",
  "Få flere kunder", 
  "Styrke brand awareness",
  "Forbedre kundeservice",
  "Optimere processer",
  "Ekspandere til nye markeder",
  "Digitalisere forretningen",
  "Reducere omkostninger",
  "Forbedre medarbejdertilfredshed",
  "Blive mere bæredygtig",
  "Lancere nye produkter",
  "Forbedre online tilstedeværelse"
];

export default function ProfileForm() {
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [specialty, setSpecialty] = useState([]);
  const [goal, setGoal] = useState([]);
  const [targetAudience, setTargetAudience] = useState("");
  const [values, setValues] = useState("");
  const [saved, setSaved] = useState(false);
  
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  // Hjælpefunktioner til multi-select
  const handleSpecialtyToggle = (spec) => {
    setSpecialty(prev => 
      prev.includes(spec) 
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  const handleGoalToggle = (selectedGoal) => {
    setGoal(prev => 
      prev.includes(selectedGoal) 
        ? prev.filter(g => g !== selectedGoal)
        : [...prev, selectedGoal]
    );
  };

  // Opdater specialer når type ændres
  useEffect(() => {
    if (type && specialer[type]) {
      setAvailableSpecialties(specialer[type]);
      setSpecialty(prev => prev.filter(s => specialer[type].includes(s)));
    } else {
      setAvailableSpecialties([]);
    }
  }, [type]);

  // Hent gemt profil
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        const stored = JSON.parse(storedProfile);
        setCompany(stored.company || stored.name || "");
        setType(stored.type || stored.description || "");
        
        setSpecialty(
          Array.isArray(stored.specialty) 
            ? stored.specialty 
            : stored.specialty ? [stored.specialty] : []
        );
        setGoal(
          Array.isArray(stored.goal) 
            ? stored.goal 
            : stored.goal ? [stored.goal] : []
        );
        
        setTargetAudience(stored.targetAudience || "");
        setValues(stored.values || "");
      } catch (error) {
        console.error("Fejl ved parsing af profil data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    const profile = {
      company,
      type,
      specialty,
      goal,
      targetAudience,
      values,
      // Bevar bagudkompatibilitet
      name: company,
      description: type,
    };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Opret din virksomhedsprofil
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fortæl os om din virksomhed, så vi kan skræddersy det perfekte indhold til dig
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Venstre kolonne - Form inputs */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  Grundlæggende info
                </h2>
                
                <div className="space-y-6">
                  {/* Virksomhedens navn */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="text-sm font-semibold text-gray-900 block mb-3">
                      Virksomhedens navn *
                    </label>
                    <Input 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Indtast virksomhedens navn"
                      className="text-base bg-white/70 border-2 border-gray-200 focus:border-purple-400 rounded-xl h-12"
                    />
                  </motion.div>

                  {/* Virksomhedstype */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="text-sm font-semibold text-gray-900 block mb-3">
                      Hvilken type virksomhed er det? *
                    </label>
                    <select 
                      value={type} 
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 text-base h-12 appearance-none cursor-pointer hover:border-purple-300 transition-colors"
                    >
                      <option value="">Vælg virksomhedstype...</option>
                      {virksomhedstyper.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>
              </motion.div>

              {/* Målgruppe og værdier */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  Målgruppe & værdier
                </h2>
                
                <div className="space-y-6">
                  {/* Målgruppe */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="text-sm font-semibold text-gray-900 block mb-3">
                      Hvem er jeres målgruppe? *
                    </label>
                    <Input 
                      value={targetAudience} 
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="F.eks. små virksomheder, private kunder, B2B..."
                      className="text-base bg-white/70 border-2 border-gray-200 focus:border-blue-400 rounded-xl h-12"
                    />
                  </motion.div>

                  {/* Værdier */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="text-sm font-semibold text-gray-900 block mb-3">
                      Jeres værdier/DNA <span className="text-gray-500 font-normal">(valgfrit)</span>
                    </label>
                    <Textarea 
                      rows={4} 
                      value={values} 
                      onChange={(e) => setValues(e.target.value)}
                      placeholder="F.eks. bæredygtighed, innovation, kvalitet, kundefokus..."
                      className="text-base bg-white/70 border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Gem knap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-4"
              >
                <Button 
                  onClick={handleSave}
                  disabled={!company || !type || !targetAudience}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-lg h-14 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Profil gemt!
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6" />
                      Gem min profil
                    </>
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Højre kolonne - MultiSelect komponenter */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  Specialer & mål
                </h2>
                
                <div className="space-y-8">
                  {/* Specialer - kun vis hvis type er valgt */}
                  {availableSpecialties.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <ProfileMultiSelect
                        label="Hvad har I speciale i?"
                        options={availableSpecialties}
                        selected={specialty}
                        onToggle={handleSpecialtyToggle}
                        maxHeight="max-h-64"
                      />
                    </motion.div>
                  )}

                  {/* Mål */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <ProfileMultiSelect
                      label="Hvad ønsker I at opnå?"
                      options={maal}
                      selected={goal}
                      onToggle={handleGoalToggle}
                      maxHeight="max-h-64"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Info box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">💡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Tip til bedre resultater</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Jo mere detaljeret information du giver om din virksomhed, 
                      des bedre kan vores AI-værktøjer skræddersy indhold, der passer 
                      præcis til din målgruppe og brandidentitet.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
