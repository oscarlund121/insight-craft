'use client';

import { X, FileText, Zap, PenTool, Globe, BookOpen, BarChart2 } from "lucide-react";

const iconMap = {
  FileText,
  Zap,
  PenTool,
  Globe,
  BookOpen,
  BarChart2,
};

export default function ResourceModal({ modalResource, setModalResource, isTrialExpired }) {
  if (!modalResource) return null;

  const ModalIcon = iconMap[modalResource.icon];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg max-w-md w-full p-5 md:p-6 relative border border-purple-100">
        <button
          onClick={() => setModalResource(null)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Luk"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          {ModalIcon && <ModalIcon className="w-5 h-5 text-purple-600" />}
          <span className="text-sm text-gray-600">{modalResource.category}</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">{modalResource.title}</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{modalResource.description}</p>
        {isTrialExpired ? (
          <p className="text-sm text-red-500">
            Din gratis prøveperiode er udløbet.{" "}
            <a href="/opgrader" className="underline hover:text-red-600 transition-colors">Opgrader for adgang</a>.
          </p>
        ) : (
          <a
            href={modalResource.link}
            target="_blank"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
