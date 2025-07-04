'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Heart, MessageCircle } from 'lucide-react';

export default function SocialMediaHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-pink-50 via-purple-100 to-indigo-200 py-20 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <motion.div 
            className="bg-white rounded-full p-4 shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Share2 className="w-8 h-8 text-pink-600" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Social Media Helper
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Skab virale opslag der engagerer og inspirerer dit publikum på sociale medier
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-600" />
            <span className="text-sm text-gray-700">Engagerende</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700">Interaktivt</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
