'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardCheck, Clipboard, RefreshCw, Share2, Settings, User, Hash, Zap, Briefcase, Smile, Dumbbell, Smartphone, Globe, FileText, Camera, Video, User as UserIcon, Edit } from 'lucide-react';
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";

const toneOptions = [
  { value: "Engagerende", icon: Zap, description: "Fængende og inspirerende" },
  { value: "Professionel", icon: Briefcase, description: "Seriøs og troværdig" },
  { value: "Sjov", icon: Smile, description: "Humoristisk og lettere" },
  { value: "Motiverende", icon: Dumbbell, description: "Inspirerende og kraftfuld" }
];

const platformOptions = [
  { value: "Facebook", icon: Share2, description: "Detaljeret og storytelling" },
  { value: "Instagram", icon: Camera, description: "Visuelt og hashtag-tungt" },
  { value: "LinkedIn", icon: Briefcase, description: "Professionelt og netværk" },
  { value: "Twitter", icon: Hash, description: "Kort og kontant" },
  { value: "TikTok", icon: Video, description: "Trendy og ungdommeligt" },
  { value: "Generisk", icon: Globe, description: "Passer til alle platforme" }
];

const contentTypes = [
  { value: "opslag", label: "Standard opslag", icon: FileText },
  { value: "story", label: "Story indhold", icon: Smartphone },
  { value: "reel", label: "Reel/Video tekst", icon: Video },
  { value: "hashtags", label: "Hashtag forslag", icon: Hash },
  { value: "caption", label: "Billedtekst", icon: Camera },
  { value: "bio", label: "Profil beskrivelse", icon: UserIcon }
];

export default function SocialMediaForm() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Engagerende");
  const [platform, setPlatform] = useState("Instagram");
  const [contentType, setContentType] = useState("opslag");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useCompanyProfile, setUseCompanyProfile] = useState(false);
  const [includeHashtags, setIncludeHashtags] = useState(false);

  const profile = useProfile();

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate-social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        tone,
        platform,
        contentType,
        profile: useCompanyProfile ? profile : null,
        includeHashtags
      }),
    });

    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  const handleGenerateFromProfile = async () => {
    if (!profile) return;
    
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate-social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Generer indhold baseret på virksomhedsprofilen",
        tone,
        platform,
        contentType,
        profile: profile,
        autoGenerate: true,
        includeHashtags
      }),
    });

    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-bl from-pink-50 via-purple-50 to-indigo-50 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left column - Input */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl p-8 border border-white/20 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Share2 className="w-6 h-6 text-pink-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Skab dit indhold</h2>
                  </div>
                  <p className="text-gray-600">Fortæl os hvad du vil dele</p>
                </div>

                {/* Platform selector */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <label className="text-lg font-bold text-gray-900 block mb-3">
                    Vælg platform
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {platformOptions.map((option) => (
                      <motion.label
                        key={option.value}
                        className={`relative flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                          platform === option.value
                            ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 shadow-lg'
                            : 'bg-white/60 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border-2 border-gray-200 hover:border-pink-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="platform"
                          value={option.value}
                          checked={platform === option.value}
                          onChange={(e) => setPlatform(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-8 h-8 mb-2">
                          <option.icon className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="text-xs font-medium text-gray-900 text-center">{option.value}</div>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Content type selector */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <label className="text-lg font-bold text-gray-900 block mb-3">
                    Indholdstype
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contentTypes.map((type) => (
                      <motion.label
                        key={type.value}
                        className={`relative flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                          contentType === type.value
                            ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 shadow-lg'
                            : 'bg-white/60 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border-2 border-gray-200 hover:border-pink-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="contentType"
                          value={type.value}
                          checked={contentType === type.value}
                          onChange={(e) => setContentType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-8 h-8 mb-2">
                          <type.icon className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="text-xs font-medium text-gray-900 text-center">{type.label}</div>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Tone selector */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <label className="text-lg font-bold text-gray-900 block mb-3">
                    Tone of voice
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {toneOptions.map((option) => (
                      <motion.label
                        key={option.value}
                        className={`relative flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          tone === option.value
                            ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 shadow-lg'
                            : 'bg-white/60 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border-2 border-gray-200 hover:border-pink-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="tone"
                          value={option.value}
                          checked={tone === option.value}
                          onChange={(e) => setTone(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-8 h-8 mb-2">
                          <option.icon className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{option.value}</div>
                        <div className="text-xs text-gray-600 text-center">{option.description}</div>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Input textarea */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <label className="text-lg font-bold text-gray-900 block mb-3">
                    Hvad vil du dele?
                  </label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={6}
                    placeholder="Beskriv dit produkt, din tjeneste, begivenhed eller budskab..."
                    className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-lg text-base resize-none transition-all duration-300 hover:shadow-xl"
                  />
                </motion.div>

                {/* Company profile toggle */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="space-y-3"
                >
                  <motion.label 
                    className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white/60 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border border-gray-200 hover:border-pink-300"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input
                      type="checkbox"
                      checked={useCompanyProfile}
                      onChange={(e) => setUseCompanyProfile(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-pink-600" />
                      <span className="text-base font-medium text-gray-900">Brug virksomhedsprofil</span>
                    </div>
                  </motion.label>

                  {/* Hashtag toggle */}
                  {contentType !== 'bio' && (
                    <motion.label 
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white/60 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border border-gray-200 hover:border-pink-300"
                      whileHover={{ scale: 1.01 }}
                    >
                      <input
                        type="checkbox"
                        checked={includeHashtags}
                        onChange={(e) => setIncludeHashtags(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <div className="flex items-center gap-2">
                        <Hash className="w-5 h-5 text-pink-600" />
                        <span className="text-base font-medium text-gray-900">Inkluder hashtags</span>
                      </div>
                    </motion.label>
                  )}
                </motion.div>

                {/* Profile preview */}
                {useCompanyProfile && profile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border border-pink-200 rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-5 h-5 text-pink-600" />
                      <h3 className="font-bold text-pink-800">Din profil anvendes</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      {Array.isArray(profile.specialty) && profile.specialty.length > 0 && (
                        <p><strong>Specialer:</strong> {profile.specialty.join(", ")}</p>
                      )}
                      {Array.isArray(profile.goal) && profile.goal.length > 0 && (
                        <p><strong>Mål:</strong> {profile.goal.join(", ")}</p>
                      )}
                      {profile.targetAudience && (
                        <p><strong>Målgruppe:</strong> {profile.targetAudience}</p>
                      )}
                    </div>
                    <Link href="/profile">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 bg-white/60 hover:bg-white border-pink-200 hover:border-pink-300"
                      >
                        <Settings className="w-4 h-4 mr-2" /> 
                        Rediger profil
                      </Button>
                    </Link>
                  </motion.div>
                )}

                {/* Generate button */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="space-y-3"
                >
                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !input}
                    className="w-full py-4 px-8 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Skaber indhold...
                      </>
                    ) : (
                      <>
                        <Share2 className="w-5 h-5 mr-2" />
                        Skab indhold
                      </>
                    )}
                  </Button>

                  {/* Auto-generate from profile button */}
                  {profile && (
                    <Button
                      onClick={handleGenerateFromProfile}
                      disabled={loading}
                      variant="outline"
                      className="w-full bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200 hover:border-purple-300 text-purple-700 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Genererer...
                        </>
                      ) : (
                        <>
                          <User className="w-5 h-5 mr-2" />
                          Auto-generer fra profil
                        </>
                      )}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Output */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
            className="lg:col-span-7"
          >
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl p-8 border border-white/20 backdrop-blur-sm h-full min-h-[600px]">
              <div className="flex items-center gap-2 mb-6">
                <Share2 className="w-6 h-6 text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-900">Dit indhold</h3>
              </div>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64"
                >
                  <Loader2 className="w-12 h-12 animate-spin text-pink-500 mb-4" />
                  <p className="text-gray-600 font-medium">Skaber dit sociale medie indhold...</p>
                </motion.div>
              )}

              {!loading && !output && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full p-6 mb-4">
                    <Share2 className="w-12 h-12 text-pink-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Klar til at skabe indhold</h4>
                  <p className="text-gray-600">Udfyld formularen og tryk på "Skab indhold" for at få dit sociale medie indhold</p>
                </div>
              )}

              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-8">
                    <div className="prose prose-lg max-w-none">
                      <div 
                        className="text-gray-800 text-base leading-relaxed space-y-4"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          lineHeight: '1.7'
                        }}
                      >
                        {output.split('\n\n').map((paragraph, index) => (
                          <div key={index} className="mb-4">
                            {paragraph.split('\n').map((line, lineIndex) => {
                              // Clean line minimally - only remove asterisks
                              const cleanLine = line
                                .replace(/\*\*([^*]+)\*\*/g, '$1')
                                .replace(/\*([^*]+)\*/g, '$1')
                                .replace(/\*/g, '')
                                .trim();
                              
                              // Check if line looks like a heading (kort linje med store bogstaver eller ender med :)
                              const isHeading = cleanLine.length > 0 && cleanLine.length < 80 && 
                                (cleanLine === cleanLine.toUpperCase() && cleanLine.length > 3 ||
                                 cleanLine.endsWith(':') && !cleanLine.includes('http') ||
                                 /^[A-ZÆØÅ][A-ZÆØÅ\s]{5,}$/.test(cleanLine));
                              
                              // Check if line starts with a number (list item)
                              const isListItem = /^\d+[\.\)]\s/.test(cleanLine);
                              
                              // Check if line starts with dash or bullet (convert to list)
                              const isBulletPoint = /^[\-•]\s/.test(cleanLine);
                              
                              // Check if line starts with hashtag (for social media)
                              const isHashtag = cleanLine.startsWith('#');
                              
                              if (isHeading && cleanLine && !isListItem && !isBulletPoint) {
                                return (
                                  <h3 
                                    key={lineIndex} 
                                    className="text-xl font-bold text-pink-800 mb-3 mt-6 first:mt-0"
                                  >
                                    {cleanLine}
                                  </h3>
                                );
                              } else if (isListItem || isBulletPoint) {
                                const text = cleanLine.replace(/^(\d+[\.\)]|\-|•)\s/, '');
                                const number = isListItem ? cleanLine.match(/^\d+/)?.[0] : '•';
                                return (
                                  <div 
                                    key={lineIndex} 
                                    className="ml-4 mb-2 flex items-start"
                                  >
                                    <span className="text-pink-600 font-semibold mr-3 mt-1 flex-shrink-0">
                                      {number}{isListItem ? '.' : ''}
                                    </span>
                                    <span className="flex-1">
                                      {text}
                                    </span>
                                  </div>
                                );
                              } else if (isHashtag) {
                                return (
                                  <div key={lineIndex} className="mb-3">
                                    <div className="flex flex-wrap gap-2">
                                      {cleanLine.split(' ').map((word, wordIndex) => 
                                        word.startsWith('#') ? (
                                          <span 
                                            key={wordIndex} 
                                            className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-sm font-medium"
                                          >
                                            {word}
                                          </span>
                                        ) : (
                                          <span key={wordIndex}>{word} </span>
                                        )
                                      )}
                                    </div>
                                  </div>
                                );
                              } else if (cleanLine) {
                                return (
                                  <p key={lineIndex} className="mb-3 text-gray-700 leading-relaxed">
                                    {cleanLine}
                                  </p>
                                );
                              }
                              return null;
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 bg-white/60 hover:bg-white border-pink-200 hover:border-pink-300"
                    >
                      {copied ? (
                        <>
                          <ClipboardCheck className="w-4 h-4 mr-2 text-green-600" />
                          Kopieret!
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-4 h-4 mr-2" />
                          Kopiér
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={handleGenerate}
                      variant="outline"
                      className="flex-1 bg-white/60 hover:bg-white border-pink-200 hover:border-pink-300"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generer igen
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
