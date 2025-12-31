"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, BarChart3, Target, Rocket, Lightbulb, Clock } from "lucide-react";

const presentationData = [
  {
    title: "Microlearn GTM Strategy Overview",
    subtitle: "Shopwise: Go-To-Market Master Cheatsheet",
    icon: <Lightbulb className="w-16 h-16 text-white" />,
    content: [
      { type: "text", value: "This presentation outlines the complete 10-step GTM strategy process." },
      { type: "text", value: "Navigate using the arrows below to explore each foundational and execution step." },
      { type: "bullet", value: "Focus: Clear, implementable strategy process and collateral definition." },
    ],
    bgClass: "bg-gradient-to-br from-indigo-600 to-purple-800",
    titleClass: "text-white",
    contentClass: "text-indigo-100",
  },
  {
    title: "Foundational Strategy (Steps 0-4)",
    subtitle: 'Defining the "Who" and "Why"',
    icon: <Target className="w-12 h-12 text-gray-700" />,
    content: [
      { type: "heading", value: "STEP 0 & 1: Goals and Persona" },
      { type: "bullet", value: "Business Goals: Establish objectives (financial, market share, etc.)." },
      { type: "bullet", value: "Persona: Define both Buyer and User personas, including the Compelling Elements of Value (EOV)." },
      { type: "heading", value: "STEP 2-4: Context Setting" },
      { type: "bullet", value: "Competition: Conduct a thorough competitor analysis (Outside In/Inside Out)." },
      { type: "bullet", value: "Positioning: Develop a clear, defensible Positioning Statement." },
      { type: "bullet", value: "Segmentation: Identify key market segments for targeting." },
    ],
    bgClass: "bg-white shadow-xl",
    titleClass: "text-indigo-700",
    contentClass: "text-gray-700",
  },
  {
    title: "Execution & Lead Flow (Steps 5-6)",
    subtitle: 'Defining the "How"',
    icon: <Rocket className="w-12 h-12 text-white" />,
    content: [
      { type: "heading", value: "STEP 5: Sales Pipeline Design / Goal Mapping" },
      { type: "bullet", value: "Define Sales Stages and map content to each stage (Lead Generation vs. Lead Nurturing)." },
      { type: "bullet", value: "Key Nurturing Collateral: Case Studies, ROI Calculators, Explainer Videos, Corporate Pitch Decks." },
      { type: "heading", value: "STEP 6: Demand Generation" },
      { type: "bullet", value: "Digital Organic: Content & Thought Leadership, SEO, Affiliates, Digital Presence (Website, Social)." },
      { type: "bullet", value: "Digital Paid: Digital Ads (LinkedIn, Google, FB), Print Ads, Shopping Feeds." },
    ],
    bgClass: "bg-gray-800",
    titleClass: "text-green-400",
    contentClass: "text-gray-300",
  },
  {
    title: "Launch Plan (Step 9)",
    subtitle: 'The Execution Sequence',
    icon: <Clock className="w-12 h-12 text-gray-700" />,
    content: [
      { type: "heading", value: "Phase 1: PREPARE" },
      { type: "bullet", value: "Fix Launch Date, Determine Sales Channels and Objectives." },
      { type: "bullet", value: "Finalize Pricing, Product Demo, Website, and Marketing Collateral." },
      { type: "heading", value: "Phase 2: LAUNCH & REINFORCE" },
      { type: "bullet", value: "Launch: Advertising release, Emailers, Events, Press kit releases, Website updates, Roadshows." },
      { type: "bullet", value: "Reinforce: Track mailers, Win/loss analysis, Follow-up with press/customers/sales channels." },
    ],
    bgClass: "bg-yellow-50",
    titleClass: "text-gray-700",
    contentClass: "text-gray-700",
  },
  {
    title: "Measurement & Evaluation (Step 10)",
    subtitle: 'Tracking Performance and Iteration',
    icon: <BarChart3 className="w-12 h-12 text-white" />,
    content: [
      { type: "heading", value: "Key Evaluation Metrics" },
      { type: "bullet", value: "Customer Feedback: Gather preliminary and ongoing feedback." },
      { type: "bullet", value: "Sales Report: Analyze performance across defined channels." },
      { type: "bullet", value: "Competitive Analysis: Continuous monitoring against competitors." },
      { type: "text", value: "Goal: Achieve predictable, scalable, and sustainable revenue." },
    ],
    bgClass: "bg-teal-600",
    titleClass: "text-white",
    contentClass: "text-teal-50",
  },
];

type ContentItem = { type: string; value: string };
type Slide = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: ContentItem[];
  bgClass: string;
  titleClass: string;
  contentClass: string;
};

const SlideContent: React.FC<{ data: Slide; contentClass: string; titleClass: string }> = ({ data, contentClass, titleClass }) => (
  <div className="p-8 md:p-12 lg:p-16 w-full h-full flex flex-col justify-center">
    <div className="flex items-center mb-6">
      <div className={`p-4 rounded-full mr-4 ${data.bgClass.includes("white") ? "bg-indigo-500" : "bg-white/20"}`}>
        {data.icon}
      </div>
      <div>
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-1 ${titleClass}`}>{data.title}</h1>
        <p className={`text-xl md:text-2xl font-light ${contentClass}`}>{data.subtitle}</p>
      </div>
    </div>

    <div className="space-y-4 pt-8 max-w-4xl">
      {data.content.map((item, index) => {
        if (item.type === "heading") {
          return (
            <h3 key={index} className={`text-2xl font-semibold mt-6 mb-2 ${titleClass}`}>
              {item.value}
            </h3>
          );
        }
        if (item.type === "bullet") {
          return (
            <div key={index} className="flex items-start">
              <span className={`text-2xl mr-3 leading-none ${titleClass}`}>•</span>
              <p className={`text-xl font-medium ${contentClass}`}>{item.value}</p>
            </div>
          );
        }
        if (item.type === "text") {
          return (
            <p key={index} className={`text-xl font-normal pt-4 ${contentClass}`}>
              {item.value}
            </p>
          );
        }
        return null;
      })}
    </div>
  </div>
);

const Page: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const totalSlides = presentationData.length;
  const currentSlide = presentationData[currentSlideIndex] as Slide;

  const goToNext = () => {
    setCurrentSlideIndex((prevIndex) => Math.min(prevIndex + 1, totalSlides - 1));
  };

  const goToPrev = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  const slideMemo = useMemo(() => {
    return <SlideContent data={currentSlide} titleClass={currentSlide.titleClass} contentClass={currentSlide.contentClass} />;
  }, [currentSlideIndex, currentSlide]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter flex flex-col items-center justify-center">
      <div
        className={`w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out transform scale-100 ${currentSlide.bgClass}`}
        role="presentation"
        aria-live="polite"
        style={{ aspectRatio: "16/9", minHeight: "400px" }}
      >
        {slideMemo}
      </div>

      <div className="flex items-center justify-center mt-8 space-x-4 w-full max-w-6xl">
        <button
          onClick={goToPrev}
          disabled={isFirstSlide}
          className={`
            p-3 md:p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105
            ${isFirstSlide ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-50 hover:shadow-xl"}
          `}
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-xl font-semibold text-gray-700 w-24 text-center">
          {currentSlideIndex + 1} / {totalSlides}
        </div>

        <button
          onClick={goToNext}
          disabled={isLastSlide}
          className={`
            p-3 md:p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105
            ${isLastSlide ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-50 hover:shadow-xl"}
          `}
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {presentationData.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
              index === currentSlideIndex ? "bg-indigo-600 shadow-md" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
