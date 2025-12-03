"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Smartphone, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AppHeader from '@/components/app-header';
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

// --- Variations ---
type Variation = 'search-focused' | 'deals-focused' | 'educational';

export default function HomePage() {
  const [variation, setVariation] = useState<Variation>('search-focused');

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} ${theme.text} font-sans`}>
      <AppHeader />
      
      {/* Variation Switcher (For Dev) */}
      <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur p-2 rounded-lg shadow-lg border border-slate-200 flex gap-2">
        <span className="text-xs font-semibold text-slate-600 self-center mr-2">Home Layout:</span>
        {(['search-focused', 'deals-focused', 'educational'] as Variation[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariation(v)}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              variation === v 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {v.replace('-', ' ')}
          </button>
        ))}
      </div>

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        {variation === 'search-focused' && <SearchHero />}
        {variation === 'deals-focused' && <DealsHero />}
        {variation === 'educational' && <EducationalHero />}

        {/* Trending Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Price Drops</h2>
              <p className="text-slate-600">Real-time deals found in the last hour.</p>
            </div>
            <Button variant="outline" className="hidden md:flex">View All Deals</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {trendingDeals.map((deal) => (
              <div key={deal.id} className={`group rounded-xl border ${theme.cardBorder} ${theme.cardBg} overflow-hidden hover:shadow-lg transition-all`}>
                <div className="relative h-48 bg-white p-4 flex items-center justify-center">
                  <Image src={deal.image} alt={deal.name} width={200} height={200} className="object-contain h-full w-full group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                    Save {deal.savings}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{deal.name}</h3>
                    <div className="flex items-center text-amber-500 text-sm">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {deal.rating}
                    </div>
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-2xl font-bold text-emerald-600">{deal.bestPrice}</span>
                    <span className="text-sm text-slate-500 mb-1">on {deal.store}</span>
                  </div>
                  <Button className={`w-full ${theme.primary} ${theme.primaryForeground}`}>
                    Compare Prices
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Why ShopWise?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Feature 
                icon={<Zap className="w-8 h-8 text-emerald-600" />}
                title="Instant Comparison"
                desc="We scan 10+ major retailers in milliseconds to find the absolute lowest price."
              />
              <Feature 
                icon={<ShieldCheck className="w-8 h-8 text-emerald-600" />}
                title="Verified Sellers"
                desc="We filter out shady sellers so you only buy from trusted sources."
              />
              <Feature 
                icon={<TrendingUp className="w-8 h-8 text-emerald-600" />}
                title="Price History"
                desc="Know exactly when to buy with our 6-month price history charts."
              />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 container mx-auto px-4">
          <div className={`rounded-3xl ${theme.primary} p-8 md:p-16 text-center text-white relative overflow-hidden`}>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss a Price Drop</h2>
              <p className="text-emerald-100 mb-8 text-lg">Join 50,000+ smart shoppers. Get alerts when your favorite gadgets hit their lowest price.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12" />
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50 h-12 px-8 font-bold">
                  Subscribe
                </Button>
              </div>
            </div>
            {/* Abstract Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
               <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// --- Hero Variations ---

function SearchHero() {
  return (
    <section className="py-20 md:py-32 container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
        Find the <span className="text-emerald-600">Lowest Price</span> <br/> on Your Next Phone.
      </h1>
      <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
        Stop opening 20 tabs. Compare Amazon, Flipkart, Croma, and more in one click.
      </p>
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400" />
        </div>
        <Input 
          className="w-full h-16 pl-14 pr-4 text-lg rounded-full shadow-xl border-slate-200 focus-visible:ring-emerald-500" 
          placeholder="Search for iPhone 15, Samsung S24, etc..." 
        />
        <Button className="absolute right-2 top-2 h-12 rounded-full px-8 bg-emerald-600 hover:bg-emerald-700">
          Search
        </Button>
      </div>
      <div className="mt-8 flex justify-center gap-4 text-sm text-slate-500">
        <span>Trending:</span>
        <Link href="#" className="hover:text-emerald-600 underline">iPhone 15</Link>
        <Link href="#" className="hover:text-emerald-600 underline">OnePlus 12</Link>
        <Link href="#" className="hover:text-emerald-600 underline">Pixel 8</Link>
      </div>
    </section>
  );
}

function DealsHero() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-700 mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Today's Top Deal
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            iPhone 15 Pro <br/>
            <span className="text-emerald-600">₹15,000 OFF</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Lowest price detected on Flipkart with HDFC Bank offer. Deal ends in 4 hours.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8">
              Grab Deal
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              View Price History
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-600/5 rounded-3xl -z-10 transform rotate-3"></div>
          <Image 
            src="https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop" 
            alt="iPhone 15 Pro" 
            width={600} 
            height={600} 
            className="rounded-3xl shadow-2xl border border-slate-100"
          />
        </div>
      </div>
    </section>
  );
}

function EducationalHero() {
  return (
    <section className="py-20 container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
        How ShopWise Saves You Money
      </h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-xl">1</div>
          <h3 className="font-bold text-lg mb-2">Search</h3>
          <p className="text-slate-600">Enter the product you want. We support phones, laptops, and more.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-xl">2</div>
          <h3 className="font-bold text-lg mb-2">Compare</h3>
          <p className="text-slate-600">We scan 10+ stores and apply hidden coupons automatically.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-xl">3</div>
          <h3 className="font-bold text-lg mb-2">Save</h3>
          <p className="text-slate-600">Buy from the cheapest store and save thousands instantly.</p>
        </div>
      </div>
      <div className="mt-12">
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-12 px-10">
          Start Saving Now
        </Button>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 p-4 bg-white rounded-full shadow-sm border border-slate-100">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}
