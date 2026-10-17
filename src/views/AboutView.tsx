import React from 'react';
import { aboutData } from '../data/about';
import { ActiveView } from '../components/Header';
import { useLanguage } from '../context/LanguageContext';

interface AboutViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveView }) => {
  const { lang } = useLanguage();
  const data = aboutData[lang] || aboutData.en;

  return (
    <div className="w-full bg-[#FBF9F5] text-[#1C1C1A]">
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-32 space-y-16 md:space-y-24">
        
        {/* Title */}
        <div className="border-b border-[#C5A059]/30 pb-6 flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light text-[#1C1C1A] uppercase">
            {lang === 'es' ? 'SOBRE MÍ' : 'ABOUT'}
          </h1>
          <span className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase font-light">
            {lang === 'es' ? 'REYES PORTAS · BIOGRAFÍA Y TRAYECTORIA' : 'REYES PORTAS · BIOGRAPHY & PRACTICE'}
          </span>
        </div>

        {/* 
          MANIFEST / MANIFIESTO SECTION
          Presented with archival museum typesetting, golden accents, and artist signature
        */}
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-mono font-medium">
              {data.manifestTitle}
            </span>
            <div className="w-12 h-[1px] bg-[#C5A059] mx-auto opacity-60" />
          </div>

          <div className="bg-[#FAF8F3] border border-[#C5A059]/30 p-8 sm:p-12 md:p-16 shadow-[0_4px_24px_rgba(197,160,89,0.08)] space-y-8">
            {data.manifest.map((paragraph, index) => (
              <p
                key={index}
                className={`font-serif leading-[1.9] text-[#2C2B27] ${
                  index === 0
                    ? 'text-lg sm:text-xl font-light italic text-[#1C1C1A] border-l-2 border-[#C5A059] pl-5 sm:pl-7'
                    : 'text-[15px] sm:text-[16px] font-light'
                }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Signature & Social Connection */}
            <div className="pt-8 border-t border-[#C5A059]/25 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 text-right">
              <div>
                <span className="font-serif text-xl sm:text-2xl text-[#1C1C1A] tracking-wide block">
                  {data.artistName}
                </span>
                <span className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase font-light block mt-0.5">
                  {data.location}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start sm:self-auto text-xs tracking-[0.18em] font-mono uppercase">
                <a
                  href="https://www.instagram.com/reyesportas__art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C6D2D] hover:text-[#1C1C1A] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{data.instagramHandle}</span>
                  <span>↗</span>
                </a>
                <span className="text-[#C5A059]/40">·</span>
                <a
                  href="https://www.linkedin.com/in/reyesartandeducation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C6D2D] hover:text-[#1C1C1A] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Statement & Biography Section */}
        <div className="max-w-4xl mx-auto space-y-12 pt-6">
          <div className="space-y-4 text-center">
            <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-medium">
              {lang === 'es' ? 'DECLARACIÓN ARTÍSTICA' : 'STATEMENT'}
            </span>
            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#1C1C1A] font-light leading-relaxed max-w-3xl mx-auto">
              “{data.statementQuote}”
            </blockquote>
            <p className="font-serif text-lg text-[#5C5A54] leading-relaxed pt-2 font-light max-w-2xl mx-auto">
              {data.statement}
            </p>
          </div>

          <div className="space-y-6 text-[15px] sm:text-[16px] text-[#5C5A54] font-light leading-[1.85] pt-10 border-t border-[#C5A059]/30">
            {data.biography.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Direct Navigation */}
          <div className="pt-4 flex flex-wrap justify-center gap-6 items-center">
            <button
              onClick={() => {
                setActiveView('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-2.5 px-7 bg-[#1C1C1A] text-[#FBF9F5] text-xs tracking-[0.2em] uppercase hover:bg-[#C5A059] transition-colors cursor-pointer font-light shadow-sm"
            >
              {lang === 'es' ? 'VER PORTAFOLIO →' : 'VIEW PORTFOLIO →'}
            </button>
            <button
              onClick={() => {
                setActiveView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs tracking-[0.2em] uppercase text-[#5C5A54] hover:text-[#1C1C1A] py-1 border-b border-[#C5A059]/40 hover:border-[#C5A059] cursor-pointer font-light"
            >
              {lang === 'es' ? 'CONTACTAR ESTUDIO' : 'CONTACT STUDIO'}
            </button>
          </div>
        </div>



        {/* Education & Related Practice */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#C5A059]/30 text-xs text-[#5C5A54]">
          {/* Education */}
          <div className="md:col-span-6 space-y-4">
            <h2 className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase font-medium">
              {data.educationTitle}
            </h2>
            <div className="space-y-4">
              {data.education.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="font-serif text-base text-[#1C1C1A]">{item.title}</p>
                  <p className="text-[#8F8C84]">{item.institution} {item.year && `· ${item.year}`}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          <div className="md:col-span-6 space-y-4">
            <h2 className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase font-medium">
              {data.creativeForestTitle || (lang === 'es' ? 'PROYECTOS RELACIONADOS' : 'RELATED PROJECTS')}
            </h2>
            <div className="space-y-2">
              <p className="font-serif text-base text-[#1C1C1A]">
                {data.creativeForest.title || 'The Creative Forest'}
              </p>
              <p className="text-[#5C5A54] leading-relaxed text-[13px]">
                {data.creativeForest.text}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={data.creativeForest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] text-[#8C6D2D] hover:text-[#1C1C1A] transition-colors border-b border-[#8C6D2D]/30 pb-0.5"
                >
                  <span>Link: {data.creativeForest.linkLabel || data.creativeForest.url}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};
