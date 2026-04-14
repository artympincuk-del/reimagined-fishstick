import React, { useState } from "react";
import { concreteClasses } from "../data/concreteData";

interface Comparison {
  id: string;
  label: string;
  emoji: string;
  calc: (mpa: number) => { count: number; description: string; detail: string };
}

const comparisons: Comparison[] = [
  {
    id: "car",
    label: "Легковые автомобили",
    emoji: "🚗",
    calc: (mpa) => {
      const forceN = mpa * 1_000_000; // 1 МПа = 1 Н/мм² = 1 000 000 Н/м²
      const area = 0.01; // 10 см² = 0.01 м² — площадь контакта
      const totalForce = forceN * area;
      const carWeight = 15000; // Н (1.5 т)
      const count = Math.round(totalForce / carWeight);
      return {
        count,
        description: `≈ ${count} легковых автомобиля`,
        detail: `При площади контакта 10 см², бетон выдерживает силу ${(totalForce / 1000).toFixed(0)} кН — столько весят ${count} машин по 1.5 тонны`,
      };
    },
  },
  {
    id: "elephant",
    label: "Африканские слоны",
    emoji: "🐘",
    calc: (mpa) => {
      const forceN = mpa * 1_000_000;
      const area = 0.01;
      const totalForce = forceN * area;
      const elephantWeight = 50000; // Н (5 т)
      const count = Math.round(totalForce / elephantWeight);
      return {
        count,
        description: `≈ ${count} слонов`,
        detail: `Африканский слон весит ~5 тонн. Бетон ${mpa} МПа выдержит нагрузку от ${count} таких слонов на площади 10 см²`,
      };
    },
  },
  {
    id: "water",
    label: "Глубина моря",
    emoji: "🌊",
    calc: (mpa) => {
      const depth = Math.round(mpa * 100); // 1 МПа ≈ 100 м глубины
      return {
        count: depth,
        description: `≈ ${depth} м глубины`,
        detail: `Давление воды растёт на 0.1 МПа каждые 10 м. Прочность ${mpa} МПа соответствует давлению на глубине ${depth} м. Балтийское море — максимум 459 м`,
      };
    },
  },
  {
    id: "boeing",
    label: "Самолёты Boeing 737",
    emoji: "✈️",
    calc: (mpa) => {
      const forceN = mpa * 1_000_000;
      const area = 0.01;
      const totalForce = forceN * area;
      const boeingWeight = 410000; // Н (41 т)
      const count = parseFloat((totalForce / boeingWeight).toFixed(2));
      return {
        count,
        description: count >= 1 ? `≈ ${Math.round(count)} самолёта` : `${(count * 100).toFixed(0)}% от массы`,
        detail: `Пустой Boeing 737 весит ~41 тонну. Эквивалентное усилие: ${count.toFixed(2)} самолёта`,
      };
    },
  },
];

export const ComparisonModule: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(concreteClasses[3]);
  const [activeComparison, setActiveComparison] = useState<string | null>(null);

  const mpa = selectedClass.strength;

  return (
    <section id="compare" className="bg-slate-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-sm font-medium mb-4">
            ⚖️ Модуль сравнения
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Прочность в реальных масштабах
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Насколько прочен бетон? Выберите класс и сравните с понятными объектами из реального мира
          </p>
        </div>

        {/* Class selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {concreteClasses.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelectedClass(c); setActiveComparison(null); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all duration-200 ${
                selectedClass.id === c.id
                  ? "border-blue-500 bg-blue-600/30 text-blue-300 scale-110"
                  : "border-white/10 bg-slate-800 text-slate-400 hover:border-blue-500/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Main display */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: selected class info */}
          <div className="lg:col-span-2 bg-slate-800/60 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div
                className="text-6xl font-black mb-2"
                style={{ color: selectedClass.colorDark }}
              >
                {selectedClass.label}
              </div>
              <div className="text-white text-3xl font-bold mb-1">{mpa} МПа</div>
              <div className="text-slate-400 mb-4">{selectedClass.application}</div>
              <div className="text-slate-300 text-sm leading-relaxed">{selectedClass.description}</div>
            </div>

            {/* Visual bar */}
            <div className="mt-6">
              <div className="text-slate-400 text-xs mb-2">Относительная прочность</div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(mpa / 67) * 100}%`,
                    background: `linear-gradient(to right, ${selectedClass.color}, ${selectedClass.colorDark})`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>B10 (7.5)</span>
                <span>B90 (67)</span>
              </div>
            </div>
          </div>

          {/* Right: comparison cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {comparisons.map((comp) => {
              const result = comp.calc(mpa);
              const isActive = activeComparison === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveComparison(isActive ? null : comp.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? "border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/20"
                      : "border-white/10 bg-slate-800/60 hover:border-blue-500/40 hover:bg-slate-700/60"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl">{comp.emoji}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{comp.label}</div>
                      <div
                        className="text-2xl font-black mt-1"
                        style={{ color: selectedClass.colorDark }}
                      >
                        {result.description}
                      </div>
                    </div>
                  </div>

                  {/* Visual representation */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {comp.id === "car" && Array.from({ length: Math.min(result.count as number, 12) }).map((_, i) => (
                      <span key={i} className="text-sm">🚗</span>
                    ))}
                    {comp.id === "elephant" && Array.from({ length: Math.min(result.count as number, 10) }).map((_, i) => (
                      <span key={i} className="text-sm">🐘</span>
                    ))}
                    {comp.id === "water" && (
                      <div className="w-full">
                        <div className="flex items-end gap-1">
                          <div
                            className="bg-blue-500/30 border-t-2 border-blue-400 rounded-sm transition-all duration-500"
                            style={{ height: `${Math.min((result.count as number) / 459 * 60, 60)}px`, width: "100%" }}
                          />
                        </div>
                        <div className="text-blue-400 text-xs mt-1">
                          Балтийское море: 459 м ({Math.round((result.count as number) / 459 * 100)}%)
                        </div>
                      </div>
                    )}
                    {comp.id === "boeing" && (
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(Math.round(result.count as number), 5) }).map((_, i) => (
                          <span key={i} className="text-sm">✈️</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Detail (expanded) */}
                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-white/10 text-slate-300 text-xs leading-relaxed">
                      {result.detail}
                    </div>
                  )}

                  <div className="text-blue-400 text-xs mt-2">
                    {isActive ? "▲ Свернуть" : "▼ Подробнее"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
