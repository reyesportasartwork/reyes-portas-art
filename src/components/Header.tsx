import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export type ActiveView = 'home' | 'portfolio' | 'prints' | 'about' | 'exhibitions' | 'contact';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const navItems: { id: ActiveView; labelEn: string; labelEs: string }[] = [
    { id: 'portfolio', labelEn: 'PORTFOLIO', labelEs: 'PORTAFOLIO' },
    { id: 'prints', labelEn: 'PRINTS', labelEs: 'PRINTS' },
    { id: 'about', labelEn: 'ABOUT', labelEs: 'SOBRE MÍ' },
    { id: 'exhibitions', labelEn: 'EXHIBITIONS', labelEs: 'EXPOSICIONES' },
    { id: 'contact', labelEn: 'CONTACT', labelEs: 'CONTACTO' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#1C1C1A]/8 py-5 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Sole Brand / Artist Mark to Left */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.22em] font-light text-[#1C1C1A] hover:text-[#5C5A54] transition-colors uppercase text-left cursor-pointer focus-visible:outline-none"
          aria-label="Reyes Portas - Home"
        >
          REYES PORTAS
        </button>

        {/* Desktop Navigation to Right */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav
            className="flex items-center gap-5 lg:gap-8 text-[11px] lg:text-[12px] tracking-[0.22em] font-light text-[#5C5A54]"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const label = lang === 'es' ? item.labelEs : item.labelEn;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 cursor-pointer relative transition-colors ${
                    isActive
                      ? 'text-[#1C1C1A] font-medium'
                      : 'hover:text-[#1C1C1A]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher: EN / ES */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] font-mono pl-3 lg:pl-5 border-l border-[#1C1C1A]/10 select-none">
            <button
              onClick={() => setLang('en')}
              className={`cursor-pointer transition-colors py-0.5 ${
                lang === 'en'
                  ? 'text-[#1C1C1A] font-medium border-b border-[#C5A059]'
                  : 'text-[#8F8C84] hover:text-[#1C1C1A]'
              }`}
              title="English"
            >
              EN
            </button>
            <span className="text-[#8F8C84]/40">/</span>
            <button
              onClick={() => setLang('es')}
              className={`cursor-pointer transition-colors py-0.5 ${
                lang === 'es'
                  ? 'text-[#1C1C1A] font-medium border-b border-[#C5A059]'
                  : 'text-[#8F8C84] hover:text-[#1C1C1A]'
              }`}
              title="Español"
            >
              ES
            </button>
          </div>

          {/* Social links on far right */}
          <div className="pl-3 border-l border-[#1C1C1A]/10 text-[11px] tracking-[0.2em] text-[#8F8C84] flex items-center gap-3">
            <a
              href="https://www.instagram.com/reyesportas__art"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1C1A] transition-colors"
            >
              INSTAGRAM ↗
            </a>
            <a
              href="https://www.linkedin.com/in/reyesartandeducation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1C1A] transition-colors"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>

        {/* Mobile Header Controls: Language + Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] tracking-[0.16em] font-mono select-none">
            <button
              onClick={() => setLang('en')}
              className={`cursor-pointer ${
                lang === 'en'
                  ? 'text-[#1C1C1A] font-medium border-b border-[#C5A059]'
                  : 'text-[#8F8C84]'
              }`}
            >
              EN
            </button>
            <span className="text-[#8F8C84]/40">/</span>
            <button
              onClick={() => setLang('es')}
              className={`cursor-pointer ${
                lang === 'es'
                  ? 'text-[#1C1C1A] font-medium border-b border-[#C5A059]'
                  : 'text-[#8F8C84]'
              }`}
            >
              ES
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[12px] tracking-[0.2em] text-[#1C1C1A] py-1 cursor-pointer uppercase font-light"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (lang === 'es' ? 'CERRAR' : 'CLOSE') : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1C1C1A]/8 bg-[#FBF9F5] px-6 py-6 mt-4 space-y-4 text-center">
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs tracking-[0.24em] py-1.5 transition-colors cursor-pointer font-light ${
                activeView === 'home'
                  ? 'text-[#1C1C1A] font-medium underline underline-offset-4 decoration-[#C5A059]'
                  : 'text-[#5C5A54]'
              }`}
            >
              {lang === 'es' ? 'INICIO' : 'HOME'}
            </button>
            {navItems.map((item) => {
              const label = lang === 'es' ? item.labelEs : item.labelEn;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs tracking-[0.24em] py-1.5 transition-colors cursor-pointer font-light ${
                    activeView === item.id
                      ? 'text-[#1C1C1A] font-medium underline underline-offset-4 decoration-[#C5A059]'
                      : 'text-[#5C5A54]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#1C1C1A]/8 flex items-center justify-center gap-4 text-[11px] tracking-[0.2em] text-[#8F8C84]">
              <a
                href="https://www.instagram.com/reyesportas__art"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1C1C1A] py-1"
              >
                INSTAGRAM ↗
              </a>
              <span className="text-[#8F8C84]/40">·</span>
              <a
                href="https://www.linkedin.com/in/reyesartandeducation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1C1C1A] py-1"
              >
                LINKEDIN ↗
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
