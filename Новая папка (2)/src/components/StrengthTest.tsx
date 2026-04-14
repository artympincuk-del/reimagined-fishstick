import React, { useState, useEffect, useRef } from "react";
import { concreteClasses } from "../data/concreteData";

type CubeState = "whole" | "cracked" | "destroyed";

export const StrengthTest: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(concreteClasses[3]); // B25
  const [testing, setTesting] = useState(false);
  const [currentLoad, setCurrentLoad] = useState(0);
  const [cubeState, setCubeState] = useState<CubeState>("whole");
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startTest = () => {
    setTesting(true);
    setCurrentLoad(0);
    setCubeState("whole");
    setProgress(0);
    setFinished(false);

    const target = selectedClass.strength;
    const duration = 3000;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      step++;
      const pct = step / steps;
      const load = target * pct;
      setCurrentLoad(parseFloat(load.toFixed(1)));
      setProgress(pct * 100);

      if (pct < 0.4) setCubeState("whole");
      else if (pct < 0.8) setCubeState("cracked");
      else setCubeState("destroyed");

      if (step >= steps) {
        clearInterval(intervalRef.current!);
        setTesting(false);
        setFinished(true);
        setCubeState("destroyed");
        setCurrentLoad(target);
        setProgress(100);
      }
    }, stepDuration);
  };

  const resetTest = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTesting(false);
    setCurrentLoad(0);
    setCubeState("whole");
    setProgress(0);
    setFinished(false);
  };

  useEffect(() => {
    resetTest();
  }, [selectedClass]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getCubeColor = () => {
    switch (cubeState) {
      case "whole": return "#3b82f6";
      case "cracked": return "#f59e0b";
      case "destroyed": return "#ef4444";
    }
  };

  const getStateLabel = () => {
    switch (cubeState) {
      case "whole": return "Целый";
      case "cracked": return "С трещинами";
      case "destroyed": return "Разрушен";
    }
  };

  return (
    <section id="test" className="bg-slate-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 text-red-400 text-sm font-medium mb-4">
            🔬 Алгоритм виртуальных испытаний
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Испытание на прочность
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Выберите класс бетона и нажмите «Протестировать» — наблюдайте за поведением куба под нагрузкой
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <div className="space-y-8">
            {/* Class selector */}
            <div>
              <label className="text-white font-semibold mb-3 block">Выберите класс бетона:</label>
              <div className="grid grid-cols-5 gap-2">
                {concreteClasses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => !testing && setSelectedClass(c)}
                    disabled={testing}
                    className={`py-2 px-1 rounded-xl text-sm font-bold border transition-all duration-200 ${
                      selectedClass.id === c.id
                        ? "border-blue-500 bg-blue-600/30 text-blue-300"
                        : "border-white/10 bg-slate-800 text-slate-400 hover:border-blue-500/40"
                    } ${testing ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected info */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-black" style={{ color: selectedClass.colorDark }}>
                    {selectedClass.label}
                  </div>
                  <div className="text-slate-400 text-sm">{selectedClass.application}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{selectedClass.strength} МПа</div>
                  <div className="text-slate-400 text-sm">Предел прочности</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Нагрузка</span>
                  <span className="font-bold" style={{ color: getCubeColor() }}>
                    {currentLoad.toFixed(1)} / {selectedClass.strength} МПа
                  </span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(to right, #3b82f6, ${getCubeColor()})`,
                    }}
                  />
                </div>
              </div>

              {/* State indicator */}
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCubeColor() }}
                />
                <span className="text-sm font-medium" style={{ color: getCubeColor() }}>
                  Состояние: {getStateLabel()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={startTest}
                disabled={testing}
                className="flex-1 py-4 rounded-xl font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                style={{ background: testing ? "#374151" : "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
              >
                {testing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Испытание...
                  </span>
                ) : "🔬 Протестировать прочность"}
              </button>
              <button
                onClick={resetTest}
                disabled={testing}
                className="px-6 py-4 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:border-white/40 font-bold transition-all duration-200 disabled:opacity-50"
              >
                ↺ Сброс
              </button>
            </div>

            {/* Result message */}
            {finished && (
              <div className="bg-green-900/30 border border-green-500/40 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 font-bold text-lg">✓ Испытание завершено!</span>
                </div>
                <p className="text-green-300 text-sm leading-relaxed">
                  Прочность {selectedClass.label} составляет <strong>{selectedClass.strength} МПа</strong>. 
                  Куб разрушился под нагрузкой {selectedClass.strength} МПа. 
                  Это эквивалентно давлению {(selectedClass.strength / 9.81).toFixed(1)} кг на мм².
                </p>
              </div>
            )}
          </div>

          {/* Cube visualization */}
          <div className="flex flex-col items-center">
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Load arrow */}
              {testing && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="text-red-400 font-bold text-sm">{currentLoad.toFixed(1)} МПа</div>
                  <div className="w-0.5 h-8 bg-red-400" />
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "12px solid #f87171",
                    }}
                  />
                </div>
              )}

              {/* The Cube */}
              <div
                className="relative transition-all duration-300"
                style={{
                  width: 160,
                  height: 160,
                }}
              >
                {/* Main cube face */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${getCubeColor()}90, ${getCubeColor()}50)`,
                    border: `2px solid ${getCubeColor()}`,
                    boxShadow: `0 0 40px ${getCubeColor()}40`,
                    transform: cubeState === "destroyed" ? "scale(0.95) rotate(2deg)" : "scale(1) rotate(0deg)",
                  }}
                >
                  {/* Cracks */}
                  {cubeState === "cracked" && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                      <path d="M80 10 L65 60 L90 80 L50 150" stroke="rgba(0,0,0,0.6)" strokeWidth="2" fill="none" />
                      <path d="M120 30 L100 70 L130 90" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}
                  {cubeState === "destroyed" && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                      <path d="M80 10 L60 55 L90 75 L40 155" stroke="rgba(0,0,0,0.8)" strokeWidth="3" fill="none" />
                      <path d="M120 20 L95 65 L140 90" stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" fill="none" />
                      <path d="M30 40 L70 80 L20 120" stroke="rgba(0,0,0,0.6)" strokeWidth="2" fill="none" />
                      <path d="M50 10 L80 50 L110 10" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none" />
                    </svg>
                  )}

                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-4xl font-black">{selectedClass.label}</div>
                      <div className="text-white/70 text-sm mt-1">{getStateLabel()}</div>
                    </div>
                  </div>
                </div>

                {/* Side face (3D effect) */}
                <div
                  className="absolute rounded-r-lg transition-all duration-300"
                  style={{
                    width: 20,
                    height: 160,
                    right: -18,
                    top: 8,
                    background: `linear-gradient(to bottom, ${getCubeColor()}50, ${getCubeColor()}20)`,
                    transform: "skewY(-45deg)",
                    transformOrigin: "top left",
                  }}
                />
                {/* Top face */}
                <div
                  className="absolute rounded-t-lg transition-all duration-300"
                  style={{
                    width: 160,
                    height: 20,
                    top: -18,
                    left: 8,
                    background: `linear-gradient(to right, ${getCubeColor()}60, ${getCubeColor()}30)`,
                    transform: "skewX(-45deg)",
                    transformOrigin: "bottom left",
                  }}
                />
              </div>

              {/* Ground */}
              <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full opacity-40"
                style={{
                  width: 200,
                  height: 20,
                  background: `radial-gradient(ellipse, ${getCubeColor()}80, transparent)`,
                }}
              />
            </div>

            {/* Stage indicators */}
            <div className="flex gap-4 mt-8">
              {(["whole", "cracked", "destroyed"] as CubeState[]).map((state, i) => {
                const labels = ["Целый", "С трещинами", "Разрушен"];
                const colors = ["#3b82f6", "#f59e0b", "#ef4444"];
                const pctRange = [0, 40, 80];
                const isActive = progress >= pctRange[i];
                return (
                  <div key={state} className="text-center">
                    <div
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                        isActive ? "scale-110" : "opacity-40"
                      }`}
                      style={{
                        borderColor: isActive ? colors[i] : "#374151",
                        background: isActive ? `${colors[i]}20` : "transparent",
                      }}
                    >
                      <span className="text-lg">{["🟦", "⚡", "💥"][i]}</span>
                    </div>
                    <div className={`text-xs ${isActive ? "text-white" : "text-slate-600"}`}>{labels[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
