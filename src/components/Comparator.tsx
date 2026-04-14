import React, { useState, useEffect, useRef } from "react";
import { concreteClasses } from "../data/concreteData";

interface ComparatorObject {
  id: string;
  label: string;
  emoji: string;
  pressureMpa: number;
  unit: string;
  description: string;
}

const objects: ComparatorObject[] = [
  { id: "car", label: "Легковой автомобиль", emoji: "🚗", pressureMpa: 0.5, unit: "авт", description: "Давление от колёс автомобиля массой 1.5 т" },
  { id: "truck", label: "Грузовик", emoji: "🚛", pressureMpa: 2.0, unit: "гр", description: "Давление от грузового автомобиля 20 т" },
  { id: "elephant", label: "Слон", emoji: "🐘", pressureMpa: 1.25, unit: "сл", description: "Давление от африканского слона 5 т" },
  { id: "water10m", label: "Вода 10 м", emoji: "💧", pressureMpa: 0.1, unit: "м вод", description: "Гидростатическое давление на 10 м глубины" },
  { id: "water100m", label: "Вода 100 м", emoji: "🌊", pressureMpa: 1.0, unit: "м вод", description: "Давление воды на 100 м глубины Балтийского моря" },
  { id: "human", label: "Человек", emoji: "🧍", pressureMpa: 0.04, unit: "чел", description: "Давление стоящего человека массой 80 кг" },
  { id: "tank", label: "Танк", emoji: "🪖", pressureMpa: 8.0, unit: "т", description: "Давление от танка Т-72 массой 44 т" },
  { id: "plane", label: "Самолёт", emoji: "✈️", pressureMpa: 5.0, unit: "с", description: "Давление шасси Boeing 737 при посадке" },
];

export const Comparator: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(concreteClasses[3]);
  const [selectedObjects, setSelectedObjects] = useState<{ obj: ComparatorObject; count: number }[]>([]);
  const [totalPressure, setTotalPressure] = useState(0);
  const animRef = useRef<number | null>(null);
  const [displayPressure, setDisplayPressure] = useState(0);

  useEffect(() => {
    const total = selectedObjects.reduce((sum, item) => sum + item.obj.pressureMpa * item.count, 0);
    setTotalPressure(parseFloat(total.toFixed(2)));
  }, [selectedObjects]);

  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const target = totalPressure;
    const start = displayPressure;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setDisplayPressure(parseFloat((start + (target - start) * eased).toFixed(2)));
      if (pct < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [totalPressure]);

  const addObject = (obj: ComparatorObject) => {
    setSelectedObjects(prev => {
      const existing = prev.find(i => i.obj.id === obj.id);
      if (existing) {
        return prev.map(i => i.obj.id === obj.id ? { ...i, count: i.count + 1 } : i);
      }
      return [...prev, { obj, count: 1 }];
    });
  };

  const removeObject = (objId: string) => {
    setSelectedObjects(prev => {
      const existing = prev.find(i => i.obj.id === objId);
      if (existing && existing.count > 1) {
        return prev.map(i => i.obj.id === objId ? { ...i, count: i.count - 1 } : i);
      }
      return prev.filter(i => i.obj.id !== objId);
    });
  };

  const clearAll = () => setSelectedObjects([]);

  const ratio = displayPressure / selectedClass.strength;

  const getBarColor = () => {
    if (ratio < 0.5) return "#22c55e";
    if (ratio < 0.8) return "#f59e0b";
    if (ratio < 1.0) return "#f97316";
    return "#ef4444";
  };

  // How many of a single object equals the concrete strength
  const equivalences = objects.slice(0, 4).map(obj => ({
    obj,
    count: Math.round(selectedClass.strength / obj.pressureMpa),
  }));

  return (
    <section id="comparator" className="bg-slate-950 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 text-cyan-400 text-sm font-medium mb-4">
            🔭 Компаратор с визуализацией
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Собери эквивалентную нагрузку
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Выберите класс бетона и «собирайте» объекты, создавая сопоставимое давление. 
            Система в реальном времени покажет, выдержит ли бетон данную нагрузку.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Class + Object selector */}
          <div className="space-y-6">
            {/* Class selector */}
            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-4">Класс бетона:</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {concreteClasses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClass(c)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                      selectedClass.id === c.id
                        ? "border-cyan-500 bg-cyan-600/30 text-cyan-300"
                        : "border-white/10 bg-slate-700 text-slate-400 hover:border-cyan-500/40"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Class info */}
              <div className="mt-4 p-3 rounded-xl" style={{ background: `${selectedClass.colorDark}20` }}>
                <div className="text-lg font-black" style={{ color: selectedClass.colorDark }}>
                  {selectedClass.label} — {selectedClass.strength} МПа
                </div>
                <div className="text-slate-400 text-xs">{selectedClass.application}</div>
              </div>
            </div>

            {/* Object picker */}
            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-4">Добавить нагрузку:</h3>
              <div className="space-y-2">
                {objects.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => addObject(obj)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-slate-700/40 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200 text-left"
                  >
                    <span className="text-2xl">{obj.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{obj.label}</div>
                      <div className="text-cyan-400 text-xs">{obj.pressureMpa} МПа</div>
                    </div>
                    <span className="text-slate-400 text-lg">+</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Visualization area */}
          <div className="bg-slate-800/60 rounded-2xl border border-white/10 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Собранная нагрузка</h3>
              {selectedObjects.length > 0 && (
                <button onClick={clearAll} className="text-slate-400 hover:text-red-400 text-xs transition-colors">
                  Очистить ✕
                </button>
              )}
            </div>

            {/* Objects display */}
            <div className="flex-1 min-h-48 rounded-xl bg-slate-900/50 border border-white/5 p-4 mb-4 overflow-y-auto">
              {selectedObjects.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-500 text-sm text-center">
                  Нажимайте на объекты слева, чтобы добавить нагрузку →
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedObjects.map(({ obj, count }) => (
                    <div key={obj.id} className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-white/10">
                      <span className="text-2xl">{obj.emoji}</span>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{obj.label}</div>
                        <div className="text-cyan-400 text-xs">{obj.pressureMpa} × {count} = {(obj.pressureMpa * count).toFixed(2)} МПа</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeObject(obj.id)}
                          className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-red-500/30 text-slate-300 hover:text-red-400 font-bold text-sm transition-all"
                        >
                          −
                        </button>
                        <span className="text-white font-bold w-6 text-center">{count}</span>
                        <button
                          onClick={() => addObject(obj)}
                          className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-cyan-500/30 text-slate-300 hover:text-cyan-400 font-bold text-sm transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pressure gauge */}
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-slate-400 text-xs">Суммарное давление</div>
                  <div className="text-3xl font-black" style={{ color: getBarColor() }}>
                    {displayPressure.toFixed(2)} МПа
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs">Предел {selectedClass.label}</div>
                  <div className="text-xl font-bold text-white">{selectedClass.strength} МПа</div>
                </div>
              </div>

              <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(ratio * 100, 100)}%`,
                    background: `linear-gradient(to right, #22c55e, ${getBarColor()})`,
                  }}
                />
              </div>

              <div
                className="rounded-xl p-3 text-sm font-medium text-center transition-all duration-300"
                style={{
                  background: `${getBarColor()}20`,
                  color: getBarColor(),
                  border: `1px solid ${getBarColor()}40`,
                }}
              >
                {ratio === 0 && "Добавьте объекты для сравнения"}
                {ratio > 0 && ratio < 0.5 && `✅ Безопасно — нагрузка ${(ratio * 100).toFixed(0)}% от предела`}
                {ratio >= 0.5 && ratio < 1.0 && `⚠️ Приближение к пределу — ${(ratio * 100).toFixed(0)}%`}
                {ratio >= 1.0 && `💥 ПРЕВЫШЕНИЕ! Бетон разрушится!`}
              </div>
            </div>
          </div>

          {/* Right: Equivalences */}
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-4">
                Сколько нужно объектов, чтобы разрушить {selectedClass.label}?
              </h3>
              <div className="space-y-4">
                {equivalences.map(({ obj, count }) => (
                  <div key={obj.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{obj.emoji}</span>
                      <div className="text-white text-sm font-medium">{obj.label}</div>
                    </div>
                    <div
                      className="text-2xl font-black text-cyan-400 mb-1"
                    >
                      ≈ {count.toLocaleString()} {obj.unit}
                    </div>
                    <div className="flex flex-wrap gap-0.5">
                      {Array.from({ length: Math.min(count, 20) }).map((_, i) => (
                        <span key={i} className="text-xs">{obj.emoji}</span>
                      ))}
                      {count > 20 && <span className="text-slate-400 text-xs">...+{count - 20}</span>}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">{obj.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Baltic sea depth visualization */}
            <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-4">🌊 Глубина Балтийского моря</h3>
              <div className="text-slate-400 text-sm mb-4">
                Максимальная глубина Балтийского моря — 459 м (давление ~4.6 МПа)
              </div>
              <div className="relative h-40 bg-gradient-to-b from-sky-900/50 to-blue-950 rounded-xl overflow-hidden border border-blue-800/40">
                {/* Water surface */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400/50" />
                {/* Depth indicator for concrete */}
                <div
                  className="absolute left-0 right-0 border-t-2 border-dashed transition-all duration-500"
                  style={{
                    top: `${Math.min((selectedClass.strength / 4.6 / 10) * 100, 95)}%`,
                    borderColor: selectedClass.colorDark,
                  }}
                >
                  <div
                    className="absolute right-2 -top-5 text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: selectedClass.colorDark, color: "white" }}
                  >
                    {selectedClass.label}: {Math.round(selectedClass.strength * 100)}м
                  </div>
                </div>
                {/* 459m line */}
                <div
                  className="absolute left-0 right-0 border-t border-blue-500/50"
                  style={{ top: "95%" }}
                >
                  <div className="absolute right-2 -top-4 text-xs text-blue-400">459м (дно)</div>
                </div>

                {/* Bubbles */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                      animation: `float ${2 + i * 0.4}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 text-sm">
                <span className="text-white font-medium">{selectedClass.label} ({selectedClass.strength} МПа)</span>
                <span className="text-slate-400">
                  {" "}выдержит давление воды на глубине до{" "}
                </span>
                <span className="text-cyan-400 font-bold">{Math.round(selectedClass.strength * 100)} м</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-8px); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};
