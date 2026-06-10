const FILTERS = ["All", "GeoType", "BeatType", "Countries", "Capitals", "Rivers", "Artists", "Albums"];
const LIB = [
  { t: "Japan", cat: "Countries", mode: "GeoType", d: "Medium", learners: "48k" },
  { t: "India", cat: "Countries", mode: "GeoType", d: "Easy", learners: "112k" },
  { t: "Tokyo", cat: "Capitals", mode: "GeoType", d: "Easy", learners: "37k" },
  { t: "Mount Everest", cat: "Mountains", mode: "GeoType", d: "Hard", learners: "29k" },
  { t: "The Nile", cat: "Rivers", mode: "GeoType", d: "Medium", learners: "33k" },
  { t: "Taj Mahal", cat: "Landmarks", mode: "GeoType", d: "Medium", learners: "64k" },
  { t: "Ed Sheeran", cat: "Artists", mode: "BeatType", d: "Easy", learners: "201k" },
  { t: "Thriller", cat: "Albums", mode: "BeatType", d: "Medium", learners: "73k" },
  { t: "History of Jazz", cat: "Music History", mode: "BeatType", d: "Hard", learners: "18k" },
];
const diffColor = (d) => d === "Easy" ? "text-emerald-400 border-emerald-400/40" : d === "Medium" ? "text-amber-400 border-amber-400/40" : "text-red-400 border-red-400/40";
export default function Library() {
  return (
    <section id="library" className="pb-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-neutral-500 mb-5"><span className="text-[#FF4F2E]">04</span> — the library</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">Hundreds of topics. <span className="italic text-[#FF4F2E]">Pick what to learn.</span></h2>
        </div>

        <div className="flex items-center justify-between gap-5 flex-wrap mb-8">
          <div className="flex gap-2.5 flex-wrap">
            {FILTERS.map((f, i) => (
              <button key={f} className={"font-mono text-[13px] rounded-full px-4 py-2 border transition " + (i === 0 ? "bg-[#FF4F2E] text-black border-[#FF4F2E] font-medium" : "text-neutral-400 border-white/10 hover:text-white hover:border-white/20")}>{f}</button>
            ))}
          </div>
          <div className="font-mono text-[13px] text-neutral-500 border border-white/10 rounded-lg px-4 py-2.5 flex items-center gap-2.5 min-w-[230px]">
            🔍 <input className="bg-transparent outline-none text-neutral-200 w-full placeholder:text-neutral-600" placeholder="search topics…" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LIB.map((s, idx) => {
            const col = s.mode === "GeoType" ? "#5EC2D8" : "#E26FC2";
            const glyph = s.mode === "GeoType" ? "🌍" : "♪";
            return (
              <div key={idx} className="bg-[#141211] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:border-[#FF4F2E]/40 hover:bg-[#1a1715] hover:-translate-y-1 transition">
                <div className="flex items-start justify-between gap-3">
                  <div><h4 className="font-serif text-xl text-white">{s.t}</h4><div className="text-sm text-neutral-500 mt-0.5">{s.cat}</div></div>
                  <div className="grid place-items-center w-12 h-12 rounded-xl text-black font-bold text-lg" style={{ background: col }}>{glyph}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded border border-white/15 text-neutral-400">{s.mode}</span>
                  <span className={"font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded border " + diffColor(s.d)}>{s.d}</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[12.5px] text-neutral-600 border-t border-white/10 pt-3.5 mt-auto">
                  <span>{s.learners} learners</span>
                  <span className="text-[#FF4F2E]">▶ type &amp; learn</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
