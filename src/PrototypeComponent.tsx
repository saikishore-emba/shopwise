"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, Smartphone, Home, User, Menu, ChevronLeft, Star, 
  Share2, Heart, ShoppingCart, Zap, Video, MapPin, 
  CheckCircle, X, ChevronDown, Filter, ArrowRight, Sparkles,
  GitCompare, RefreshCw, BarChart2, Shield, ExternalLink, Tag,
  Truck, Store
} from 'lucide-react';

const MobilePrototype = () => {
  // --- STATE MANAGEMENT ---
  const [screen, setScreen] = useState('home'); // home, search, product, compare, profile
  const [cart, setCart] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [location, setLocation] = useState("Indiranagar, Bengaluru");
  
  // --- MOCK DATA ---
  // Using reliable placeholder service to ensure images always appear
  const phones = [
    {
      id: 1,
      name: "Pixel 7a",
      brand: "Google",
      price: 39999,
      image: "https://placehold.co/200x250/e2e8f0/475569?text=Pixel+7a",
      rating: 4.5,
      reviews: 1240,
      specs: { screen: "6.1' OLED", ram: "8GB", storage: "128GB", battery: "4385mAh", cam: "64MP Main" },
      pros: ["Clean Android", "Great Camera"],
      cons: ["Slow Charging", "Heating issues"],
      sellers: [
        { name: "Amazon", price: 39999, delivery: "Tomorrow", type: "online" },
        { name: "Flipkart", price: 41999, delivery: "2 Days", type: "online" },
        { name: "Sangeetha Mobiles", price: 40500, delivery: "Pickup in 1 hr", type: "offline", distance: "0.8 km" },
        { name: "Poorvika", price: 40200, delivery: "Pickup Today", type: "offline", distance: "1.2 km" }
      ]
    },
    {
      id: 2,
      name: "Galaxy S23 FE",
      brand: "Samsung",
      price: 45999,
      image: "https://placehold.co/200x250/e2e8f0/475569?text=Galaxy+S23",
      rating: 4.3,
      reviews: 890,
      specs: { screen: "6.4' AMOLED", ram: "8GB", storage: "128GB", battery: "4500mAh", cam: "50MP Main" },
      pros: ["Good Display", "Brand Value"],
      cons: ["Thick Bezels", "Avg Battery"],
      sellers: [
        { name: "Flipkart", price: 45999, delivery: "Tomorrow", type: "online" },
        { name: "Amazon", price: 47500, delivery: "Tomorrow", type: "online" },
        { name: "Samsung Café", price: 46500, delivery: "In Stock", type: "offline", distance: "2.5 km" }
      ]
    },
    {
      id: 3,
      name: "Nothing Phone (2)",
      brand: "Nothing",
      price: 36999,
      image: "https://placehold.co/200x250/e2e8f0/475569?text=Nothing+2",
      rating: 4.6,
      reviews: 2100,
      specs: { screen: "6.7' LTPO", ram: "12GB", storage: "256GB", battery: "4700mAh", cam: "50MP Sony" },
      pros: ["Unique Design", "Smooth UI"],
      cons: ["Camera processing", "Pricey accessories"],
      sellers: [
        { name: "Flipkart", price: 36999, delivery: "Tomorrow", type: "online" },
        { name: "Croma", price: 37999, delivery: "In Stock", type: "online" },
        { name: "Vijay Sales", price: 37500, delivery: "Pickup Today", type: "offline", distance: "3.0 km" }
      ]
    },
    {
      id: 4,
      name: "OnePlus 11R",
      brand: "OnePlus",
      price: 39999,
      image: "https://placehold.co/200x250/e2e8f0/475569?text=OnePlus+11R",
      rating: 4.4,
      reviews: 3400,
      specs: { screen: "6.7' AMOLED", ram: "16GB", storage: "256GB", battery: "5000mAh", cam: "50MP Main" },
      pros: ["Fast Charging", "Performance"],
      cons: ["Bloatware", "Curved Screen"],
      sellers: [
        { name: "Amazon", price: 39999, delivery: "Tomorrow", type: "online" },
        { name: "OnePlus.in", price: 39999, delivery: "3 Days", type: "online" },
        { name: "Local MobileHub", price: 39500, delivery: "Pickup in 30 mins", type: "offline", distance: "0.5 km" }
      ]
    }
  ];

  // --- ACTIONS ---
  const handleAddToCompare = (e, phone) => {
    e.stopPropagation();
    if (compareList.find(p => p.id === phone.id)) {
      setCompareList(compareList.filter(p => p.id !== phone.id));
    } else {
      if (compareList.length < 3) setCompareList([...compareList, phone]);
      else alert("Max 3 phones for comparison");
    }
  };

  const goToProduct = (phone) => {
    setSelectedProduct(phone);
    setScreen('product');
  };

  // --- GEMINI MOCK CALL ---
  const runAiReviewSummary = async () => {
    setIsAiLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    setAiResponse("• Great low-light camera performance 📸\n• Battery lasts 6-7 hours SOT 🔋\n• Slight heating during 4K recording 🔥\n• Smooth 90Hz display experience ✨");
    setIsAiLoading(false);
  };

  // --- COMPONENTS ---
  
  // 1. HEADER
  const Header = ({ title, showBack, rightAction }) => (
    <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => setScreen('home')} className="p-1 rounded-full hover:bg-slate-100">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
        )}
        <h1 className="text-lg font-bold text-slate-800">{title}</h1>
      </div>
      {rightAction}
    </div>
  );

  // 2. BOTTOM NAV
  const BottomNav = () => (
    <div className="bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center absolute bottom-0 w-full z-50 pb-6 md:pb-2">
      <button onClick={() => setScreen('home')} className={`flex flex-col items-center gap-1 ${screen === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button onClick={() => setScreen('search')} className={`flex flex-col items-center gap-1 ${screen === 'search' ? 'text-indigo-600' : 'text-slate-400'}`}>
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-medium">Search</span>
      </button>
      
      {/* Compare Floating Badge */}
      <div className="relative">
        <button onClick={() => compareList.length > 0 && setScreen('compare')} className={`flex flex-col items-center gap-1 ${screen === 'compare' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <div className="relative">
            <GitCompare className="w-6 h-6" />
            {compareList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {compareList.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Compare</span>
        </button>
      </div>

      <button className="flex flex-col items-center gap-1 text-slate-400">
        <User className="w-6 h-6" />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );

  // --- SCREENS ---

  // SCREEN: HOME
  const HomeScreen = () => (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Top Bar */}
      <div className="bg-indigo-600 px-4 pt-12 pb-6 rounded-b-[2rem] shadow-lg text-white relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-1 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1 cursor-pointer hover:text-white">
               <MapPin className="w-3 h-3" /> {location} <ChevronDown className="w-3 h-3" />
            </div>
            <h1 className="text-2xl font-bold">Find your next <br/>upgrade 📱</h1>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative z-10">
          <div className="bg-white rounded-xl shadow-lg flex items-center p-3 gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search 'Best camera phone under 40k'..." 
              className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none"
              onFocus={() => setScreen('search')}
            />
            <button className="bg-indigo-50 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800">Trending Now 🔥</h2>
          <span className="text-xs text-indigo-600 font-semibold">See All</span>
        </div>
        
        {/* Horizontal Scroll Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {phones.map((phone) => (
            <div 
              key={phone.id} 
              onClick={() => goToProduct(phone)}
              className="min-w-[160px] bg-white rounded-xl p-3 shadow-sm border border-slate-100 relative group active:scale-95 transition-transform"
            >
              <div className="absolute top-2 right-2 z-10 bg-slate-100 p-1 rounded-full">
                <Heart className="w-4 h-4 text-slate-400" />
              </div>
              <img src={phone.image} alt={phone.name} className="w-full h-32 object-contain mb-3" />
              <h3 className="text-sm font-bold text-slate-800 truncate">{phone.name}</h3>
              <p className="text-xs text-slate-500 mb-2">{phone.specs.ram} / {phone.specs.storage}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600 text-sm">₹{(phone.price/1000).toFixed(0)}k</span>
                <button 
                  onClick={(e) => handleAddToCompare(e, phone)}
                  className={`p-1.5 rounded-lg transition-colors ${compareList.find(p => p.id === phone.id) ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}
                >
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MVP Promo Banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white flex items-center justify-between shadow-lg">
          <div>
            <h3 className="font-bold">Confused? Request a Video Demo 🎥</h3>
            <p className="text-xs text-emerald-100 mt-1">Talk to a store manager live.</p>
          </div>
          <div className="bg-white p-2 rounded-full">
            <Video className="w-6 h-6 text-teal-600" />
          </div>
        </div>
      </div>

    </div>
  );

  // SCREEN: SEARCH
  const SearchScreen = () => (
    <div className="pb-24 bg-white min-h-screen">
      <Header 
        title="Search Results" 
        showBack={true} 
        rightAction={<Filter className="w-5 h-5 text-slate-600" />} 
      />
      
      {/* Smart Search Area */}
      <div className="px-4 py-2 border-b border-slate-100 sticky top-14 bg-white z-40">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Under 40k', 'Best Camera', '5G', 'Gaming'].map((tag, i) => (
            <span key={i} className="whitespace-nowrap px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {phones.map(phone => (
          <div key={phone.id} onClick={() => goToProduct(phone)} className="flex gap-4 p-3 border border-slate-100 rounded-xl shadow-sm active:bg-slate-50 transition-colors">
            <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center p-2">
              <img src={phone.image} className="w-full h-full object-contain" alt="" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                   <h3 className="font-bold text-slate-800">{phone.name}</h3>
                   <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                     <span className="bg-green-100 text-green-700 px-1 rounded flex items-center gap-0.5">
                       {phone.rating} <Star className="w-3 h-3 fill-current" />
                     </span>
                     <span>({phone.reviews})</span>
                   </div>
                </div>
                <button 
                  onClick={(e) => handleAddToCompare(e, phone)}
                  className={`p-2 rounded-full ${compareList.find(p => p.id === phone.id) ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}
                >
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>
              
              <ul className="text-xs text-slate-500 mt-2 space-y-0.5">
                <li>• {phone.specs.screen}</li>
                <li>• {phone.specs.cam}</li>
              </ul>
              
              <div className="mt-2 font-bold text-lg text-indigo-600">₹{phone.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // SCREEN: COMPARE
  const CompareScreen = () => {
    const [diffOnly, setDiffOnly] = useState(false);
    
    return (
      <div className="pb-24 bg-white min-h-screen">
        <Header 
          title="Compare Mode" 
          showBack={true} 
          rightAction={
            <button onClick={() => setCompareList([])} className="text-xs text-red-500 font-bold">Clear</button>
          } 
        />
        
        {/* Sticky Headers */}
        <div className="sticky top-14 bg-white z-40 border-b border-slate-200 shadow-sm">
           <div className="grid grid-cols-3 divide-x divide-slate-100">
             <div className="p-2 flex flex-col justify-center items-center text-center bg-slate-50">
                <span className="text-xs font-bold text-slate-400">Spec</span>
                <div className="mt-2 flex items-center gap-1">
                   <label className="text-[10px] text-slate-500">Diff Only</label>
                   <div 
                    onClick={() => setDiffOnly(!diffOnly)}
                    className={`w-8 h-4 rounded-full p-0.5 flex transition-colors ${diffOnly ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}
                   >
                     <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                   </div>
                </div>
             </div>
             {compareList.map(phone => (
               <div key={phone.id} className="p-2 text-center min-w-[100px]">
                 <img src={phone.image} className="w-12 h-12 object-contain mx-auto mb-1" alt="" />
                 <h4 className="text-xs font-bold truncate">{phone.name}</h4>
                 <p className="text-xs text-indigo-600 font-bold">₹{(phone.price/1000).toFixed(0)}k</p>
               </div>
             ))}
             {compareList.length < 2 && (
               <div className="p-2 flex items-center justify-center">
                 <button onClick={() => setScreen('search')} className="w-8 h-8 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300">
                   <span className="text-lg">+</span>
                 </button>
               </div>
             )}
           </div>
        </div>

        {/* Specs Table */}
        <div className="divide-y divide-slate-100">
          {['screen', 'ram', 'storage', 'battery', 'cam'].map(key => (
            <div key={key} className={`grid grid-cols-3 divide-x divide-slate-100 ${diffOnly && 'bg-indigo-50/30'}`}>
              <div className="p-3 text-xs font-bold text-slate-500 bg-slate-50 flex items-center uppercase">{key}</div>
              {compareList.map(phone => (
                <div key={phone.id} className="p-3 text-xs font-medium text-slate-700 flex items-center justify-center text-center">
                  {phone.specs[key]}
                  {/* Mock logic for "Winner" badge */}
                  {key === 'battery' && phone.specs.battery === '5000mAh' && (
                    <div className="ml-1 w-2 h-2 rounded-full bg-green-500 shrink-0" title="Winner"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // SCREEN: PRODUCT DETAIL
  const ProductScreen = () => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    
    // Sort sellers by price low-to-high
    const onlineSellers = selectedProduct?.sellers.filter(s => s.type === 'online').sort((a,b) => a.price - b.price);
    const offlineSellers = selectedProduct?.sellers.filter(s => s.type === 'offline').sort((a,b) => a.price - b.price);

    return (
      <div className="pb-24 bg-white min-h-screen">
        {/* Nav */}
        <div className="absolute top-0 w-full p-4 flex justify-between z-10">
          <button onClick={() => setScreen('home')} className="bg-white/80 p-2 rounded-full shadow-sm backdrop-blur-sm">
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="flex gap-3">
            <button className="bg-white/80 p-2 rounded-full shadow-sm backdrop-blur-sm">
              <Share2 className="w-5 h-5 text-slate-700" />
            </button>
            <button className="bg-white/80 p-2 rounded-full shadow-sm backdrop-blur-sm">
              <ShoppingCart className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="h-[40vh] bg-slate-50 flex items-center justify-center p-8 relative">
          <img src={selectedProduct?.image} className="h-full object-contain mix-blend-multiply" alt="" />
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-100 text-slate-600 flex items-center gap-1">
             <Shield className="w-3 h-3 text-green-500" /> Shopwise Verified
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white -mt-6 rounded-t-[2rem] p-6 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] min-h-[60vh]">
          {/* Title & Price */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{selectedProduct?.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-500">{selectedProduct?.brand}</span>
                <span className="text-slate-300">•</span>
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                  {selectedProduct?.rating} <Star className="w-3 h-3 fill-current" />
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">₹{selectedProduct?.price.toLocaleString()}</div>
              <div className="text-xs text-slate-400 line-through">₹{(selectedProduct?.price * 1.1).toFixed(0)}</div>
            </div>
          </div>

          {/* --- HYBRID SELLER COMPARISON --- */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" /> Compare Prices
            </h3>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              
              {/* Online Section */}
              <div className="bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Truck className="w-3 h-3" /> Online Delivery
              </div>
              {onlineSellers?.map((seller, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border bg-white
                      ${seller.name === 'Amazon' ? 'text-orange-600 border-orange-100' : 'text-blue-600 border-blue-100'}`}>
                      {seller.name[0]}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-700">{seller.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Delivers {seller.delivery}</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                      <div className="text-sm font-bold text-slate-900">₹{seller.price.toLocaleString()}</div>
                      <button className="bg-slate-100 text-slate-600 p-2 rounded-lg hover:bg-slate-200">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                  </div>
                </div>
              ))}

              {/* Offline/Hybrid Section */}
              <div className="bg-indigo-50 px-3 py-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1 border-t border-slate-100">
                <Store className="w-3 h-3" /> Nearby Stores (Bangalore)
              </div>
              {offlineSellers?.map((seller, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-indigo-50/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border bg-white text-indigo-600 border-indigo-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          {seller.name}
                          <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-1.5 rounded-full">{seller.distance}</span>
                        </div>
                        <div className="text-[10px] text-green-600 font-bold">{seller.delivery}</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                      <div className="text-sm font-bold text-slate-900">₹{seller.price.toLocaleString()}</div>
                      <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-sm">
                        Reserve
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Reviews Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800">Review Insights</h3>
              <div className="flex items-center gap-1 text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100">
                <Sparkles className="w-3 h-3" /> Gemini AI
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              {aiResponse ? (
                <div className="text-sm text-slate-700 whitespace-pre-line animate-fadeIn">
                  {aiResponse}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-3">Get a quick AI summary of 1000+ reviews</p>
                  <button 
                    onClick={runAiReviewSummary}
                    disabled={isAiLoading}
                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm active:scale-95 transition-transform flex items-center gap-2 mx-auto"
                  >
                    {isAiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-purple-500" />}
                    Summarize Reviews
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Price Graph Mock */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-400" /> Price History
            </h3>
            <div className="h-24 bg-gradient-to-b from-green-50 to-white border border-green-100 rounded-xl flex items-end justify-between px-4 pb-2 relative overflow-hidden">
               <div className="absolute top-2 right-2 text-[10px] text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded">Lowest Price Now!</div>
               {[40, 60, 55, 70, 45, 30].map((h, i) => (
                 <div key={i} className="w-8 bg-green-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>

          {/* MVP: Hybrid Video Call CTA */}
          <div className="absolute bottom--1 left-4 right-4 z-40">
            <button 
              onClick={() => setShowVideoModal(true)}
              className="w-full bg-slate-900 text-white p-4 rounded-xl shadow-xl flex items-center justify-between group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Video className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">Want to see it live?</div>
                  <div className="text-[10px] text-slate-400">Request Video Demo from Store</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Video Call Modal (Mock) */}
        {showVideoModal && (
          <div className="absolute inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center relative">
              <button onClick={() => setShowVideoModal(false)} className="absolute top-4 right-4 text-slate-400">
                <X className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Request Sent!</h3>
              <p className="text-sm text-slate-600 mb-6">
                A Shopwise Store Manager from <strong>{location}</strong> will call you on video within 10 minutes to demo the <strong>{selectedProduct?.name}</strong>.
              </p>
              <button onClick={() => setShowVideoModal(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">
                Okay, I'm ready
              </button>
            </div>
          </div>
        )}

      </div>
    );
  };

  // --- RENDER CONTROLLER ---
  return (
    <div className="flex justify-center bg-slate-200 min-h-screen items-center py-0 md:py-8 font-sans">
      <div className="w-full md:w-[375px] h-[100vh] md:h-[812px] bg-white md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-slate-900">
        
        {/* Notch (Visual only for desktop) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-[60] hidden md:block"></div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {screen === 'home' && <HomeScreen />}
          {screen === 'search' && <SearchScreen />}
          {screen === 'compare' && <CompareScreen />}
          {screen === 'product' && <ProductScreen />}
        </div>

        {/* Persistent Bottom Nav */}
        <BottomNav />
        
      </div>
    </div>
  );
};

export default MobilePrototype;
