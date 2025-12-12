"use client";

import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useToast, toast as globalToast } from "@/hooks/use-toast";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

type TopicKey = "pm" | "ds" | "ux" | "agile";

type TopicDetail = {
  label: string;
  desc: string;
  color: string;
};

type TopicContent = {
  category: string;
  title: string;
  summary: string;
  details: TopicDetail[];
  takeaway: string;
};

const topics: Record<TopicKey, TopicContent> = {
  pm: {
    category: "Product Management",
    title: "The Kano Model",
    summary:
      "Don't just build features; build delight. The Kano model categorizes customer preferences into Basic, Performance, and Delighters.",
    details: [
      {
        label: "Basic",
        desc: "Must-haves (Car brakes). Missing them causes dissatisfaction.",
        color: "bg-red-100 text-red-800",
      },
      {
        label: "Performance",
        desc: "The more, the better (Gas mileage). Linearly related to satisfaction.",
        color: "bg-blue-100 text-blue-800",
      },
      {
        label: "Delighters",
        desc: "Unexpected wow (Heated seats). Creates high satisfaction instantly.",
        color: "bg-green-100 text-green-800",
      },
    ],
    takeaway: "Prioritize \"Basics\" to avoid complaints, but \"Delighters\" to win loyalty.",
  },
  ds: {
    category: "Data Science",
    title: "P-Value Intuition",
    summary:
      "The p-value tells you how 'weird' your results are if the status quo were true. It's not the probability that you are right.",
    details: [
      {
        label: "Low P-Value (<0.05)",
        desc: "Very weird result. Reject the null hypothesis.",
        color: "bg-purple-100 text-purple-800",
      },
      {
        label: "High P-Value",
        desc: "Common result. Can't prove anything special happened.",
        color: "bg-gray-100 text-gray-800",
      },
      {
        label: "Common Trap",
        desc: "P=0.05 doesn't mean there's a 95% chance the hypothesis is true.",
        color: "bg-yellow-100 text-yellow-800",
      },
    ],
    takeaway: "Use p-values to filter out noise, but don't blindly trust them without context size.",
  },
  ux: {
    category: "UX Design",
    title: "Fitts's Law",
    summary:
      "The time to acquire a target is a function of the distance to and size of the target. Bigger + Closer = Faster.",
    details: [
      {
        label: "Size Matters",
        desc: "Make clickable buttons large enough (44px+ on mobile).",
        color: "bg-indigo-100 text-indigo-800",
      },
      {
        label: "Distance",
        desc: "Keep related actions close together to reduce travel time.",
        color: "bg-blue-100 text-blue-800",
      },
      {
        label: "Infinite Edges",
        desc: "Corners of screens are easiest to hit (infinite height/width).",
        color: "bg-teal-100 text-teal-800",
      },
    ],
    takeaway: "Don't make users play sniper. Place high-priority actions in easy-to-reach zones.",
  },
  agile: {
    category: "Agile",
    title: "Scrum vs. Kanban",
    summary:
      "Two paths to agility. Scrum is about cadence and roles; Kanban is about flow and capacity.",
    details: [
      {
        label: "Scrum",
        desc: "Fixed lengths (Sprints). Defined roles (PO, Scrum Master).",
        color: "bg-orange-100 text-orange-800",
      },
      {
        label: "Kanban",
        desc: "Continuous flow. No fixed boxes. Focus on limiting WIP.",
        color: "bg-cyan-100 text-cyan-800",
      },
      {
        label: "Which to use?",
        desc: "Use Scrum for product dev. Use Kanban for support/maintenance.",
        color: "bg-gray-100 text-gray-800",
      },
    ],
    takeaway: "Agile is a mindset, not just a set of ceremonies. Choose the tool that fits the work.",
  },
};

const Page: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const toastState = useToast();

  const selectedData = useMemo(() => {
    if (!selectedTopic) {
      return undefined;
    }
    return topics[selectedTopic];
  }, [selectedTopic]);

  // Close modal on ESC and clear any transient messages when modal closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsModalOpen(false);
    }
    if (isModalOpen) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  // Simulate download action: show message and auto-close modal
  const handleDownload = (store: "app" | "play") => {
    const message = `Your download from the ${store === "app" ? "App Store" : "Play Store"} will begin shortly.`;
    // Use toast if available
    if (toastState && toastState.toast) {
      toastState.toast({
        title: "Download starting",
        description: message,
      });
    } else {
      setDownloadMessage(message);
    }

    // Auto-close after short delay
    setTimeout(() => {
      setIsModalOpen(false);
      setDownloadMessage(null);
    }, 1600);
  };

  return (
    <>
      <Head>
        <title>Mikrolearn - Get Smarter in 60 Seconds</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-pb3VM1xIuW9y+vX0L2ONmS2N5ZlwlWzdU3szVwZsXBPr+FlEth8FA8Xw5p1dL+G9C63fXpX4YjFRC2T9sA2F6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
        <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
          <div className="font-bold text-2xl tracking-tighter text-blue-600 flex items-center gap-2">
            <i className="fa-solid fa-bolt" aria-hidden="true" /> Mikrolearn
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="hidden md:block text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
          >
            Get the App
          </button>
        </nav>

        <main className="flex-grow flex flex-col items-center px-4 md:px-6 pt-8 pb-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10 pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
              What do you want to <span className="text-blue-600">learn</span> today?
            </h1>
            <p className="text-xl text-gray-500 font-medium">Pick a topic. Get smarter in 60 seconds.</p>
          </div>

          <div
            className="relative w-full max-w-xs md:max-w-sm mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <select
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value as TopicKey | "")}
                className="relative block w-full bg-white border border-gray-200 text-gray-900 font-semibold py-4 px-5 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer shadow-sm text-lg"
              >
                <option value="" disabled>
                  Select a Topic ▼
                </option>
                <option value="pm">Product Management</option>
                <option value="ds">Data Science</option>
                <option value="ux">UX Design</option>
                <option value="agile">Agile Methodologies</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <i className="fa-solid fa-chevron-down" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="w-full max-w-md perspective-1000 min-h-[400px] flex justify-center items-start">
            {!selectedData ? (
              <div
                className="text-center text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded-2xl w-full h-64 flex flex-col items-center justify-center animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <i className="fa-solid fa-arrow-up text-3xl mb-4 animate-bounce" aria-hidden="true" />
                <p>Select a topic above to start learning.</p>
              </div>
            ) : (
              <div
                key={selectedTopic}
                className="w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] animate-pop-in"
              >
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{selectedData.category}</span>
                  <span className="text-gray-400 text-xs">
                    <i className="fa-regular fa-clock" aria-hidden="true" /> 60s read
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedData.title}</h2>
                  <p className="text-gray-600 mb-6 italic border-l-4 border-blue-200 pl-4">{selectedData.summary}</p>

                  <div className="space-y-4 mb-8">
                    {selectedData.details.map((detail) => (
                      <div key={detail.label} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className={`${detail.color} px-2 py-1 rounded-md font-bold text-xs whitespace-nowrap w-fit`}>
                          {detail.label}
                        </span>
                        <span className="text-gray-700">{detail.desc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <i className="fa-solid fa-lightbulb text-yellow-400 mt-1" aria-hidden="true" />
                      <div>
                        <span className="font-bold text-gray-900 text-sm block mb-1">Key Takeaway</span>
                        <p className="text-sm text-gray-600">{selectedData.takeaway}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3.5 px-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                  >
                    READ 5 MORE CARDS LIKE THIS
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            className="mt-20 w-full max-w-4xl mx-auto text-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
              Join the "Smartest People in the Room" Club
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                <i className="fa-brands fa-google text-2xl" aria-hidden="true" /> Google
              </div>
              <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                <i className="fa-brands fa-amazon text-2xl" aria-hidden="true" /> Amazon
              </div>
              <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                <i className="fa-brands fa-spotify text-2xl" aria-hidden="true" /> Spotify
              </div>
              <div className="font-serif text-xl font-bold text-gray-600 tracking-tight">McKinsey &amp; Company</div>
            </div>
            <p className="mt-4 text-xs text-gray-400">Learners from these companies use Mikrolearn</p>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-400 text-sm">
          &copy; 2025 Mikrolearn Inc.
        </footer>
      </div>

      {isModalOpen && (
        <ToastProvider>
          <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="download-modal-title">
            <div
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
                <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-pop-in">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <i className="fa-solid fa-mobile-screen text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900" id="download-modal-title">
                          Get the Full Experience
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Unlock 1000+ micro-lessons on Product, Design, and Tech. Learn on the go, offline, anytime.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center sm:justify-end">
                      <button
                        type="button"
                        onClick={() => handleDownload("app")}
                        className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 gap-2 items-center"
                      >
                        <i className="fa-brands fa-apple text-lg" aria-hidden="true" /> App Store
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload("play")}
                        className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 gap-2 items-center"
                      >
                        <i className="fa-brands fa-google-play text-lg" aria-hidden="true" /> Play Store
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <i className="fa-solid fa-xmark text-xl" aria-hidden="true" />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
              </div>
            </div>
            <ToastViewport />
          </div>
        </ToastProvider>
      )}

      <style jsx global>{`
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .animate-pop-in {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Page;
