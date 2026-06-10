const ITEMS = [
  ["Knowledge, not noise", "Random word lists build speed but teach nothing. Typebeat fills the same minutes with facts worth remembering."],
  ["Curated, copyright-safe content", "Original geography and music stories — no scraped lyrics, no legal grey area. Just clean, factual prose."],
  ["Real-time accuracy", "Every wrong key flags instantly in coral. Backspace to fix it, or push on and let the end stats tell the truth."],
  ["Track what you learn", "Your dashboard counts countries typed and music facts learned alongside WPM — progress you can feel."],
];
export default function Benefits() {
  return (
    <section className="pb-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-neutral-500 mb-5"><span className="text-[#FF4F2E]">03</span> — the idea</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight">Every minute of practice<br />should make you <span className="italic text-[#FF4F2E]">smarter.</span></h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col">
            {ITEMS.map(([h, p]) => (
              <div key={h} className="flex gap-4 py-6 border-t border-white/10 last:border-b">
                <span className="text-[#FF4F2E] text-sm mt-1.5">◆</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1.5">{h}</h4>
                  <p className="text-[15px] text-neutral-400 leading-relaxed">{p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#141211] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40">
            <div className="flex justify-between font-mono text-[13px] mb-5"><span className="text-neutral-500">live wpm</span><span className="text-[#FF4F2E] font-medium">112</span></div>
            <div className="flex items-end gap-1.5 h-28">
              {[40, 55, 48, 70, 62, 80, 72, 90, 84, 76, 95, 88, 100, 82, 68].map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#FF4F2E] to-[#FF9A3D] opacity-90" style={{ height: h + "%" }} />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[13px] mt-5"><span className="text-neutral-500">accuracy</span><span className="text-white font-medium">97%</span></div>
            <div className="flex justify-between font-mono text-[13px] mt-3.5"><span className="text-neutral-500">facts learned today</span><span className="text-white font-medium">12</span></div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-neutral-600 text-center mt-5">your last session</div>
          </div>
        </div>
      </div>
    </section>
  );
}
