export default function Footer() {
  const cols = [
    ["Product", ["Modes", "Library", "Leaderboards", "Dashboard"]],
    ["Company", ["About", "Contact", "Roadmap", "Blog"]],
    ["Community", ["Discord", "Top learners", "Suggest a topic", "GitHub"]],
  ];
  return (
    <footer className="border-t border-white/10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <a href="#top" className="flex items-center gap-3 font-serif text-2xl font-semibold text-white mb-4">
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF4F2E] to-[#FF9A3D]"><span className="w-2 h-2 rounded-sm bg-[#120b09]" /></span>
              Typebeat
            </a>
            <p className="text-[15px] text-neutral-400 max-w-[280px] leading-relaxed">Improve your typing speed while learning geography, music and more. Every test makes you faster and smarter.</p>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <h5 className="font-mono text-[11.5px] tracking-widest uppercase text-neutral-600 mb-4">{h}</h5>
              {items.map((it) => (
                <a key={it} href="#" className="block text-[15px] text-neutral-400 py-1.5 hover:text-white transition">{it}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3 pt-7 border-t border-white/10 font-mono text-[12.5px] text-neutral-600">
          <div>© 2026 Typebeat — learn while you type.</div>
          <div>type faster · know more</div>
        </div>
      </div>
    </footer>
  );
}
