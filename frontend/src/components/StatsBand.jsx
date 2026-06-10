const STATS = [["500", "+", "Topics to type"], ["18", "M", "Tests completed"], ["142", "", "Top recorded wpm"], ["3", " modes", "Classic · Geo · Beat"]];
export default function StatsBand() {
  return (
    <div className="border-y border-white/10 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map(([n, suf, label]) => (
          <div key={label}>
            <div className="font-serif text-5xl text-white"><span className="text-[#FF4F2E]">{n}</span>{suf}</div>
            <div className="font-mono text-[12.5px] tracking-widest uppercase text-neutral-500 mt-3.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
