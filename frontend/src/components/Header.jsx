import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Header() {
  // ── Content library ─────────────────────────────────────────────
  const TEXTS = {
    classic: {
      plain:
        "the quick brown fox jumps over the lazy dog while the sun rises above the hills and birds sing in the distance. this famous sentence contains every letter of the alphabet and is often used to practice typing speed and accuracy.",
      punct:
        "The quick brown fox jumps over the lazy dog while the sun rises above the hills, and birds sing in the distance. This famous sentence contains every letter of the alphabet and is often used to practice typing speed and accuracy.",
      num:
        "the quick brown fox jumps over 3 lazy dogs while the sun rises above 7 green hills and 12 birds sing in the distance. this famous sentence contains every letter of the alphabet and is often used to practice typing speed and accuracy.",
      both:
        "The quick brown fox jumps over 3 lazy dogs while the sun rises above 7 green hills, and 12 birds sing in the distance. This famous sentence contains every letter of the alphabet and is often used to practice typing speed and accuracy.",
    },

    geo: {
      plain:
        "japan is an island nation located in east asia and is surrounded by the pacific ocean. tokyo is its capital city and one of the largest metropolitan areas in the world. the country is known for its technology culture and beautiful natural landscapes including mount fuji.",
      punct:
        "Japan is an island nation located in East Asia and is surrounded by the Pacific Ocean. Tokyo is its capital city and one of the largest metropolitan areas in the world. The country is known for its technology, culture, and beautiful natural landscapes, including Mount Fuji.",
      num:
        "japan is an island nation located in east asia and consists of 4 main islands. tokyo is its capital city and is home to more than 37 million people in the greater metropolitan area. the country is known for its technology culture and beautiful natural landmarks.",
      both:
        "Japan is an island nation located in East Asia and consists of 4 main islands. Tokyo is its capital city and is home to more than 37 million people in the greater metropolitan area. The country is known for its technology, culture, and beautiful natural landmarks.",
    },

    // NEW: "trending" replaces the old music mode — factual, copyright-safe content
    trending: {
      plain:
        "artificial intelligence is changing how people work learn and create around the world. tools that can write text generate images and even build software are now used by millions of people every single day. experts believe this technology will keep growing quickly in the years ahead.",
      punct:
        "Artificial intelligence is changing how people work, learn, and create around the world. Tools that can write text, generate images, and even build software are now used by millions of people every single day. Experts believe this technology will keep growing quickly in the years ahead.",
      num:
        "some artificial intelligence tools reached more than 100 million users within just 2 months of launch. by 2024 nearly 4 in 10 companies had started using ai in their daily work. analysts expect the market to grow several times over within the next 5 years.",
      both:
        "Some artificial intelligence tools reached more than 100 million users within just 2 months of launch. By 2024, nearly 4 in 10 companies had started using AI in their daily work. Analysts expect the market to grow several times over within the next 5 years.",
    },
  };

  // ── Config state (the screen derives from these) ────────────────
  const [mode, setMode] = useState("classic");   // which text set: classic / geo / trending
  const [type, setType] = useState("timed");     // end rule: words (finish text) or timed (clock)
  const [time, setTime] = useState(30);          // chosen duration in seconds (timed mode)
  const [opts, setOpts] = useState({ punctuation: true, numbers: true }); // word options
  const [timeLeft, setTimeLeft] = useState(null);

  // TARGET is DERIVED: pick the mode, then the variant from the toggles
  const TARGET = TEXTS[mode][variantKey(opts)];

  // ── Render state (what the screen reacts to) ────────────────────
  const [active, setActive] = useState(false);   // is the game accepting keys?
  const [showScore, setShowScore] = useState(false);
  const [status, setStatus] = useState(() => Array(TARGET.length).fill("")); // "" | "done" | "wrong"
  const [pos, setPos] = useState(0);             // caret position
  const [stats, setStats] = useState({ wpm: 0, acc: 100, err: 0 });
  const [overlay, setOverlay] = useState(true);  // the "click to type" cover

  const textFor = (m, o) => TEXTS[m][variantKey(o)]; // helper: text for a mode + options

  // ── Refs (DOM handles + bookkeeping that shouldn't re-render) ────
  const handlerRef = useRef(null);   // always points at the latest handleKey
  const windowRef = useRef(null);    // the fixed-height clipping box
  const textRef = useRef(null);      // the moving text block
  const charRefs = useRef([]);       // one ref per character span

  const g = useRef({
    typed: 0, errors: 0, correct: 0, started: false, t0: 0, timer: null, done: false, log: [], samples: [],
    rawTyped: 0, rawErrors: 0,        // permanent counters (never go down) → honest accuracy
  });

  // maps the punctuation/numbers booleans to a variant key
  function variantKey(o) {
    if (o.punctuation && o.numbers) return "both";
    if (o.punctuation) return "punct";
    if (o.numbers) return "num";
    return "plain";
  }

  // derive the live numbers from the facts
  function computeStats() {
    const s = g.current;
    const mins = (performance.now() - s.t0) / 60000;
    setStats({
      wpm: mins > 0 ? Math.round((s.correct / 5) / mins) : 0,
      acc: s.rawTyped ? Math.round(((s.rawTyped - s.rawErrors) / s.rawTyped) * 100) : 100,
      err: s.rawErrors,
    });
  }

  // ── The engine: one keystroke = one transition ──────────────────
  function handleKey(e) {
    if (!active) return;                       // game not started
    const s = g.current;
    if (
      e.metaKey || e.ctrlKey || e.altKey ||
      e.key === "Enter" || e.key === "Tab"     // ignore shortcuts / non-typing keys
    ) {
      return;
    }
    if (s.done) return;                        // test over → ignore everything

    // Backspace = undo the last keystroke exactly
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

    // a printable character
    if (e.key.length === 1) {
      e.preventDefault();
      if (pos >= TARGET.length) return;

      // start the clock + sampler on the first key
      if (!s.started) {
        s.started = true;
        setOverlay(false);
        s.t0 = performance.now();
        s.timer = setInterval(() => {
          computeStats();
          const seconds = Math.round((performance.now() - s.t0) / 1000);
          const mins = (performance.now() - s.t0) / 60000;
          const wpm = mins > 0 ? Math.round((s.correct / 5) / mins) : 0;
          const acc = s.rawTyped ? Math.round(((s.rawTyped - s.rawErrors) / s.rawTyped) * 100) : 100;
          s.samples.push({ t: seconds, wpm, acc, err: s.rawErrors }); // one point per second → graphs
          if (type === "timed") setTimeLeft(time - seconds);          // live countdown
          if (type === "timed" && seconds >= time) finish();          // timed mode ends on the clock
        }, 1000);
      }
      s.log.push({ key: e.key, time: Math.round(performance.now() - s.t0) });

      const correct = e.key === TARGET[pos];
      const next = [...status];
      next[pos] = correct ? "done" : "wrong";
      setStatus(next);
      s.typed++;
      s.rawTyped++;                  // permanent: every key pressed
      if (!correct) s.rawErrors++;   // permanent: every mistake
      if (correct) s.correct++;
      else s.errors++;
      const np = pos + 1;
      setPos(np);
      if (np >= TARGET.length) finish();   // words mode ends when the text is finished
      computeStats();
    }
  }

  handlerRef.current = handleKey;   // keep the global listener pointed at the freshest handler

  // ── Auto-scroll: slide the text up so the caret line stays in view ──
  useLayoutEffect(() => {
    const text = textRef.current;
    const win = windowRef.current;
    if (!text || !win) return;
    const lineH = parseFloat(getComputedStyle(text).lineHeight) || 50;
    win.style.height = lineH * 3 + "px";                       // window shows 3 lines
    const cur = charRefs.current[Math.min(pos, TARGET.length - 1)];
    if (!cur) return;
    const line = Math.round(cur.offsetTop / lineH);            // which line the caret is on
    const linesAbove = 1;                                       // keep 1 line of history above
    const shift = Math.max(0, (line - linesAbove) * lineH);
    text.style.transform = `translateY(${-shift}px)`;
  });

  // click anywhere on the box → start the game (and drop focus off any button)
  function focusGame() {
    document.activeElement?.blur();   // so a focused button can't eat your Space/Enter
    setActive(true);
    setOverlay(false);
  }

  // blank the whole run to a given text length
  function resetEngine(length) {
    clearInterval(g.current.timer);
    g.current = { typed: 0, errors: 0, correct: 0, started: false, t0: 0, timer: null, done: false, log: [], samples: [], rawTyped: 0, rawErrors: 0 };
    setStatus(Array(length).fill(""));
    setPos(0);
    setStats({ wpm: 0, acc: 100, err: 0 });
    setShowScore(false);
    setTimeLeft(null);
    if (textRef.current) textRef.current.style.transform = "translateY(0)";
  }

  // end the test (used by both end conditions: text finished OR clock ran out)
  function finish() {
    const s = g.current;
    s.done = true;
    clearInterval(s.timer);
    s.timer = null;
    setShowScore(true);
  }

  function restart() {
    resetEngine(TARGET.length);                    // restart the CURRENT text
    focusGame();
  }
  function switchMode(m) {
    setMode(m);
    resetEngine(textFor(m, opts).length);          // new mode → reset to its text length
    focusGame();
  }
  function switchType(t) {
    setType(t);
    resetEngine(TARGET.length);                    // type changes the end-rule, not the text
    focusGame();
  }
  function switchTime(sec) {
    setTime(sec);
    resetEngine(TARGET.length);
    focusGame();
  }
  function toggleOpt(key) {
    const newOpts = { ...opts, [key]: !opts[key] };
    setOpts(newOpts);
    resetEngine(textFor(mode, newOpts).length);    // new variant → reset to its length
    focusGame();
  }

  // class helpers — pill = single-select (one active), toggle = on/off boolean
  const pill = (current, value) =>
    "font-mono text-[13px] px-4 py-2 rounded-lg transition " +
    (current === value ? "bg-[#FF4F2E]/15 text-[#FF4F2E]" : "text-neutral-400 hover:text-white");
  const toggle = (on) =>
    "font-mono text-[13px] px-4 py-2 rounded-lg transition " +
    (on ? "bg-[#FF4F2E]/15 text-[#FF4F2E]" : "text-neutral-400 hover:text-white");

  // global keyboard capture — type anywhere, no focus needed
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return; // don't hijack real form fields
      handlerRef.current(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => clearInterval(g.current.timer), []); // cleanup the timer on unmount

  return (
    <header className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4 py-6">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(255,79,46,0.16),transparent_65%)]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="font-serif font-medium text-6xl sm:text-6xl leading-[0.95] tracking-tight text-white">
          Learn while you <span className="italic text-[#FF4F2E]">type.</span>
        </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-20">
        {/* ── control row: one line ── */}
        <div className="flex items-center justify-center gap-3 mb-7">

          {/* mode group */}
          <div className="flex items-center gap-1 bg-[#1a1715] border border-white/10 rounded-xl p-1">
            <button onClick={() => switchMode("classic")} className={pill(mode, "classic")}>⌨ Classic</button>
            <button onClick={() => switchMode("geo")}      className={pill(mode, "geo")}>🌍 GeoType</button>
            <button onClick={() => switchMode("trending")} className={pill(mode, "trending")}>🔥 Trending</button>
          </div>

          <div className="w-px h-6 bg-white/10" />

          {/* words / timed group */}
          <div className="flex items-center gap-1 bg-[#1a1715] border border-white/10 rounded-xl p-1">
            <button onClick={() => switchType("words")} className={pill(type, "words")}>≡ words</button>
            <button onClick={() => switchType("timed")} className={pill(type, "timed")}>⏱ timed</button>
          </div>

          {/* durations — right next to timed, only when timed */}
          {type === "timed" && (
            <>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-1 bg-[#1a1715] border border-white/10 rounded-xl p-1">
                <button onClick={() => switchTime(15)}  className={pill(time, 15)}>15s</button>
                <button onClick={() => switchTime(30)}  className={pill(time, 30)}>30s</button>
                <button onClick={() => switchTime(60)}  className={pill(time, 60)}>60s</button>
                <button onClick={() => switchTime(120)} className={pill(time, 120)}>120s</button>
              </div>
            </>
          )}

          <div className="w-px h-6 bg-white/10" />

          {/* options — always visible */}
          <div className="flex items-center gap-1 bg-[#1a1715] border border-white/10 rounded-xl p-1">
            <button onClick={() => toggleOpt("punctuation")} className={toggle(opts.punctuation)}>! punctuation</button>
            <button onClick={() => toggleOpt("numbers")} className={toggle(opts.numbers)}># numbers</button>
          </div>
        </div>

        {/* ── now-playing + live stats ── */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2.5 font-mono text-sm text-[#FF4F2E]">
            <span className="w-2 h-2 rounded-full bg-[#FF4F2E] animate-pulse" /> {mode}
          </div>
          <div className="flex gap-5 font-mono text-sm text-neutral-500">
            {type === "timed" && <span className="text-[#FF4F2E] font-medium">{timeLeft ?? time}s</span>}
            <span><span className="text-white font-medium">{stats.wpm}</span> wpm</span>
            <span><span className="text-emerald-400 font-medium">{stats.acc}</span>% acc</span>
            <span><span className="text-white font-medium">{stats.err}</span> err</span>
          </div>
        </div>

        {/* ── the terminal ── */}
        <div className="bg-[#141211] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          <div className="flex items-center gap-3.5 px-5 py-4 border-b border-white/5">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2a2522]" />
              <span className="w-3 h-3 rounded-full bg-[#2a2522]" />
              <span className="w-3 h-3 rounded-full bg-[#2a2522]" />
            </div>
            <div className="font-mono text-[13px] text-neutral-500">Typebeat — <span className="text-neutral-400">learn while you type</span></div>
          </div>

          <div className="relative px-8 sm:px-10 py-12">
            {/* clipping window (height set to 3 lines by the layout effect) */}
            <div ref={windowRef} onClick={focusGame} className="relative overflow-hidden cursor-text select-none">
              <div
                ref={textRef}
                className="font-mono text-[27px] leading-[1.9] tracking-wide text-neutral-500 transition-transform duration-150 will-change-transform"
              >
                {status.map((st, i) => {
                  let txtColor = "text-neutral-500";
                  if (st === "wrong") txtColor = "text-red-500";
                  if (st === "done") txtColor = "text-white";
                  const caret = i === pos ? "border-l-2 border-[#FF4F2E] animate-pulse" : "";
                  return (
                    <span
                      key={i}
                      ref={(el) => (charRefs.current[i] = el)}
                      className={`${txtColor} ${caret}`}
                    >
                      {TARGET[i] === " " ? " " : TARGET[i]}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-5 mt-9">
              <div className="flex-1 h-1.5 bg-[#2a2522] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF4F2E] rounded-full transition-[width] duration-150" style={{ width: (pos / TARGET.length) * 100 + "%" }} />
              </div>
              <button onClick={restart} className="font-mono text-[12.5px] text-neutral-500 hover:text-[#FF4F2E] transition whitespace-nowrap">↻ restart</button>
            </div>

            {overlay && (
              <div onClick={focusGame} className="absolute inset-0 flex items-center justify-center bg-[#0d0c0b]/40 backdrop-blur-[2px] cursor-pointer">
                <span className="font-mono text-[13px] text-[#ECE7E1] border border-white/15 bg-[#1a1715]/90 rounded-xl px-5 py-3">Click here, then just start typing ⏎</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── results modal ── */}
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