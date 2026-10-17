import React from 'react';
import { printsData } from '../data/prints';
import { ActiveView } from '../components/Header';
import { ArtworkFrame } from '../components/ArtworkFrame';
import { useLanguage } from '../context/LanguageContext';
import { PrintItem } from '../types';

interface PrintsViewProps {
  setActiveView: (view: ActiveView) => void;
  onSelectPrintToInquire: (print: PrintItem) => void;
  onOpenArtworkModal?: (artworkId: string) => void;
}

export const PrintsView: React.FC<PrintsViewProps> = ({
  setActiveView,
  onSelectPrintToInquire,
  onOpenArtworkModal,
}) => {
  const { lang } = useLanguage();

  return (
    <div className="w-full bg-[#FBF9F5] text-[#1C1C1A]">
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-32">
        <div className="border-b border-[#1C1C1A]/10 pb-6 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-baseline gap-2">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light text-[#1C1C1A] uppercase">
              {lang === 'es' ? 'GRÁFICA / PRINTS' : 'PRINTS'}
            </h1>
            <p className="text-[11px] tracking-[0.25em] text-[#8F8C84] uppercase mt-1">
              {lang === 'es' ? 'EDICIONES DE ARTE DE ARCHIVO' : 'ARCHIVAL FINE ART PRINTS'}
            </p>
          </div>
          <span className="text-xs tracking-[0.18em] text-[#8F8C84] uppercase font-light">
            {lang === 'es' ? 'EDICIONES Y DETALLES A CONSULTAR' : 'EDITIONS & DETAILS TO BE ANNOUNCED'}
          </span>
        </div>

        {/* Prints Grid — Refined, elegant, smaller photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {printsData.map((print) => {
            const printAsArtwork = {
              id: print.id,
              image: print.image,
              title: print.title,
              year: print.year,
              medium: print.medium,
              dimensions: print.dimensions,
              aspectRatio: print.aspectRatio,
              category: 'ABSTRACT / MATTER' as const,
            };

            return (
              <div
                key={print.id}
                className="flex flex-col justify-between bg-transparent space-y-4 max-w-sm sm:max-w-none mx-auto w-full"
              >
                {/* Print Photo (Compact Size) */}
                <div className="w-full">
                  <ArtworkFrame
                    artwork={printAsArtwork}
                    showDetails={false}
                    onClick={() => onOpenArtworkModal && onOpenArtworkModal(print.id)}
                  />
                </div>

                {/* Print Information & Inquiry Action */}
                <div className="flex flex-col justify-between flex-grow space-y-3 pt-2 border-t border-[#1C1C1A]/10">
                  <div className="space-y-1">
                    <h2 className="font-serif italic text-lg sm:text-xl text-[#1C1C1A] leading-snug">
                      {print.title || (lang === 'es' ? 'Sin título' : 'Untitled')}
                    </h2>
                    {print.caption && (
                      <p className="font-serif italic text-xs text-[#5C5A54]">
                        {typeof print.caption === 'object'
                          ? print.caption[lang] || print.caption.en
                          : print.caption}
                      </p>
                    )}
                    {print.edition && (
                      <p className="text-[11px] text-[#1C1C1A] tracking-wide">
                        {lang === 'es' ? 'Edición de arte de archivo' : print.edition}
                      </p>
                    )}
                    {print.year && (
                      <p className="text-[11px] font-mono text-[#8F8C84] tracking-wider">
                        {print.year}
                      </p>
                    )}
                    {print.dimensions && (
                      <p className="text-[11px] text-[#8F8C84]">
                        {print.dimensions}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectPrintToInquire(print)}
                      className="w-full py-2.5 px-4 bg-[#1C1C1A] text-[#FBF9F5] text-xs tracking-[0.2em] uppercase hover:bg-[#C5A059] hover:text-[#1C1C1A] transition-colors cursor-pointer font-light text-center"
                    >
                      {lang === 'es' ? 'CONSULTAR →' : 'INQUIRE →'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Bottom Info */}
        <div className="mt-32 pt-12 border-t border-[#1C1C1A]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs tracking-wider text-[#8F8C84] gap-4">
          <p className="font-light">
            {lang === 'es'
              ? 'Las especificaciones de impresión, tipos de papel y disponibilidad se confirman directamente con el estudio.'
              : 'Print specifications, paper stocks, and availability are verified directly with the studio.'}
          </p>
          <button
            onClick={() => {
              setActiveView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#1C1C1A] hover:underline cursor-pointer uppercase tracking-[0.16em]"
          >
            {lang === 'es' ? 'CONSULTAS DE ESTUDIO →' : 'STUDIO ENQUIRIES →'}
          </button>
        </div>
      </section>
    </div>
  );
};
