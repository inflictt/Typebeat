import { useState, useRef, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Header() {
  // ── YOUR BUSINESS LOGIC (unchanged) ──
  const TARGET = "japan is an island nation in east asia";

  const [showScore, setShowScore] = useState(false);
  const [status, setStatus] = useState(() => Array(TARGET.length).fill(""));
  const [pos, setPos] = useState(0);
  const [stats, setStats] = useState({ wpm: 0, acc: 100, err: 0 });
  const [overlay, setOverlay] = useState(true);

  const inputRef = useRef(null);
  const g = useRef({
    typed: 0, errors: 0, correct: 0, started: false, t0: 0, timer: null, done: false, log: [], samples: [],
  });

  function computeStats() {
    const s = g.current;
    const mins = (performance.now() - s.t0) / 60000;
    setStats({
      wpm: mins > 0 ? Math.round((s.correct / 5) / mins) : 0,
      acc: s.typed ? Math.round((s.correct / s.typed) * 100) : 100,
      err: s.errors,
    });
  }

  function handleKey(e) {
    const s = g.current;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (s.done && e.key !== "Backspace") return;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (pos === 0) return;
      s.log.push({ key: "Backspace", time: Math.floor(performance.now() - s.t0) });
      const i = pos - 1;
      const next = [...status];
      if (next[i] === "wrong") s.errors--;
      else if (next[i] === "done") s.correct--;
      next[i] = "";
      s.typed--;
      setStatus(next);
      setPos(i);
      computeStats();
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      if (pos >= TARGET.length) return;
      if (!s.started) {
        s.started = true;
        s.t0 = performance.now();
        s.timer = setInterval(() => {
          computeStats();
          const seconds = Math.round((performance.now() - s.t0) / 1000);
          const mins = (performance.now() - s.t0) / 60000;
          const wpm = mins > 0 ? Math.round((s.correct / 5) / mins) : 0;
          const acc = s.typed ? Math.round((s.correct / s.typed) * 100) : 100;
          s.samples.push({ t: seconds, wpm, acc, err: s.errors });
        }, 1000);
      }
      s.log.push({ key: e.key, time: Math.round(performance.now() - s.t0) });

      const correct = e.key === TARGET[pos];
      const next = [...status];
      next[pos] = correct ? "done" : "wrong";
      setStatus(next);
      s.typed++;
      if (correct) s.correct++;
      else s.errors++;
      const np = pos + 1;
      setPos(np);
      if (np >= TARGET.length) {
        s.done = true;
        clearInterval(s.timer);
        s.timer = null;
        setShowScore(true);
        console.log(g.current.log);
      }
      computeStats();
    }
  }

  function focusGame() { inputRef.current?.focus(); setOverlay(false); }
  function onBlur() { if (!g.current.done) setOverlay(true); }
  function restart() {
    clearInterval(g.current.timer);
    g.current = { typed: 0, errors: 0, correct: 0, started: false, t0: 0, timer: null, done: false, log: [], samples: [] };
    setStatus(Array(TARGET.length).fill(""));
    setPos(0);
    setStats({ wpm: 0, acc: 100, err: 0 });
    focusGame();
  }
  useEffect(() => () => clearInterval(g.current.timer), []);

  // ── UI (inline Tailwind) ──
  return (
    <header id="top" className="relative flex flex-col items-center px-4 pt-16 pb-24">
      {/* glow */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(255,79,46,0.16),transparent_65%)]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.2em] uppercase text-neutral-500 mb-7">
          <span className="text-[#FF4F2E]">●</span> typing practice that teaches you something
        </div>
        <h1 className="font-serif font-medium text-6xl sm:text-8xl leading-[0.95] tracking-tight text-white">
          Learn while<br />you <span className="italic text-[#FF4F2E]">type.</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed mt-9 max-w-xl mx-auto">
          Most typing sites make you hammer out <span className="text-white font-medium">random words</span> and learn nothing.
          Typebeat replaces them with <span className="text-white font-medium">geography stories, music facts and engaging knowledge</span> —
          so every test makes you faster <span className="italic text-[#FF4F2E]">and</span> smarter.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button onClick={focusGame} className="font-mono text-sm bg-[#FF4F2E] text-black font-bold rounded-lg px-7 py-3.5 hover:brightness-110 transition shadow-[0_0_34px_-4px_rgba(255,79,46,0.7)]">▶ Start typing</button>
          <a href="#modes" className="font-mono text-sm border border-white/15 text-[#ECE7E1] rounded-lg px-7 py-3.5 hover:border-[#FF4F2E]/40 hover:bg-[#FF4F2E]/10 transition">Explore the modes</a>
        </div>
        <div className="font-mono text-[12px] text-neutral-600 tracking-wide mt-6">free to play · no account needed · learn as you go</div>
      </div>

      {/* terminal */}
      <div className="w-full max-w-3xl mx-auto mt-20">
        <div className="flex items-center justify-center gap-3 flex-wrap mb-7">
          <div className="flex items-center gap-1 bg-[#1a1715] border border-white/10 rounded-xl p-1">
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg bg-[#FF4F2E]/15 text-[#FF4F2E]">⌨ Classic</button>
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition">🌍 GeoType</button>
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition">♪ BeatType</button>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-1 bg-[#1a1715] border border-white/10 rounded-xl p-1">
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition">15s</button>
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition">30s</button>
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg bg-[#FF4F2E]/15 text-[#FF4F2E]">60s</button>
            <button className="font-mono text-[13px] px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition">120s</button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2.5 font-mono text-sm text-[#FF4F2E]">
            <span className="w-2 h-2 rounded-full bg-[#FF4F2E] animate-pulse" />⌨ classic — practice
          </div>
          <div className="flex gap-5 font-mono text-sm text-neutral-500">
            <span><span className="text-white font-medium">{stats.wpm}</span> wpm</span>
            <span><span className="text-emerald-400 font-medium">{stats.acc}</span>% acc</span>
            <span><span className="text-white font-medium">{stats.err}</span> err</span>
          </div>
        </div>

        <div className="bg-[#141211] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          <div className="flex items-center gap-3.5 px-5 py-4 border-b border-white/5">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2a2522]" />
              <span className="w-3 h-3 rounded-full bg-[#2a2522]" />
              <span className="w-3 h-3 rounded-full bg-[#2a2522]" />
            </div>
            <div className="font-mono text-[13px] text-neutral-500">typebeat — <span className="text-neutral-400">learn while you type</span></div>
          </div>

          <div className="relative px-8 sm:px-10 py-10">
            <div onClick={focusGame} className="cursor-text select-none font-mono text-[27px] leading-[1.9] tracking-wide min-h-[100px]">
              {status.map((st, i) => {
                let txtColor = "text-neutral-500";
                if (st === "wrong") txtColor = "text-red-500";
                if (st === "done") txtColor = "text-white";
                const caret = i === pos ? "border-l-2 border-[#FF4F2E] animate-pulse" : "";
                return (
                  <span key={i} className={`inline-block ${txtColor} ${caret}`}>
                    {TARGET[i] === " " ? " " : TARGET[i]}
                  </span>
                );
              })}
            </div>

            <input ref={inputRef} onKeyDown={handleKey} onFocus={() => setOverlay(false)} onBlur={onBlur}
              className="absolute opacity-0 -left-[9999px]" />

            <div className="flex items-center gap-5 mt-9">
              <div className="flex-1 h-1.5 bg-[#2a2522] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF4F2E] rounded-full transition-[width] duration-150" style={{ width: (pos / TARGET.length) * 100 + "%" }} />
              </div>
              <button onClick={restart} className="font-mono text-[12.5px] text-neutral-500 hover:text-[#FF4F2E] transition whitespace-nowrap">↻ restart</button>
            </div>

            {overlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0d0c0b]/40 backdrop-blur-[2px]">
                <span className="font-mono text-[13px] text-[#ECE7E1] border border-white/15 bg-[#1a1715]/90 rounded-xl px-5 py-3">Click here, then just start typing ⏎</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showScore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-xl bg-[#141211] border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white">Test complete</h2>
            <p className="text-sm text-neutral-500 mt-1 mb-6">faster fingers, fuller mind</p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-black/30 rounded-xl p-4 text-center"><div className="text-3xl font-semibold text-[#FF4F2E]">{stats.wpm}</div><div className="text-[11px] uppercase tracking-widest text-neutral-500 mt-1">wpm</div></div>
              <div className="bg-black/30 rounded-xl p-4 text-center"><div className="text-3xl font-semibold text-emerald-400">{stats.acc}%</div><div className="text-[11px] uppercase tracking-widest text-neutral-500 mt-1">accuracy</div></div>
              <div className="bg-black/30 rounded-xl p-4 text-center"><div className="text-3xl font-semibold text-red-400">{stats.err}</div><div className="text-[11px] uppercase tracking-widest text-neutral-500 mt-1">errors</div></div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-2">speed over time</p>
            <LineChart width={480} height={170} data={g.current.samples}>
              <XAxis dataKey="t" stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#141211", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e5e5e5" }} />
              <Line dataKey="wpm" stroke="#FF4F2E" dot={false} strokeWidth={2} />
            </LineChart>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 mt-6 mb-2">accuracy over time</p>
            <LineChart width={480} height={170} data={g.current.samples}>
              <XAxis dataKey="t" stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis domain={[0, 100]} stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#141211", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e5e5e5" }} />
              <Line dataKey="acc" stroke="#34d399" dot={false} strokeWidth={2} />
            </LineChart>
            <button onClick={() => { setShowScore(false); restart(); }} className="mt-8 w-full bg-[#FF4F2E] text-black font-semibold rounded-lg py-3 hover:brightness-110 transition">Try again</button>
          </div>
        </div>
      )}
    </header>
  );
}
