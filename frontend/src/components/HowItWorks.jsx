const STEPS = [
  ["STEP 01", "Pick a mode", "Classic for pure speed, GeoType for geography, or BeatType for music. Then choose a timer and a topic, and filter by difficulty."],
  ["STEP 02", "Type the story", "Text scrolls in a fixed window with live character highlighting. Right keys light up; misses flag in coral. Upcoming words stay in view."],
  ["STEP 03", "Get faster & smarter", "End-of-test stats break down WPM, accuracy and errors — and you walk away having actually learned the fact you just typed."],
];
export default function HowItWorks() {
  return (
    <section id="how" className="pb-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-neutral-500 mb-5"><span className="text-[#FF4F2E]">02</span> — how it works</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">Three steps to your <span className="italic text-[#FF4F2E]">fastest verse.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(([num, h, p]) => (
            <div key={num} className="bg-[#141211] border border-white/10 rounded-2xl p-8 hover:border-[#FF4F2E]/40 hover:-translate-y-1 transition">
              <div className="font-mono text-[13px] tracking-widest text-[#FF4F2E]">{num}</div>
              <h3 className="font-serif text-2xl text-white mt-5 mb-3">{h}</h3>
              <p className="text-[15px] text-neutral-400 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
