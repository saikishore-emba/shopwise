'use client';
import React from 'react';
import { 
  CheckCircle, Users, Target, Zap, 
  DollarSign, PieChart, Share2, ShieldCheck, Briefcase, Store, User
} from 'lucide-react';

const ShopwiseApp = () => {
  // --- FINAL HYBRID BMC DATA ---
  const bmcData = {
    themeColor: "indigo",
    label: "Shopwise Hybrid Model",
    desc: "A scalable O2O platform merging digital comparison with trusted, local offline experience.",
    keyPartners: {
      items: ["🌐 Online Giants (Amazon, Flipkart)", "🏪 Local Mobile Retailers (Franchise)", "📱 Brands (Direct Integration)"]
    },
    keyActivities: {
      items: ["🌐 API Maintenance & Scraping", "🏪 Merchant Onboarding & QC", "🎥 Video Demo Scheduling", "📅 Partner Training"]
    },
    keyResources: {
      items: ["💻 Proprietary Comparison Tech", "👨‍💼 Network of Store Managers", "🏪 Field Sales Force", "📹 Virtual Demo Studio"]
    },
    valuePropositions: {
      items: ["🌐 Best Deal Guarantee (Price Match)", "🎥 Live Video Product Demos", "🏪 Touch & Feel Experience", "⚡ Instant Local Pickup"]
    },
    customerRelationships: {
      items: ["🎥 1-on-1 Personalized Video", "🤖 Auto Price Drop Alerts", "🛡️ 'Shopwise Verified' Trust Badge"]
    },
    channels: {
      items: ["🌐 Web / PWA / Mobile App", "📅 'Request Video Demo' Button", "💬 WhatsApp Business API", "📍 Hyper-local Maps Integration"]
    },
    customerSegments: {
      items: ["🌐 Digital Natives (Research Online)", "👀 Visual Buyers (Need Trust)", "🤷 Confused Purchasers"]
    },
    costStructure: {
      items: ["💻 Tech Stack & Cloud Hosting", "🏪 Merchant Acquisition Costs", "~~Hyper-local Marketing~~"]
    },
    revenueStreams: {
      items: ["🌐 Affiliate Commissions (Online)", "~~Store Subscription/Listing Fees~~", "📊 Hyper-local Data Insights", "📈 Digital Marketing Income"]
    }
  };

  // Helper to render standard BMC box
  const BmcBox = ({ title, icon, items, rowSpan = 1, isFocus = false }: { title: string, icon: React.ReactNode, items: string[], rowSpan?: number, isFocus?: boolean }) => (
    <div className={`p-5 rounded-xl border shadow-sm transition-all duration-300 ${rowSpan === 2 ? 'md:row-span-2' : ''} 
      ${isFocus 
        ? `bg-${bmcData.themeColor}-50 border-${bmcData.themeColor}-200 shadow-md ring-1 ring-${bmcData.themeColor}-200` 
        : 'bg-white border-slate-200 hover:shadow-md'}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className={`font-bold ${isFocus ? `text-${bmcData.themeColor}-900` : 'text-slate-800'}`}>{title}</h3>
      </div>
      <ul className={`text-sm space-y-2 ${isFocus ? `text-${bmcData.themeColor}-800` : 'text-slate-600'}`}>
        {items.map((item, i) => (
          <li key={i} className={`flex items-start gap-2 ${!isFocus && 'border-b border-slate-50 pb-1 last:border-0'}`}>
            {isFocus && <CheckCircle className={`w-4 h-4 mt-0.5 text-${bmcData.themeColor}-600 shrink-0`} />}
            <span className={item.startsWith('~~') ? 'line-through text-slate-500' : ''}>{item.replace(/~~/g, '')}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Shopwise.in</h1>
          <p className="text-slate-500 text-lg">Invest in the Future of Hybrid Commerce</p>
        </div>

        {/* --- BUSINESS MODEL CANVAS VIEW --- */}
        <div className="animate-fadeIn">
          
          {/* Strategy Context Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-white p-5 rounded-xl border border-indigo-100 mb-8 flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                  <Store className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                  <h2 className="text-lg font-bold text-indigo-900">{bmcData.label}</h2>
                  <p className="text-indigo-700 text-sm">{bmcData.desc}</p>
              </div>
          </div>

          {/* The Canvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 auto-rows-fr">
            <BmcBox 
              title="Key Partners" 
              icon={<Users className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
              items={bmcData.keyPartners.items} 
              rowSpan={2} 
            />
            <div className="flex flex-col gap-4 md:row-span-2">
              <BmcBox 
                title="Key Activities" 
                icon={<Zap className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
                items={bmcData.keyActivities.items} 
              />
              <BmcBox 
                title="Key Resources" 
                icon={<Briefcase className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
                items={bmcData.keyResources.items} 
              />
            </div>
            
            {/* Value Prop (Centerpiece) */}
            <BmcBox 
              title="Value Propositions" 
              icon={<Target className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
              items={bmcData.valuePropositions.items} 
              rowSpan={2} 
              isFocus={true}
            />

            <div className="flex flex-col gap-4 md:row-span-2">
              <BmcBox 
                title="Customer Relationships" 
                icon={<ShieldCheck className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
                items={bmcData.customerRelationships.items} 
              />
              <BmcBox 
                title="Channels" 
                icon={<Share2 className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
                items={bmcData.channels.items} 
              />
            </div>

            <BmcBox 
              title="Customer Segments" 
              icon={<User className={`w-5 h-5 text-${bmcData.themeColor}-600`} />} 
              items={bmcData.customerSegments.items} 
              rowSpan={2} 
            />
          </div>

          {/* Bottom Row: Cost & Revenue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BmcBox 
              title="Cost Structure" 
              icon={<PieChart className="w-5 h-5 text-red-600" />} 
              items={bmcData.costStructure.items} 
            />
            <BmcBox 
              title="Revenue Streams" 
              icon={<DollarSign className="w-5 h-5 text-emerald-600" />} 
              items={bmcData.revenueStreams.items} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopwiseApp;
