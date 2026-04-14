import React, { useState } from "react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    volume: "",
    concreteClass: "B25",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", phone: "", message: "", volume: "", concreteClass: "B25" });
  };

  const contacts = [
    { icon: "📞", label: "Телефон (бесплатно)", value: "8 800 123-45-67", href: "tel:+78001234567" },
    { icon: "📱", label: "WhatsApp / Telegram", value: "+7 (812) 123-45-67", href: "https://wa.me/78121234567" },
    { icon: "✉️", label: "Email", value: "info@beaton.ru", href: "mailto:info@beaton.ru" },
    { icon: "📍", label: "Адрес офиса", value: "Санкт-Петербург, пр. Обуховской Обороны, 112", href: "#" },
    { icon: "🕐", label: "Режим работы", value: "Пн–Пт: 8:00–18:00, Сб: 9:00–15:00", href: "#" },
  ];

  const advantages = [
    { emoji: "🚛", title: "Доставка 24/7", desc: "Круглосуточная доставка по СПб и области" },
    { emoji: "📋", title: "Документация", desc: "Полный пакет документов на каждую партию" },
    { emoji: "🔬", title: "Лабораторный контроль", desc: "Собственная лаборатория качества" },
    { emoji: "💰", title: "Лучшая цена", desc: "Прямой производитель без посредников" },
    { emoji: "⚡", title: "Быстрый замес", desc: "Время от заказа до отгрузки — 30 минут" },
    { emoji: "🤝", title: "Гарантия", desc: "Гарантия соответствия классу прочности" },
  ];

  return (
    <section id="contact" className="bg-slate-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-blue-400 text-sm font-medium mb-4">
            📩 Связь с нами
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Закажите бетон прямо сейчас
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут
          </p>
        </div>

        {/* Advantages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-slate-800/60 rounded-2xl p-4 text-center border border-white/10 hover:border-blue-500/40 transition-all duration-200">
              <div className="text-3xl mb-2">{adv.emoji}</div>
              <div className="text-white font-bold text-sm mb-1">{adv.title}</div>
              <div className="text-slate-400 text-xs leading-tight">{adv.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-2xl p-8 border border-white/10">
              <h3 className="text-white font-bold text-xl mb-6">Контактная информация</h3>
              <div className="space-y-4">
                {contacts.map((contact, i) => (
                  <a
                    key={i}
                    href={contact.href}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                  >
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <div className="text-slate-400 text-xs">{contact.label}</div>
                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">🗺️ Наши производства</h3>
              <div className="bg-slate-900 rounded-xl p-4 space-y-3">
                {[
                  { name: "Завод №1 (Обухово)", address: "пр. Обуховской Обороны, 112", lat: "59.86", lng: "30.45" },
                  { name: "Завод №2 (Парнас)", address: "пр. Энгельса, 154", lat: "60.05", lng: "30.34" },
                  { name: "Завод №3 (Мурино)", address: "ул. Шувалова, 18", lat: "60.05", lng: "30.44" },
                ].map((plant, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{plant.name}</div>
                      <div className="text-slate-400 text-xs">{plant.address}</div>
                    </div>
                    <div className="ml-auto text-blue-400 text-xs">📍</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-slate-800/60 rounded-2xl p-8 border border-white/10">
            <h3 className="text-white font-bold text-xl mb-6">Оставить заявку</h3>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <div className="text-green-400 font-bold text-xl mb-2">Заявка отправлена!</div>
                <p className="text-slate-400">Наш менеджер свяжется с вами в течение 15 минут</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Класс бетона</label>
                    <select
                      value={formData.concreteClass}
                      onChange={(e) => setFormData({ ...formData, concreteClass: e.target.value })}
                      className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {["B10","B15","B20","B25","B30","B35","B40","B50","B60","B90"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Объём (м³)</label>
                    <input
                      type="number"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      placeholder="Например: 50"
                      className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Комментарий</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Описание проекта, адрес доставки..."
                    className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  📤 Отправить заявку
                </button>

                <p className="text-slate-500 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
