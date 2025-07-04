'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function ProfileMultiSelect({ 
  label, 
  options, 
  selected, 
  onToggle, 
  placeholder = "Vælg en eller flere...",
  maxHeight = "max-h-96"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-purple-500" />
        </motion.div>
        <label className="text-lg font-bold text-gray-900">
          {label}
        </label>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${maxHeight} overflow-y-auto custom-scrollbar`}>
          {options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <motion.label 
                className={`group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selected.includes(option)
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg'
                    : 'bg-white/60 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => onToggle(option)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                    selected.includes(option)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                      : 'border-gray-300 group-hover:border-purple-400'
                  }`}>
                    {selected.includes(option) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </div>
                <span className={`text-base font-medium transition-colors duration-300 ${
                  selected.includes(option) ? 'text-purple-800' : 'text-gray-700 group-hover:text-purple-700'
                }`}>
                  {option}
                </span>
                
                {/* Glow effect when selected */}
                {selected.includes(option) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.label>
            </motion.div>
          ))}
        </div>
      </div>
      
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border border-purple-200 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </motion.div>
            <p className="text-sm font-bold text-purple-800">
              Du har valgt {selected.length} {selected.length === 1 ? 'mulighed' : 'muligheder'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selected.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
      `}</style>
    </motion.div>
  );
}
