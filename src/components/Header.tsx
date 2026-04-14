import React, { useState, useEffect } from "react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "hero", label: "Главная" },
  { id: "table", label: "Классы бетона" },
  { id: "test", label: "Испытание" },
  { id: "compare", label: "Сравнение" },
  { id: "whatif", label: "Что если?" },
  { id: "constructor", label: "Подбор смеси" },
  { id: "comparator", label: "Компаратор" },
  { id: "contact", label: "Контакты" },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-blue-900/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav("hero")} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-blue-700 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-white" fill="currentColor">
                <rect x="5" y="5" width="13" height="13" rx="2" opacity="0.9" />
                <rect x="22" y="5" width="13" height="13" rx="2" opacity="0.7" />
                <rect x="5" y="22" width="13" height="13" rx="2" opacity="0.7" />
                <rect x="22" y="22" width="13" height="13" rx="2" opacity="0.5" />
              </svg>
            </div>
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-xl leading-none tracking-wide">БЕАТОН</div>
            <div className="text-blue-400 text-xs leading-none tracking-widest uppercase">Группа компаний</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+78001234567"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            8 800 123-45-67
          </a>
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+78001234567"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold"
            >
              📞 8 800 123-45-67
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
