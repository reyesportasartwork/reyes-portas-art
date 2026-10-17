import React, { useEffect, useState } from 'react';
import { ExhibitionRecord, ExhibitionImage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExhibitionDetailModalProps {
  exhibition: ExhibitionRecord | null;
  onClose: () => void;
}

export const ExhibitionDetailModal: React.FC<ExhibitionDetailModalProps> = ({
  exhibition,
  onClose,
}) => {
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<ExhibitionImage | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    if (exhibition) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [exhibition, selectedImage, onClose]);

  if (!exhibition) return null;

  const displayDate =
    typeof exhibition.date === 'object' && exhibition.date !== null
      ? exhibition.date[lang] || exhibition.date.en
      : exhibition.date;

  const description =
    exhibition.description && typeof exhibition.description === 'object'
      ? exhibition.description[lang] || exhibition.description.en
      : '';

  const curatorNote =
    exhibition.curatorNote && typeof exhibition.curatorNote === 'object'
      ? exhibition.curatorNote[lang] || exhibition.curatorNote.en
      : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibition-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#FBF9F5] border border-[#C5A059]/40 shadow-2xl p-6 sm:p-10 md:p-12 text-[#1C1C1A] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === 'es' ? 'Cerrar ventana' : 'Close modal'}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#5C5A54] hover:text-[#1C1C1A] text-xs font-mono uppercase tracking-[0.2em] p-2 transition-colors cursor-pointer"
        >
          {lang === 'es' ? '[ CERRAR ✕ ]' : '[ CLOSE ✕ ]'}
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#C5A059]/30 pb-6 mb-8 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase font-mono text-[#C5A059]">
            <span>{exhibition.year}</span>
            {displayDate && (
              <>
                <span>·</span>
                <span>{displayDate}</span>
              </>
            )}
            <span>·</span>
            <span className="text-[#8F8C84]">{exhibition.type}</span>
          </div>

          <h2
            id="exhibition-modal-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1C1A] font-light tracking-wide leading-tight"
          >
            {exhibition.title}
          </h2>

          <p className="text-xs sm:text-sm tracking-wider text-[#5C5A54] font-light">
            {exhibition.institution} · {exhibition.location}
          </p>
        </div>

        {/* Modal Body */}
        <div className="space-y-8">
          {/* Detailed Description */}
          {description && (
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#8F8C84] font-mono block">
                {lang === 'es' ? 'MEMORIA DE LA EXPOSICIÓN' : 'EXHIBITION OVERVIEW'}
              </span>
              <p className="font-serif text-base sm:text-lg text-[#2C2B27] font-light leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {/* Curator Note */}
          {curatorNote && (
            <div className="bg-[#FAF8F3] border border-[#C5A059]/35 p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span className="text-[10px] tracking-[0.26em] uppercase text-[#C5A059] font-mono font-medium">
                  {lang === 'es' ? 'NOTA CURATORIAL' : 'CURATORIAL NOTE'}
                </span>
              </div>
              <blockquote className="font-serif italic text-sm sm:text-base text-[#1C1C1A] font-light leading-relaxed border-l-2 border-[#C5A059]/60 pl-4">
                “{curatorNote}”
              </blockquote>
            </div>
          )}

          {/* Gallery of Images from Show */}
          {exhibition.images && exhibition.images.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-[#1C1C1A]/10 pb-2">
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#8F8C84] font-mono">
                  {lang === 'es' ? 'OBRAS Y DOCUMENTACIÓN EN SALA' : 'WORKS & INSTALLATION DOCUMENTATION'}
                </span>
                <span className="text-[10px] text-[#8F8C84] font-mono">
                  {exhibition.images.length} {lang === 'es' ? 'registros' : 'records'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {exhibition.images.map((img, idx) => {
                  const caption =
                    img.caption && typeof img.caption === 'object'
                      ? img.caption[lang] || img.caption.en
                      : (img.caption as string) || '';

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className="group cursor-pointer bg-[#FAF8F3] border border-[#C5A059]/30 p-2 space-y-2 hover:border-[#B38F46] transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#F2EFE9] flex items-center justify-center">
                        <img
                          src={img.url}
                          alt={img.title || `Exhibition document ${idx + 1}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-0.5 px-1 pb-1">
                        {img.title && (
                          <p className="font-serif italic text-xs text-[#1C1C1A] font-normal truncate">
                            {img.title}
                          </p>
                        )}
                        {caption && (
                          <p className="text-[10px] text-[#5C5A54] font-light leading-snug line-clamp-2">
                            {caption}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* External Source Link */}
          {exhibition.sourceLink && (
            <div className="pt-3 border-t border-[#1C1C1A]/10">
              <a
                href={exhibition.sourceLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-mono text-[#B38F46] hover:text-[#1C1C1A] underline underline-offset-4 transition-colors font-medium"
              >
                <span>{exhibition.sourceLink.label[lang] || exhibition.sourceLink.label.en}</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-[#1C1C1A]/10 flex justify-between items-center text-[11px] text-[#8F8C84]">
          <span className="font-mono">
            {lang === 'es' ? 'Archivo Oficial Reyes Portas' : 'Reyes Portas Studio Archive'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[#1C1C1A] uppercase tracking-wider underline cursor-pointer"
          >
            {lang === 'es' ? 'Volver al listado' : 'Back to list'}
          </button>
        </div>
      </div>

      {/* Nested Zoom / Single Image Lightbox */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#FAF8F3] p-4 border border-[#C5A059] shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-xs font-mono uppercase text-[#1C1C1A] hover:text-[#C5A059]"
            >
              [ ✕ ]
            </button>
            <div className="max-h-[75vh] flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title || 'Exhibition piece'}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            {selectedImage.title && (
              <div className="text-center space-y-1">
                <p className="font-serif italic text-sm text-[#1C1C1A]">
                  {selectedImage.title}
                </p>
                {selectedImage.caption && (
                  <p className="text-[11px] text-[#5C5A54]">
                    {typeof selectedImage.caption === 'object'
                      ? selectedImage.caption[lang] || selectedImage.caption.en
                      : selectedImage.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
