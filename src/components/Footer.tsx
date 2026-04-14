import React from "react";

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-7 h-7 text-white" fill="currentColor">
                  <rect x="5" y="5" width="13" height="13" rx="2" opacity="0.9" />
                  <rect x="22" y="5" width="13" height="13" rx="2" opacity="0.7" />
                  <rect x="5" y="22" width="13" height="13" rx="2" opacity="0.7" />
                  <rect x="22" y="22" width="13" height="13" rx="2" opacity="0.5" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-none">БЕАТОН</div>
                <div className="text-blue-400 text-xs leading-none">Группа компаний</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Производство и поставка бетонных смесей всех классов прочности с 1999 года. 
              Собственные заводы в Санкт-Петербурге.
            </p>
            <div className="flex gap-3">
              {["VK", "TG", "WA"].map((social) => (
                <div
                  key={social}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-200 text-xs font-bold"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {[
                { id: "hero", label: "Главная" },
                { id: "table", label: "Классы бетона" },
                { id: "test", label: "Испытание прочности" },
                { id: "compare", label: "Сравнение" },
                { id: "whatif", label: "Что если?" },
                { id: "constructor", label: "Подбор смеси" },
                { id: "comparator", label: "Компаратор" },
                { id: "contact", label: "Контакты" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-4">Продукция</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {["Бетон B10–B20", "Бетон B25–B30", "Бетон B35–B50", "Бетон B60–B90", "Товарный бетон", "Бетонные смеси", "Раствор М150", "Пескобетон"].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-slate-400">
                <span>📞</span>
                <a href="tel:+78001234567" className="hover:text-blue-400 transition-colors">8 800 123-45-67 (бесплатно)</a>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <span>📱</span>
                <a href="tel:+78121234567" className="hover:text-blue-400 transition-colors">+7 (812) 123-45-67</a>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <span>✉️</span>
                <a href="mailto:info@beaton.ru" className="hover:text-blue-400 transition-colors">info@beaton.ru</a>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <span>📍</span>
                <span>СПб, пр. Обуховской Обороны, 112</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <span>🕐</span>
                <span>Пн–Пт: 8:00–18:00</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl">
              <div className="text-blue-400 font-bold text-sm mb-1">💬 Онлайн-консультант</div>
              <div className="text-slate-400 text-xs">Ответим на ваши вопросы в чате</div>
              <button className="mt-2 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors">
                Написать
              </button>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "🏆 ГОСТ 7473-2010",
              "✅ ISO 9001:2015",
              "🔬 Лицензия Росстандарт",
              "📜 СРО строительство",
              "🌿 Экологический сертификат",
            ].map((cert) => (
              <div key={cert} className="bg-slate-800/60 border border-white/10 rounded-full px-4 py-2 text-slate-400 text-xs hover:border-blue-500/40 transition-colors">
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div>© 2024 Беатон — Группа Компаний. Все права защищены.</div>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Политика конфиденциальности</span>
            <span className="hover:text-white cursor-pointer transition-colors">Пользовательское соглашение</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
