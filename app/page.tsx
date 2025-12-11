"use client";

import emailjs from "@emailjs/browser";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import {
  ArrowUpRight,
  ArrowDown,
  Calendar as CalendarIcon,
  Heart,
  Play,
  X,
  Lock,
  Disc,
  Music,
  Check,
  Brain,
} from "lucide-react";
import Image from "next/image";
import ReactCardFlip from "react-card-flip";
import mainLogo from "@/public/logo.jpeg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- UTILS ---
const SmoothScroll = ({ children }: { children: React.ReactNode }) => (
  <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
    {children}
  </ReactLenis>
);

// --- 1. PRELOADER (LIQUID TEXT) ---
const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 3.5 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[100] bg-[#02040a] flex items-center justify-center"
    >
      <div className="relative">
        {/* Outline Text */}
        <h1 className="text-6xl md:text-8xl font-serif italic text-zinc-800 tracking-widest absolute inset-0 pointer-events-none">
          The Archive.
        </h1>
        {/* Filled Text (Animated Width) */}
        <motion.h1
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="text-6xl md:text-8xl font-serif italic text-white tracking-widest overflow-hidden whitespace-nowrap relative z-10"
        >
          The Archive.
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase"
      >
        Access Granted: Kanak
      </motion.p>
    </motion.div>
  );
};

// --- 2. WIDGETS ---

// THE DOSSIER (Flip Card)
const Dossier = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [submit, setIsSubmit] = useState(false);

  return (
    <div
      className="w-full h-full cursor-pointer group perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        containerStyle={{ height: "100%", width: "100%" }}
      >
        {/* FRONT */}
        <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/10">
          <Image
            src={mainLogo}
            alt="Muse"
            fill
            className="object-cover opacity-60 group-hover:opacity-40 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-serif italic text-white mix-blend-overlay">
              Kanak.
            </h2>
          </div>
          <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300">
              Tap to Analyze
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="w-full h-full bg-[#0f1115] rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-4">
              Subject Analysis
            </p>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Chaos Level</span>
                <span className="text-red-500 font-bold">CRITICAL (99%)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Status</span>
                <span className="text-purple-400">Compromised</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Weakness</span>
                <span className="text-white">Ishan...presumably</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-4xl font-serif italic text-zinc-700">
              Classified.
            </h3>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

// THE QUIZ (Gatekeeper)
const TheQuiz = ({ onUnlock }: { onUnlock: () => void }) => {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      if (step === 2) onUnlock();
      else setStep((s) => s + 1);
    } else {
      setFailed(true);
      setTimeout(() => setFailed(false), 1000); // Shake effect reset
    }
  };

  const questions = [
    { q: "Who is the prize?", a: ["Mrs. Nagar", "Mr. Nagar"], correct: 0 }, // 1 = Me (You)
    {
      q: "Nobody knows to know about our little secret",
      a: ["Yes", "No, they need to"],
      correct: 0,
    }, // 1 = Tabs (Chaos choice) or Spaces (Dev choice). Let's say Tabs for React.
    {
      q: "Are you gonna cheat on your 'boyfriend' ?",
      a: ["Yes", "No"],
      correct: 0,
    },
  ];

  if (step > 2)
    return (
      <div className="h-full w-full bg-green-500 flex flex-col items-center justify-center p-6 text-black">
        <Check size={48} />
        <p className="font-bold uppercase tracking-widest mt-2">
          Access Granted
        </p>
      </div>
    );

  return (
    <motion.div
      animate={failed ? { x: [-10, 10, -10, 10, 0] } : {}}
      className="h-full w-full bg-zinc-900 flex flex-col justify-between p-6 relative overflow-hidden"
    >
      <div className="z-10">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={14} className="text-purple-500" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Security Check
          </p>
        </div>
        <h3 className="text-xl font-serif italic text-white">
          {questions[step].q}
        </h3>
      </div>

      <div className="flex gap-2 z-10">
        {questions[step].a.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i === questions[step].correct)}
            className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all"
          >
            {ans}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// THE PLAYLISTS
const Playlists = () => {
  const [active, setActive] = useState(0);
  const moods = [
    { name: "Late Night", color: "bg-blue-500", artist: "The Weeknd" },
    { name: "Road Trip", color: "bg-orange-500", artist: "Arctic Monkeys" },
    { name: "Toxic", color: "bg-red-500", artist: "Brent Faiyaz" },
  ];

  return (
    <div className="h-full w-full bg-[#1DB954] p-6 flex flex-col justify-between text-black relative group overflow-hidden">
      <div className="absolute right-[-30px] bottom-[-30px] text-[10rem] opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700 pointer-events-none">
        <Disc />
      </div>

      <div className="z-10 flex justify-between items-start">
        <Music size={24} />
        <div className="flex gap-1">
          {moods.map((_, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${active === i ? "bg-black w-6" : "bg-black/30 hover:bg-black/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="z-10">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">
            Current Vibe
          </p>
          <h3 className="text-3xl font-bold leading-none">
            {moods[active].name}
          </h3>
          <p className="font-serif italic opacity-80">{moods[active].artist}</p>
        </motion.div>
      </div>
    </div>
  );
};

// THE BOOK ME TICKET (Locked until Quiz passed)
const Ticket = ({
  isLocked,
  onClick,
}: {
  isLocked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`h-full flex flex-col justify-between p-6 relative bg-white text-zinc-900 transition-all duration-500 ${isLocked ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}
    >
      {isLocked && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2">
            <Lock size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Locked
            </span>
          </div>
        </div>
      )}

      {/* Ticket Decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#02040a] rounded-r-full" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#02040a] rounded-l-full" />
      <div className="absolute left-4 right-4 top-1/2 h-[2px] border-t-2 border-dashed border-zinc-300" />

      <div className="pb-8">
        <h3 className="text-5xl font-bold tracking-tighter leading-none">
          BOOK
          <br />
          ME.
        </h3>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <p className="text-s text-[9px] uppercase tracking-widest border border-zinc-700 px-2 py-1 rounded-full font-mono uppercase text-zinc-500">
          Slots Filling Fast
        </p>
      </div>

      <div className="pt-8 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-400">
              Location
            </p>
            <p className="font-bold">Jaipur, RJ</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-zinc-400">
              Price
            </p>
            <p className="font-bold">Your Soul</p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={onClick}
          className="w-full py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all flex justify-between px-6 items-center group"
        >
          <span>Select Date</span>
          <ArrowUpRight
            size={20}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

// --- 3. MAIN PAGE ---

export default function Home() {
  const selectedId = "contract";
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [mailed, setMailed] = useState(false);
  const [msg, setMsg] = useState("");

  const items = [
    {
      id: "muse",
      col: "md:col-span-2 min-h-[300px] md:min-h-0",
      row: "md:row-span-2",
      content: <Dossier />,
    },
    {
      id: "spotify",
      col: "md:col-span-1",
      row: "md:row-span-1",
      content: <Playlists />,
    },
    {
      id: "quiz",
      col: "md:col-span-1",
      row: "md:row-span-1",
      content: <TheQuiz onUnlock={() => setIsUnlocked(true)} />,
    },
    {
      id: "calendar",
      col: "md:col-span-1 min-h-[300px] md:min-h-0",
      row: "md:row-span-2",
      content: <CalendarCountdown />,
    }, // Use Calendar
    {
      id: "contract",
      col: "md:col-span-2 min-h-[300px] md:min-h-0",
      row: "md:row-span-1",
      content: (
        <Ticket isLocked={!isUnlocked} onClick={() => setSubmit(true)} />
      ),
    },
  ];

  return (
    <SmoothScroll>
      <Cursor />
      <Preloader onFinish={() => setIsLoaded(true)} />

      {/* Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <main className="min-h-screen bg-[#02040a] text-[#fafafa] selection:bg-purple-500 selection:text-white pb-32">
        {/* HEADER */}
        <section className="min-h-screen p-4 md:p-12 flex flex-col gap-12">
          <motion.header
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20"
          >
            <h1 className="text-[10vw] font-serif leading-[0.8] text-white mix-blend-difference">
              The Archive.
            </h1>
            <p className="mt-8 text-xl text-zinc-500 max-w-lg font-mono">
              [CONFIDENTIAL] <br /> Subject: Kanak.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-auto md:h-[85vh]">
            {items.map((item, i) => (
              <motion.div
                layoutId={item.id}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className={`${item.col} ${item.row} rounded-[2.5rem] overflow-hidden relative transition-all duration-500 shadow-2xl border border-white/5`}
              >
                <div className="w-full h-full">{item.content}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <Gallery />
        <Footer />

        {/* MODAL (Contract Logic) */}
        {/* (Paste your existing Modal logic here for 'contract') */}

        {/* --- FIXED MODAL OVERLAY --- */}
        <AnimatePresence>
          {submit && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
              {/* BACKDROP BLUR */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                onClick={() => setSubmit(false)}
              />

              {/* CARD CONTENT EXPANDED */}
              <motion.div
                layoutId={selectedId}
                className={`w-full max-w-4xl h-full bg-gray-800 text-white rounded-[3rem] overflow-hidden relative z-[110] border border-white/10`}
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubmit(false);
                  }}
                  className="absolute top-8 right-8 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors z-50"
                >
                  <X />
                </button>

                {/* MODAL CONTENT LOGIC */}
                <div className="p-12 md:p-24 h-full overflow-y-auto">
                  {submit ? (
                    // --- CONTRACT FORM / RECEIPT ---
                    <div className="h-full flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {!mailed ? (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={(e) => {
                              e.preventDefault();
                              console.log(msg);
                              if (typeof window !== "undefined") {
                                console.log("Sending email:", msg);
                                emailjs.init(
                                  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
                                );
                                emailjs
                                  .send(
                                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                                    process.env
                                      .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                                    { msg },
                                  )

                                  .then(
                                    (result) => {
                                      console.log(result.text);
                                    },
                                    (error) => {
                                      console.log(error.text);
                                    },
                                  );
                              }
                              setMailed(true);
                            }}
                            className="flex flex-col gap-8 max-w-md w-full mx-auto"
                          >
                            <h2 className="text-5xl font-serif italic mb-4">
                              The Application.
                            </h2>

                            <div>
                              <label className="block text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-50">
                                The Applicant
                              </label>
                              <input
                                type="text"
                                defaultValue="Kanak"
                                readOnly
                                className="w-full bg-transparent border-b border-zinc-700 py-4 text-2xl font-serif italic focus:outline-none cursor-not-allowed opacity-50"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-50">
                                Reason for Date
                              </label>
                              <input
                                required
                                autoFocus
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                type="text"
                                placeholder="Because I need chaos..."
                                className="w-full bg-transparent border-b border-black/20 py-4 text-2xl outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                              />
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-black text-white py-5 rounded-full font-bold text-lg mt-4 hover:bg-zinc-800 transition-colors"
                            >
                              Submit Application
                            </motion.button>
                          </motion.form>
                        ) : (
                          // RECEIPT COMPONENT (Inline for now)
                          <motion.div
                            key="receipt"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-sm mx-auto bg-white text-black p-8 font-mono text-sm shadow-2xl rotate-[-2deg] border border-zinc-200"
                          >
                            {/* ... Receipt UI Code ... */}
                            <motion.div
                              key="receipt"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-full max-w-sm mx-auto bg-white text-black p-8 font-mono text-sm shadow-2xl rotate-[-2deg]"
                            >
                              <div className="text-center border-b-2 border-black pb-4 mb-4 border-dashed">
                                <h3 className="text-2xl font-bold uppercase tracking-tighter">
                                  Nagar Systems
                                </h3>
                                <p className="text-xs text-zinc-500">
                                  OFFICIAL RECEIPT
                                </p>
                              </div>

                              <div className="flex flex-col gap-2 mb-6 uppercase">
                                <div className="flex justify-between">
                                  <span>DATE:</span>
                                  <span>{new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>ITEM:</span>
                                  <span>1x DATE NIGHT</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>CLIENT:</span>
                                  <span>KANAK</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                  <span>COST:</span>
                                  <span>ATTENTION</span>
                                </div>
                              </div>

                              <div className="border-t-2 border-black border-dashed pt-4 text-center">
                                <p className="font-bold">
                                  STATUS: PENDING REVIEW
                                </p>
                                <p className="mt-2 text-xs italic text-zinc-500">
                                  "Redirecting to Management..."
                                </p>
                              </div>

                              {/* Barcode Decoration */}
                              <div className="mt-6 h-12 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,white_2px,white_4px)]"></div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // --- GENERIC CONTENT FOR OTHER CARDS ---
                    <div>
                      <h2 className="text-6xl font-serif italic mb-8">
                        Ignore
                      </h2>
                      <p className="text-xl opacity-70">ignore</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScroll>
  );
}

function EgoGauge() {
  const count = useMotionValue(96);
  const rounded = useTransform(count, Math.round);
  const [isCritical, setIsCritical] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const target = Math.random() > 0.7 ? 100 : 95 + Math.random() * 1.5;
      setIsCritical(target > 98.5);
      animate(count, target, { duration: 2, ease: "easeInOut" });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col justify-between p-6 relative overflow-hidden group">
      {/* Background Pulse (Warning State) */}
      <div
        className={`absolute inset-0 bg-red-500/10 transition-opacity duration-500 ${isCritical ? "opacity-100 animate-pulse" : "opacity-0"}`}
      />

      <div className="flex justify-between items-start z-10">
        <div>
          <h3 className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Metric
          </h3>
          <p className="text-white font-serif italic text-lg">Ego Levels</p>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${isCritical ? "bg-red-500" : "bg-green-500"} shadow-[0_0_10px_currentColor]`}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-end">
          <motion.h1 className="text-7xl font-mono font-bold text-white tracking-tighter">
            {rounded}
          </motion.h1>
          <span className="text-2xl text-zinc-500 mb-2 font-mono"> %</span>
        </div>
      </div>

      {/* Progress Bar Visual */}
      <div className="w-full h-1 bg-zinc-800 mt-2 rounded-full overflow-hidden">
        <motion.div
          style={{ width: useTransform(count, (c) => `${c}%`) }}
          className={`h-full transition-colors duration-500 ${isCritical ? "bg-red-500" : "bg-white"}`}
        />
      </div>

      <p className="text-[10px] text-zinc-600 mt-2 font-mono uppercase">
        Status: {isCritical ? "CRITICAL MASS" : "STABLE (BARELY)"}
      </p>
    </div>
  );
}

const getDaysInMonth = () => {
  const days = [];
  for (let i = 0; i < 31; i++) {
    days.push(i + 1);
  }
  return days;
};

export function CalendarCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0 });
  const today = new Date().getDate();
  const targetDate = 25;
  const days = getDaysInMonth();

  useEffect(() => {
    const target = new Date("2025-12-25T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      if (dist < 0) return clearInterval(timer);
      setTimeLeft({
        d: Math.floor(dist / (1000 * 60 * 60 * 24)),
        h: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // CARD CONTAINER
    <div className="h-full flex flex-col justify-between p-6 bg-[#FAFAFA] text-zinc-900 relative overflow-hidden group">
      {/* PAPER TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      {/* HEADER */}
      <div className="flex justify-between items-start border-b border-zinc-200 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-black rounded-full text-white">
              <CalendarIcon size={12} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              T-Minus
            </p>
          </div>
          <div className="font-mono text-4xl font-bold tracking-tighter tabular-nums">
            {timeLeft.d}d : {timeLeft.h}h
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase text-zinc-400">
            Destination
          </p>
          <p className="font-serif italic font-bold text-xl">Jaipur.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
        <p className="font-serif italic text-zinc-400 text-center text-xl leading-tight">
          "Scroll down to see
          <br />
          where we could go..."
        </p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-2 text-zinc-300"
        >
          <ArrowDown size={16} />
        </motion.div>
      </div>

      {/* CALENDAR GRID */}
      <div className="relative z-10">
        <div className="grid grid-cols-7 gap-y-2 text-center text-[9px] font-bold text-zinc-300 mb-2 uppercase tracking-wider">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        <div className="grid grid-cols-7 gap-1 place-items-center">
          {days.map((day) => {
            const isTarget = day === targetDate;
            const isToday = day === today;
            const isPast = day < today;

            return (
              <div
                key={day}
                className={clsx(
                  "w-6 h-6 flex items-center justify-center text-[10px] font-medium rounded-full transition-all duration-300 relative",
                  isTarget
                    ? "bg-red-50 text-red-500 shadow-sm"
                    : isToday
                      ? "bg-black text-white shadow-lg scale-110 font-bold"
                      : isPast
                        ? "text-zinc-300 line-through decoration-zinc-200"
                        : "text-zinc-500 hover:bg-zinc-100 cursor-pointer",
                )}
              >
                {isTarget ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Heart size={10} fill="currentColor" />
                  </motion.div>
                ) : (
                  day
                )}

                {/* Today Indicator Dot */}
                {isToday && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-black rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Gallery = () => {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const places = [
    {
      name: "Nahargarh",
      subtitle: "The Sunset View",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Nahargarh_13.jpg/500px-Nahargarh_13.jpg",
    },
    {
      name: "Amer Fort",
      subtitle: "Royal Heritage",
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Patrika Gate",
      subtitle: "Color Symphony",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_aPslqVQYzLuSg0-hZ2aOkxghnUu_RFjDw&s",
    },
    {
      name: "Hawa Mahal",
      subtitle: "Wind Palace",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    },
  ];
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pixels = slider.current?.scrollWidth || 0;
      const screenWidth = window.innerWidth;
      const amountToScroll = pixels - screenWidth;

      gsap.to(slider.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Jiggle Effect
      const proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".gallery-image", "skewX", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={component}
      className="relative h-screen bg-[#02040a] overflow-hidden text-white"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div ref={slider} className="flex h-full w-[400%]">
        {places.map((place, i) => (
          <div
            key={i}
            className="w-screen h-full flex flex-col items-center justify-center relative px-8 border-r border-white/5"
          >
            <div className="gallery-image w-[80vw] md:w-[40vw] h-[50vh] md:h-[60vh] relative will-change-transform">
              <div
                className="w-full h-full overflow-hidden rounded-[3rem] magnetic-target"
                data-cursor-text="EXPLORE"
              >
                <img
                  src={place.img}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-110"
                />
              </div>
            </div>
            <div className="absolute bottom-20 left-10 z-10 mix-blend-difference pointer-events-none">
              <h1 className="text-[12vw] font-serif italic leading-none text-white">
                {place.name}
              </h1>
              <p className="text-xl font-sans tracking-[0.5em] text-zinc-400 uppercase mt-2">
                {place.subtitle}
              </p>
            </div>
            <div className="absolute top-10 right-10 text-9xl font-bold text-zinc-900 pointer-events-none select-none">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. THE FOOTER ---

const Footer = () => {
  return (
    <footer className="bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/10 relative overflow-hidden text-white">
      <h1 className="text-[15vw] leading-none font-bold text-[#111] absolute bottom-[-50px] left-0 pointer-events-none select-none">
        NAGAR
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-end relative z-10 gap-10">
        <div>
          <p className="text-zinc-500 uppercase tracking-widest text-xs mb-4">
            Curated By
          </p>
          <h3 className="text-4xl font-serif">Ishan Nagar</h3>
          <p className="text-zinc-600 mt-2">Ishan Nagar © 2025</p>
        </div>
        <div className="flex gap-8 text-lg font-medium">
          <a
            href="https://github.com/cumteayum"
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            GitHub
          </a>
          <a className="hover:text-purple-400 transition-colors cursor-pointer">
            The Contract
          </a>
        </div>
      </div>
    </footer>
  );
};

export function Cursor() {
  const [cursorText, setCursorText] = useState("");
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isActive, setIsActive] = useState(false); // Click state

  // Physics
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  const manageMouseDown = () => setIsActive(true);
  const manageMouseUp = () => setIsActive(false);

  const manageHover = (e: any) => {
    const target = e.target as HTMLElement;

    // 1. Check for Custom Magnetic Targets (Gallery Images)
    if (target.closest(".magnetic-target")) {
      setIsMagnetic(true);
      const text =
        target.getAttribute("data-cursor-text") ||
        target.closest(".magnetic-target")?.getAttribute("data-cursor-text");
      setCursorText(text || "OPEN");
    }
    // 2. Check for Links/Buttons
    else if (target.closest("a, button, .cursor-pointer")) {
      setIsMagnetic(true);
      setCursorText(""); // Just snap, no text
    } else {
      setIsMagnetic(false);
      setCursorText("");
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mousedown", manageMouseDown);
    window.addEventListener("mouseup", manageMouseUp);
    window.addEventListener("mouseover", manageHover);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", manageMouseDown);
      window.removeEventListener("mouseup", manageMouseUp);
      window.removeEventListener("mouseover", manageHover);
    };
  }, []);

  return (
    <motion.div
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
      className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{
          width: isMagnetic ? (cursorText ? 100 : 60) : 32,
          height: isMagnetic ? (cursorText ? 100 : 60) : 32,
          scale: isMagnetic ? 3 : 1, // Shrink on click
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        className="bg-white rounded-full flex items-center justify-center relative"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black font-bold text-[10px] tracking-widest uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
