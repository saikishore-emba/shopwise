"use client";

import React, { useState } from 'react';
import { Search, Smartphone, GitCompare, CreditCard, CheckCircle, ArrowRight, User, Frown, Lightbulb, TrendingUp } from 'lucide-react';

const JourneyMap: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 0,
      title: "Discovery & Entry",
      icon: <Search className="w-6 h-6" />,
      goal: "Find the best mobile phone within a specific budget.",
      thoughts: "I need a new phone, but there are too many options. I don't want to overpay.",
      actions: "Google search 'best phone under 20k', sees Shopwise link, lands on Homepage.",
      painPoints: "Cluttered landing pages, overwhelming ads, slow load times.",
      solution: "Minimalist, search-focused Hero UI. 'Trending Now' carousel with glassmorphism effects. Instant load time (SPA).",
      metrics: "Bounce Rate, Time on Page"
    },
    {
      id: 1,
      title: "Smart Search",
      icon: <Smartphone className="w-6 h-6" />,
      goal: "Narrow down choices quickly based on specific needs (Camera, Battery, Gaming).",
      thoughts: "I want a 108MP camera and at least 5000mAh battery.",
      actions: "Uses 'Smart Filters' or voice search. Toggles 'Gaming Mode' filter.",
      painPoints: "Complex filter menus, page reloads after every selection, irrelevant results.",
      solution: "Real-time AI Search Bar. Visual filter chips (icons instead of checkboxes). Haptic feedback on selection.",
      metrics: "Search Exit Rate, Filter Usage"
    },
    {
      id: 2,
      title: "The Comparison",
      icon: <GitCompare className="w-6 h-6" />,
      goal: "Side-by-side spec check to make the final decision.",
      thoughts: "Is the Pro version worth the extra 5k? How do the screens compare?",
      actions: "Selects 3 phones. Enters 'VS Mode'. Scrolls through highlighted differences.",
      painPoints: "Horizontal scrolling fatigue, misaligned rows, hard to spot differences text.",
      solution: "Sticky Header Comparison View. 'Difference Highlighter' (only shows what's different). Dynamic 'Winner' badges for specs.",
      metrics: "Avg. Time in Compare, Add to Cart Rate"
    },
    {
      id: 3,
      title: "Decision & Deal",
      icon: <TrendingUp className="w-6 h-6" />,
      goal: "Validate the choice and find the cheapest seller.",
      thoughts: "Is this the lowest price? What do real users say?",
      actions: "Checks 'Price History Graph'. Reads 'Sentiment Summary' reviews.",
      painPoints: "Fake reviews, hidden costs, price disparity across sites.",
      solution: "Unified Price Card (Amazon vs Flipkart vs Croma). AI Review Summarizer (Pros/Cons lists). Price Drop Alert toggle.",
      metrics: "Click-Through Rate (CTR), Price Alert Subscriptions"
    },
    {
      id: 4,
      title: "Checkout",
      icon: <CreditCard className="w-6 h-6" />,
      goal: "Buy the phone quickly and securely.",
      thoughts: "Let's buy it before the price changes.",
      actions: "Clicks 'Buy Now at Lowest Price'. Redirected to merchant app deep-link.",
      painPoints: "Broken links, slow redirects, coupon code hunting.",
      solution: "Deep-linking (opens Amazon/Flipkart app directly). 'Verified Seller' badge.",
      metrics: "Conversion Rate, Revenue per User"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">Shopwise.in Customer Journey</h1>
          <p className="text-slate-500 text-lg">Pitching the "Seamless Compare" Experience</p>
        </div>

        <div className="relative mb-12">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-0 transform -translate-y-1/2 rounded"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 md:gap-0">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(index)}
                className={`flex flex-col items-center group transition-all duration-300 ${activeStage === index ? 'scale-110' : 'hover:scale-105'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 border-4 
                  ${activeStage === index ? 'bg-indigo-600 text-white border-indigo-200' : 'bg-white text-slate-400 border-white hover:border-indigo-100'}`}>
                  {stage.icon}
                </div>
                <span className={`mt-3 text-sm font-semibold px-2 py-1 rounded transition-colors duration-300
                  ${activeStage === index ? 'text-indigo-700 bg-indigo-50' : 'text-slate-500'}`}>
                  {stage.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <User className="text-indigo-500" /> User Mindset
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">User Goal</h4>
                  <p className="text-slate-700 font-medium leading-relaxed">"{stages[activeStage].goal}"</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inner Monologue</h4>
                  <div className="bg-indigo-50 p-4 rounded-xl rounded-tl-none relative">
                    <p className="italic text-indigo-800">"{stages[activeStage].thoughts}"</p>
                  </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Actions</h4>
                   <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                     {stages[activeStage].actions.split('. ').map((action, i) => (
                       <li key={i}>{action.replace('.','')}</li>
                     ))}
                   </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  <Frown className="w-5 h-5" /> Friction Points
                </h3>
                <p className="text-red-700 leading-relaxed">{stages[activeStage].painPoints}</p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Shopwise Solution
                </h3>
                <p className="text-emerald-700 leading-relaxed font-medium">{stages[activeStage].solution}</p>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="text-yellow-300 w-6 h-6" />
                    <h3 className="text-xl font-bold">The UI/UX Pitch</h3>
                  </div>
                  <p className="text-indigo-100 text-lg mb-4">
                    Key Feature: <span className="font-semibold text-white border-b-2 border-yellow-400 pb-0.5">
                      {stages[activeStage].solution.split('.')[0]}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 text-sm text-indigo-200 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Impact: {stages[activeStage].metrics}</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>

            </div>
          </div>

        </div>

        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
            disabled={activeStage === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${activeStage === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
            Previous Stage
          </button>
          <button 
            onClick={() => setActiveStage(Math.min(stages.length - 1, activeStage + 1))}
            disabled={activeStage === stages.length - 1}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold shadow-md transition-all
              ${activeStage === stages.length - 1 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'}`}>
            Next Stage <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default JourneyMap;
