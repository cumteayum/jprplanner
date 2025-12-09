"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
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
