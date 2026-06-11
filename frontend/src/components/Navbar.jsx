import { useState } from "react";

export default function Navbar() {
  const links = ["Modes", "How it works", "Library", "Leaderboards", "Dashboard", "About"];
  const [dark, setDark] = useState(true); // visual toggle for now — wire to real theme later

  return (
    // floating wrapper: sticky, with a small gap from the top
    <div className="sticky top-0 z-50 px-4 pt-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 h-16 px-3 sm:px-5
                      rounded-2xl border border-white/10 bg-[#141211]/70 backdrop-blur-xl
                      shadow-[0_10px_40px_-12px_rgba(0,0,0,0.85)]">

        {/* logo */}
        <a href="#top" className="flex items-center gap-3 pl-1">
          <span className="grid place-items-center w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#FF4F2E] to-[#FF9A3D]
                           shadow-[0_0_22px_rgba(255,79,46,0.5)]">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#120b09]" />
          </span>
          <span className="font-serif text-[22px] font-semibold tracking-tight text-white">Typebeat</span>
        </a>

        {/* center links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={
                "text-sm rounded-lg px-3.5 py-2 transition " +
                (i === 0
                  ? "text-white bg-white/5"
                  : "text-neutral-400 hover:text-white hover:bg-white/5")
              }
            >
              {l}
            </a>
          ))}
        </div>

        {/* right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* theme toggle
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="grid place-items-center w-9 h-9 rounded-lg border border-white/10 text-neutral-400
                       hover:text-[#FF4F2E] hover:border-[#FF4F2E]/40 transition"
          >
            {dark ? (
              // sun
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              // moon
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button> */}

          {/* sign in */}
          <a
            href="#top"
            className="font-mono text-[13px] font-bold bg-[#FF4F2E] text-black rounded-lg px-4 sm:px-5 py-2.5
                       hover:brightness-110 transition shadow-[0_0_30px_-6px_rgba(255,79,46,0.7)]"
          >
            Sign In
          </a>
        </div>
      </nav>
    </div>
  );
}