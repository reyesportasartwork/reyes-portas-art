import React, { useState } from 'react';
import { ActiveView } from '../components/Header';
import { aboutData } from '../data/about';
import { useLanguage } from '../context/LanguageContext';
import { ExhibitionRecord } from '../types';

interface ExhibitionsViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const ExhibitionsView: React.FC<ExhibitionsViewProps> = ({ setActiveView }) => {
  const { lang } = useLanguage();
  const exhibitions = aboutData.exhibitions;
  const data = aboutData[lang] || aboutData.en;

  // Track which exhibition entry is expanded inline
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#FBF9F5] text-[#1C1C1A]">
      <section className="max-w-[1320px] mx-auto px-6 md:px-12 pt-8 pb-32">
        {/* Main Editorial Header */}
        <header className="border-b border-[#1C1C1A]/10 pb-8 mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light text-[#1C1C1A] uppercase">
              {lang === 'es' ? 'EXPOSICIONES Y SELECCIONES' : 'EXHIBITIONS & SELECTIONS'}
            </h1>
            <p className="text-xs tracking-[0.24em] text-[#8F8C84] uppercase mt-1.5 font-mono">
              {lang === 'es'
                ? 'SELECCIONES CURATORIALES · REGISTRO INSTITUCIONAL'
                : 'CURATORIAL SELECTIONS · INSTITUTIONAL RECORD'}
            </p>
          </div>
          <span className="text-xs tracking-[0.2em] text-[#8F8C84] uppercase font-mono">
            {lang === 'es'
              ? 'SINGULART · ESTUDIO · MUSEOS'
              : 'SINGULART · STUDIO · MUSEUMS'}
          </span>
        </header>

        {/* ========================================================
            1. SINGULART — CURATORIAL SELECTIONS (2025–2026)
            Restored completely: Datarte, L'Original, Attaly, Snap Collective
            ======================================================== */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.26em] text-[#C5A059] uppercase block font-medium">
              {lang === 'es' ? 'SELECCIONES EN PLATAFORMA' : 'PLATFORM SELECTIONS'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A] font-light tracking-wide uppercase">
              SINGULART — CURATORIAL SELECTIONS (2025–2026)
            </h2>
            <div className="pt-2">
              <p className="font-serif italic text-base sm:text-lg text-[#3C3B37] font-light leading-relaxed border-l-2 border-[#C5A059] pl-4 sm:pl-6 py-1">
                {lang === 'es'
                  ? '“Mi obra ha sido seleccionada para colecciones temáticas en Singulart, reuniendo piezas que exploran la humanidad, la materia, la atmósfera y lo invisible.”'
                  : '“My work has been selected for thematic collections on Singulart, bringing together works that explore humanity, materiality, atmosphere and the unseen.”'}
              </p>
            </div>
          </div>

          {/* Curatorial Spaces / Organizations */}
          <div className="space-y-12">
            {data.curatorialSelections?.spaces?.map((space) => {
              const country =
                typeof space.country === 'object' && space.country !== null
                  ? (space.country as Record<string, string>)[lang] || (space.country as Record<string, string>).en
                  : space.country;

              return (
                <div key={space.id} className="border-t border-[#1C1C1A]/10 pt-8 space-y-6">
                  {/* Space Header with Name and Country */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-[#1C1C1A]/8 pb-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1A] font-light tracking-wide">
                      {space.name}
                    </h3>
                    {country && (
                      <span className="text-xs tracking-[0.18em] uppercase text-[#B38F46] font-mono">
                        {country}
                      </span>
                    )}
                  </div>

                  {/* Curatorial Items in this Selection (text-only) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
                    {space.items.map((item, itemIdx) => {
                      const displayDate =
                        typeof item.date === 'object' && item.date !== null
                          ? item.date[lang] || item.date.en
                          : item.date;

                      return (
                        <div key={itemIdx} className="space-y-1 border-l-2 border-[#C5A059]/40 pl-3.5 py-1">
                          <p className="font-serif text-base sm:text-lg text-[#1C1C1A] font-light leading-snug">
                            <span className="italic">{item.artworkTitle}</span>
                          </p>
                          <p className="text-xs text-[#5C5A54] font-light">
                            {lang === 'es' ? 'Colección: ' : 'Collection: '}
                            <span className="text-[#1C1C1A] font-normal">“{item.collection}”</span>
                          </p>
                          {displayDate && (
                            <p className="text-[11px] font-mono text-[#8F8C84] tracking-wider uppercase pt-0.5">
                              {displayDate}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Platform Clarification */}
          {data.curatorialSelections?.platformClarification && (
            <div className="pt-4">
              <p className="text-[11px] sm:text-xs text-[#8F8C84] font-light leading-relaxed border-t border-[#1C1C1A]/10 pt-4">
                {data.curatorialSelections.platformClarification}
              </p>
            </div>
          )}
        </div>

        {/* ========================================================
            2. INSTITUTIONAL RECORD & PROJECTS
               CHRONOLOGICAL EXHIBITIONS & PROJECTS
            Simple, text-led, easy to scan timeline.
            Discreet "View details →" link expands documentation inline.
            ======================================================== */}
        <div className="max-w-4xl mx-auto mt-24 pt-16 border-t border-[#1C1C1A]/10 space-y-8">
          <div>
            <span className="text-xs font-mono tracking-[0.26em] text-[#C5A059] uppercase block font-medium">
              INSTITUTIONAL RECORD & PROJECTS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A] font-light tracking-wide uppercase mt-1">
              CHRONOLOGICAL EXHIBITIONS & PROJECTS
            </h2>
          </div>

          <div className="divide-y divide-[#1C1C1A]/10 border-y border-[#1C1C1A]/10">
            {exhibitions.map((item, idx) => {
              const displayDate =
                typeof item.date === 'object' && item.date !== null
                  ? item.date[lang] || item.date.en
                  : item.date;

              const isExpanded = expandedId === item.id;

              const description =
                item.description && typeof item.description === 'object'
                  ? item.description[lang] || item.description.en
                  : '';

              return (
                <div key={item.id || idx} className="py-7 transition-colors">
                  {/* Main Timeline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                    {/* Year & Date */}
                    <div className="sm:col-span-3 space-y-1">
                      <div className="font-serif text-2xl text-[#1C1C1A] font-normal tracking-wide">
                        {item.year}
                      </div>
                      {displayDate && (
                        <div className="text-xs tracking-[0.14em] uppercase text-[#B38F46] font-mono">
                          {displayDate}
                        </div>
                      )}
                    </div>

                    {/* Title & Institution */}
                    <div className="sm:col-span-6 space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1A] font-light leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm tracking-wide text-[#5C5A54] font-light">
                        {item.institution} · {item.location}
                      </p>
                    </div>

                    {/* Type & Discreet View details link */}
                    <div className="sm:col-span-3 sm:text-right space-y-1.5 pt-1 sm:pt-0">
                      <span className="text-xs tracking-[0.18em] text-[#8F8C84] uppercase font-light block">
                        {item.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="text-xs tracking-[0.14em] uppercase text-[#B38F46] hover:text-[#1C1C1A] font-mono transition-colors cursor-pointer inline-flex items-center gap-1"
                        aria-expanded={isExpanded}
                      >
                        <span>
                          {isExpanded
                            ? lang === 'es'
                              ? 'Cerrar detalles ↑'
                              : 'Close details ↑'
                            : lang === 'es'
                            ? 'Ver detalles →'
                            : 'View details →'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-[#1C1C1A]/10 bg-[#FAF8F3] p-6 space-y-6 animate-fade-in">
                      {/* Description / Summary */}
                      {description && (
                        <p className="text-sm sm:text-base text-[#3C3B37] font-light leading-relaxed">
                          {description}
                        </p>
                      )}

                      {/* External Documentation / Source Link */}
                      {item.sourceLink && (
                        <div className="pt-2">
                          <a
                            href={item.sourceLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-mono text-[#B38F46] hover:text-[#1C1C1A] underline underline-offset-4 transition-colors font-medium"
                          >
                            <span>
                              {item.sourceLink.label[lang] || item.sourceLink.label.en}
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


        {/* Studio footer note */}
        <div className="max-w-4xl mx-auto mt-20 pt-8 border-t border-[#1C1C1A]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs tracking-wider text-[#8F8C84] gap-4">
          <p className="font-light">
            {lang === 'es'
              ? 'Para consultas de archivo o documentación de proyectos anteriores, contactar con el estudio.'
              : 'For archive inquiries or documentation of past projects, contact the studio.'}
          </p>
          <button
            onClick={() => {
              setActiveView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#1C1C1A] hover:underline cursor-pointer uppercase tracking-[0.16em]"
          >
            {lang === 'es' ? 'CONTACTAR ESTUDIO →' : 'CONTACT STUDIO →'}
          </button>
        </div>
      </section>
    </div>
  );
};
