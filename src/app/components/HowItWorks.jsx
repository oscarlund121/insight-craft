'use client';

import { motion } from 'framer-motion';
import {
  Wand2,
  FileText,
  Edit3,
  Share2,
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Wand2 className="w-6 h-6 text-purple-700" />,
      title: 'Vælg et værktøj',
      description: 'Fx nyhedsbrev, SEO-indhold eller opslag til SoMe.',
      bgColor: 'bg-purple-100',
    },
    {
      icon: <FileText className="w-6 h-6 text-emerald-700" />,
      title: 'Indtast stikord',
      description: 'Fortæl kort hvad du vil sige – AI’en klarer resten.',
      bgColor: 'bg-emerald-100',
    },
    {
      icon: <Edit3 className="w-6 h-6 text-purple-700" />,
      title: 'Redigér & tilpas',
      description: 'Få et fuldt udkast og gør det til dit eget.',
      bgColor: 'bg-purple-100',
    },
    {
      icon: <Share2 className="w-6 h-6 text-emerald-700" />,
      title: 'Brug og del',
      description: 'Gem, kopier eller send – direkte fra platformen.',
      bgColor: 'bg-emerald-100',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-purple-50 via-white to-emerald-50 py-28 px-6"
    >
      <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto text-left">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`rounded-xl p-6 shadow-md hover:shadow-lg transition border border-white/40 backdrop-blur-md ${step.bgColor}`}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow mb-4">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
