"use client";

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Smartphone, 
  Clock, 
  Zap, 
  Target, 
  Share2, 
  TrendingUp, 
  Users, 
  BarChart3,
  Award,
  BookOpen
} from 'lucide-react';

// -- TypeScript Interfaces --

interface SlideContent {
  heading: string;
  text: string;
}

interface SplitSection {
  title: string;
  points: string[];
}

interface Slide {
  id: number;
  type: 'title' | 'standard' | 'split';
  title: string;
  subtitle: string;
  tagline?: string;
  icon: React.ReactNode;
  theme?: string;
  content?: SlideContent[] | null;
  leftSide?: SplitSection;
  rightSide?: SplitSection;
}

const MikrolearnDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      id: 1,
      type: "title",
      title: "Mikrolearn",
      subtitle: "Learning in the Attention Economy",
      tagline: "The 'Inshorts' for Professional Development",
      icon: <BookOpen size={64} className="text-white" />,
      theme: "bg-gradient-to-br from-blue-600 to-indigo-900",
      content: null
    },
    {
      id: 2,
      type: "standard",
      title: "The Learning Problem",
      subtitle: "The Great Skills-Time Gap",
      icon: <Clock size={48} className="text-blue-600" />,
      content: [
        {
          heading: "Information Overload",
          text: "Professionals are drowning in long-form content (Medium articles, hour-long podcasts, MOOCs) but starved for time."
        },
        {
          heading: "The Attention Deficit",
          text: "Average attention span has dropped to 8 seconds. Committing to a 45-minute video feels like a 'task' rather than learning."
        },
        {
          heading: "The FOMO Factor",
          text: "Rapid tech changes (AI, Agile, DevOps) create anxiety. Professionals fear becoming obsolete but lack the bandwidth to keep up."
        }
      ]
    },
    {
      id: 3,
      type: "standard",
      title: "The Solution",
      subtitle: "Bite-Sized Mastery on the Go",
      icon: <Zap size={48} className="text-yellow-500" />,
      content: [
        {
          heading: "The 60-Word Promise",
          text: "Crisp summaries with visual aids. If interested, click to read deeply. If not, swipe to the next. Zero friction."
        },
        {
          heading: "Dynamic & Fresh",
          text: "Updated 4-6 times daily. 15 Categories (Data Science, UX, PM) ensuring there is always something new to learn."
        },
        {
          heading: "AI-Driven Personalization",
          text: "Feed adapts to reading habits and LinkedIn profile data. We show you what you *need* to know, before you know it."
        }
      ]
    },
    {
      id: 4,
      type: "split",
      title: "Target Audience (ICP)",
      subtitle: "Who needs Mikrolearn?",
      icon: <Users size={48} className="text-purple-600" />,
      leftSide: {
        title: "The Aspirational Busy Pro",
        points: [
          "Age: 24 - 40",
          "Role: Tech / Knowledge Worker",
          "Behavior: Commutes, uses phone in 'dead time' (queues, waiting rooms).",
          "Pain Point: 'I should be learning, but I'm too tired.'"
        ]
      },
      rightSide: {
        title: "Micro-Segments",
        points: [
          "The Skiller: Actively looking to switch jobs or get promoted.",
          "The Trend-Watcher: Needs to sound smart in meetings (FOMO driven).",
          "The Generalist: Wants breadth across Product, Tech, and Design."
        ]
      }
    },
    {
      id: 5,
      type: "standard",
      title: "The Market Opportunity",
      subtitle: "Why Now?",
      icon: <TrendingUp size={48} className="text-green-600" />,
      content: [
        {
          heading: "The Gig Economy & Upskilling",
          text: "Continuous learning is no longer optional. It's a survival requirement for the modern workforce."
        },
        {
          heading: "Mobile-First Consumption",
          text: "Screen time is high, but 'Productive Screen Time' is low. We convert doom-scrolling into micro-learning."
        },
        {
          heading: "Proven Model",
          text: "Inshorts proved the model for news. TikTok proved the model for entertainment. Mikrolearn applies this UX to Education."
        }
      ]
    },
    {
      id: 6,
      type: "split",
      title: "Acquisition Strategy",
      subtitle: "Viral Loops & Gamification",
      icon: <Share2 size={48} className="text-red-500" />,
      leftSide: {
        title: "Organic Growth (Viral)",
        points: [
          "Social Sharing: 'Smart Cards' designed for Instagram/LinkedIn Stories.",
          "Referral Program: Invite peers to unlock 'Premium Insights' or badges.",
          "Gamification: Leaderboards for 'Streaks' (days learned in a row)."
        ]
      },
      rightSide: {
        title: "Paid & Partnerships",
        points: [
          "LinkedIn Ads: Targeting specific job titles (e.g., 'Junior PMs').",
          "Content Partnerships: Influencers (Thought Leaders) guest-curating a daily feed.",
          "App Store Optimization: Owning keywords like 'Daily Tech News' and 'Learn Coding'."
        ]
      }
    },
    {
      id: 7,
      type: "standard",
      title: "Monetization",
      subtitle: "Contextual & Native",
      icon: <Target size={48} className="text-indigo-600" />,
      content: [
        {
          heading: "In-Context Native Ads",
          text: "No banner blindness. If you are reading about 'Data Science', the ad is for a 'Python Bootcamp' or 'Tableau License'."
        },
        {
          heading: "Hyper-Local & Intent Based",
          text: "Using GPS for physical event ads (e.g., 'Agile Meetup in Bangalore tonight') adds high relevance."
        },
        {
          heading: "B2B Future State",
          text: "Enterprise subscriptions for companies to curate private learning feeds for their employees."
        }
      ]
    },
    {
      id: 8,
      type: "standard",
      title: "Key Metrics (KPIs)",
      subtitle: "Measuring Success",
      icon: <BarChart3 size={48} className="text-teal-600" />,
      content: [
        {
          heading: "North Star: Daily Active Learners",
          text: "Not just opening the app, but consuming at least 3 cards per day."
        },
        {
          heading: "Retention (D30)",
          text: "Are users forming a habit? Our goal is >40% D30 retention, leveraging push notifications and streaks."
        },
        {
          heading: "Viral Coefficient (K-Factor)",
          text: "The number of new users generated by each existing user via the share/invite features."
        }
      ]
    },
    {
      id: 9,
      type: "title",
      title: "Let's Launch",
      subtitle: "Mikrolearn",
      tagline: "Making every second count.",
      icon: <Award size={64} className="text-white" />,
      theme: "bg-slate-900",
      content: null
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const renderSlideContent = (slide: Slide) => {
    if (slide.type === "title") {
      return (
        <div className={`h-full flex flex-col justify-center items-center text-center p-8 ${slide.theme} text-white rounded-xl shadow-2xl`}>
          <div className="mb-6 p-6 bg-white/10 rounded-full backdrop-blur-sm">
            {slide.icon}
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">{slide.title}</h1>
          <h2 className="text-2xl font-light mb-8 opacity-90">{slide.subtitle}</h2>
          <div className="h-1 w-24 bg-white/50 rounded mb-8"></div>
          <p className="text-xl font-medium italic">"{slide.tagline}"</p>
        </div>
      );
    }

    if (slide.type === "split" && slide.leftSide && slide.rightSide) {
      return (
        <div className="h-full flex flex-col p-8 bg-white rounded-xl shadow-xl overflow-y-auto">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
            <div className="p-3 bg-gray-100 rounded-lg">{slide.icon}</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{slide.title}</h2>
              <p className="text-gray-500 font-medium">{slide.subtitle}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">{slide.leftSide.title}</h3>
              <ul className="space-y-3">
                {slide.leftSide.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1.5 w-2 h-2 bg-indigo-400 rounded-full shrink-0"></span>
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="text-xl font-bold text-pink-600 mb-4">{slide.rightSide.title}</h3>
              <ul className="space-y-3">
                {slide.rightSide.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1.5 w-2 h-2 bg-pink-400 rounded-full shrink-0"></span>
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Default standard slide
    return (
      <div className="h-full flex flex-col p-8 bg-white rounded-xl shadow-xl overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 border-b pb-4">
          <div className="p-3 bg-gray-100 rounded-lg">{slide.icon}</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{slide.title}</h2>
            <p className="text-gray-500 font-medium">{slide.subtitle}</p>
          </div>
        </div>

        <div className="grid gap-6">
          {slide.content && slide.content.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white font-bold rounded-full text-sm">
                  {idx + 1}
                </div>
                {idx !== slide.content!.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.heading}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-5xl aspect-video bg-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Slide Viewport */}
        <div className="flex-1 p-8 bg-slate-100 relative">
          {renderSlideContent(slides[currentSlide])}
        </div>

        {/* Floating Prev/Next buttons — top-right — visible on all slides */}
        <div className="absolute right-6 top-6 flex items-center gap-2 z-20">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-3 py-2 rounded-full font-bold transition-all ${
              currentSlide === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <ChevronLeft size={18} />
            Prev
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
              currentSlide === slides.length - 1
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            }`}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center select-none">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>Slide {currentSlide + 1} of {slides.length}</span>
            <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden ml-4">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
                currentSlide === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <ChevronLeft size={20} />
              Prev
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MikrolearnDeck;