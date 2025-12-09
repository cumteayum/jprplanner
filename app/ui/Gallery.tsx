"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

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

export default function Gallery() {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pixels = slider.current?.scrollWidth || 0;
      const screenWidth = window.innerWidth;

      // The exact distance to scroll: Total Width - 1 Screen Width
      const amountToScroll = pixels - screenWidth;

      // 1. Horizontal Scroll Tween
      gsap.to(slider.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          start: "top top",
          end: `+=${amountToScroll}`, // Scroll exactly the length of the gallery
          invalidateOnRefresh: true,
        },
      });

      // 2. Skew / Jiggle Effect based on velocity
      const proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".gallery-image", "skewX", "deg"), // Fast setter
        clamp = gsap.utils.clamp(-20, 20); // Limit skew angle

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          // Interpolate skew for smoothness
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
    }, component); // Scope GSAP to this component

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    // The Pin Container
    <div
      ref={component}
      className="relative h-screen bg-zinc-950 overflow-hidden"
    >
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* The Sliding Wrapper */}
      {/* width: 400% because we have 4 items, each taking 100vw */}
      <div ref={slider} className="flex h-full w-[400%]">
        {places.map((place, i) => (
          <div
            key={i}
            className="w-screen h-full flex flex-col items-center justify-center relative px-8 border-r border-white/5"
          >
            {/* Image Container (Skew Target) */}
            <div className="gallery-image w-[80vw] md:w-[40vw] h-[60vh] relative will-change-transform">
              <div
                className="w-full h-full overflow-hidden rounded-[3rem] magnetic-target"
                data-cursor-text="EXPLORE"
              >
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-110"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="absolute bottom-20 left-10 z-10 mix-blend-difference pointer-events-none">
              <div className="text-[12vw] font-serif italic leading-none text-white">
                <motion.h1
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden block"
                >
                  {place.name}
                </motion.h1>
              </div>
              <p className="text-xl font-sans tracking-[0.5em] text-zinc-400 uppercase mt-2">
                {place.subtitle}
              </p>
            </div>

            {/* Number */}
            <div className="absolute top-10 right-10 text-9xl font-bold text-zinc-900 pointer-events-none select-none">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
