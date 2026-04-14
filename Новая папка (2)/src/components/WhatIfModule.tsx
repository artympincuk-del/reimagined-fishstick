import React, { useState } from "react";
import { concreteClasses } from "../data/concreteData";

export const WhatIfModule: React.FC = () => {
  const [loadMpa, setLoadMpa] = useState(18.5);
  const [selectedClass, setSelectedClass] = useState(concreteClasses[3]); // B25

  const isSafe = loadMpa <= selectedClass.strength;
  const ratio = loadMpa / selectedClass.strength;

  const getCrackLevel = () => {
    if (ratio < 0.5) return 0;
    if (ratio < 0.75) return 1;
    if (ratio < 1.0) return 2;
    return 3;
  };

  const crackLevel = getCrackLevel();

  const getStatusColor = () => {
    if (ratio < 0.5) return "#22c55e";
    if (ratio < 0.75) return "#f59e0b";
    if (ratio < 1.0) return "#f97316";
    return "#ef4444";
  };

  const getStatusText = () => {
    if (ratio < 0.5) return "✅ Безопасно — большой запас прочности";
    if (ratio < 0.75) return "⚠️ Умеренная нагрузка — рекомендуем запас";
    if (ratio < 1.0) return "🟠 Критическая нагрузка — опасность разрушения";
    return "💥 ПРЕВЫШЕНИЕ ПРЕДЕЛА — конструкция разрушится!";
  };

  const getConsequences = () => {
    if (ratio < 0.5) return "Конструкция работает в нормальном режиме. Трещин нет, деформации в норме.";
    if (ratio < 0.75) return "Возможны микротрещины в зонах концентрации напряжений. Необходим мониторинг.";
    if (ratio < 1.0) return "Появляются видимые трещины. Конструкция теряет несущую способность. Срочный ремонт!";
    return "Катастрофическое разрушение конструкции! Человеческие жертвы, полное обрушение.";
  };

  return (
    <section id="whatif" className="bg-slate-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 text-orange-400 text-sm font-medium mb-4">
            💡 Модуль «Что, если?»
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Что будет, если выбрать слабый бетон?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Двигайте ползунок нагрузки и смотрите, как меняется состояние конструкции в зависимости от класса бетона
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            {/* Class selector */}
            <div>
              <label className="text-white font-semibold mb-3 block">Класс бетона конструкции:</label>
              <div className="grid grid-cols-5 gap-2">
                {concreteClasses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClass(c)}
                    className={`py-2 px-1 rounded-xl text-sm font-bold border transition-all duration-200 ${
                      selectedClass.id === c.id
                        ? "border-orange-500 bg-orange-600/30 text-orange-300"
                        : "border-white/10 bg-slate-800 text-slate-400 hover:border-orange-500/40"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Load slider */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-white/10">
              <label className="text-white font-semibold mb-2 block">
                Приложенная нагрузка:
                <span className="text-orange-400 ml-2">{loadMpa.toFixed(1)} МПа</span>
              </label>
              <input
                type="range"
                min={0}
                max={80}
                step={0.5}
                value={loadMpa}
                onChange={(e) => setLoadMpa(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, ${getStatusColor()} ${(loadMpa / 80) * 100}%, #374151 ${(loadMpa / 80) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>0 МПа</span>
                <span>Предел {selectedClass.label}: {selectedClass.strength} МПа</span>
                <span>80 МПа</span>
              </div>

              {/* Ratio display */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-slate-400 text-sm">Нагрузка / Прочность:</span>
                <span className="font-bold text-lg" style={{ color: getStatusColor() }}>
                  {(ratio * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(ratio * 100, 100)}%`,
                    background: `linear-gradient(to right, #22c55e, ${getStatusColor()})`,
                  }}
                />
              </div>
            </div>

            {/* Status */}
            <div
              className="rounded-2xl p-5 border transition-all duration-500"
              style={{
                borderColor: `${getStatusColor()}50`,
                background: `${getStatusColor()}10`,
              }}
            >
              <div className="font-bold text-lg mb-2" style={{ color: getStatusColor() }}>
                {getStatusText()}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{getConsequences()}</p>
            </div>

            {/* Comparison with correct class */}
            {!isSafe && (
              <div className="bg-blue-900/30 border border-blue-500/40 rounded-2xl p-5">
                <div className="text-blue-400 font-bold mb-2">💡 Рекомендация:</div>
                <p className="text-blue-300 text-sm">
                  Для нагрузки {loadMpa.toFixed(1)} МПа рекомендуем бетон класса{" "}
                  <strong>
                    {concreteClasses.find(c => c.strength >= loadMpa)?.label || "B90"}
                  </strong>{" "}
                  или выше. Обратитесь к нашим специалистам для подбора правильного класса!
                </p>
              </div>
            )}
          </div>

          {/* Visual: Building visualization */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-80">
              {/* Building */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                {/* Foundation */}
                <div
                  className="w-48 h-8 rounded-b-lg mb-0 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom, ${getStatusColor()}40, ${getStatusColor()}20)`,
                    border: `2px solid ${getStatusColor()}60`,
                    transform: crackLevel >= 3 ? "skew(5deg)" : "skew(0deg)",
                  }}
                >
                  <div className="text-center text-xs text-white/70 leading-8">Фундамент</div>
                </div>

                {/* Building floors */}
                {[...Array(5)].map((_, i) => {
                  const floorLevel = 4 - i;
                  const hasCracks = crackLevel > 0 && floorLevel <= crackLevel;
                  return (
                    <div
                      key={i}
                      className="w-44 mx-auto transition-all duration-500 relative overflow-hidden"
                      style={{
                        height: 40,
                        marginBottom: 2,
                        background: hasCracks
                          ? `linear-gradient(to right, ${getStatusColor()}30, ${getStatusColor()}20)`
                          : "rgba(51,65,85,0.8)",
                        border: `1px solid ${hasCracks ? getStatusColor() + "60" : "rgba(255,255,255,0.1)"}`,
                        transform: crackLevel >= 3 && i < 2 ? `translate(${i * 3}px, ${i * 2}px) rotate(${i * 0.5}deg)` : "none",
                      }}
                    >
                      {/* Windows */}
                      <div className="flex justify-around items-center h-full px-2">
                        {[...Array(3)].map((_, j) => (
                          <div
                            key={j}
                            className="w-6 h-5 rounded-sm"
                            style={{
                              background: hasCracks ? `${getStatusColor()}40` : "rgba(147,197,253,0.4)",
                              border: `1px solid ${hasCracks ? getStatusColor() + "60" : "rgba(147,197,253,0.3)"}`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Crack overlay */}
                      {hasCracks && (
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 40">
                          <path
                            d={`M${40 + i * 10} 0 L${35 + i * 10} 20 L${50 + i * 10} 40`}
                            stroke={getStatusColor()}
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.7"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}

                {/* Roof */}
                <div
                  className="w-44 mx-auto h-12 transition-all duration-500"
                  style={{
                    background: crackLevel >= 2 ? `${getStatusColor()}30` : "rgba(71,85,105,0.8)",
                    border: `1px solid ${crackLevel >= 2 ? getStatusColor() + "60" : "rgba(255,255,255,0.1)"}`,
                    transform: crackLevel >= 3 ? "rotate(-3deg) translate(-5px, 5px)" : "none",
                    clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
                  }}
                />
              </div>

              {/* Load arrows */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="text-sm font-bold" style={{ color: getStatusColor() }}>
                  {loadMpa.toFixed(1)} МПа
                </div>
                {Array.from({ length: Math.min(Math.ceil(ratio * 3), 5) }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-0.5 h-3" style={{ background: getStatusColor() }} />
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: `8px solid ${getStatusColor()}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Scale gauge */}
            <div className="mt-8 w-full max-w-xs">
              <div className="text-center text-white font-semibold mb-3">Индикатор нагрузки (в "слонах")</div>
              <div className="flex items-end justify-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => {
                  const filled = i < Math.ceil(ratio * 10);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className={`text-xs transition-all duration-300 ${filled ? "opacity-100" : "opacity-20"}`}>
                        {i < 5 ? "🐘" : "💥"}
                      </span>
                      <div
                        className="w-6 rounded-t-sm transition-all duration-300"
                        style={{
                          height: `${(i + 1) * 6}px`,
                          background: filled ? getStatusColor() : "#374151",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-slate-400 text-xs mt-2">
                Нагрузка: {Math.ceil(ratio * 10)} «единиц» из 10
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
