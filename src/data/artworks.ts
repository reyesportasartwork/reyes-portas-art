import { Artwork } from '../types';

/**
 * REYES PORTAS — ARTWORKS ARCHIVE
 * 
 * Organized into THREE main bodies:
 * 1. FIGURATIVE
 * 2. VISIONARY
 * 3. ABSTRACT / MATTER
 * 
 * Note: 'WhatsApp Image 2026-09-30 at 17.08.32.jpeg' is reserved exclusively
 * as the homepage cover photo and removed from the portfolio per request.
 * 
 * Official confirmed titles applied per artist documentation.
 * Fields not explicitly provided by the artist remain blank for future editing.
 */
export const artworksData: Artwork[] = [
  // ========================================================
  // 1. FIGURATIVE
  // Human figure, recognizably organic forms, psychology & presence
  // ========================================================

  // 1. DAMA — first figurative work, serene feminine form
  {
    id: 'work-dama',
    image: '/dama.jpeg',
    title: 'DAMA',
    year: '2026',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'FIGURATIVE',
    aspectRatio: 'vertical',
    notes: '',
    curatorialNotes: {
      en: 'A recent figurative work exploring the human presence and feminine form through textured tones and expressive light.',
      es: 'Obra figurativa reciente que explora la presencia humana y la figura femenina a través de texturas y luz expresiva.',
    },
  },

  // 2. Hijo del Fuego — dark reddish primordial warmth
  {
    id: 'work-hijo-del-fuego',
    image: '/images/Imagen de WhatsApp 2025-11-17 a las 20.05.32_03340831.jpg',
    title: 'Hijo del Fuego — Antes del primer aliento',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'FIGURATIVE',
    aspectRatio: 'vertical',
    notes: '',
    curatorialNotes: {
      en: 'Light and primal heat emerging from deep shadow; a child silhouette suspended in dark, reddish tones before the first breath of existence.',
      es: 'Luz y calor primordial que emergen de la sombra profunda; una figura infantil suspendida en tonos oscuros y rojizos antes del primer aliento de existencia.',
    },
  },

  // ========================================================
  // 2. VISIONARY
  // Symbolic, cosmic, metaphysical imagery & portals
  // ========================================================

  // 3. Mirror — visionary dialogue of female silhouettes
  {
    id: 'work-mirror',
    image: '/images/1735498485350-scaled.jpg',
    title: 'Mirror',
    year: '',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'VISIONARY',
    aspectRatio: 'vertical',
    notes: '',
    curatorialNotes: {
      en: 'An excavation of the human silhouette through earthy layers, where two female profiles enter into silent dialogue across visceral matter and reflection.',
      es: 'Una excavación de la silueta humana a través de capas terrosas, donde dos rostros femeninos entablan un diálogo silencioso en la materia visceral y el reflejo.',
    },
  },

  // 4. Reencarnation — horizontal cosmic swirl
  {
    id: 'work-reencarnation',
    image: '/images/Painting_ReyesPortas_Reencarnation_.jpg',
    title: 'Reencarnation',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'VISIONARY',
    aspectRatio: 'horizontal',
    notes: '',
    curatorialNotes: {
      en: 'A fetal figure within an earthy cosmic swirl where cycles of matter and spiritual energy cross, weaving radiant celestial currents and primordial birth across the canvas.',
      es: 'Una figura fetal dentro de un remolino de tonos tierra donde convergen los ciclos de la materia y la energía espiritual, tejiendo corrientes radiantes y un nacimiento primordial.',
    },
  },

  // 5. REBORN — circular spiral movement, celestial terracotta
  {
    id: 'work-reborn',
    image: '/images/Sin título (53).png',
    title: 'REBORN',
    year: '',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'VISIONARY',
    aspectRatio: 'square',
    notes: '',
    curatorialNotes: {
      en: 'An infant presence cradled within a dynamic spiral movement of cosmic, terracotta and coral hues, mapping the sacred threshold of birth and spiritual renewal.',
      es: 'Una presencia infantil acogida dentro de un movimiento en espiral de colores cósmicos, terracota y coral, cartografiando el umbral sagrado del renacer y la renovación espiritual.',
    },
  },

  // ========================================================
  // 3. ABSTRACT / MATTER
  // Pure impasto, textural explorations & elemental minerals
  // ========================================================

  // 6. Psicopathic Mind — vibrant, textural impasto
  {
    id: 'work-psicopathic-mind',
    image: '/images/Painting_ReyesPortas_Psicopathic-Mind.jpg',
    title: 'Psicopathic Mind',
    caption: 'Amanecer',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'ABSTRACT / MATTER',
    aspectRatio: 'vertical',
    notes: '',
    curatorialNotes: {
      en: 'A visceral, textural exploration rendered in turquoise, coral and pink tones, where forms emerge from the physical impasto in intense chromatic tension.',
      es: 'Una visceral exploración textural plasmada en tonos turquesa, coral y rosa, donde las formas emergen de la materia en una intensa tensión cromática.',
    },
  },

  // 7. Furia con Luz — ascending golden vertical movement
  {
    id: 'work-furia-con-luz',
    image: '/images/20251125_2117_Cuadro Abstracto Vertical_remix_01kayaex44e1kt51a4x955ve8c.png',
    title: 'Furia con Luz',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'ABSTRACT / MATTER',
    aspectRatio: 'vertical',
    notes: '',
    curatorialNotes: {
      en: 'A dynamic vertical movement of luminous yellow and gold mineral pigments evoking ascending energy, raw elemental force, and radiant vibration.',
      es: 'Una obra vertical de tonos amarillos y dorados que evoca la energía ascendente, la fuerza elemental pura y la vibración radiante de la luz.',
    },
  },

  // 8. Creación amorosa 1 (Sold) — private collection, Japan (circular red study)
  {
    id: 'work-abstract-sold-19-2',
    image: '/2WhatsApp Image 2026-10-12 at 19.30.55.jpeg',
    title: 'Creación amorosa 1',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'ABSTRACT / MATTER',
    aspectRatio: 'vertical',
    status: {
      en: 'SOLD',
      es: 'VENDIDO',
    },
    isAvailable: false,
    notes: 'Private collection — sold',
    curatorialNotes: {
      en: 'A circular and textural abstract study examining chromatic tension, organic motion, and elemental pigments in dialogue.',
      es: 'Estudio abstracto circular y matérico que examina la tensión cromática, el movimiento orgánico y los pigmentos elementales en diálogo.',
    },
  },

  // 9. Creación amorosa 2 (Sold) — horizontal botanical impasto
  {
    id: 'work-abstract-sold-19-1',
    image: '/1WhatsApp Image 2026-10-12 at 19.30.55.jpeg',
    title: 'Creación amorosa 2',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'ABSTRACT / MATTER',
    aspectRatio: 'horizontal',
    status: {
      en: 'SOLD',
      es: 'VENDIDO',
    },
    isAvailable: false,
    notes: 'Private collection — sold',
    curatorialNotes: {
      en: 'An organic abstract exploration of visceral botanical pigments, tactile rhythms, and impasto surfaces.',
      es: 'Exploración abstracta orgánica de pigmentos botánicos viscerales, ritmos táctiles y superficies en relieve.',
    },
  },

  // 10. Creación amorosa 3 (Sold) — textural earthy matter
  {
    id: 'work-abstract-sold-13',
    image: '/WhatsApp Image 2026-10-12 at 13.28.00.jpeg',
    title: 'Creación amorosa 3',
    year: '2025',
    medium: {
      en: 'Oil on canvas and mixed media',
      es: 'Óleo sobre lienzo y técnica mixta',
    },
    dimensions: '',
    category: 'ABSTRACT / MATTER',
    aspectRatio: 'vertical',
    status: {
      en: 'SOLD',
      es: 'VENDIDO',
    },
    isAvailable: false,
    notes: 'Private collection — sold',
    curatorialNotes: {
      en: 'A textural abstract composition delving into earthy matter, stratified mineral tones, and atmospheric density.',
      es: 'Composición abstracta matérica que ahonda en la materia terrosa, tonos minerales estratificados y densidad atmosférica.',
    },
  },
];
