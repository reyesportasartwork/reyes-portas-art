import React from 'react';
import { ActiveView } from '../components/Header';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
  const { lang } = useLanguage();

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#FBF9F5] text-[#1C1C1A] flex flex-col justify-center">
      <main className="max-w-[1440px] w-full mx-auto px-6 md:px-12 py-8 md:py-14 flex flex-col items-center justify-center">
        
        {/* Large Cover Image */}
        <div className="w-full max-w-5xl mx-auto">
          <div
            onClick={() => {
              setActiveView('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer block relative overflow-hidden bg-[#161614] border border-[#C5A059]/30 shadow-[0_4px_24px_rgba(197,160,89,0.12)] transition-opacity duration-300 hover:opacity-95"
          >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.1/1] w-full overflow-hidden">
              <img
                src="/images/WhatsApp Image 2026-09-30 at 17.08.32.jpeg"
                alt="Reyes Portas"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="mt-8 md:mt-12 text-center">
          <button
            onClick={() => {
              setActiveView('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.26em] uppercase text-[#1C1C1A] hover:text-[#C5A059] transition-colors py-2 border-b border-[#C5A059]/40 hover:border-[#C5A059] cursor-pointer font-light"
          >
            <span>{lang === 'es' ? 'VER PORTAFOLIO' : 'VIEW PORTFOLIO'}</span>
            <span className="text-base leading-none">→</span>
          </button>
        </div>

      </main>
    </div>
  );
};
