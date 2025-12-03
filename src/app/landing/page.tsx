"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TrendingUp, History, ArrowRight, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// --- Theme Config (Locked to Emerald) ---
const theme = {
  bg: 'bg-white',
  text: 'text-slate-900',
  primary: 'bg-emerald-600 hover:bg-emerald-700',
  primaryForeground: 'text-white',
  secondary: 'bg-slate-100 hover:bg-slate-200',
  secondaryForeground: 'text-slate-900',
  accent: 'text-emerald-600',
  cardBg: 'bg-slate-50',
  cardBorder: 'border-slate-200',
};

// --- Tracking Helper ---
const trackClick = (label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      event_category: 'landing_page',
      event_label: label,
    });
    console.log(`[Analytics] Tracked click: ${label}`);
  } else {
    console.log(`[Analytics] (Mock) Tracked click: ${label}`);
  }
};

// --- Main Component ---

export default function LandingPage() {
  const router = useRouter();

  const handlePrimaryCta = () => {
    trackClick('YES_CTA');
    router.push('/');
  };

  const handleSecondaryCta = () => {
    trackClick('NO_CTA');
    router.push('/');
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans`}>
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Copy Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${theme.cardBg} ${theme.accent} border ${theme.cardBorder}`}>
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Price Comparison
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Stop Tab Switching. <br/><span className="text-emerald-600">Start Saving.</span>
              </h1>
              <p className={`text-lg md:text-xl text-slate-600 max-w-xl`}>
                Compare Amazon, Flipkart, and 10+ other stores in one click. The ultimate mobile price comparison engine is here.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="space-y-6">
                <ValuePillar 
                  icon={<Smartphone className={theme.accent} />}
                  title="All-in-One Dashboard"
                  description="View prices, delivery dates, and exchange offers in one view."
                  theme={theme}
                />
                <ValuePillar 
                  icon={<History className={theme.accent} />}
                  title="Price History Graph"
                  description="See if today is actually a good time to buy."
                  theme={theme}
                />
                <ValuePillar 
                  icon={<CheckCircle2 className={theme.accent} />}
                  title="Verified Sellers Only"
                  description="We only recommend deals from trusted, verified sellers."
                  theme={theme}
                />
            </div>

            {/* CTA Section */}
            <div className={`p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} shadow-sm`}>
              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className={`w-full text-lg h-14 ${theme.primary} ${theme.primaryForeground} shadow-md hover:shadow-lg transition-all`}
                  onClick={handlePrimaryCta}
                >
                  Compare Prices Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="lg"
                  className={`w-full text-sm h-auto py-3 ${theme.secondaryForeground} hover:bg-transparent hover:underline opacity-70 hover:opacity-100`}
                  onClick={handleSecondaryCta}
                >
                  I like opening 20 tabs
                </Button>
              </div>
            </div>
          </div>

          {/* Visual/Image Section */}
          <div className="relative hidden lg:block">
            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent to-emerald-600/10 rounded-3xl -z-10`} />
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 ${theme.cardBorder} aspect-[3/4]`}>
               <Image 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1080&auto=format&fit=crop"
                alt="Multiple phones comparison"
                fill
                className="object-cover"
                priority
               />
               
               {/* Floating Badge Overlay */}
               <div className={`absolute bottom-8 left-8 right-8 p-4 rounded-xl backdrop-blur-md bg-white/90 shadow-lg border border-white/20`}>
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stores Compared</p>
                     <p className="text-2xl font-bold text-emerald-600">10+</p>
                   </div>
                   <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                     <TrendingUp className="w-6 h-6 text-emerald-600" />
                   </div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- Sub-components ---

function ValuePillar({ icon, title, description, theme }: { icon: React.ReactNode, title: string, description: string, theme: any }) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`mt-1 p-2 rounded-lg ${theme.cardBg} border ${theme.cardBorder}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-bold text-lg ${theme.text}`}>{title}</h3>
        <p className={`text-sm leading-relaxed text-slate-600`}>
          {description}
        </p>
      </div>
    </div>
  );
}
