import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ConcreteTable } from "./components/ConcreteTable";
import { StrengthTest } from "./components/StrengthTest";
import { ComparisonModule } from "./components/ComparisonModule";
import { WhatIfModule } from "./components/WhatIfModule";
import { MixConstructor } from "./components/MixConstructor";
import { Comparator } from "./components/Comparator";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

const sections = ["hero", "table", "test", "compare", "whatif", "constructor", "comparator", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 100;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <HeroSection />
        <ConcreteTable />
        <StrengthTest />
        <ComparisonModule />
        <WhatIfModule />
        <MixConstructor />
        <Comparator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
