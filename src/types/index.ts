export type Language = 'en' | 'es';

export type PortfolioCategory = 'FIGURATIVE' | 'VISIONARY' | 'ABSTRACT / MATTER';

export interface CuratorialNote {
  en: string;
  es: string;
}

export interface Artwork {
  id: string;
  image: string;
  title: string;
  caption?: string | { en: string; es: string };
  year: string;
  medium: string | { en: string; es: string };
  dimensions: string;
  category: PortfolioCategory;
  aspectRatio: 'horizontal' | 'vertical' | 'square' | 'panoramic';
  notes?: string;
  status?: string | { en: string; es: string };
  isAvailable?: boolean;
  curatorialNotes?: CuratorialNote;
}

export interface PrintItem {
  id: string;
  image: string;
  title: string;
  caption?: string | { en: string; es: string };
  year: string;
  edition: string;
  medium: string;
  dimensions: string;
  price?: string;
  aspectRatio: 'horizontal' | 'vertical' | 'square' | 'panoramic';
  notes?: string;
  curatorialNotes?: CuratorialNote;
}

export interface ExhibitionImage {
  url: string;
  title?: string;
  caption?: string | { en: string; es: string };
  aspectRatio?: 'horizontal' | 'vertical' | 'square' | 'panoramic';
}

export interface ExhibitionRecord {
  id: string;
  year: string;
  date?: string | { en: string; es: string };
  title: string;
  institution: string;
  location: string;
  type: string;
  notes?: string;
  description?: { en: string; es: string };
  curatorNote?: { en: string; es: string };
  curatorName?: string;
  images?: ExhibitionImage[];
  sourceLink?: {
    url: string;
    label: { en: string; es: string };
  };
}
