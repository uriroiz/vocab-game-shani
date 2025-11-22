import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Irregular Verb Games
 *
 * Exports:
 *  - DEFAULT_VERBS: built-in list if no verbs prop supplied
 *  - IrregularVerbChoiceGame: sequential MCQ (ask V2 then V3)
 *  - IrregularVerbDragGame: drag chips into V2/V3 boxes
 *  - default export IrregularVerbGame: wrapper that switches by mode
 */

const DEFAULT_OPTIONS = 4;
const DEFAULT_BATCH = 10;

// --------------------
// Helpers
// --------------------

export function shuffle(arr) {
  const a = Array.isArray(arr) ? [...arr] : [];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

export function sampleUnique(pool, n, excludeSet) {
  const ex = excludeSet || new Set();
  const p = Array.isArray(pool) ? pool : [];
  const filtered = p.filter((x) => !ex.has(x));
  return shuffle(filtered).slice(0, n);
}

function hashStringToIndex(str, mod) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return mod ? h % mod : h;
}

// Full default list (from your irregular verbs sheet). Used when no verbs prop is provided.
export const DEFAULT_VERBS = [
  { v1: "be", v2: "was/were", v3: "been" },
  { v1: "beat", v2: "beat", v3: "beaten" },
  { v1: "become", v2: "became", v3: "become" },
  { v1: "begin", v2: "began", v3: "begun" },
  { v1: "bleed", v2: "bled", v3: "bled" },
  { v1: "break", v2: "broke", v3: "broken" },
  { v1: "bring", v2: "brought", v3: "brought" },
  { v1: "build", v2: "built", v3: "built" },
  { v1: "buy", v2: "bought", v3: "bought" },
  { v1: "catch", v2: "caught", v3: "caught" },
  { v1: "choose", v2: "chose", v3: "chosen" },
  { v1: "come", v2: "came", v3: "come" },
  { v1: "cost", v2: "cost", v3: "cost" },
  { v1: "cut", v2: "cut", v3: "cut" },
  { v1: "do", v2: "did", v3: "done" },
  { v1: "draw", v2: "drew", v3: "drawn" },
  { v1: "drink", v2: "drank", v3: "drunk" },
  { v1: "drive", v2: "drove", v3: "driven" },
  { v1: "eat", v2: "ate", v3: "eaten" },
  { v1: "fall", v2: "fell", v3: "fallen" },
  { v1: "feed", v2: "fed", v3: "fed" },
  { v1: "feel", v2: "felt", v3: "felt" },
  { v1: "fight", v2: "fought", v3: "fought" },
  { v1: "find", v2: "found", v3: "found" },
  { v1: "fly", v2: "flew", v3: "flown" },
  { v1: "forget", v2: "forgot", v3: "forgotten" },
  { v1: "forgive", v2: "forgave", v3: "forgiven" },
  { v1: "get", v2: "got", v3: "got/gotten" },
  { v1: "give", v2: "gave", v3: "given" },
  { v1: "go", v2: "went", v3: "gone" },
  { v1: "grow", v2: "grew", v3: "grown" },
  { v1: "hang", v2: "hung/hanged", v3: "hung/hanged" },
  { v1: "have", v2: "had", v3: "had" },
  { v1: "hear", v2: "heard", v3: "heard" },
  { v1: "hide", v2: "hid", v3: "hidden" },
  { v1: "hit", v2: "hit", v3: "hit" },
  { v1: "hold", v2: "held", v3: "held" },
  { v1: "hurt", v2: "hurt", v3: "hurt" },
  { v1: "keep", v2: "kept", v3: "kept" },
  { v1: "know", v2: "knew", v3: "known" },
  { v1: "leave", v2: "left", v3: "left" },
  { v1: "let", v2: "let", v3: "let" },
  { v1: "lie", v2: "lay", v3: "lain" },
  { v1: "light", v2: "lit", v3: "lit" },
  { v1: "lose", v2: "lost", v3: "lost" },
  { v1: "make", v2: "made", v3: "made" },
  { v1: "mean", v2: "meant", v3: "meant" },
  { v1: "meet", v2: "met", v3: "met" },
  { v1: "pay", v2: "paid", v3: "paid" },
  { v1: "put", v2: "put", v3: "put" },
  { v1: "read", v2: "read", v3: "read" },
  { v1: "ride", v2: "rode", v3: "ridden" },
  { v1: "ring", v2: "rang", v3: "rung" },
  { v1: "rise", v2: "rose", v3: "risen" },
  { v1: "run", v2: "ran", v3: "run" },
  { v1: "say", v2: "said", v3: "said" },
  { v1: "see", v2: "saw", v3: "seen" },
  { v1: "sell", v2: "sold", v3: "sold" },
  { v1: "send", v2: "sent", v3: "sent" },
  { v1: "set", v2: "set", v3: "set" },
  { v1: "shake", v2: "shook", v3: "shaken" },
  { v1: "show", v2: "showed", v3: "shown" },
  { v1: "shut", v2: "shut", v3: "shut" },
  { v1: "sing", v2: "sang", v3: "sung" },
  { v1: "sit", v2: "sat", v3: "sat" },
  { v1: "sleep", v2: "slept", v3: "slept" },
  { v1: "speak", v2: "spoke", v3: "spoken" },
  { v1: "spend", v2: "spent", v3: "spent" },
  { v1: "stand", v2: "stood", v3: "stood" },
  { v1: "steal", v2: "stole", v3: "stolen" },
  { v1: "swim", v2: "swam", v3: "swum" },
  { v1: "take", v2: "took", v3: "taken" },
  { v1: "teach", v2: "taught", v3: "taught" },
  { v1: "tell", v2: "told", v3: "told" },
  { v1: "think", v2: "thought", v3: "thought" },
  { v1: "understand", v2: "understood", v3: "understood" },
  { v1: "wake", v2: "woke", v3: "woken" },
  { v1: "wear", v2: "wore", v3: "worn" },
  { v1: "win", v2: "won", v3: "won" },
  { v1: "write", v2: "wrote", v3: "written" },
];

// Simple UI components (shadcn-style)
const Card = ({ className = "", children }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Progress = ({ value = 0, className = "" }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
    <div
      className="h-full bg-primary transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// --------------------
// Sequential multiple-choice game (V2 then V3)
// --------------------

export function IrregularVerbChoiceGame({
  verbs,
  optionsCount = DEFAULT_OPTIONS,
  initialBatchSize = DEFAULT_BATCH,
  onFinish,
}) {
  const resolvedVerbs = Array.isArray(verbs) && verbs.length ? verbs : DEFAULT_VERBS;

  const [queue, setQueue] = useState([]); // items: { verb, correctStreak }
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState("askV2"); // askV2 | askV3 | feedback | finished
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [batchStart, setBatchStart] = useState(0);

  useEffect(() => {
    const safeVerbs = resolvedVerbs;
    const batch = safeVerbs.slice(0, initialBatchSize).map((verb) => ({
      verb,
      correctStreak: 0,
    }));
    setQueue(batch);
    setIndex(0);
    setStep(batch.length ? "askV2" : "finished");
  }, [resolvedVerbs, initialBatchSize]);

  const currentItem = queue[index];
  const currentVerb = currentItem && currentItem.verb ? currentItem.verb : null;

  const allV2 = useMemo(() => resolvedVerbs.map((v) => v.v2), [resolvedVerbs]);
  const allV3 = useMemo(() => resolvedVerbs.map((v) => v.v3), [resolvedVerbs]);

  const options = useMemo(() => {
    if (!currentVerb) return [];
    const correct = step === "askV2" ? currentVerb.v2 : currentVerb.v3;
    const pool = step === "askV2" ? allV2 : allV3;
    const exclude = new Set([correct]);
    const distractors = sampleUnique(pool, Math.max(0, optionsCount - 1), exclude);
    return shuffle([correct].concat(distractors));
  }, [currentVerb, step, allV2, allV3, optionsCount]);

  const progress = queue.length ? ((index + 1) / queue.length) * 100 : 0;

  function handleSelect(option) {
    if (step !== "askV2" && step !== "askV3") return;
    if (!currentVerb) return;

    const correctAnswer = step === "askV2" ? currentVerb.v2 : currentVerb.v3;
    const correct = option === correctAnswer;

    setSelected(option);
    setIsCorrect(correct);
    setAttempts((a) => a + 1);

    if (correct) {
      setScore((s) => s + 1);
    }

    setStep("feedback");
  }

  function reinsertWrong(item) {
    const reinsertionOffset = 3 + Math.floor(Math.random() * 3); // 3–5 later
    const pos = Math.min(queue.length, index + reinsertionOffset);
    const newQueue = queue.slice();
    newQueue.splice(pos, 0, { verb: item.verb, correctStreak: 0 });
    return newQueue;
  }

  const stepBeforeFeedback = useRef("askV2");
  useEffect(() => {
    if (step === "askV2" || step === "askV3") {
      stepBeforeFeedback.current = step;
    }
  }, [step]);

  function nextAfterFeedback() {
    if (!currentItem) return;

    const wasAskV2 = stepBeforeFeedback.current === "askV2";
    const wasCorrect = isCorrect;

    let newQueue = queue;

    if (wasCorrect) {
      const updatedItem = {
        verb: currentItem.verb,
        correctStreak: (currentItem.correctStreak || 0) + 1,
      };
      newQueue = queue.slice();
      newQueue[index] = updatedItem;
    } else {
      newQueue = reinsertWrong(currentItem);
    }

    setQueue(newQueue);

    if (wasAskV2) {
      setSelected(null);
      setIsCorrect(null);
      setStep("askV3");
      return;
    }

    const nextIndex = index + 1;

    if (nextIndex >= newQueue.length) {
      const safeVerbs = resolvedVerbs;
      const nextBatchStart = batchStart + initialBatchSize;

      if (nextBatchStart < safeVerbs.length) {
        const nextBatch = safeVerbs
          .slice(nextBatchStart, nextBatchStart + initialBatchSize)
          .map((verb) => ({ verb, correctStreak: 0 }));

        setBatchStart(nextBatchStart);
        setQueue(nextBatch);
        setIndex(0);
        setSelected(null);
        setIsCorrect(null);
        setStep(nextBatch.length ? "askV2" : "finished");
      } else {
        setStep("finished");
        if (typeof onFinish === "function") {
          onFinish({ score, attempts });
        }
      }
    } else {
      setIndex(nextIndex);
      setSelected(null);
      setIsCorrect(null);
      setStep("askV2");
    }
  }

  if (!resolvedVerbs.length) {
    return <div className="p-6 text-center text-lg">No verbs loaded.</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-200 via-fuchsia-200 to-amber-200 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl bg-white/80 backdrop-blur">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-slate-700">
              Level {Math.floor(batchStart / initialBatchSize) + 1}
            </div>
            <div className="text-sm text-slate-700">
              Score: <span className="font-semibold">{score}</span>
            </div>
          </div>

          <Progress value={progress} className="h-2 mb-4" />

          <AnimatePresence mode="wait">
            {step !== "finished" && currentVerb && (
              <motion.div
                key={currentVerb.v1 + "-" + step + "-" + index}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Irregular verb</div>
                  <div className="text-4xl font-extrabold text-slate-900 mt-1">{currentVerb.v1}</div>

                  <div className="mt-3 text-lg font-semibold">
                    {step === "askV2" && (
                      <span className="text-indigo-700">Choose the Past Simple (V2)</span>
                    )}
                    {step === "askV3" && (
                      <span className="text-emerald-700">Choose the Past Participle (V3)</span>
                    )}
                    {step === "feedback" && (
                      <span className={isCorrect ? "text-emerald-700" : "text-rose-700"}>
                        {isCorrect ? "Nice!" : "Almost!"}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-base text-slate-700 font-medium">
                    {currentVerb.v1}
                    <span className="mx-1">→</span>
                    <span
                      className={
                        stepBeforeFeedback.current === "askV3" || step === "askV3"
                          ? "opacity-30"
                          : "font-bold"
                      }
                    >
                      {stepBeforeFeedback.current === "askV2" && step !== "askV2"
                        ? currentVerb.v2
                        : "___"}
                    </span>
                    <span className="mx-1">→</span>
                    <span
                      className={
                        step === "feedback" && stepBeforeFeedback.current === "askV3"
                          ? "font-bold"
                          : "opacity-30"
                      }
                    >
                      {stepBeforeFeedback.current === "askV3" && step === "feedback"
                        ? currentVerb.v3
                        : "___"}
                    </span>
                  </div>
                </div>

                {(step === "askV2" || step === "askV3") && (
                  <div className="grid grid-cols-2 gap-3">
                    {options.map((opt) => (
                      <motion.div key={opt} whileTap={{ scale: 0.97 }}>
                        <Button
                          onClick={() => handleSelect(opt)}
                          className="w-full h-14 text-xl font-bold rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 shadow-md text-white"
                        >
                          {opt}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {step === "feedback" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-center"
                  >
                    <div className="text-lg font-semibold text-slate-800">
                      {stepBeforeFeedback.current === "askV2" ? (
                        <>
                          Past of <span className="font-extrabold">{currentVerb.v1}</span> is{" "}
                          <span className="font-extrabold">{currentVerb.v2}</span>.
                        </>
                      ) : (
                        <>
                          V3 of <span className="font-extrabold">{currentVerb.v1}</span> is{" "}
                          <span className="font-extrabold">{currentVerb.v3}</span>.
                        </>
                      )}
                    </div>

                    <Button
                      onClick={nextAfterFeedback}
                      className="mt-4 w-full h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 shadow-md text-white"
                    >
                      {stepBeforeFeedback.current === "askV2" ? "Next: V3" : "Next Verb"}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === "finished" && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="text-3xl font-extrabold text-slate-900">Done!</div>
                <div className="text-lg text-slate-700 mt-2">You finished all levels.</div>
                <div className="mt-4 text-xl font-semibold">Final score: {score} / {attempts}</div>
                <Button
                  onClick={() => {
                    const safeVerbs = resolvedVerbs;
                    const batch = safeVerbs.slice(0, initialBatchSize).map((verb) => ({
                      verb,
                      correctStreak: 0,
                    }));
                    setBatchStart(0);
                    setQueue(batch);
                    setIndex(0);
                    setScore(0);
                    setAttempts(0);
                    setSelected(null);
                    setIsCorrect(null);
                    setStep("askV2");
                  }}
                  className="mt-6 w-full h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 hover:from-sky-600 hover:to-fuchsia-600 shadow-md text-white"
                >
                  Play Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

// --------------------
// Drag & Drop game (chips into V2/V3 boxes)
// --------------------

export function IrregularVerbDragGame({
  verbs,
  roundSize = 3,
  distractorPairs = 1,
  onFinish,
}) {
  const resolvedVerbs = Array.isArray(verbs) && verbs.length ? verbs : DEFAULT_VERBS;

  // Shuffle the verb order once per mount so rounds don't follow the list order.
  const shuffledVerbsRef = useRef(null);
  if (!shuffledVerbsRef.current) {
    shuffledVerbsRef.current = shuffle(resolvedVerbs);
  }
  const shuffledVerbs = shuffledVerbsRef.current;

  // Neutral palette for chips (NOT tied to V2/V3).
  const CHIP_STYLES = [
    "bg-gradient-to-r from-sky-500 to-indigo-500 text-white",
    "bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white",
    "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
    "bg-gradient-to-r from-violet-500 to-purple-500 text-white",
  ];
  const chipStyleForId = (id) => CHIP_STYLES[hashStringToIndex(id, CHIP_STYLES.length)];

  const [roundStart, setRoundStart] = useState(0);
  const [roundVerbs, setRoundVerbs] = useState([]);
  const [chips, setChips] = useState([]); // { id, text, type, verbIndex }
  const [placed, setPlaced] = useState({}); // key: `${verbIndex}-${type}` -> chipId
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showRoundResult, setShowRoundResult] = useState(false);

  // Check if all boxes are filled whenever placed changes
  useEffect(() => {
    const totalBoxes = roundVerbs.length * 2;
    const filledBoxes = Object.keys(placed).length;
    
    if (filledBoxes === totalBoxes && totalBoxes > 0 && !showRoundResult) {
      // All boxes filled - now check correctness
      console.log('All boxes filled! Checking answers...');
      setTimeout(() => checkAnswers(), 300);
    }
  }, [placed, roundVerbs, showRoundResult]);

  const zonesRef = useRef([]); // { key, rect, verbIndex, type }

  function registerZone(key, verbIndex, type, el) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const existing = zonesRef.current.find((z) => z.key === key);
    if (existing) {
      existing.rect = rect;
      existing.verbIndex = verbIndex;
      existing.type = type;
    } else {
      zonesRef.current.push({ key, rect, verbIndex, type });
    }
  }

  function refreshZoneRects() {
    zonesRef.current = zonesRef.current.map((z) => {
      const el = document.getElementById(z.key);
      if (el) z.rect = el.getBoundingClientRect();
      return z;
    });
  }

  useEffect(() => {
    zonesRef.current = [];

    const rv = shuffledVerbs.slice(roundStart, roundStart + roundSize);
    setRoundVerbs(rv);

    const baseChips = [];
    rv.forEach((v, i) => {
      baseChips.push({ id: `v2-${roundStart + i}`, text: v.v2, type: "v2", verbIndex: i });
      baseChips.push({ id: `v3-${roundStart + i}`, text: v.v3, type: "v3", verbIndex: i });
    });

    const distractors = shuffledVerbs
      .slice(roundStart + roundSize, roundStart + roundSize + distractorPairs)
      .flatMap((v, j) => [
        { id: `d-v2-${roundStart + roundSize + j}`, text: v.v2, type: "v2", verbIndex: -1 },
        { id: `d-v3-${roundStart + roundSize + j}`, text: v.v3, type: "v3", verbIndex: -1 },
      ]);

    setPlaced({});
    setShowRoundResult(false);
    setChips(shuffle(baseChips.concat(distractors)));

    const t = requestAnimationFrame(() => refreshZoneRects());
    return () => cancelAnimationFrame(t);
  }, [roundStart, roundSize, distractorPairs, shuffledVerbs]);

  useEffect(() => {
    function onResize() {
      refreshZoneRects();
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, []);

  const totalBoxes = roundVerbs.length * 2;
  const filledBoxes = Object.keys(placed).length;

  function findZoneAtPoint(x, y) {
    for (let i = 0; i < zonesRef.current.length; i++) {
      const z = zonesRef.current[i];
      const r = z.rect;
      if (!r) continue;
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        return z;
      }
    }
    return null;
  }

  function handleBoxClick(verbIndex, type) {
    // Don't allow removing if results are showing
    if (showRoundResult) return;
    
    const key = `${verbIndex}-${type}`;
    const placedItem = placed[key];
    
    if (!placedItem) return;
    
    // Remove from placed and put chip back in pool
    const newPlaced = { ...placed };
    delete newPlaced[key];
    setPlaced(newPlaced);
    
    // Add chip back to pool
    const originalChip = { 
      id: placedItem.chipId, 
      text: placedItem.text, 
      type: type,
      verbIndex: -1 // Mark as distractor so it doesn't matter
    };
    setChips((cs) => [...cs, originalChip]);
  }

  function handleChipDrop(chip, point, fallbackEvent) {
    const x = point && typeof point.x === "number" ? point.x : fallbackEvent && fallbackEvent.clientX;
    const y = point && typeof point.y === "number" ? point.y : fallbackEvent && fallbackEvent.clientY;
    if (typeof x !== "number" || typeof y !== "number") return;

    const zone = findZoneAtPoint(x, y);
    
    if (!zone) return;

    const verbIndex = zone.verbIndex;
    const type = zone.type;
    if (verbIndex < 0) return;

    const key = `${verbIndex}-${type}`;
    
    // If box already has something, don't place
    if (placed[key]) return;

    // Place the chip regardless of correctness
    setPlaced((p) => ({ ...p, [key]: { text: chip.text, chipId: chip.id } }));
    setChips((cs) => cs.filter((c) => c.id !== chip.id));
  }

  function checkAnswers() {
    let correctCount = 0;
    const newPlaced = { ...placed };
    
    roundVerbs.forEach((v, i) => {
      const v2Key = `${i}-v2`;
      const v3Key = `${i}-v3`;
      
      if (placed[v2Key]) {
        if (placed[v2Key].text === v.v2) {
          correctCount++;
          newPlaced[v2Key] = { ...placed[v2Key], correct: true };
        } else {
          newPlaced[v2Key] = { ...placed[v2Key], correct: false };
        }
      }
      
      if (placed[v3Key]) {
        if (placed[v3Key].text === v.v3) {
          correctCount++;
          newPlaced[v3Key] = { ...placed[v3Key], correct: true };
        } else {
          newPlaced[v3Key] = { ...placed[v3Key], correct: false };
        }
      }
    });
    
    setPlaced(newPlaced);
    setScore((s) => s + correctCount);
    setAttempts((a) => a + totalBoxes);
    
    // Show message based on score
    setShowRoundResult(true);
  }

  function getRoundResultMessage() {
    const correctAnswers = Object.values(placed).filter(p => p.correct === true).length;
    const totalAnswers = totalBoxes;
    const percentage = (correctAnswers / totalAnswers) * 100;
    
    if (percentage === 100) return "Perfect! 🌟";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 60) return "Good effort! 💪";
    if (percentage >= 40) return "Keep trying! 📚";
    return "Try again! 🔄";
  }

  function nextRound() {
    const nextStart = roundStart + roundSize;
    if (nextStart >= shuffledVerbs.length) {
      if (typeof onFinish === "function") onFinish({ score, attempts });
    } else {
      setRoundStart(nextStart);
    }
  }

  if (!resolvedVerbs.length) {
    return <div className="p-6 text-center text-lg">No verbs loaded.</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-200 via-sky-200 to-lime-200 p-4">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl bg-white/80 backdrop-blur">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-slate-700">
              Round {Math.floor(roundStart / roundSize) + 1}
            </div>
            <div className="text-sm text-slate-700">
              Score: <span className="font-semibold">{score}</span>
            </div>
          </div>

          <Progress value={(roundStart / shuffledVerbs.length) * 100} className="h-2 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {roundVerbs.map((v, i) => {
              const v2Key = `${i}-v2`;
              const v3Key = `${i}-v3`;
              return (
                <div key={v.v1} className="rounded-2xl bg-white shadow p-3">
                  <div className="text-center text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">{v.v1}</div>

                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-1">V2 (Past Simple)</div>
                      <div
                        id={`zone-${v2Key}`}
                        ref={(el) => registerZone(`zone-${v2Key}`, i, "v2", el)}
                        onClick={() => handleBoxClick(i, "v2")}
                        className={`min-h-[48px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-base sm:text-lg font-bold transition-all p-2 ${
                          placed[v2Key]
                            ? placed[v2Key].correct === true
                              ? "border-green-500 bg-green-100 text-green-900"
                              : placed[v2Key].correct === false
                              ? "border-red-500 bg-red-100 text-red-900"
                              : "border-indigo-500 bg-indigo-100 text-indigo-900 cursor-pointer hover:bg-indigo-200"
                            : "border-indigo-300 bg-indigo-50 text-slate-500"
                        }`}
                      >
                        <div>{placed[v2Key]?.text || "Drop here"}</div>
                        {placed[v2Key]?.correct === false && (
                          <div className="text-xs mt-1 text-green-700 font-bold">
                            ✓ {v.v2}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-1">V3 (Past Participle)</div>
                      <div
                        id={`zone-${v3Key}`}
                        ref={(el) => registerZone(`zone-${v3Key}`, i, "v3", el)}
                        onClick={() => handleBoxClick(i, "v3")}
                        className={`min-h-[48px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-base sm:text-lg font-bold transition-all p-2 ${
                          placed[v3Key]
                            ? placed[v3Key].correct === true
                              ? "border-green-500 bg-green-100 text-green-900"
                              : placed[v3Key].correct === false
                              ? "border-red-500 bg-red-100 text-red-900"
                              : "border-emerald-500 bg-emerald-100 text-emerald-900 cursor-pointer hover:bg-emerald-200"
                            : "border-emerald-300 bg-emerald-50 text-slate-500"
                        }`}
                      >
                        <div>{placed[v3Key]?.text || "Drop here"}</div>
                        {placed[v3Key]?.correct === false && (
                          <div className="text-xs mt-1 text-green-700 font-bold">
                            ✓ {v.v3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white shadow p-3">
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">Drag the words into the right boxes</div>
            <div className="flex flex-wrap gap-2 min-h-[64px]">
              <AnimatePresence mode="popLayout">
                {chips.map((chip) => (
                  <motion.div
                    key={chip.id}
                    drag
                    dragMomentum={false}
                    dragElastic={0}
                    onDragStart={refreshZoneRects}
                    onDragEnd={(e, info) => {
                      handleChipDrop(chip, info.point, e);
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-full text-base sm:text-lg font-extrabold cursor-grab active:cursor-grabbing shadow-md select-none ${chipStyleForId(chip.id)}`}
                    layout
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {chip.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {chips.length === 0 && !showRoundResult && (
                <div className="text-xs sm:text-sm text-slate-500">All words placed! Check your answers.</div>
              )}
              {chips.length === 0 && showRoundResult && (
                <div className="text-xs sm:text-sm text-slate-500">Round complete!</div>
              )}
            </div>
          </div>

          {showRoundResult && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
              <div className="text-xl font-extrabold text-slate-900">{getRoundResultMessage()}</div>
              <div className="text-slate-700 mt-1">
                You got {Object.values(placed).filter(p => p.correct === true).length} out of {totalBoxes} correct!
              </div>
              <Button
                onClick={nextRound}
                className="mt-3 w-full h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 hover:from-sky-600 hover:to-fuchsia-600 shadow-md text-white"
              >
                Next Round
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// --------------------
// Wrapper default export
// --------------------

export default function IrregularVerbGame({
  mode = "drag",
  verbs,
  optionsCount,
  initialBatchSize,
  roundSize,
  distractorPairs,
  onFinish,
}) {
  if (mode === "choice") {
    return (
      <IrregularVerbChoiceGame
        verbs={verbs}
        optionsCount={optionsCount}
        initialBatchSize={initialBatchSize}
        onFinish={onFinish}
      />
    );
  }

  return (
    <IrregularVerbDragGame
      verbs={verbs}
      roundSize={roundSize}
      distractorPairs={distractorPairs}
      onFinish={onFinish}
    />
  );
}
