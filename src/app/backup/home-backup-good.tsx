"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Smartphone, ArrowRight, Star, ShieldCheck, Zap, CheckCircle2, History } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/footer';

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

// --- Mock Data ---
const trendingDeals = [
  {
    id: 1,
    name: "iPhone 15 (128GB)",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop",
    bestPrice: "₹65,999",
    store: "Amazon",
    savings: "₹4,000",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Samsung S24 Ultra",
    image: "https://images.unsplash.com/photo-1706606991536-e3204238b34e?q=80&w=600&auto=format&fit=crop",
    bestPrice: "₹1,19,999",
    store: "Flipkart",
    savings: "₹10,000",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    image: "https://images.unsplash.com/photo-1696320563568-2767f92d41e9?q=80&w=600&auto=format&fit=crop",
    bestPrice: "₹98,000",
    store: "Croma",
    savings: "₹8,000",
    rating: 4.7,
  },
];

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

function AppHeader() {
  const { toast } = useToast();

  function handleWaitlistClick() {
    toast({
      title: "Thank you!",
      description: "You've been added to the waitlist.",
      duration: 2000,
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">ShopWise</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-emerald-600 transition-colors">Deals</Link>
          <Link href="#" className="hover:text-emerald-600 transition-colors">Categories</Link>
          <Link href="#" className="hover:text-emerald-600 transition-colors">How it Works</Link>
          <Link href="#" className="hover:text-emerald-600 transition-colors">Blog</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden sm:block">
            Sign In
          </Link>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            onClick={handleWaitlistClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} ${theme.text} font-sans`}>
      <AppHeader />
      
      <main className="flex-1">
        {/* Search Focused Hero (Merged from Landing Page Concept) */}
        <section className="relative py-20 md:py-32 container mx-auto px-4 text-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-40 pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
             <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
          </div>

          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 mb-8">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile Price Comparison Engine
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            Stop Tab Switching. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Start Saving.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Compare Amazon, Flipkart, and 10+ other stores in one click. Find the absolute lowest price for your next gadget instantly.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <Input 
                className="w-full h-16 pl-14 pr-36 text-lg rounded-full shadow-sm border-slate-200 focus-visible:ring-emerald-500 bg-white" 
                placeholder="Search for iPhone 15, Samsung S24..." 
              />
              <Button 
                className="absolute right-2 top-2 h-12 rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-transform active:scale-95"
                onClick={() => trackClick('HERO_SEARCH')}
              >
                Search
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="font-medium text-slate-700">Trending:</span>
            <Link href="#" className="hover:text-emerald-600 underline decoration-emerald-200 underline-offset-4">iPhone 15</Link>
            <Link href="#" className="hover:text-emerald-600 underline decoration-emerald-200 underline-offset-4">Samsung S24 Ultra</Link>
            <Link href="#" className="hover:text-emerald-600 underline decoration-emerald-200 underline-offset-4">OnePlus 12</Link>
            <Link href="#" className="hover:text-emerald-600 underline decoration-emerald-200 underline-offset-4">Pixel 8</Link>
          </div>
        </section>

        {/* Value Pillars (From Landing Page) */}
        <section className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Feature 
                icon={<Smartphone className="w-6 h-6 text-emerald-600" />}
                title="All-in-One Dashboard"
                desc="View prices, delivery dates, and exchange offers in one view."
              />
              <Feature 
                icon={<History className="w-6 h-6 text-emerald-600" />}
                title="Price History Graph"
                desc="See if today is actually a good time to buy with 6-month history."
              />
              <Feature 
                icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                title="Verified Sellers Only"
                desc="We only recommend deals from trusted, verified sellers."
              />
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Trending Price Drops</h2>
              <p className="text-slate-600">Real-time deals found in the last hour.</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-slate-200 hover:bg-slate-50 text-slate-700">View All Deals</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {trendingDeals.map((deal) => (
              <div key={deal.id} className={`group rounded-2xl border ${theme.cardBorder} ${theme.cardBg} overflow-hidden hover:shadow-xl transition-all duration-300`}>
                <div className="relative h-64 bg-white p-8 flex items-center justify-center border-b border-slate-100">
                  <Image src={deal.image} alt={deal.name} width={300} height={300} className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Save {deal.savings}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">{deal.name}</h3>
                    <div className="flex items-center text-amber-500 text-sm font-medium bg-amber-50 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-current mr-1" />
                      {deal.rating}
                    </div>
                  </div>
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-3xl font-bold text-emerald-600">{deal.bestPrice}</span>
                    <span className="text-sm text-slate-500 mb-1.5 font-medium">on {deal.store}</span>
                  </div>
                  <Button 
                    className={`w-full h-12 text-base ${theme.primary} ${theme.primaryForeground} shadow-md hover:shadow-lg transition-all`}
                    onClick={() => trackClick(`COMPARE_${deal.id}`)}
                  >
                    Compare Prices
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" className="w-full border-slate-200">View All Deals</Button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 container mx-auto px-4">
          <div className={`rounded-3xl bg-emerald-900 p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl`}>
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800 mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Never Miss a Price Drop</h2>
              <p className="text-emerald-100 mb-10 text-lg leading-relaxed">Join 50,000+ smart shoppers. Get instant alerts when your favorite gadgets hit their lowest price.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input placeholder="Enter your email address" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-14 rounded-full px-6 focus-visible:ring-emerald-400" />
                <Button className="bg-white text-emerald-900 hover:bg-emerald-50 h-14 px-8 font-bold rounded-full transition-transform active:scale-95">
                  Subscribe
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
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0 text-emerald-600">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1 text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}
