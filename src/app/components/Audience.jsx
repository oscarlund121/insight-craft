'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  ShoppingCart,
  Video,
} from 'lucide-react';

export default function Audience() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white via-pink-50 to-purple-50 py-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
        {/* LEFT SIDE – heading and intro */}
        <div className="md:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Hvem bruger InsightCraft?
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-700">
            InsightCraft er skabt til moderne professionelle, der vil arbejde hurtigere, smartere – og mere kreativt.
          </p>
        </div>

        {/* RIGHT SIDE – audience boxes */}
        <div className="md:col-span-7 grid gap-6 md:grid-cols-2">
          <AudienceBox
            icon={<User className="w-6 h-6 text-purple-600" />}
            title="Freelancere"
            description="Brug mindre tid på copy og mere på kundeværdi. Lav bedre indhold – hurtigere."
          />
          <AudienceBox
            icon={<Briefcase className="w-6 h-6 text-indigo-600" />}
            title="Små virksomheder"
            description="Lav din egen markedsføring uden bureau. Få output der føles skræddersyet."
          />
          <AudienceBox
            icon={<ShoppingCart className="w-6 h-6 text-pink-600" />}
            title="E-commerce ejere"
            description="Automatisér produktbeskrivelser, SEO, kampagner og nyhedsbreve med få klik."
          />
          <AudienceBox
            icon={<Video className="w-6 h-6 text-teal-600" />}
            title="Content creators & coaches"
            description="Lav nyhedsbreve, e-bøger, reels og workshops med din stemme – og AI som assistent."
          />
        </div>
      </div>
    </motion.section>
  );
}

function AudienceBox({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-100 rounded-full p-2">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
