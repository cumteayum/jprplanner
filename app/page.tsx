"use client";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import mainLogo from "@/public/logo.jpg";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  ArrowDown,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Heart,
  Play,
  X,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  function sendEmail() {
    if (typeof window !== "undefined") {
      console.log("Sending email:", msg);
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
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
  }

  function handleContractSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
    sendEmail();

    setTimeout(() => {
      window.location.href =
        "https://wa.me/917357131408?text=I%20got%20the%20receipt.";
    }, 4000);
  }

  // --- MOCK DATA ---
  const items = [
    {
      id: "muse",
      col: "md:col-span-2",
      row: "md:row-span-2",
      title: "The Muse",
      bg: "bg-zinc-900",
      content: (
        <div className="relative w-full h-full group overflow-hidden">
          <Image
            src={mainLogo}
            alt="Muse"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-serif italic text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-10 group-hover:translate-y-0">
              You should get this one done.
            </h2>
          </div>
        </div>
      ),
    },
    {
      id: "spotify",
      col: "md:col-span-1",
      row: "md:row-span-1",
      title: "Spotify",
      bg: "bg-[#1DB954]",
      content: (
        <div className="h-full flex flex-col justify-between p-6 text-black relative overflow-hidden group">
          <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-500">
            <Play />
          </div>
          <div className="z-10">
            <h3 className="text-xl font-bold text-white">Pink+White</h3>
            <p className="font-medium opacity-80 text-white">Frank Ocean</p>
          </div>
          <div className="flex gap-1 h-8 items-end z-10">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                className="w-2 bg-white rounded-full"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "ego",
      col: "md:col-span-1",
      row: "md:row-span-1",
      title: "Ego",
      bg: "bg-zinc-900",
      content: <EgoGauge />,
    },
    {
      id: "calendar",
      col: "md:col-span-1",
      row: "md:row-span-2",
      title: "Calendar",
      bg: "bg-blue-500",
      text: "text-zinc-900",
      content: <CalendarCountdown />,
    },
    {
      id: "contract",
      col: "md:col-span-2",
      row: "md:row-span-1",
      title: "Book Me",
      bg: "bg-yellow-200",
      text: "text-zinc-900",
      content: (
        <div className="h-full flex mt-3 flex-col justify-between p-6 relative">
          {/* Ticket styling */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#02040a] rounded-r-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#02040a] rounded-l-full" />
          <div className="absolute left-4 right-4 top-1/2 h-[2px] border-t-2 border-dashed border-zinc-300" />

          <div className="pb-8">
            <h3 className="text-4xl font-bold tracking-tighter leading-none">
              BOOK
              <br />
              ME.
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-s text-[9px] uppercase tracking-widest border border-zinc-700 px-2 py-1 rounded-full font-mono uppercase text-zinc-500">
                Slots Filling Fast
              </p>
            </div>
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

            {/* FIX: Removed onClick here. The parent Div handles the click. */}
            <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex justify-between px-4 pointer-events-none">
              <span>Select Date</span>
              <span>→</span>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const selectedItem = items.find((i) => i.id === selectedId);

  return (
    <SmoothScroll>
      <Cursor />
      <Preloader onFinish={() => setIsLoaded(true)} />

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <main className="min-h-screen bg-[#02040a] text-[#fafafa] selection:bg-purple-500 selection:text-white">
        {/* HEADER & GRID */}
        <section className="min-h-screen p-4 md:p-12 flex flex-col gap-12">
          <motion.header
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <h1 className="text-[14vw] font-serif leading-[0.8] text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Kanak's <br />
              <span className="font-sans font-bold tracking-tighter text-white">
                Archive.
              </span>
            </h1>
            <p className="mt-8 text-xl text-zinc-400 max-w-lg leading-relaxed">
              A digital collection of chaos, beauty, and mixed signals. Curated
              by{" "}
              <span className="text-white border-b border-white/30">
                Ishan Nagar.
              </span>
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[80vh]">
            {items.map((item, i) => (
              <motion.div
                layoutId={item.id}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className={`${item.col} ${item.row} ${item.bg} ${item.text || "text-white"} bento-card rounded-[2rem] overflow-hidden relative cursor-pointer hover:ring-4 ring-white/20 transition-all duration-500 shadow-2xl`}
              >
                <div className="w-full h-full">{item.content}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <Gallery />
        <Footer />

        {/* --- FIXED MODAL OVERLAY --- */}
        <AnimatePresence>
          {selectedId && selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
              {/* BACKDROP BLUR */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                onClick={() => setSelectedId(null)}
              />

              {/* CARD CONTENT EXPANDED */}
              <motion.div
                layoutId={selectedId}
                className={`w-full max-w-4xl h-full ${selectedItem.bg} ${selectedItem.text || "text-white"} rounded-[3rem] overflow-hidden relative z-[110] border border-white/10`}
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                  }}
                  className="absolute top-8 right-8 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors z-50"
                >
                  <X />
                </button>

                {/* MODAL CONTENT LOGIC */}
                <div className="p-12 md:p-24 h-full overflow-y-auto">
                  {selectedId === "contract" ? (
                    // --- CONTRACT FORM / RECEIPT ---
                    <div className="h-full flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleContractSubmit}
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
                        {selectedItem.title}
                      </h2>
                      <p className="text-xl opacity-70">
                        Detailed view for {selectedItem.title}.
                      </p>
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

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

const Cursor = () => {
  const [cursorText, setCursorText] = useState("");
  const [isMagnetic, setIsMagnetic] = useState(false);

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

  const manageHover = (e: any) => {
    const target = e.target as HTMLElement;
    if (target.closest(".magnetic-target")) {
      setIsMagnetic(true);
      const text =
        target.getAttribute("data-cursor-text") ||
        target.closest(".magnetic-target")?.getAttribute("data-cursor-text");
      setCursorText(text || "");
    } else if (target.closest("a, button, .cursor-pointer, .bento-card")) {
      setIsMagnetic(true);
      setCursorText("");
    } else {
      setIsMagnetic(false);
      setCursorText("");
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseover", manageHover);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
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
          width: isMagnetic ? (cursorText ? 100 : 80) : 16,
          height: isMagnetic ? (cursorText ? 100 : 80) : 16,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        className="bg-white rounded-full flex items-center justify-center"
      >
        {cursorText && (
          <span className="text-black font-bold text-[10px] tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[100] bg-[#02040a] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="text-4xl md:text-6xl font-serif italic text-white tracking-widest">
          The Archive.
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] bg-white/50"
        />
        <p className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase">
          Loading Subject: Kanak
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- 2. BENTO WIDGETS ---

function EgoGauge() {
  const count = useMotionValue(96);
  const rounded = useTransform(count, Math.round);
  const [isCritical, setIsCritical] = useState(false);

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
