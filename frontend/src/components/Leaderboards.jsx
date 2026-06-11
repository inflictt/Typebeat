const PALETTE = ["#FF4F2E", "#F0A93C", "#E26FC2", "#5EC2D8", "#7DD49A", "#A88BF0"];
const ROWS = [
  { n: "keysmash", wpm: 142, acc: "99.4%" },
  { n: "swift_keys", wpm: 138, acc: "98.1%" },
  { n: "atlas_ann", wpm: 131, acc: "97.7%" },
  { n: "fact_hunter", wpm: 127, acc: "99.0%" },
  { n: "geo_lily", wpm: 124, acc: "96.4%" },
  { n: "qwerty_queen", wpm: 119, acc: "98.8%" },
];
export default function Leaderboards() {
  return (
    <section id="leaderboards" className="pb-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl text-white">Race for speed. <span className="italic text-[#FF4F2E]">Rank for knowledge.</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[#141211] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="font-serif text-xl text-white">Global · Top WPM<span className="block font-sans text-[13px] text-neutral-500 mt-0.5">All modes · this week</span></div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#FF4F2E]">◇ fastest typists</div>
            </div>
            {ROWS.map((r, i) => (
              <div key={r.n} className="grid grid-cols-[34px_1fr_auto_auto] gap-4 items-center px-6 py-3.5 border-b border-white/5 last:border-0 hover:bg-[#1a1715] transition">
                <div className={"font-mono text-sm font-bold " + (i < 3 ? "text-[#FF4F2E]" : "text-neutral-600")}>{i + 1}</div>
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-8 h-8 rounded-full text-black font-mono text-xs font-bold" style={{ background: PALETTE[i % PALETTE.length] }}>{r.n.charAt(0).toUpperCase()}</div>
                  <span className="text-[15px] font-medium">@{r.n}</span>
                </div>
                <div className="font-mono text-base text-white font-medium">{r.wpm} <span className="text-[11px] text-neutral-600">wpm</span></div>
                <div className="font-mono text-[13px] text-neutral-500">{r.acc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-[#141211] border border-white/10 rounded-2xl p-7">
              <div className="font-serif text-5xl" style={{ color: "#5EC2D8" }}>🌍 1,204</div>
              <div className="font-mono text-[12px] tracking-widest uppercase text-neutral-500 mt-3">GeoType — top geography learner</div>
              <p className="text-[15px] text-neutral-400 mt-3.5"><span className="text-white">@atlas_ann</span> has typed 1,204 country &amp; capital facts. Climbing fast.</p>
            </div>
            <div className="bg-[#141211] border border-white/10 rounded-2xl p-7">
              <div className="font-serif text-5xl" style={{ color: "#E26FC2" }}>♪ 980</div>
              <div className="font-mono text-[12px] tracking-widest uppercase text-neutral-500 mt-3">BeatType — top music learner</div>
              <p className="text-[15px] text-neutral-400 mt-3.5"><span className="text-white">@vinyl_sam</span> leads on music facts learned this season.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
