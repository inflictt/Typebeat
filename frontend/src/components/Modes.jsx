export default function Modes() {
  return (
    <section id="modes" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-white">One clean engine. <span className="italic text-[#FF4F2E]">Three modes.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {[
            ["⌨", "Classic", "Everything you already love about a pure typing test — words, numbers, punctuation and quotes on 15, 30, 60 or 120-second timers. Just raw speed.", "md:col-span-2"],
            ["🌍", "GeoType", "Type short, factual stories about countries, capitals, rivers, mountains and world wonders. Leave each test knowing something new.", "md:col-span-2"],
            ["♪", "BeatType", "Artist journeys, album stories and music history — the culture behind the sound. Knowledge-driven, and totally copyright-safe.", "md:col-span-2"],
            ["⏱", "Live, honest stats", "WPM, accuracy and error count update on every keystroke, with a full breakdown the moment your test ends.", "md:col-span-3"],
            ["🧠", "Knowledge that sticks", "Because you read and re-type every fact, it lodges in memory far better than passively scrolling past it. Practice doubles as study.", "md:col-span-3"],
          ].map(([ico, h, p, span]) => (
            <div key={h} className={`${span} bg-[#141211] border border-white/10 rounded-2xl p-8 hover:border-[#FF4F2E]/40 hover:-translate-y-1 transition`}>
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-[#FF4F2E]/15 text-[#FF4F2E] text-lg mb-5">{ico}</div>
              <h3 className="font-serif text-2xl text-white mb-2.5">{h}</h3>
              <p className="text-[15px] text-neutral-400 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
