"use client"

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export default function LandingPage1() {
  const toastState = useToast();

  const handleGetApp = () => {
    const title = "Download starting";
    const description = "Your download will begin shortly.";
    if (toastState && (toastState as any).toast) {
      (toastState as any).toast({ title, description });
    } else {
      // fallback
      // eslint-disable-next-line no-alert
      alert(title + " - " + description);
    }
  };

  return (
    <ToastProvider>
      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Too Busy to Learn? Not Anymore.</h1>
          <p className="mt-4 text-lg text-slate-600">The world's best articles, videos, and trends—distilled into 60-word summaries. Stay ahead of your industry while you wait for your coffee.</p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="border rounded-lg p-6 flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="2" y="6" width="20" height="12" rx="2" fill="#F1F5F9"/>
                <text x="12" y="15" fontSize="10" textAnchor="middle" fill="#94A3B8">20</text>
              </svg>
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Old Way</div>
              <h3 className="mt-2 font-semibold">Long, boring article</h3>
              <div className="mt-1 text-sm text-slate-500">20 min read</div>
            </div>
          </div>

          <div className="rounded-lg p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-md flex items-center justify-center">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="3" fill="white" fillOpacity="0.08"/>
                  <path d="M7 12c1-3 6-3 7 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm opacity-90">Mikrolearn Way</div>
                <h3 className="mt-2 text-xl font-semibold">Sleek mobile card</h3>
                <div className="mt-1 text-sm opacity-90">1 min read</div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <button onClick={handleGetApp} className="inline-flex items-center gap-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-5 rounded-xl shadow-lg text-lg md:text-xl">
            <span>GET THE APP</span>
            <small className="text-sm md:text-base opacity-90">(It takes 5 seconds)</small>
          </button>
          <div className="mt-3 text-sm text-slate-500">Free forever. No credit card required.</div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Mikrolearn?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg text-center">
              <div className="mb-3 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="#0F172A" strokeWidth="1.2" fill="#F8FAFC" />
                  <path d="M12 7v5l3 2" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="font-semibold">Zero Fluff.</h4>
              <p className="mt-2 text-sm text-slate-600">We strip away the jargon and intro paragraphs. Just the core insight.</p>
            </div>

            <div className="p-4 border rounded-lg text-center">
              <div className="mb-3 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="3" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.2"/>
                  <path d="M8 12c1-2 6-2 8 0" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="font-semibold">AI + Human Curation.</h4>
              <p className="mt-2 text-sm text-slate-600">Our AI finds the trends; our experts verify the facts.</p>
            </div>

            <div className="p-4 border rounded-lg text-center">
              <div className="mb-3 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="9" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.2"/>
                  <path d="M7 12h10" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M16 8l4-4" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4 className="font-semibold">Personalized Feed.</h4>
              <p className="mt-2 text-sm text-slate-600">Love UX but hate Coding? We get it. Your feed adapts to what you actually read.</p>
            </div>
          </div>
        </section>

        <footer className="pt-8 border-t" />
      </div>
      <ToastViewport />
    </main>
    </ToastProvider>
  );
}
