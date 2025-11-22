import React, { useState } from "react";
import IrregularVerbGame, {
  IrregularVerbChoiceGame,
  IrregularVerbDragGame,
  DEFAULT_VERBS,
} from "./IrregularVerbGame";

/**
 * Demo component showcasing the Irregular Verb Game
 * 
 * This file demonstrates:
 * - Mode switching between Choice and Drag games
 * - Custom verb lists
 * - Handling game completion
 * - Component configuration
 */

export default function IrregularVerbGameDemo() {
  const [mode, setMode] = useState("drag"); // "drag" | "choice" | "custom"
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  // Example: Custom verb list (smaller set for testing)
  const customVerbs = [
    { v1: "go", v2: "went", v3: "gone" },
    { v1: "see", v2: "saw", v3: "seen" },
    { v1: "do", v2: "did", v3: "done" },
    { v1: "have", v2: "had", v3: "had" },
    { v1: "say", v2: "said", v3: "said" },
    { v1: "get", v2: "got", v3: "got/gotten" },
    { v1: "make", v2: "made", v3: "made" },
    { v1: "know", v2: "knew", v3: "known" },
    { v1: "think", v2: "thought", v3: "thought" },
    { v1: "take", v2: "took", v3: "taken" },
  ];

  const handleFinish = (gameResults) => {
    setResults(gameResults);
    setShowResults(true);
    console.log("Game finished!", gameResults);
  };

  const resetGame = () => {
    setShowResults(false);
    setResults(null);
  };

  if (showResults) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            🎉 Game Complete!
          </h1>
          <div className="text-6xl font-bold text-indigo-600 mb-2">
            {results.score}/{results.attempts}
          </div>
          <div className="text-lg text-slate-600 mb-6">
            {Math.round((results.score / results.attempts) * 100)}% Correct
          </div>
          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
          >
            Try Another Mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Mode Selector */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-4 text-center">
            Irregular Verb Game Demo
          </h1>
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => setMode("drag")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === "drag"
                  ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              🎨 Drag & Drop
            </button>
            <button
              onClick={() => setMode("choice")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === "choice"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              🎯 Multiple Choice
            </button>
            <button
              onClick={() => setMode("custom")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === "custom"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              ⭐ Custom Verbs
            </button>
          </div>
          <div className="mt-3 text-center text-sm text-slate-600">
            {mode === "drag" && "Drag colorful chips into the correct V2/V3 boxes"}
            {mode === "choice" && "Answer multiple choice questions for each verb"}
            {mode === "custom" && "Same as Choice mode, but with only 10 verbs"}
          </div>
        </div>
      </div>

      {/* Game Component */}
      {mode === "drag" && (
        <IrregularVerbDragGame
          roundSize={3}
          distractorPairs={1}
          onFinish={handleFinish}
        />
      )}

      {mode === "choice" && (
        <IrregularVerbChoiceGame
          optionsCount={4}
          initialBatchSize={10}
          onFinish={handleFinish}
        />
      )}

      {mode === "custom" && (
        <IrregularVerbChoiceGame
          verbs={customVerbs}
          optionsCount={4}
          initialBatchSize={5}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}

// Alternative: Using the wrapper component
export function SimpleDemo() {
  return (
    <div>
      {/* Simplest possible usage - just drag mode with defaults */}
      <IrregularVerbGame />
      
      {/* Or specify mode */}
      {/* <IrregularVerbGame mode="choice" /> */}
    </div>
  );
}

// Example: Integration with your own app
export function IntegratedExample() {
  const [showGame, setShowGame] = useState(false);
  
  const handleGameComplete = (results) => {
    alert(`You scored ${results.score} out of ${results.attempts}!`);
    setShowGame(false);
    // Save results to database, show certificate, etc.
  };

  return (
    <div className="p-8">
      {!showGame ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">English Learning App</h1>
          <button
            onClick={() => setShowGame(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg"
          >
            Start Irregular Verb Practice
          </button>
        </div>
      ) : (
        <IrregularVerbGame
          mode="drag"
          onFinish={handleGameComplete}
        />
      )}
    </div>
  );
}

