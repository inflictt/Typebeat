const CARDS = [
  ["Upload your own content", "Drop in notes, PDFs or articles and practice typing the material you actually need to study."],
  ["AI content generator", "Auto-generate geography, music, science and history stories at any difficulty, on demand."],
  ["Multiplayer & friends", "1v1 typing races, add friends, compare WPM and challenge each other head-to-head."],
];
export default function Roadmap() {
  return (
    <section id="roadmap" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl text-white">Where Typebeat is <span className="italic text-[#FF4F2E]">headed.</span></h2>
          <p className="text-neutral-400 text-lg mt-5">We're just getting started. Here's what's on the workbench.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map(([h, p]) => (
            <div key={h} className="bg-[#141211] border border-white/10 rounded-2xl p-7 hover:border-[#FF4F2E]/40 transition">
              <div className="text-[#FF4F2E] font-mono text-xl">+</div>
              <h4 className="text-lg font-semibold text-white mt-4 mb-2">{h}</h4>
              <p className="text-[15px] text-neutral-400 leading-relaxed">{p}</p>
              <span className="inline-block mt-5 font-mono text-[10.5px] tracking-widest uppercase text-neutral-600 border border-white/15 rounded px-2.5 py-1">Version 2</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
