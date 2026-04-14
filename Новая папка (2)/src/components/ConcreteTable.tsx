import React, { useState } from "react";
import { concreteClasses, ConcreteClass } from "../data/concreteData";

export const ConcreteTable: React.FC = () => {
  const [selected, setSelected] = useState<ConcreteClass | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const handleSelect = (c: ConcreteClass) => {
    if (selected?.id === c.id) {
      setPanelVisible(false);
      setTimeout(() => setSelected(null), 300);
    } else {
      setSelected(c);
      setPanelVisible(true);
    }
  };

  const maxStrength = Math.max(...concreteClasses.map((c) => c.strength));

  return (
    <section id="table" className="bg-slate-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-blue-400 text-sm font-medium mb-4">
            📊 Интерактивная таблица
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Классы прочности бетона
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Нажмите на карточку класса, чтобы увидеть детальную информацию о характеристиках и применении
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cards grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {concreteClasses.map((c) => {
                const isSelected = selected?.id === c.id;
                const barWidth = (c.strength / maxStrength) * 100;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    className={`relative group p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                      isSelected
                        ? "border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/20 scale-105"
                        : "border-white/10 bg-slate-800/60 hover:border-blue-500/50 hover:bg-slate-700/60 hover:scale-102"
                    }`}
                  >
                    {/* Background bar */}
                    <div
                      className="absolute bottom-0 left-0 h-1 transition-all duration-500 rounded-b-2xl"
                      style={{
                        width: `${barWidth}%`,
                        background: `linear-gradient(to right, ${c.color}60, ${c.colorDark})`,
                      }}
                    />

                    {/* Class label */}
                    <div
                      className="text-2xl font-black mb-1"
                      style={{ color: isSelected ? c.color : c.colorDark }}
                    >
                      {c.label}
                    </div>

                    {/* Strength */}
                    <div className="text-white font-semibold text-sm">
                      {c.strength} МПа
                    </div>

                    {/* Application */}
                    <div className="text-slate-400 text-xs mt-1 leading-tight">
                      {c.application}
                    </div>

                    {/* Strength bar */}
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isSelected ? `${barWidth}%` : "0%",
                          background: c.colorDark,
                        }}
                      />
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scale visualization */}
            <div className="mt-8 bg-slate-800/60 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>📈</span> Шкала прочности (МПа)
              </h3>
              <div className="space-y-2">
                {concreteClasses.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="w-10 text-right text-xs font-bold" style={{ color: c.colorDark }}>
                      {c.label}
                    </div>
                    <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-1000"
                        style={{
                          width: `${(c.strength / maxStrength) * 100}%`,
                          background: `linear-gradient(to right, ${c.color}80, ${c.colorDark})`,
                        }}
                      >
                        <span className="text-white text-xs font-semibold">{c.strength}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-1">
            <div
              className={`sticky top-24 bg-slate-800/80 backdrop-blur rounded-2xl border transition-all duration-500 overflow-hidden ${
                panelVisible && selected
                  ? "border-blue-500/50 opacity-100 translate-y-0"
                  : "border-white/10 opacity-60 translate-y-2"
              }`}
            >
              {selected ? (
                <div className="p-6">
                  {/* Header */}
                  <div
                    className="rounded-xl p-4 mb-6 text-center"
                    style={{ background: `linear-gradient(135deg, ${selected.color}20, ${selected.colorDark}30)` }}
                  >
                    <div className="text-5xl font-black mb-1" style={{ color: selected.color }}>
                      {selected.label}
                    </div>
                    <div className="text-white text-2xl font-bold">{selected.strength} МПа</div>
                    <div className="text-slate-300 text-sm mt-1">{selected.application}</div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm mb-5 leading-relaxed">{selected.description}</p>

                  {/* Properties */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                      <div className="text-blue-400 font-bold text-sm">{selected.waterResistance}</div>
                      <div className="text-slate-400 text-xs mt-1">Водостойкость</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                      <div className="text-cyan-400 font-bold text-sm">{selected.frostResistance}</div>
                      <div className="text-slate-400 text-xs mt-1">Морозостойкость</div>
                    </div>
                  </div>

                  {/* Use cases */}
                  <div className="mb-5">
                    <div className="text-white font-semibold text-sm mb-2">🏗️ Применение:</div>
                    <div className="space-y-1">
                      {selected.useCases.map((uc, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          {uc}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Composition */}
                  <div className="bg-slate-700/30 rounded-xl p-3">
                    <div className="text-white font-semibold text-xs mb-1">🧪 Состав:</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{selected.composition}</div>
                  </div>

                  {/* Strength bar animated */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Прочность</span>
                      <span>{Math.round((selected.strength / maxStrength) * 100)}% от максимума</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(selected.strength / maxStrength) * 100}%`,
                          background: `linear-gradient(to right, ${selected.color}, ${selected.colorDark})`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      document.getElementById("test")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-5 w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-200 hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${selected.color}80, ${selected.colorDark})` }}
                  >
                    Протестировать прочность →
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">🧱</div>
                  <div className="text-slate-400 text-sm">
                    Выберите класс бетона слева, чтобы увидеть подробную информацию
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
