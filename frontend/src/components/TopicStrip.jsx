const TOPICS = ["Countries", "Capitals", "Landmarks", "Rivers", "Mountains", "Artists", "Albums", "Music History", "Instruments"];
export default function TopicStrip() {
  return (
    <div className="border-y border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-10 flex-wrap">
        <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-neutral-600">Learn across</span>
        <div className="flex gap-3 flex-wrap justify-center">
          {TOPICS.map((t) => (
            <span key={t} className="font-mono text-[13px] text-neutral-400 border border-white/10 rounded-full px-4 py-1.5 hover:text-[#FF4F2E] hover:border-[#FF4F2E]/40 transition">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
