export default function Navbar() {
  const links = ["Modes", "How it works", "Library", "Leaderboards", "Dashboard", "About"];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0d0c0b]/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[72px] px-6">
        <a href="#top" className="flex items-center gap-3 font-serif text-2xl font-semibold text-white">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF4F2E] to-[#FF9A3D] shadow-[0_0_22px_rgba(255,79,46,0.45)]">
            <span className="w-2 h-2 rounded-sm bg-[#120b09]" />
          </span>
          Typebeat
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-neutral-400 hover:text-white transition">{l}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:block text-sm text-neutral-400 hover:text-white transition">Sign in</a>
          <a href="#top" className="font-mono text-[13px] font-bold bg-[#FF4F2E] text-black rounded-lg px-4 py-2.5 hover:brightness-110 transition shadow-[0_0_30px_-8px_rgba(255,79,46,0.6)]">Start typing</a>
        </div>
      </div>
    </nav>
  );
}
