import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Artwork } from '../types';
import { preloadImage } from '../utils/imagePreloader';
import { useGlobalGalleryKeyboard } from '../hooks/useGlobalGalleryKeyboard';
import { useLanguage } from '../context/LanguageContext';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onSelectArtwork?: (artwork: Artwork) => void;
  allArtworks?: Artwork[];
  onInquire: (artwork: Artwork) => void;
}

/**
 * Contemporary Artist Artwork Detail Page / Modal
 * Visual reference: Samantha Keely Smith
 * - Large, prominent painting image occupying almost all available space
 * - Zero decorative frames, zero card borders, zero beige backgrounds
 * - padding: 0, margin: 0, border: none, box-shadow: none, background: transparent
 * - Two-column desktop layout (large image + narrow info column)
 * - Stacked vertically on mobile
 * - Discreet, confirmed technical details only
 * - Small red dot and SOLD label for sold works
 */
export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  allArtworks = [],
  onInquire,
  onSelectArtwork,
}) => {
  const { lang } = useLanguage();

  const currentIndex = artwork
    ? allArtworks.findIndex((a) => a.id === artwork.id)
    : -1;

  // Touch swipe gesture refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Curatorial Notes Editing State
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [customNote, setCustomNote] = useState('');

  // Image source state with fallback handling
  const [imageSrc, setImageSrc] = useState(artwork?.image || '');

  useEffect(() => {
    if (artwork?.image) {
      setImageSrc(artwork.image);
    }
  }, [artwork?.image]);

  const handleImageError = () => {
    if (imageSrc.startsWith('/public/')) {
      setImageSrc(imageSrc.replace(/^\/public/, ''));
    } else if (imageSrc.startsWith('/images/')) {
      setImageSrc(imageSrc.replace(/^\/images/, ''));
    } else if (
      !imageSrc.startsWith('/images/') &&
      !imageSrc.startsWith('http') &&
      !imageSrc.startsWith('blob:')
    ) {
      setImageSrc(`/images${imageSrc}`);
    }
  };

  // Load custom curatorial notes from localStorage if edited
  useEffect(() => {
    if (!artwork) return;
    setIsEditingNotes(false);
    try {
      const storageKey = `curatorial_note_${artwork.id}_${lang}`;
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setCustomNote(saved);
      } else {
        const defaultNote = artwork.curatorialNotes
          ? artwork.curatorialNotes[lang] || artwork.curatorialNotes.en || artwork.notes || ''
          : artwork.notes || '';
        setCustomNote(defaultNote);
      }
    } catch {
      const defaultNote = artwork.curatorialNotes
        ? artwork.curatorialNotes[lang] || artwork.curatorialNotes.en || artwork.notes || ''
        : artwork.notes || '';
      setCustomNote(defaultNote);
    }
  }, [artwork, lang]);

  const handleSaveNote = () => {
    if (!artwork) return;
    try {
      const storageKey = `curatorial_note_${artwork.id}_${lang}`;
      localStorage.setItem(storageKey, customNote);
    } catch {
      // Fallback
    }
    setIsEditingNotes(false);
  };

  const handleResetNote = () => {
    if (!artwork) return;
    const defaultNote = artwork.curatorialNotes
      ? artwork.curatorialNotes[lang] || artwork.curatorialNotes.en || artwork.notes || ''
      : artwork.notes || '';
    setCustomNote(defaultNote);
    try {
      const storageKey = `curatorial_note_${artwork.id}_${lang}`;
      localStorage.removeItem(storageKey);
    } catch {
      // Fallback
    }
    setIsEditingNotes(false);
  };

  const goToNext = useCallback(() => {
    if (!artwork || allArtworks.length <= 1 || !onSelectArtwork) return;
    const nextIndex = (currentIndex + 1) % allArtworks.length;
    onSelectArtwork(allArtworks[nextIndex]);
  }, [artwork, allArtworks, currentIndex, onSelectArtwork]);

  const goToPrev = useCallback(() => {
    if (!artwork || allArtworks.length <= 1 || !onSelectArtwork) return;
    const prevIndex = (currentIndex - 1 + allArtworks.length) % allArtworks.length;
    onSelectArtwork(allArtworks[prevIndex]);
  }, [artwork, allArtworks, currentIndex, onSelectArtwork]);

  // Global window keyboard listener
  useGlobalGalleryKeyboard({
    isOpen: Boolean(artwork),
    onClose,
    onNext: goToNext,
    onPrev: goToPrev,
  });

  // Touch event handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (allArtworks.length <= 1) return;
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    const minSwipeDistance = 45;
    if (Math.abs(deltaX) >= minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Preload adjacent artworks in memory
  useEffect(() => {
    if (!artwork || allArtworks.length <= 1) return;
    if (currentIndex !== -1) {
      const nextArtwork = allArtworks[(currentIndex + 1) % allArtworks.length];
      const prevArtwork =
        allArtworks[(currentIndex - 1 + allArtworks.length) % allArtworks.length];
      if (nextArtwork?.image) preloadImage(nextArtwork.image);
      if (prevArtwork?.image) preloadImage(prevArtwork.image);
    }
  }, [currentIndex, allArtworks, artwork]);

  if (!artwork) return null;

  const getCategoryLabel = (cat: string) => {
    if (lang === 'es') {
      if (cat === 'FIGURATIVE') return 'FIGURATIVO';
      if (cat === 'VISIONARY') return 'VISIONARIO';
      if (cat === 'ABSTRACT / MATTER') return 'ABSTRACTO / MATERIA';
    }
    return cat;
  };

  const isSold =
    artwork.isAvailable === false ||
    (typeof artwork.status === 'string' && artwork.status.toLowerCase().includes('sold')) ||
    (typeof artwork.status === 'object' &&
      (artwork.status.en?.toLowerCase().includes('sold') ||
        artwork.status.es?.toLowerCase().includes('vendido')));

  // Resolve bilingual or string medium
  const displayMedium =
    typeof artwork.medium === 'object' && artwork.medium !== null
      ? (artwork.medium as Record<string, string>)[lang] || (artwork.medium as Record<string, string>).en || ''
      : (artwork.medium as string) || '';

  // Filter confirmed technical metadata only
  const hasYear = Boolean(artwork.year && artwork.year.trim().length > 0);
  const hasMedium = Boolean(displayMedium && displayMedium.trim().length > 0);
  const hasDimensions = Boolean(artwork.dimensions && artwork.dimensions.trim().length > 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title || 'Artwork Details'}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5]/98 sm:bg-[#FBF9F5]/96 backdrop-blur-md p-4 sm:p-6 lg:p-10 flex flex-col justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Floating Side Arrow Buttons (Desktop/Tablet) */}
      {allArtworks.length > 1 && onSelectArtwork && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="hidden md:flex fixed left-3 lg:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 border-0 bg-transparent text-[#8F8C84] hover:text-[#1C1C1A] items-center justify-center transition-colors cursor-pointer group"
            title={lang === 'es' ? 'Obra anterior (←)' : 'Previous artwork (←)'}
            aria-label="Previous artwork"
          >
            <span className="font-serif text-2xl group-hover:-translate-x-1 transition-transform">
              ←
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="hidden md:flex fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 border-0 bg-transparent text-[#8F8C84] hover:text-[#1C1C1A] items-center justify-center transition-colors cursor-pointer group"
            title={lang === 'es' ? 'Siguiente obra (→)' : 'Next artwork (→)'}
            aria-label="Next artwork"
          >
            <span className="font-serif text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </>
      )}

      {/* Main Container — Two-Column Desktop / Stacked Mobile Layout */}
      <div
        className="relative max-w-[1400px] w-full mx-auto my-auto p-0 m-0 border-0 bg-transparent shadow-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header: Series Category, Counter & Close Button */}
        <div className="flex justify-between items-center pb-3 mb-4 sm:mb-6 border-b border-[#1C1C1A]/10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.24em] text-[#C5A059] uppercase font-mono font-medium">
              {getCategoryLabel(artwork.category)}
            </span>
            {allArtworks.length > 1 && currentIndex !== -1 && (
              <span className="text-[10px] tracking-wider text-[#8F8C84] font-mono">
                [{currentIndex + 1} / {allArtworks.length}]
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-[11px] tracking-[0.2em] text-[#5C5A54] hover:text-[#1C1C1A] transition-colors p-1 cursor-pointer font-mono flex items-center gap-1.5"
            aria-label="Close"
          >
            <span>{lang === 'es' ? 'CERRAR' : 'CLOSE'}</span>
            <span className="text-[10px] text-[#8F8C84] font-mono hidden sm:inline">[ESC]</span>
          </button>
        </div>

        {/* Two-Column Grid: Large Artwork Image in remaining space + Narrow Info Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* 1. Large Artwork Image Column — Edge-to-edge, no card borders or beige boxes */}
          <div className="lg:col-span-8 xl:col-span-9 flex items-center justify-center w-full p-0 m-0 border-0 bg-transparent">
            <img
              src={imageSrc}
              alt={artwork.title || 'Reyes Portas Artwork'}
              onError={handleImageError}
              loading="eager"
              decoding="async"
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
              }}
              className="block p-0 m-0 border-0 bg-transparent shadow-none object-contain mx-auto"
            />
          </div>

          {/* 2. Narrow Artwork Information Column */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              
              {/* Title & Caption */}
              <div className="space-y-1.5">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1C1A] leading-tight">
                  {artwork.title || (
                    <span className="italic text-xl text-[#8F8C84]">
                      {lang === 'es' ? 'Sin título' : 'Untitled'}
                    </span>
                  )}
                </h2>

                {artwork.caption && (
                  <p className="font-serif italic text-sm text-[#5C5A54]">
                    {typeof artwork.caption === 'object'
                      ? artwork.caption[lang] || artwork.caption.en
                      : artwork.caption}
                  </p>
                )}
              </div>

              {/* Confirmed Technical Details Only */}
              {(hasYear || hasMedium || hasDimensions || isSold) && (
                <div className="space-y-1 text-xs text-[#5C5A54] font-light pt-1 border-t border-[#1C1C1A]/10">
                  {hasYear && (
                    <p className="font-serif italic text-sm text-[#1C1C1A]">{artwork.year}</p>
                  )}
                  {hasMedium && <p>{displayMedium}</p>}
                  {hasDimensions && <p className="text-[#8F8C84]">{artwork.dimensions}</p>}

                  {/* Sold Status with Small Red Dot */}
                  {isSold && (
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#A6833E] font-medium tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#D9381E]" aria-hidden="true" />
                        <span>{lang === 'es' ? 'VENDIDO · COLECCIÓN PARTICULAR' : 'SOLD · PRIVATE COLLECTION'}</span>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Curatorial Inspiration Note — Unboxed quiet quote */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.24em] uppercase text-[#8F8C84] font-mono">
                    {lang === 'es' ? 'NOTA DEL ARTISTA' : 'ARTIST NOTE'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                    className="text-[9px] tracking-[0.16em] uppercase text-[#8F8C84] hover:text-[#1C1C1A] transition-colors cursor-pointer font-mono"
                  >
                    {isEditingNotes
                      ? lang === 'es'
                        ? '[ CANCELAR ]'
                        : '[ CANCEL ]'
                      : lang === 'es'
                      ? '[ EDITAR ]'
                      : '[ EDIT ]'}
                  </button>
                </div>

                {isEditingNotes ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder={
                        lang === 'es'
                          ? 'Escribe una breve descripción poética sobre esta obra...'
                          : 'Write a short description about this piece...'
                      }
                      rows={3}
                      className="w-full text-xs font-serif italic text-[#1C1C1A] bg-white border border-[#1C1C1A]/20 p-2 leading-relaxed focus:outline-none focus:border-[#C5A059] resize-none"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={handleResetNote}
                        className="text-[10px] uppercase tracking-[0.14em] text-[#8F8C84] hover:text-red-700 transition-colors cursor-pointer"
                      >
                        {lang === 'es' ? 'Restablecer' : 'Reset'}
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveNote}
                        className="py-1 px-3 bg-[#1C1C1A] text-[#FBF9F5] text-[10px] tracking-[0.18em] uppercase hover:bg-[#C5A059] hover:text-[#1C1C1A] transition-colors cursor-pointer font-light"
                      >
                        {lang === 'es' ? 'Guardar' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  customNote && (
                    <blockquote className="font-serif italic text-xs sm:text-[13px] text-[#3C3B37] leading-relaxed border-l-2 border-[#C5A059]/50 pl-3 py-0.5">
                      “{customNote}”
                    </blockquote>
                  )
                )}
              </div>
            </div>

            {/* Action Button & Inquire */}
            <div className="pt-4 border-t border-[#1C1C1A]/10 space-y-3">
              {isSold ? (
                <div className="text-[11px] text-[#8F8C84] font-light leading-relaxed">
                  {lang === 'es'
                    ? 'Esta obra forma parte de una colección particular y no está disponible para su adquisición.'
                    : 'This artwork is held in a private collection and is not available for acquisition.'}
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onInquire(artwork);
                  }}
                  className="w-full py-2.5 px-4 bg-[#1C1C1A] text-[#FBF9F5] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#C5A059] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'CONSULTAR DISPONIBILIDAD' : 'INQUIRE ABOUT THIS WORK'}
                </button>
              )}

              {/* Prev / Next Bottom Stepper */}
              {allArtworks.length > 1 && onSelectArtwork && (
                <div className="pt-2 flex justify-between items-center text-[10px] tracking-[0.18em] text-[#8F8C84] font-mono uppercase">
                  <button
                    onClick={goToPrev}
                    className="hover:text-[#1C1C1A] transition-colors cursor-pointer py-1"
                  >
                    ← {lang === 'es' ? 'ANTERIOR' : 'PREV'}
                  </button>
                  <span>
                    {currentIndex + 1} / {allArtworks.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="hover:text-[#1C1C1A] transition-colors cursor-pointer py-1"
                  >
                    {lang === 'es' ? 'SIGUIENTE' : 'NEXT'} →
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
