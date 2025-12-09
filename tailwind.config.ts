import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"], // This becomes the default font
        serif: ["var(--font-playfair)"], // Use with 'font-serif'
      },
    },
  },
  plugins: [],
};
export default config;
