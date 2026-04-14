import React, { useState } from "react";
import { concreteClasses, constructorRecommendations, ConstructorParams } from "../data/concreteData";

const constructionTypes = [
  { id: "foundation", label: "Фундамент", emoji: "🏗️", description: "Ленточный, плитный, свайный" },
  { id: "column", label: "Колонна", emoji: "🏛️", description: "Несущая конструкция" },
  { id: "bridge", label: "Мост", emoji: "🌉", description: "Мосты и путепроводы" },
  { id: "floor", label: "Перекрытие", emoji: "🏢", description: "Плиты и балки" },
  { id: "balcony", label: "Балкон", emoji: "🏠", description: "Открытые элементы" },
  { id: "wall", label: "Стена", emoji: "🧱", description: "Несущие и ненесущие" },
];

const loads = [
  { id: "low", label: "Лёгкая", emoji: "🪶", description: "До 50 кН/м²" },
  { id: "medium", label: "Умеренная", emoji: "⚖️", description: "50–200 кН/м²" },
  { id: "high", label: "Высокая", emoji: "🏋️", description: "200–500 кН/м²" },
  { id: "extreme", label: "Экстремальная", emoji: "💪", description: "> 500 кН/м²" },
];

const conditions = [
  { id: "dry", label: "Сухие", emoji: "☀️", description: "Внутри помещений, нет влаги" },
  { id: "wet", label: "Влажные", emoji: "💧", description: "Грунтовые воды, дождь" },
  { id: "frost", label: "Морозные", emoji: "❄️", description: "Циклы замораживания" },
  { id: "aggressive", label: "Агрессивные", emoji: "⚗️", description: "Химические воздействия" },
];

export const MixConstructor: React.FC = () => {
  const [step, setStep] = useState(1);
  const [params, setParams] = useState<Partial<ConstructorParams>>({});
  const [result, setResult] = useState<{ class: string; reason: string } | null>(null);

  const findRecommendation = (p: ConstructorParams) => {
    const key = `${p.type}-${p.load}-${p.conditions}`;
    return constructorRecommendations[key] || {
      class: p.load === "extreme" || p.conditions === "aggressive" ? "B40" : "B25",
      reason: `Для данной комбинации параметров рекомендуется ${p.load === "extreme" || p.conditions === "aggressive" ? "B40" : "B25"} как универсальное решение`,
    };
  };

  const handleType = (type: string) => {
    setParams({ ...params, type: type as ConstructorParams["type"] });
    setStep(2);
  };

  const handleLoad = (load: string) => {
    setParams({ ...params, load: load as ConstructorParams["load"] });
    setStep(3);
  };

  const handleConditions = (cond: string) => {
    const newParams = { ...params, conditions: cond as ConstructorParams["conditions"] } as ConstructorParams;
    setParams(newParams);
    const rec = findRecommendation(newParams);
    setResult(rec);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setParams({});
    setResult(null);
  };

  const resultClass = result ? concreteClasses.find(c => c.id === result.class) : null;

  return (
    <section id="constructor" className="bg-slate-900 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-purple-400 text-sm font-medium mb-4">
            🔧 Модуль «Подбор смеси»
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Пошаговый конструктор
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ответьте на 3 вопроса — система подберёт оптимальный класс бетона для вашего проекта
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step >= s
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 4 && (
                <div
                  className={`h-0.5 w-16 transition-all duration-500 ${
                    step > s ? "bg-purple-600" : "bg-slate-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-slate-800/60 rounded-3xl border border-white/10 overflow-hidden">
          {/* Step 1: Type */}
          {step >= 1 && (
            <div className={`transition-all duration-500 ${step === 1 ? "opacity-100" : step > 1 ? "opacity-60" : "opacity-0"}`}>
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-xl">
                    Шаг 1: Тип конструкции
                  </h3>
                  {step > 1 && params.type && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">
                        {constructionTypes.find(t => t.id === params.type)?.emoji}{" "}
                        {constructionTypes.find(t => t.id === params.type)?.label}
                      </span>
                      <button onClick={() => { setStep(1); setResult(null); }} className="text-slate-400 hover:text-white text-xs underline">
                        Изменить
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {step === 1 && (
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {constructionTypes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleType(t.id)}
                        className="group p-5 rounded-2xl border border-white/10 bg-slate-700/40 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 text-left"
                      >
                        <div className="text-3xl mb-2">{t.emoji}</div>
                        <div className="text-white font-semibold">{t.label}</div>
                        <div className="text-slate-400 text-xs mt-1">{t.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Load */}
          {step >= 2 && (
            <div className={`border-t border-white/10 transition-all duration-500 ${step === 2 ? "opacity-100" : step > 2 ? "opacity-60" : "opacity-0"}`}>
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-xl">
                    Шаг 2: Нагрузка
                  </h3>
                  {step > 2 && params.load && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">
                        {loads.find(l => l.id === params.load)?.emoji}{" "}
                        {loads.find(l => l.id === params.load)?.label}
                      </span>
                      <button onClick={() => { setStep(2); setResult(null); }} className="text-slate-400 hover:text-white text-xs underline">
                        Изменить
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {step === 2 && (
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {loads.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => handleLoad(l.id)}
                        className="p-5 rounded-2xl border border-white/10 bg-slate-700/40 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 text-center"
                      >
                        <div className="text-3xl mb-2">{l.emoji}</div>
                        <div className="text-white font-semibold">{l.label}</div>
                        <div className="text-slate-400 text-xs mt-1">{l.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Conditions */}
          {step >= 3 && (
            <div className={`border-t border-white/10 transition-all duration-500 ${step === 3 ? "opacity-100" : step > 3 ? "opacity-60" : "opacity-0"}`}>
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-xl">
                    Шаг 3: Условия эксплуатации
                  </h3>
                  {step > 3 && params.conditions && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">
                        {conditions.find(c => c.id === params.conditions)?.emoji}{" "}
                        {conditions.find(c => c.id === params.conditions)?.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {step === 3 && (
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {conditions.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleConditions(c.id)}
                        className="p-5 rounded-2xl border border-white/10 bg-slate-700/40 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 text-center"
                      >
                        <div className="text-3xl mb-2">{c.emoji}</div>
                        <div className="text-white font-semibold">{c.label}</div>
                        <div className="text-slate-400 text-xs mt-1">{c.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && result && resultClass && (
            <div className="border-t border-white/10">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-slate-400 text-sm mb-2">Рекомендуемый класс бетона:</div>
                  <div
                    className="text-8xl font-black mb-2"
                    style={{ color: resultClass.colorDark }}
                  >
                    {resultClass.label}
                  </div>
                  <div className="text-white text-2xl font-bold">{resultClass.strength} МПа</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-5">
                    <div className="text-purple-400 font-bold mb-2">📋 Обоснование:</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{result.reason}</p>
                  </div>
                  <div className="bg-slate-700/40 rounded-2xl p-5 space-y-3">
                    <div className="text-white font-bold mb-2">📊 Характеристики:</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Прочность:</span>
                      <span className="text-white font-medium">{resultClass.strength} МПа</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Водостойкость:</span>
                      <span className="text-white font-medium">{resultClass.waterResistance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Морозостойкость:</span>
                      <span className="text-white font-medium">{resultClass.frostResistance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Состав:</span>
                      <span className="text-white font-medium text-right text-xs">{resultClass.composition}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={reset}
                    className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-purple-400 hover:text-purple-400 font-bold transition-all duration-200"
                  >
                    ← Начать заново
                  </button>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    Заказать {resultClass.label} →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
