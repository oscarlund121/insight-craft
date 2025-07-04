'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardCheck, Clipboard, RefreshCw, Sparkles, Settings, User, Mail, Smile, Briefcase, Palette, FileText, Lightbulb, Shuffle, TrendingUp, MessageSquare, Wrench, Edit3, Save, Zap, Play, Brain } from 'lucide-react';
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";

const toneOptions = [
  { value: "Venlig", icon: Smile, description: "Varm og imødekommende" },
  { value: "Professionel", icon: Briefcase, description: "Formel og troværdig" },
  { value: "Kreativ", icon: Palette, description: "Innovativ og inspirerende" },
  { value: "Formel", icon: FileText, description: "Struktureret og seriøs" },
  { value: "Entusiastisk", icon: Sparkles, description: "Energisk og begejstret" },
  { value: "Personlig", icon: User, description: "Intimt og nært" },
  { value: "Humoristisk", icon: Smile, description: "Let og underholdende" },
  { value: "Ekspert", icon: Settings, description: "Autoritativ og vidende" },
  { value: "Inspirerende", icon: Lightbulb, description: "Motiverende og opløftende" },
  { value: "Casual", icon: User, description: "Afslappet og uformel" }
];

const newsletterTypes = [
  { value: "standard", label: "Standard nyhedsbrev", icon: Mail, description: "Traditionelt format med nyheder og opdateringer" },
  { value: "produktlancering", label: "Produktlancering", icon: Sparkles, description: "Præsenter nye produkter eller tjenester" },
  { value: "kundehistorier", label: "Kundehistorier", icon: User, description: "Del succeshistorier og testimonials" },
  { value: "tips-guide", label: "Tips & Guide", icon: FileText, description: "Uddannelsesindhold og brugbare råd" },
  { value: "brandhygge", label: "Behind the Scenes", icon: Settings, description: "Indblik i virksomheden og teamet" },
  { value: "seasonal", label: "Sæsonindhold", icon: Palette, description: "Tilpasset årstider eller begivenheder" },
  { value: "trendspotting", label: "Trendspotting", icon: TrendingUp, description: "Analyser af trends og markedsudvikling" },
  { value: "ekspertinterview", label: "Ekspertinterview", icon: MessageSquare, description: "Q&A med brancheeksperter eller ledere" },
  { value: "problemløsning", label: "Problemløsning", icon: Wrench, description: "Fokus på konkrete udfordringer og løsninger" }
];

const contentStructures = [
  { value: "klassisk", label: "Klassisk struktur", description: "Intro, hovedindhold, afslutning" },
  { value: "listicle", label: "Liste format", description: "Nummererede punkter eller tips" },
  { value: "storytelling", label: "Fortællende", description: "Narrativ struktur med historier" },
  { value: "qa", label: "Spørgsmål & Svar", description: "FAQ eller interview format" },
  { value: "sammenligning", label: "Sammenligning", description: "Før/efter eller produkt sammenligninger" },
  { value: "casestudy", label: "Case Study", description: "Dybdegående analyse af konkret eksempel" },
  { value: "howto", label: "How-to Guide", description: "Step-by-step instruktioner og tutorials" },
  { value: "roundup", label: "Roundup/Sammendrag", description: "Oversigt over flere emner eller trends" }
];

const inspirationPrompts = [
  "Skriv om de 5 største udfordringer din branche står overfor i 2024",
  "Del en kundes transformation fra problem til succes",
  "Sammenlign din løsning med traditonelle metoder - hvad er anderledes?",
  "Fortæl historien bag dit nyeste produkt eller feature",
  "Giv læserne 7 konkrete tips de kan bruge i dag",
  "Interview en ekspert om fremtidens trends i jeres branche",
  "Afslør 3 myter der holder folk tilbage fra at nå deres mål",
  "Del behind-the-scenes fra jeres seneste projekt eller event",
  "Lav en guide til at komme i gang med [dit speciale]",
  "Analyser en aktuel trend og hvad den betyder for din målgruppe",
  "Fortæl om en fejl I lærte meget af, og hvad andre kan tage med",
  "Sammenlign før og efter resultater fra en af jeres cases"
];

export default function NewsletterForm() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("Venlig");
  const [newsletterType, setNewsletterType] = useState("standard");
  const [contentStructure, setContentStructure] = useState("klassisk");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useCompanyProfile, setUseCompanyProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableOutput, setEditableOutput] = useState("");

  const profile = useProfile();

  const getRandomInspiration = () => {
    const randomPrompt = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
    setInput(randomPrompt);
  };

  const surpriseMe = async () => {
    const res = await fetch("/api/generate-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        surpriseMe: true
      }),
    });

    const data = await res.json();
    
    // Backend returnerer kun indstillinger - ingen genereret indhold
    if (data.settings) {
      setNewsletterType(data.settings.newsletterType);
      setTone(data.settings.tone);
      setContentStructure(data.settings.contentStructure);
      setInput(data.settings.prompt);
    }
  };

  const quickStart = async () => {
    const res = await fetch("/api/generate-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quickStart: true
      }),
    });

    const data = await res.json();
    
    // Backend returnerer kun indstillinger - ingen genereret indhold
    if (data.settings) {
      setNewsletterType(data.settings.newsletterType);
      setTone(data.settings.tone);
      setContentStructure(data.settings.contentStructure);
      setInput(data.settings.prompt);
    }
  };

  const smartSetup = async () => {
    // Aktivér automatisk virksomhedsprofil hvis den ikke er aktiv
    if (!useCompanyProfile) {
      setUseCompanyProfile(true);
    }
    
    // Kun virker hvis profil eksisterer
    if (!profile || !profile.company) {
      console.log('Smart Setup failed: No profile or company');
      return;
    }

    console.log('Smart Setup called with profile:', profile);

    const res = await fetch("/api/generate-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: profile,
        smartSetup: true
      }),
    });

    const data = await res.json();
    console.log('Smart Setup response:', data);
    
    // Backend returnerer kun indstillinger - ingen genereret indhold
    if (data.settings) {
      setNewsletterType(data.settings.newsletterType);
      setTone(data.settings.tone);
      setContentStructure(data.settings.contentStructure);
      setInput(data.settings.prompt);
      console.log('Settings applied:', data.settings);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Gem ændringerne
      setOutput(editableOutput);
      setIsEditing(false);
    } else {
      // Start redigering
      setEditableOutput(output);
      setIsEditing(true);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        tone,
        newsletterType,
        contentStructure,
        profile: useCompanyProfile ? profile : null,
        autoGenerate: false
      }),
    });

    const data = await res.json();
    setOutput(data.result);
    setEditableOutput(data.result); // Synkroniser redigerbar version
    setLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-2"
    >
      <div className="w-full mx-auto">
  

        {/* Simple 50/50 Layout - Form Left, Output Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[calc(100vh-150px)]">
          
          {/* Left Half - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg p-6 border border-white/20 backdrop-blur-sm overflow-y-auto"
          >
            <div className="space-y-6">
              
              {/* Input Section */}
              <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">Beskriv dit nyhedsbrev</h3>
                </div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={4}
                  placeholder="Hvad skal nyhedsbrevet handle om? Beskriv emnet, målgruppen, eller specifikke punkter..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm text-sm resize-none transition-all duration-300"
                />
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getRandomInspiration}
                    title="Få tilfældig inspiration til dit nyhedsbrev med forslag til emner og vinkler"
                    className="bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700 text-xs"
                  >
                    <Lightbulb className="w-3 h-3 mr-1" />
                    Inspiration
                  </Button>
                  
                  <Button 
                    onClick={surpriseMe}
                    variant="outline"
                    size="sm"
                    title="Lad AI vælge en tilfældig kombination af type, tone, struktur og emne for dig"
                    className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700 text-xs"
                  >
                    <Shuffle className="w-3 h-3 mr-1" />
                    Surprise Setup
                  </Button>

                  <Button 
                    onClick={quickStart}
                    variant="outline"
                    size="sm"
                    title="Få en hurtig og velprøvet kombination af indstillinger baseret på bedste praksis"
                    className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 text-xs"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Quick Setup
                  </Button>

                  <Button 
                    onClick={smartSetup}
                    variant="outline"
                    size="sm"
                    disabled={!profile || !profile.company}
                    title={profile && profile.company ? "Få intelligente forslag baseret på din virksomhedsprofil og branche" : "Kræver en udfyldt virksomhedsprofil"}
                    className={`${profile && profile.company ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'} text-xs`}
                  >
                    <Brain className="w-3 h-3 mr-1" />
                    Smart Setup
                  </Button>
                </div>
              </div>

              {/* Company Profile - flyttet op */}
              <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-purple-100">
                <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300">
                  <input
                    type="checkbox"
                    checked={useCompanyProfile}
                    onChange={(e) => setUseCompanyProfile(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Brug virksomhedsprofil</span>
                  </div>
                </label>

                {useCompanyProfile && profile && (
                  <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-xs text-purple-700 space-y-2">
                      {profile.company && (
                        <div>
                          <span className="font-semibold">Firma:</span> {profile.company}
                        </div>
                      )}
                      {Array.isArray(profile.specialty) && profile.specialty.length > 0 && (
                        <div>
                          <span className="font-semibold">Specialer:</span> {profile.specialty.join(", ")}
                        </div>
                      )}
                      {profile.industry && (
                        <div>
                          <span className="font-semibold">Branche:</span> {profile.industry}
                        </div>
                      )}
                      {profile.targetAudience && (
                        <div>
                          <span className="font-semibold">Målgruppe:</span> {profile.targetAudience}
                        </div>
                      )}
                      {profile.businessType && (
                        <div>
                          <span className="font-semibold">Virksomhedstype:</span> {profile.businessType}
                        </div>
                      )}
                      {profile.companySize && (
                        <div>
                          <span className="font-semibold">Virksomhedsstørrelse:</span> {profile.companySize}
                        </div>
                      )}
                      {profile.location && (
                        <div>
                          <span className="font-semibold">Lokation:</span> {profile.location}
                        </div>
                      )}
                      {profile.description && (
                        <div>
                          <span className="font-semibold">Beskrivelse:</span> {profile.description.length > 100 ? profile.description.substring(0, 100) + "..." : profile.description}
                        </div>
                      )}
                    </div>
                    <Link href="/profile">
                      <Button variant="outline" size="sm" className="mt-3 text-xs h-7">
                        Rediger profil
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Newsletter Type */}
              <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">Type</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {newsletterTypes.slice(0, 6).map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        newsletterType === type.value
                          ? 'bg-purple-100 border-2 border-purple-400 shadow-md'
                          : 'bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="newsletterType"
                        value={type.value}
                        checked={newsletterType === type.value}
                        onChange={(e) => setNewsletterType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-center w-8 h-8 mr-3 bg-purple-100 rounded-lg">
                        <type.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tone & Structure */}
              <div className="grid grid-cols-2 gap-4">
                {/* Tone */}
                <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-purple-100 h-96">
                  <div className="flex items-center gap-2 mb-4">
                    <Smile className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Tone</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-1 h-80 overflow-y-auto">
                    {toneOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          tone === option.value
                            ? 'bg-purple-100 border-2 border-purple-400 shadow-md'
                            : 'bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tone"
                          value={option.value}
                          checked={tone === option.value}
                          onChange={(e) => setTone(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-6 h-6 mr-2 bg-purple-100 rounded-lg">
                          <option.icon className="w-3 h-3 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{option.value}</div>
                          <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Structure */}
                <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-purple-100 h-96">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Indholdstruktur</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-1 h-80 overflow-y-auto">
                    {contentStructures.map((structure) => (
                      <label
                        key={structure.value}
                        className={`relative flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          contentStructure === structure.value
                            ? 'bg-purple-100 border-2 border-purple-400 shadow-md'
                            : 'bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contentStructure"
                          value={structure.value}
                          checked={contentStructure === structure.value}
                          onChange={(e) => setContentStructure(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-6 h-6 mr-2 bg-purple-100 rounded-lg">
                          <FileText className="w-3 h-3 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{structure.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{structure.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !input}
                  title="Generer et komplet nyhedsbrev baseret på dine valgte indstillinger og beskrivelse"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                      Genererer nyhedsbrev...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 mr-2" />
                      Generér nyhedsbrev
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Half - Output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-purple-50/20 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-purple-50/30 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dit nyhedsbrev</h3>
                  <p className="text-sm text-gray-600">Klar til at dele</p>
                </div>
              </div>
              
              {output && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(isEditing ? editableOutput : output);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="bg-white hover:bg-gray-50 border-gray-200"
                  >
                    {copied ? (
                      <ClipboardCheck className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                      <Clipboard className="w-4 h-4 mr-2" />
                    )}
                    {copied ? "Kopieret!" : "Kopiér"}
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEditToggle}
                    className="bg-white hover:bg-gray-50 border-gray-200"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" /> 
                        Gem
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" /> 
                        Rediger
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="mb-6">
                    <Sparkles className="w-16 h-16 text-purple-500 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">AI skaber dit nyhedsbrev</h3>
                  <p className="text-gray-600 text-lg">Dette tager kun få sekunder...</p>
                </div>
              ) : output ? (
                isEditing ? (
                  // Redigeringstilstand - vis textarea
                  <div className="h-full">
                    <Textarea
                      value={editableOutput}
                      onChange={(e) => setEditableOutput(e.target.value)}
                      className="w-full h-full min-h-[400px] p-4 border border-gray-300 rounded-lg text-gray-800 leading-relaxed resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Rediger dit nyhedsbrev her..."
                    />
                  </div>
                ) : (
                  // Visningstilstand - formateret indhold
                  <div className="space-y-4">
                  {output.split('\n\n').map((paragraph, index) => (
                    <div key={index}>
                      {paragraph.split('\n').map((line, lineIndex) => {
                        const cleanLine = line.trim();
                        
                        const isHeading = cleanLine.length > 0 && cleanLine.length < 80 && 
                          (cleanLine === cleanLine.toUpperCase() && cleanLine.length > 3 ||
                           cleanLine.endsWith(':') && !cleanLine.includes('http') ||
                           /^[A-ZÆØÅ][A-ZÆØÅ\s]{5,}$/.test(cleanLine));
                        
                        const isListItem = /^\d+[\.\)]\s/.test(cleanLine);
                        const isBulletPoint = /^[\-•]\s/.test(cleanLine);
                        const isSignature = cleanLine.includes('Med venlig hilsen');
                        
                        if (isHeading && cleanLine && !isListItem && !isBulletPoint) {
                          return (
                            <h3 
                              key={lineIndex} 
                              className="text-2xl font-bold text-purple-800 mb-4 mt-8 first:mt-0"
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
                              className="ml-6 mb-3 flex items-start bg-purple-50/50 p-3 rounded-lg"
                            >
                              <span className="text-purple-600 font-bold mr-4 mt-1 flex-shrink-0 text-lg">
                                {number}{isListItem ? '.' : ''}
                              </span>
                              <span className="flex-1 text-lg text-gray-800 leading-relaxed">
                                {text}
                              </span>
                            </div>
                          );
                        } else if (isSignature) {
                          return (
                            <div 
                              key={lineIndex} 
                              className="mt-10 pt-6 border-t-2 border-purple-200 bg-purple-50/30 p-4 rounded-lg"
                            >
                              <p className="text-purple-700 font-semibold italic text-lg">
                                {cleanLine}
                              </p>
                            </div>
                          );
                        } else if (cleanLine) {
                          return (
                            <p key={lineIndex} className="mb-4 text-gray-800 leading-relaxed text-lg">
                              {cleanLine}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full p-12 mb-8">
                    <Mail className="w-20 h-20 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Klar til at skabe</h3>
                  <p className="text-gray-600 text-xl max-w-md leading-relaxed">Udfyld formularen til venstre og lad AI skabe dit perfekte nyhedsbrev</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
