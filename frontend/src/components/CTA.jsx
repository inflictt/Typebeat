export default function CTA() {
  return (
    <section className="relative text-center py-32 px-6 border-t border-white/10 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1000px] max-w-[100vw] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,79,46,0.18),transparent_65%)]" />
      <div className="relative max-w-3xl mx-auto">
        <h2 className="font-serif text-5xl sm:text-7xl text-white leading-none">Faster fingers.<br /><span className="italic text-[#FF4F2E]">A fuller mind.</span></h2>
        <p className="text-neutral-400 text-lg mt-6 mb-9 max-w-md mx-auto">Pick a mode, start typing, and learn something new with every test.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#top" className="font-mono text-sm bg-[#FF4F2E] text-black font-bold rounded-lg px-7 py-3.5 hover:brightness-110 transition shadow-[0_0_34px_-4px_rgba(255,79,46,0.7)]">▶ Start typing free</a>
          <a href="#library" className="font-mono text-sm border border-white/15 text-[#ECE7E1] rounded-lg px-7 py-3.5 hover:border-[#FF4F2E]/40 hover:bg-[#FF4F2E]/10 transition">Browse the library</a>
        </div>
      </div>
    </section>
  );
}
