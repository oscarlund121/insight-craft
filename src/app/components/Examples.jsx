'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Examples() {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
        {/* LEFT – Accordion boxes */}
        <div className="md:col-span-6">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-xl border border-gray-200 shadow">
              <AccordionTrigger className="px-5 py-4 text-left text-lg font-semibold text-gray-900">
                Nyhedsbreve
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-gray-700 text-sm">
                Skriv e-mails der åbnes og klikkes på – uden skriveblokering.
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href="/tools/newsletter-generator">
                      Se eksempel <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-xl border border-gray-200 shadow">
              <AccordionTrigger className="px-5 py-4 text-left text-lg font-semibold text-gray-900">
                SEO-tekster
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-gray-700 text-sm">
                Lav lange blogposts og produktbeskrivelser, der rammer både læser og Google.
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href="/tools/seo-optimizer">
                      Se eksempel <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-xl border border-gray-200 shadow">
              <AccordionTrigger className="px-5 py-4 text-left text-lg font-semibold text-gray-900">
                Kampagner & SoMe
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-gray-700 text-sm">
                Skab opslag, stories og CTA'er til sociale medier på få sekunder.
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href="/tools/social-media-helper">
                      Se eksempel <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* RIGHT – Section intro */}
        <div className="md:col-span-6 md:pl-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Indhold uden friktion
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            InsightCraft hjælper dig med at skabe alt det indhold, du har brug for – uden stress, uden tekstblokering, og med AI der forstår din stemme.
          </p>
        </div>
      </div>
    </section>
  );
}
