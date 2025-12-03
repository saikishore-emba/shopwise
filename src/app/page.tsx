"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Smartphone, ArrowRight, Star, ShieldCheck, Zap, CheckCircle2, History, Play, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// --- Theme Config (Emerald) ---
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
      event_category: 'home_page',
      event_label: label,
    });
    console.log(`[Analytics] Tracked click: ${label}`);
  } else {
    console.log(`[Analytics] (Mock) Tracked click: ${label}`);
  }
};

// --- Components ---

function WaitlistDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    trackClick('WAITLIST_FORM_SUBMIT');

    try {
      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzd3zWwqDc5rw4ZDMr9SWJqs3Y6nS4jn5Ab6lzfOhwYmZaeb46pqs6wf-t8i3KEwcjv/exec';
      
      // Send data to Google Apps Script
      // mode: 'no-cors' is used to bypass CORS restrictions common with GAS Web Apps
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, timestamp: new Date().toISOString() }),
      });
      
      console.log('Form Submitted to Sheets:', { name, email });
      
      toast({
        title: "You're on the list!",
        description: "Thanks for joining. We'll be in touch soon.",
        duration: 5000,
      });
      
      onOpenChange(false);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Early Access</DialogTitle>
          <DialogDescription>
            Join the waitlist to get notified when we launch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                'Get Early Access'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AppHeader({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">ShopWise</span>
        </Link>
        
        {/* Right side actions */}
        <div className="flex items-center gap-6">
          <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors hidden md:block">
            How it Works
          </Link>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            onClick={() => {
              trackClick('HEADER_CTA_CLICK');
              onOpenWaitlist();
            }}
          >
            Get Early Access
          </Button>
        </div>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 container mx-auto px-4 text-center bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900">How ShopWise Works</h2>
      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 relative group hover:shadow-md transition-all">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">1</div>
          <h3 className="font-bold text-xl mb-4 mt-6 text-slate-900">Search Product</h3>
          <p className="text-slate-600 leading-relaxed">Enter the name of the gadget you want to buy. We support all major electronics.</p>
        </div>
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 relative group hover:shadow-md transition-all">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">2</div>
          <h3 className="font-bold text-xl mb-4 mt-6 text-slate-900">Compare Prices</h3>
          <p className="text-slate-600 leading-relaxed">We instantly scan Amazon, Flipkart, Croma, and others to find the best deal.</p>
        </div>
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 relative group hover:shadow-md transition-all">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">3</div>
          <h3 className="font-bold text-xl mb-4 mt-6 text-slate-900">Save Money</h3>
          <p className="text-slate-600 leading-relaxed">Click the link to the cheapest store and save thousands on your purchase.</p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} ${theme.text} font-sans`}>
      <AppHeader onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      
      <main className="flex-1">
        {/* Search Focused Hero */}
        <section className="relative py-20 md:py-32 container mx-auto px-4 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-40 pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
             <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
          </div>

          <div className="grid place-items-center gap-12">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 mb-8">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Price Comparison Engine
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
                Stop Tab Switching. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Start Saving.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Compare Amazon, Flipkart, and 10+ other stores in one click. Find the absolute lowest price for your next gadget instantly.
              </p>

              {/* Primary CTA Button (Replaces Search) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button 
                  size="lg"
                  className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all rounded-full"
                  onClick={() => {
                    trackClick('HERO_CTA_CLICK');
                    setIsWaitlistOpen(true);
                  }}
                >
                  Get Early Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="font-medium text-slate-700">Supported Stores:</span>
                <span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600"/> Amazon</span>
                <span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600"/> Flipkart</span>
                <span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600"/> Croma</span>
                <span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600"/> Reliance Digital</span>
              </div>
            </div>

            {/* Removed explainer video placeholder to streamline hero */}
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Newsletter */}
        <section className="py-20 container mx-auto px-4">
          <div className={`rounded-3xl bg-emerald-900 p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl`}>
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800 mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Never Miss a Price Drop</h2>
              <p className="text-emerald-100 mb-10 text-lg leading-relaxed">Join 50,000+ smart shoppers. Get instant alerts when your favorite gadgets hit their lowest price.</p>
              <div className="flex justify-center">
                <Button 
                  className="bg-white text-emerald-900 hover:bg-emerald-50 h-14 px-8 font-bold rounded-full transition-transform active:scale-95 shadow-lg"
                  onClick={() => {
                    trackClick('NEWSLETTER_CTA_CLICK');
                    setIsWaitlistOpen(true);
                  }}
                >
                  Get Early Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <p className="mt-6 text-xs text-emerald-400/60">No spam, ever. Unsubscribe anytime.</p>
            </div>
            
            {/* Abstract Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
               <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full blur-3xl mix-blend-overlay"></div>
               <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400 rounded-full blur-3xl mix-blend-overlay"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </div>
  );
}
