import React, { useEffect, useState } from "react";

export const HeroSection: React.FC = () => {
  const [count, setCount] = useState(0);
  const [projects, setProjects] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const animateNumber = (setter: (v: number) => void, target: number, duration: number) => {
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };

    const timeout = setTimeout(() => {
      animateNumber(setCount, 50000, 2000);
      animateNumber(setProjects, 1200, 2000);
      animateNumber(setYears, 25, 1500);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating concrete blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: "rgba(59,130,246,0.8)",
              borderRadius: "4px",
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-blue-400 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Группа компаний «Беатон» — с 1999 года
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-none">
              <span className="block">БЕТОН</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                ВЫСШЕГО
              </span>
              <span className="block">КЛАССА</span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              Производство и поставка бетона всех классов прочности — от B10 до B90. 
              Собственные заводы в Санкт-Петербурге и Ленинградской области. 
              Доставка миксерами 24/7.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("table")}
                className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center gap-2"
              >
                Классы бетона
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("constructor")}
                className="border border-white/20 hover:border-blue-400 text-white hover:text-blue-400 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1"
              >
                Подобрать смесь
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white">{count.toLocaleString()}</div>
                <div className="text-slate-500 text-sm mt-1">м³ в месяц</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl font-black text-white">{projects}+</div>
                <div className="text-slate-500 text-sm mt-1">проектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{years}</div>
                <div className="text-slate-500 text-sm mt-1">лет на рынке</div>
              </div>
            </div>
          </div>

          {/* Right content - 3D Cube visualization */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              {/* Main cube */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative w-48 h-48"
                  style={{ perspective: "600px", transformStyle: "preserve-3d" }}
                >
                  {/* Cube faces */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/50 rounded-lg"
                    style={{
                      transform: "rotateX(15deg) rotateY(-25deg)",
                      boxShadow: "20px 20px 60px rgba(59,130,246,0.3)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-4xl font-black">B25</div>
                        <div className="text-blue-200 text-sm">18.5 МПа</div>
                      </div>
                    </div>
                    {/* Texture overlay */}
                    <div
                      className="absolute inset-0 opacity-20 rounded-lg"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpolygon points='10,0 20,10 10,20 0,10'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Orbiting elements */}
              {["B10", "B30", "B50", "B90"].map((label, i) => {
                const angle = (i * 90 * Math.PI) / 180;
                const r = 130;
                const x = 140 + r * Math.cos(angle);
                const y = 140 + r * Math.sin(angle);
                return (
                  <div
                    key={label}
                    className="absolute w-14 h-14 bg-slate-800 border border-blue-500/40 rounded-lg flex items-center justify-center text-blue-400 font-bold text-sm"
                    style={{ left: x - 28, top: y - 28 }}
                  >
                    {label}
                  </div>
                );
              })}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                {["B10", "B30", "B50", "B90"].map((_, i) => {
                  const angle = (i * 90 * Math.PI) / 180;
                  const r = 130;
                  const x2 = 140 + r * Math.cos(angle);
                  const y2 = 140 + r * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="140" y1="140"
                      x2={x2} y2={y2}
                      stroke="rgba(59,130,246,0.2)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => scrollTo("table")}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors animate-bounce"
          >
            <span className="text-xs tracking-widest uppercase">Изучить</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--tw-rotate, 0deg)); }
        }
      `}</style>
    </section>
  );
};
