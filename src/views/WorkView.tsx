import React, { useState, useMemo } from 'react';
import { artworksData } from '../data/artworks';
import { ArtworkFrame } from '../components/ArtworkFrame';
import { PortfolioCategory, Artwork } from '../types';
import { ActiveView } from '../components/Header';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useLanguage } from '../context/LanguageContext';

interface WorkViewProps {
  setActiveView?: (view: ActiveView) => void;
  onOpenArtworkModal?: (artworkId: string) => void;
  selectedCategory?: PortfolioCategory | 'ALL';
  onCategoryChange?: (category: PortfolioCategory | 'ALL') => void;
}

interface CategoryTab {
  id: PortfolioCategory | 'ALL';
  labelEn: string;
  labelEs: string;
  count: number;
}

const CATEGORIES: PortfolioCategory[] = ['FIGURATIVE', 'VISIONARY', 'ABSTRACT / MATTER'];

export const WorkView: React.FC<WorkViewProps> = ({
  onOpenArtworkModal,
  selectedCategory: controlledCategory,
  onCategoryChange,
}) => {
  const { lang } = useLanguage();
  const [internalCategory, setInternalCategory] = useState<PortfolioCategory | 'ALL'>('ALL');
  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const handleSelectCategory = (category: PortfolioCategory | 'ALL') => {
    if (onCategoryChange) {
      onCategoryChange(category);
    } else {
      setInternalCategory(category);
    }
  };

  // Preload artwork images to prevent layout shift
  const artworkUrls = useMemo(() => {
    return artworksData.map((art) => art.image);
  }, []);

  const { isLoaded: imagesPreloaded, progress } = useImagePreloader(artworkUrls);

  const getCategoryDisplay = (cat: PortfolioCategory): { en: string; es: string } => {
    switch (cat) {
      case 'FIGURATIVE':
        return { en: 'FIGURATIVE', es: 'FIGURATIVO' };
      case 'VISIONARY':
        return { en: 'VISIONARY', es: 'VISIONARIO' };
      case 'ABSTRACT / MATTER':
        return { en: 'ABSTRACT / MATTER', es: 'ABSTRACTO / MATERIA' };
      default:
        return { en: cat, es: cat };
    }
  };

  const tabs: CategoryTab[] = [
    {
      id: 'ALL',
      labelEn: 'ALL',
      labelEs: 'TODAS',
      count: artworksData.length,
    },
    ...CATEGORIES.map((cat) => {
      const display = getCategoryDisplay(cat);
      return {
        id: cat,
        labelEn: display.en,
        labelEs: display.es,
        count: artworksData.filter((a) => a.category === cat).length,
      };
    }),
  ];

  const filteredArtworks =
    selectedCategory === 'ALL'
      ? artworksData
      : artworksData.filter((a) => a.category === selectedCategory);

  /**
   * Editorial Gallery Grid — Inspired by Samantha Keely Smith
   * 
   * Strict Row Alignment & Natural Proportions:
   * - Clean 3-column grid on desktop (lg:grid-cols-3)
   * - 2 columns on tablet (sm:grid-cols-2)
   * - 1 column on mobile (grid-cols-1)
   * - Top of each row aligns consistently at the same horizontal level via CSS Grid (items-start)
   * - Consistent gaps of 12px (between 10–14px)
   * - Balanced combination of horizontal, vertical, and square artworks
   * - For 2 works (FIGURATIVE), a balanced 2-column layout on sm+ prevents an awkward empty 3rd column
   * - Natural aspect ratios preserved with width: 100%, height: auto
   * - Captions sit directly beneath each painting, firmly anchored with no overlap or detachment
   */
  const renderArtworkGrid = (artworks: Artwork[]) => {
    if (artworks.length === 0) return null;

    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] items-start">
        {artworks.map((work) => (
          <div key={work.id} className="w-full flex flex-col p-0 m-0 border-0 bg-transparent">
            <ArtworkFrame
              artwork={work}
              priority={true}
              onClick={() => onOpenArtworkModal && onOpenArtworkModal(work.id)}
              showDetails={true}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FBF9F5] text-[#1C1C1A]">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        
        {/* Header & Category Tab Navigation */}
        <div className="border-b border-[#1C1C1A]/10 pb-4 mb-6 md:mb-8 flex flex-col items-center text-center space-y-4">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light text-[#1C1C1A] uppercase">
              {lang === 'es' ? 'PORTAFOLIO' : 'PORTFOLIO'}
            </h1>
            <p className="text-[10px] tracking-[0.26em] text-[#8F8C84] uppercase font-light">
              {lang === 'es' ? 'ARCHIVO DE OBRAS SELECCIONADAS' : 'SELECTED WORKS ARCHIVE'}
            </p>
          </div>

          {/* Minimalist category filter tabs */}
          <div
            role="tablist"
            aria-label="Filter artworks by category"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1"
          >
            {tabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const label = lang === 'es' ? tab.labelEs : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs tracking-[0.18em] uppercase transition-all cursor-pointer relative flex items-center gap-2 ${
                    isActive
                      ? 'text-[#1C1C1A] font-medium'
                      : 'text-[#8F8C84] hover:text-[#1C1C1A]'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive
                        ? 'bg-[#C5A059]/20 text-[#8C6D2D]'
                        : 'bg-[#1C1C1A]/5 text-[#8F8C84]'
                    }`}
                  >
                    {tab.count}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Discreet Loading Bar */}
          {!imagesPreloaded && (
            <div className="w-full max-w-xs mx-auto text-center space-y-1 pt-1 animate-fade-in">
              <span className="text-[9px] tracking-[0.24em] text-[#8F8C84] uppercase font-mono">
                {lang === 'es' ? 'PRECARGANDO ARCHIVO' : 'PRELOADING ARCHIVE'} · {progress}%
              </span>
              <div className="h-[2px] w-full bg-[#1C1C1A]/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C5A059] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Artworks Presentation */}
        {selectedCategory === 'ALL' ? (
          /* ALL VIEW: Divided into thematic sections (FIGURATIVE - VISIONARY - ABSTRACT / MATTER) */
          <div className="space-y-16 sm:space-y-20">
            {CATEGORIES.map((cat) => {
              const catArtworks = artworksData.filter((a) => a.category === cat);
              if (catArtworks.length === 0) return null;

              const display = getCategoryDisplay(cat);
              const label = lang === 'es' ? display.es : display.en;

              return (
                <section key={cat} className="space-y-6">
                  {/* Category Header Divider */}
                  <div className="border-b border-[#1C1C1A]/10 pb-2.5 flex justify-between items-baseline">
                    <h2 className="font-serif text-lg sm:text-xl tracking-[0.2em] text-[#1C1C1A] uppercase font-light flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      <span>{label}</span>
                    </h2>
                    <span className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase font-mono">
                      {catArtworks.length}{' '}
                      {catArtworks.length === 1
                        ? lang === 'es'
                          ? 'OBRA'
                          : 'WORK'
                        : lang === 'es'
                        ? 'OBRAS'
                        : 'WORKS'}
                    </span>
                  </div>

                  {/* Uniform Homogeneous Grid */}
                  {renderArtworkGrid(catArtworks)}
                </section>
              );
            })}
          </div>
        ) : (
          /* SINGLE CATEGORY VIEW: Clean focused gallery */
          <div className="space-y-6">
            <div className="border-b border-[#1C1C1A]/10 pb-2.5 flex justify-between items-baseline">
              <h2 className="font-serif text-lg sm:text-xl tracking-[0.2em] text-[#1C1C1A] uppercase font-light flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>
                  {lang === 'es'
                    ? getCategoryDisplay(selectedCategory as PortfolioCategory).es
                    : getCategoryDisplay(selectedCategory as PortfolioCategory).en}
                </span>
              </h2>
              <span className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase font-mono">
                {filteredArtworks.length}{' '}
                {filteredArtworks.length === 1
                  ? lang === 'es'
                    ? 'OBRA'
                    : 'WORK'
                  : lang === 'es'
                  ? 'OBRAS'
                  : 'WORKS'}
              </span>
            </div>

            {filteredArtworks.length > 0 ? (
              renderArtworkGrid(filteredArtworks)
            ) : (
              <div className="text-center py-20 text-[#8F8C84] text-xs tracking-[0.2em] uppercase">
                {lang === 'es'
                  ? 'No hay obras catalogadas en esta categoría actualmente.'
                  : 'No artworks currently listed in this category.'}
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
};
