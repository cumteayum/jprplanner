// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-32 px-12 border-t border-white/10 relative overflow-hidden">
      <h1 className="text-[12vw] leading-none font-bold text-zinc-900 absolute bottom-[-50px] left-0 pointer-events-none">
        NAGAR
      </h1>
      <div className="flex justify-between items-end relative z-10">
        <div>
          <p className="text-zinc-500 uppercase tracking-widest mb-4">
            Curated By
          </p>
          <h3 className="text-4xl font-serif">Ishan Nagar</h3>
          <p className="text-zinc-600 mt-2 link-hover">
            Nagar Systems © 2025
          </p>{" "}
        </div>{" "}
        <div className="flex gap-8 text-lg">
          {" "}
          <a href="#" className="hover:text-purple-400 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            The Contract
          </a>
        </div>
      </div>
    </footer>
  );
}
