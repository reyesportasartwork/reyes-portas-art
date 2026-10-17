import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { isImagePreloaded } from '../utils/imagePreloader';
import { useLanguage } from '../context/LanguageContext';

interface ArtworkFrameProps {
  artwork: Artwork;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
  showDetails?: boolean;
}

/**
 * Minimalist Artwork Display Component
 * Follows the Samantha Keely Smith contemporary painter reference:
 * - Natural aspect ratio (width: 100%, height: auto)
 * - Zero decorative frames, zero card borders, zero beige backgrounds
 * - padding: 0, margin: 0, border: none, box-shadow: none
 * - Small red dot and SOLD label for sold works
 */
export const ArtworkFrame: React.FC<ArtworkFrameProps> = ({
  artwork,
  priority = false,
  className = '',
  onClick,
  showDetails = true,
}) => {
  const { lang } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [customPreviewUrl, setCustomPreviewUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState(customPreviewUrl || artwork.image);

  const currentSrc = customPreviewUrl || imageSrc;
  const isPlaceholder = imageError || !currentSrc;

  // Track image load state for clean opacity fade-in
  const [isLoaded, setIsLoaded] = useState(() => isImagePreloaded(currentSrc));

  useEffect(() => {
    const nextSrc = customPreviewUrl || artwork.image;
    setImageSrc(nextSrc);
    setIsLoaded(isImagePreloaded(nextSrc));
    setImageError(false);
  }, [customPreviewUrl, artwork.image]);

  const handleImageError = () => {
    if (imageSrc.startsWith('/public/')) {
      setImageSrc(imageSrc.replace(/^\/public/, ''));
    } else if (imageSrc.startsWith('/images/')) {
      setImageSrc(imageSrc.replace(/^\/images/, ''));
    } else if (!imageSrc.startsWith('/images/') && !imageSrc.startsWith('http') && !imageSrc.startsWith('blob:')) {
      setImageSrc(`/images${imageSrc}`);
    } else {
      setImageError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPreviewUrl(url);
      setIsLoaded(false);
      setImageError(false);
    }
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

  // Collect confirmed metadata only
  const confirmedMetadata = [
    artwork.year?.trim(),
    displayMedium?.trim(),
    artwork.dimensions?.trim(),
  ].filter(Boolean);

  return (
    <div
      onClick={onClick}
      className={`w-full p-0 m-0 border-0 bg-transparent shadow-none group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Artwork Image Container — Uniform aspect ratio for perfectly homogeneous grid */}
      <div className="relative w-full aspect-[4/5] p-0 m-0 border-0 bg-[#EFECE5] overflow-hidden">
        {!isPlaceholder ? (
          <img
            src={currentSrc}
            alt={artwork.title || 'Reyes Portas Artwork'}
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`block w-full h-full object-cover object-center p-0 m-0 border-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-[#EFECE5] flex flex-col items-center justify-center p-4 text-center">
            <span className="font-serif text-xs text-[#8F8C84] uppercase tracking-wider block mb-2">
              {artwork.title || (lang === 'es' ? 'Imagen no disponible' : 'Image unavailable')}
            </span>
            <label className="text-[10px] uppercase font-mono tracking-wider text-[#5C5A54] underline cursor-pointer">
              {lang === 'es' ? 'Cargar imagen' : 'Upload image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Discreet Artwork Information — Unboxed, quiet typography */}
      {showDetails && (
        <div className="pt-2 pb-1 text-left space-y-0.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-serif italic text-xs sm:text-sm text-[#1C1C1A] group-hover:text-[#C5A059] transition-colors leading-snug">
              {artwork.title || (lang === 'es' ? 'Sin título' : 'Untitled')}
            </span>

            {isSold && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#A6833E] shrink-0 font-medium tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E]" aria-hidden="true" />
                <span>{lang === 'es' ? 'VENDIDO' : 'SOLD'}</span>
              </span>
            )}
          </div>

          {artwork.caption && (
            <p className="font-serif italic text-[11px] text-[#5C5A54] leading-tight">
              {typeof artwork.caption === 'object'
                ? artwork.caption[lang] || artwork.caption.en
                : artwork.caption}
            </p>
          )}

          {confirmedMetadata.length > 0 && (
            <p className="text-[11px] text-[#8F8C84] font-light tracking-wide">
              {confirmedMetadata.join(' · ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
