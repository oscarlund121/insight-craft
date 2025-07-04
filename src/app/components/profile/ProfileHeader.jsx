'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-orange-50 via-pink-100 to-violet-200 py-20 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <User className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Din virksomhedsprofil
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Fortæl os om din virksomhed, så vi kan skræddersy AI-indhold perfekt til dig
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Personaliseret AI-indhold</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
