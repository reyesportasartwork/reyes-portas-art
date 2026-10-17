import React from 'react';
import { ActiveView } from './Header';
import { useLanguage } from '../context/LanguageContext';

interface BreadcrumbProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  categoryFilter?: string | null;
  onResetCategoryFilter?: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  activeView,
  onNavigate,
  categoryFilter,
  onResetCategoryFilter,
}) => {
  const { lang } = useLanguage();
  // Only display on designated sub-pages: Portfolio, Prints, Exhibitions
  const eligibleViews: ActiveView[] = ['portfolio', 'prints', 'exhibitions'];

  if (!eligibleViews.includes(activeView)) {
    return null;
  }

  const getViewLabel = (view: ActiveView): string => {
    if (lang === 'es') {
      switch (view) {
        case 'portfolio':
          return 'PORTAFOLIO';
        case 'prints':
          return 'PRINTS';
        case 'exhibitions':
          return 'EXPOSICIONES';
        default:
          return view.toUpperCase();
      }
    }
    switch (view) {
      case 'portfolio':
        return 'PORTFOLIO';
      case 'prints':
        return 'PRINTS';
      case 'exhibitions':
        return 'EXHIBITIONS';
      default:
        return view.toUpperCase();
    }
  };

  const getCategoryLabel = (cat: string): string => {
    if (lang === 'es') {
      if (cat === 'FIGURATIVE') return 'FIGURATIVO';
      if (cat === 'VISIONARY') return 'VISIONARIO';
      if (cat === 'ABSTRACT / MATTER') return 'ABSTRACTO / MATERIA';
    }
    return cat;
  };

  const handleHomeClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCurrentViewClick = () => {
    if (categoryFilter && onResetCategoryFilter) {
      onResetCategoryFilter();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentViewActiveLeaf = !categoryFilter || categoryFilter === 'ALL';

  return (
    <div className="w-full bg-[#FBF9F5]/90 border-b border-[#C5A059]/15">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3">
        <nav aria-label="Breadcrumb" className="flex items-center">
          <ol className="flex items-center flex-wrap text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-light text-[#8F8C84]">
            
            {/* Root Breadcrumb: HOME / INICIO */}
            <li className="inline-flex items-center">
              <button
                onClick={handleHomeClick}
                className="hover:text-[#1C1C1A] hover:underline underline-offset-4 decoration-[#C5A059] transition-colors cursor-pointer focus-visible:outline-none"
              >
                {lang === 'es' ? 'INICIO' : 'HOME'}
              </button>
            </li>

            {/* Separator */}
            <li className="inline-flex items-center px-2 text-[#C5A059]/70 select-none" aria-hidden="true">
              /
            </li>

            {/* Sub-page Breadcrumb */}
            <li className="inline-flex items-center">
              {isCurrentViewActiveLeaf ? (
                <span
                  aria-current="page"
                  className="text-[#1C1C1A] font-medium tracking-[0.24em]"
                >
                  {getViewLabel(activeView)}
                </span>
              ) : (
                <button
                  onClick={handleCurrentViewClick}
                  className="hover:text-[#1C1C1A] hover:underline underline-offset-4 decoration-[#C5A059] transition-colors cursor-pointer focus-visible:outline-none"
                >
                  {getViewLabel(activeView)}
                </button>
              )}
            </li>

            {/* Optional Category Level */}
            {!isCurrentViewActiveLeaf && categoryFilter && (
              <>
                <li className="inline-flex items-center px-2 text-[#C5A059]/70 select-none" aria-hidden="true">
                  /
                </li>
                <li className="inline-flex items-center">
                  <span
                    aria-current="page"
                    className="text-[#1C1C1A] font-medium tracking-[0.24em]"
                  >
                    {getCategoryLabel(categoryFilter)}
                  </span>
                </li>
              </>
            )}

          </ol>
        </nav>
      </div>
    </div>
  );
};
