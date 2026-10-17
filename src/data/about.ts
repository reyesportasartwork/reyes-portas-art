import { ExhibitionRecord } from '../types';

export interface SingulartSpaceSelectionItem {
  artworkTitle: string;
  caption?: string | {
    en?: string;
    es?: string;
  };
  collection: string;
  date?: {
    en?: string;
    es?: string;
  };
  image?: string;
}

export interface SingulartCuratorialSpace {
  id: string;
  name: string;
  country?: string;
  items: SingulartSpaceSelectionItem[];
}

export interface CuratorialSelectionsData {
  title: string;
  subtitle: string;
  introHeading: string;
  intro: string;
  spaces: SingulartCuratorialSpace[];
  platformClarification: string;
}

export interface DocumentedSoldWork {
  id: string;
  image: string;
  title: string;
  isTitleConfirmed: boolean;
  status: string;
  description: string;
  aspectRatio?: 'horizontal' | 'vertical' | 'square' | 'panoramic';
  settingNote?: string;
  collectorLocation?: string;
}

export interface PrivateCommissionsData {
  title: string;
  subtitle: string;
  statement: string;
  note?: string;
  confirmedProjects: {
    territory: string;
    count: string;
    description: string;
    isArtwork?: boolean;
    image?: string;
  }[];
  secondaryGalleryTitle: string;
  secondaryGallerySubtitle: string;
  secondaryGalleryIntro: string;
  documentedSoldWorks: DocumentedSoldWork[];
  privacyNote: string;
}

export interface ProfessionalExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
}

export interface ProfessionalExperienceData {
  title: string;
  subtitle: string;
  items: ProfessionalExperienceItem[];
}

export interface AboutLocaleData {
  tagline: string;
  location: string;
  manifestTitle: string;
  manifest: string[];
  artistName: string;
  instagramHandle: string;
  statementQuote: string;
  statement: string;
  biography: string[];
  educationTitle: string;
  education: { title: string; institution: string; year?: string }[];
  professionalExperience: ProfessionalExperienceData;
  commissionsTitle: string;
  commissionsNote: string;
  curatorialSelections: CuratorialSelectionsData;
  privateCommissions: PrivateCommissionsData;
  creativeForestTitle: string;
  creativeForest: {
    title?: string;
    text: string;
    linkLabel: string;
    url: string;
  };
  contact: {
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    linkedinUrl?: string;
    linkedinHandle?: string;
  };
}

export const aboutData: {
  en: AboutLocaleData;
  es: AboutLocaleData;
  exhibitions: ExhibitionRecord[];
} = {
  en: {
    tagline: 'Painting between the visible and the visionary.',
    location: 'Artist based in Spain',
    manifestTitle: 'MANIFEST',
    manifest: [
      'My painting is an open door to the intangible, a journey to the origin of everything, where the Akasha speaks, and I simply listen. Each piece is born from a deep connection to the subtle, that space where souls meet beyond words and concrete forms. Painting is not a choice; it’s a calling—my soul asks for it, my being needs it.',
      'Through my brushes, I materialize what the All reveals to me, blending the abstract and the figurative to weave bridges between the visible and the invisible. In my work, the child and the adult coexist: the child symbolizes purity, intuition, and wonder; the adult represents experience, depth, and introspection. By uniting them, I seek to awaken in the viewer that lost connection to their own essence.',
      'My art is not just a means of expression but an invitation to remember. To remember who we are, where we come from, and where we are headed. I want my paintings to be a refuge, a mirror, and at the same time, a transformative journey.',
      'I paint to connect with my own truth and to help others connect with theirs. I paint because I believe art is a powerful vehicle to heal, to reconnect with the divine, and to embrace all dimensions of existence.',
      'In every stroke, beats my desire to live fully from this connection, to make art my life, and to share with the world the beauty that manifests when we give space to the transcendent.',
    ],
    artistName: 'Reyes Portas',
    instagramHandle: '@reyesportas__art',
    statementQuote: 'Drawing was my compass from childhood.',
    statement:
      'My practice moves between figuration and abstraction, exploring connections between human, animal and vegetal life through painting, natural pigments, matter and light.',
    biography: [
      'Drawing was my compass from childhood. My practice began with the human figure and has gradually opened toward abstraction, exploring the space between what is visible and what is felt.',
      'Color, texture, matter and space function as forms of memory, body and breath. In each piece there is a continuous search for balance between order and chaos, containment and overflow.',
      'The figure does not always appear as a literal representation: it may dissolve or merge with trees, roots, animals, landscape, matter, light, or abstract fields.',
    ],
    educationTitle: 'Education & Training',
    education: [
      { title: 'Artes aplicadas al muro', institution: 'Escola Massana · Barcelona, Spain' },
      { title: 'Artistic training with Luis García Mozos', institution: 'Barcelona, Spain' },
      { title: '“El oficio de pintor”', institution: 'MEAM (Museu Europeu d’Art Modern) · 2017' },
      { title: 'Private painting classes with Luis García Mozos', institution: '2017–2019 · Barcelona, Spain' },
      { title: 'Master’s in Cultural Management', institution: 'UOC (Universitat Oberta de Catalunya)' },
    ],
    professionalExperience: {
      title: 'PROFESSIONAL EXPERIENCE',
      subtitle: 'Trajectory & Engagements',
      items: [
        {
          role: 'Visual Artist',
          organization: 'IGOR STUDIO Galeria de ARTE — HEART FEST',
          location: 'Barcelona, Spain',
          period: 'January – March 2026',
          type: 'Independent professional',
        },
      ],
    },
    commissionsTitle: 'Commissions',
    commissionsNote: 'Currently undertakes commissions for private collections.',
    curatorialSelections: {
      title: 'SINGULART — CURATORIAL SELECTIONS (2025–2026)',
      subtitle: 'Curatorial Selections on Singulart',
      introHeading: 'Curatorial Selections on Singulart',
      intro:
        '“My work has been selected for thematic collections on Singulart, bringing together works that explore humanity, materiality, atmosphere and the unseen.”',
      spaces: [
        {
          id: 'space-datarte',
          name: 'Datarte',
          country: 'Spain (Barcelona)',
          items: [
            {
              artworkTitle: 'Reencarnation',
              collection: 'Humanidad',
              image: '/images/Painting_ReyesPortas_Reencarnation_.jpg',
            },
          ],
        },
        {
          id: 'space-loriginal',
          name: "L'Original",
          country: 'Canada (Montreal)',
          items: [
            {
              artworkTitle: 'Reencarnation',
              collection: 'El equilibrio de lo que no se ve',
              image: '/images/Painting_ReyesPortas_Reencarnation_.jpg',
            },
            {
              artworkTitle: 'REBORN',
              collection: 'Los gestos del polvo',
              image: '/images/Sin título (53).png',
            },
            {
              artworkTitle: 'Psicopathic Mind',
              collection: 'Los silencios posados en equilibrio',
              image: '/images/Painting_ReyesPortas_Psicopathic-Mind.jpg',
            },
          ],
        },
        {
          id: 'space-attaly',
          name: 'Attaly',
          country: 'France (Paris)',
          items: [
            {
              artworkTitle: 'Purple Storm',
              collection: 'Respira el mundo',
              date: {
                en: 'November 28, 2025',
                es: '28 de noviembre de 2025',
              },
            },
          ],
        },
        {
          id: 'space-snap-collective',
          name: 'Snap Collective',
          country: 'Denmark (Copenhagen)',
          items: [
            {
              artworkTitle: 'Hijo del Fuego — Antes del primer aliento',
              collection: 'Dar un golpe de zoom',
              date: {
                en: 'January 30, 2026',
                es: '30 de enero de 2026',
              },
              image: '/images/Imagen de WhatsApp 2025-11-17 a las 20.05.32_03340831.jpg',
            },
            {
              artworkTitle: 'Hijo del Fuego — Antes del primer aliento',
              collection: 'Manifestaciones',
              image: '/images/Imagen de WhatsApp 2025-11-17 a las 20.05.32_03340831.jpg',
            },
          ],
        },
      ],
      platformClarification:
        'These references correspond strictly to digital curatorial artwork selections within the Singulart online platform, and are not physical exhibitions or exclusive representation agreements.',
    },
    privateCommissions: {
      title: 'SOLD WORKS',
      subtitle: 'Sold to collectors in Spain and Japan.',
      statement: 'Sold to collectors in Spain and Japan.',
      note: 'The red circular painting belongs to a collector in Japan. The other confirmed sold paintings in this group belong to collectors in Spain.',
      confirmedProjects: [
        {
          territory: 'Japan',
          count: '1 Work',
          description: 'The red circular painting belongs to a collector in Japan.',
        },
        {
          territory: 'Spain',
          count: 'Private collections',
          description: 'The other confirmed sold paintings in this group belong to collectors in Spain.',
        },
      ],
      secondaryGalleryTitle: 'SOLD WORKS',
      secondaryGallerySubtitle: 'Archive of Acquired Works',
      secondaryGalleryIntro:
        'The red circular painting belongs to a collector in Japan. The other confirmed sold paintings in this group belong to collectors in Spain.',
      documentedSoldWorks: [
        {
          id: 'sold-red-circular',
          image: '/images/sold_red_circular_japan.jpeg',
          title: 'Circular painting',
          isTitleConfirmed: false,
          status: 'SOLD',
          description: 'Red circular painting. Private collection, Japan.',
          collectorLocation: 'Japan',
          aspectRatio: 'square',
        },
        {
          id: 'sold-painting-spain',
          image: '/images/sold_work_spain_1.jpeg',
          title: 'Original painting',
          isTitleConfirmed: false,
          status: 'SOLD',
          description: 'Original painting. Private collection, Spain.',
          collectorLocation: 'Spain',
          aspectRatio: 'square',
        },
      ],
      privacyNote:
        'Client privacy and discretion are strictly preserved.',
    },
    creativeForestTitle: 'RELATED PROJECTS',
    creativeForest: {
      title: 'The Creative Forest',
      text: 'MY special project for kids and teens · multidisciplinary initiative exploring creative processes, nature and perception through Art, Science & STEAM Learning for Children',
      linkLabel: 'https://me-l.co/m1169ypo',
      url: 'https://me-l.co/m1169ypo',
    },
    contact: {
      email: 'reyesportas.artwork@gmail.com',
      instagramHandle: '@reyesportas__art',
      instagramUrl: 'https://www.instagram.com/reyesportas__art',
      linkedinUrl: 'https://www.linkedin.com/in/reyesartandeducation',
      linkedinHandle: 'www.linkedin.com/in/reyesartandeducation',
    },
  },
  es: {
    tagline: 'Pintura entre lo visible y lo visionario.',
    location: 'Artista afincada en España',
    manifestTitle: 'MANIFIESTO',
    manifest: [
      'Mi pintura es una puerta abierta a lo intangible, un viaje al origen de todo, donde el Akasha habla y yo simplemente escucho. Cada obra nace de una profunda conexión con lo sutil, ese espacio donde las almas se encuentran más allá de las palabras y de las formas concretas. Pintar no es una elección; es una llamada: mi alma me lo pide, mi ser lo necesita.',
      'A través de mis pinceles, materializo lo que el Todo me revela, fusionando lo abstracto y lo figurativo para tender puentes entre lo visible y lo invisible. En mi obra coexisten la niña y la adulta: la niña simboliza la pureza, la intuición y el asombro; la adulta representa la experiencia, la profundidad y la introspección. Al unirlas, busco despertar en quien observa esa conexión perdida con su propia esencia.',
      'Mi arte no es sólo un medio de expresión, sino una invitación a recordar. A recordar quiénes somos, de dónde venimos y hacia dónde vamos. Deseo que mis cuadros sean un refugio, un espejo y, al mismo tiempo, un viaje transformador.',
      'Pinto para conectar con mi propia verdad y ayudar a otros a conectar con la suya. Pinto porque creo que el arte es un vehículo poderoso para sanar, para reconectar con lo divino y para abrazar todas las dimensiones de la existencia.',
      'En cada pincelada late mi anhelo de vivir plenamente desde esta conexión, de hacer del arte mi vida y de compartir con el mundo la belleza que se manifiesta cuando damos espacio a lo trascendente.',
    ],
    artistName: 'Reyes Portas',
    instagramHandle: '@reyesportas__art',
    statementQuote: 'El dibujo fue mi brújula desde la infancia.',
    statement:
      'Mi práctica se mueve entre la figuración y la abstracción, explorando conexiones entre la vida humana, animal y vegetal a través de la pintura, los pigmentos naturales, la materia y la luz.',
    biography: [
      'El dibujo fue mi brújula desde la infancia. Mi práctica comenzó con la figura humana y se ha ido abriendo progresivamente hacia la abstracción, explorando el espacio entre lo visible y lo sentido.',
      'El color, la textura, la materia y el espacio funcionan como formas de memoria, cuerpo y aliento. En cada pieza existe una búsqueda continua de equilibrio entre el orden y el caos, la contención y el desbordamiento.',
      'La figura no siempre aparece como representación literal: puede disolverse o fundirse con árboles, raíces, animales, paisaje, materia, luz o campos abstractos.',
    ],
    educationTitle: 'Educación y Formación',
    education: [
      { title: 'Artes aplicadas al muro', institution: 'Escola Massana · Barcelona, Spain' },
      { title: 'Artistic training with Luis García Mozos', institution: 'Barcelona, Spain' },
      { title: '“El oficio de pintor”', institution: 'MEAM (Museu Europeu d’Art Modern) · 2017' },
      { title: 'Private painting classes with Luis García Mozos', institution: '2017–2019 · Barcelona, Spain' },
      { title: 'Master’s in Cultural Management', institution: 'UOC (Universitat Oberta de Catalunya)' },
    ],
    professionalExperience: {
      title: 'EXPERIENCIA PROFESIONAL',
      subtitle: 'Trayectoria y Práctica Profesional',
      items: [
        {
          role: 'Visual Artist',
          organization: 'IGOR STUDIO Galeria de ARTE — HEART FEST',
          location: 'Barcelona, España',
          period: 'Enero – Marzo 2026',
          type: 'Profesional independiente',
        },
      ],
    },
    commissionsTitle: 'Encargos',
    commissionsNote: 'Actualmente realiza obras por encargo para colecciones privadas.',
    curatorialSelections: {
      title: 'SINGULART — CURATORIAL SELECTIONS (2025–2026)',
      subtitle: 'Selecciones Curatoriales en Singulart',
      introHeading: 'Curatorial Selections on Singulart',
      intro:
        '“Mi obra ha sido seleccionada en colecciones temáticas de Singulart, reuniendo obras que exploran la humanidad, la materia, la atmósfera y lo invisible.”',
      spaces: [
        {
          id: 'space-datarte',
          name: 'Datarte',
          country: 'España (Barcelona)',
          items: [
            {
              artworkTitle: 'Reencarnation',
              collection: 'Humanidad',
              image: '/images/Painting_ReyesPortas_Reencarnation_.jpg',
            },
          ],
        },
        {
          id: 'space-loriginal',
          name: "L'Original",
          country: 'Canadá (Montreal)',
          items: [
            {
              artworkTitle: 'Reencarnation',
              collection: 'El equilibrio de lo que no se ve',
              image: '/images/Painting_ReyesPortas_Reencarnation_.jpg',
            },
            {
              artworkTitle: 'REBORN',
              collection: 'Los gestos del polvo',
              image: '/images/Sin título (53).png',
            },
            {
              artworkTitle: 'Psicopathic Mind',
              collection: 'Los silencios posados en equilibrio',
              image: '/images/Painting_ReyesPortas_Psicopathic-Mind.jpg',
            },
          ],
        },
        {
          id: 'space-attaly',
          name: 'Attaly',
          country: 'Francia (París)',
          items: [
            {
              artworkTitle: 'Purple Storm',
              collection: 'Respira el mundo',
              date: {
                en: 'November 28, 2025',
                es: '28 de noviembre de 2025',
              },
            },
          ],
        },
        {
          id: 'space-snap-collective',
          name: 'Snap Collective',
          country: 'Dinamarca (Copenhague)',
          items: [
            {
              artworkTitle: 'Hijo del Fuego — Antes del primer aliento',
              collection: 'Dar un golpe de zoom',
              date: {
                en: 'January 30, 2026',
                es: '30 de enero de 2026',
              },
              image: '/images/Imagen de WhatsApp 2025-11-17 a las 20.05.32_03340831.jpg',
            },
            {
              artworkTitle: 'Hijo del Fuego — Antes del primer aliento',
              collection: 'Manifestaciones',
              image: '/images/Imagen de WhatsApp 2025-11-17 a las 20.05.32_03340831.jpg',
            },
          ],
        },
      ],
      platformClarification:
        'Estas referencias corresponden estrictamente a selecciones curatoriales digitales de obras en la plataforma Singulart, no a exposiciones físicas ni a relaciones de representación exclusiva.',
    },
    privateCommissions: {
      title: 'OBRAS VENDIDAS',
      subtitle: 'Vendidas a coleccionistas en España y Japón.',
      statement: 'Vendidas a coleccionistas en España y Japón.',
      note: 'La pintura circular roja pertenece a un coleccionista en Japón. Las otras pinturas vendidas confirmadas de este grupo pertenecen a coleccionistas en España.',
      confirmedProjects: [
        {
          territory: 'Japón',
          count: '1 Obra',
          description: 'La pintura circular roja pertenece a un coleccionista en Japón.',
        },
        {
          territory: 'España',
          count: 'Colecciones particulares',
          description: 'Las otras pinturas vendidas confirmadas de este grupo pertenecen a coleccionistas en España.',
        },
      ],
      secondaryGalleryTitle: 'OBRAS VENDIDAS',
      secondaryGallerySubtitle: 'Archivo de Obras en Colección',
      secondaryGalleryIntro:
        'La pintura circular roja pertenece a un coleccionista en Japón. Las otras pinturas vendidas confirmadas de este grupo pertenecen a coleccionistas en España.',
      documentedSoldWorks: [
        {
          id: 'sold-red-circular',
          image: '/images/sold_red_circular_japan.jpeg',
          title: 'Pintura circular',
          isTitleConfirmed: false,
          status: 'SOLD',
          description: 'Pintura circular roja. Colección particular, Japón.',
          collectorLocation: 'Japón',
          aspectRatio: 'square',
        },
        {
          id: 'sold-painting-spain',
          image: '/images/sold_work_spain_1.jpeg',
          title: 'Pintura original',
          isTitleConfirmed: false,
          status: 'SOLD',
          description: 'Pintura original. Colección particular, España.',
          collectorLocation: 'España',
          aspectRatio: 'square',
        },
      ],
      privacyNote:
        'La privacidad y discreción de los coleccionistas se preservan estrictamente.',
    },
    creativeForestTitle: 'PROYECTOS RELACIONADOS',
    creativeForest: {
      title: 'The Creative Forest',
      text: 'MY special project for kids and teens · multidisciplinary initiative exploring creative processes, nature and perception through Art, Science & STEAM Learning for Children',
      linkLabel: 'https://me-l.co/m1169ypo',
      url: 'https://me-l.co/m1169ypo',
    },
    contact: {
      email: 'reyesportas.artwork@gmail.com',
      instagramHandle: '@reyesportas__art',
      instagramUrl: 'https://www.instagram.com/reyesportas__art',
      linkedinUrl: 'https://www.linkedin.com/in/reyesartandeducation',
      linkedinHandle: 'www.linkedin.com/in/reyesartandeducation',
    },
  },
  exhibitions: [
    {
      id: 'heart-fest-2025',
      year: '2025',
      date: '2025',
      title: 'HEART FEST',
      institution: 'IGOR STUDIO Galeria de ARTE',
      location: 'Barcelona, Spain',
      type: 'Visual Artist · Project',
      description: {
        en: 'HEART FEST at IGOR STUDIO Galeria de ARTE in Barcelona. Presentation of original painting and visual arts project exploring consciousness, emotional resonance, and spatial dialogue.',
        es: 'HEART FEST en IGOR STUDIO Galeria de ARTE en Barcelona. Presentación de obra pictórica y proyecto de artes visuales explorando la conciencia, la resonancia emocional y el diálogo espacial.',
      },
    },
    {
      id: 'sky-gallery-2018',
      year: '2018',
      date: {
        en: 'May – June 2018',
        es: 'Mayo – Junio 2018',
      },
      title: 'Exposición colectiva',
      institution: 'Sky Gallery Barcelona',
      location: 'Barcelona, Spain',
      type: 'Group Exhibition',
      description: {
        en: 'A curated group showcase in the Gràcia art district of Barcelona, bringing together emerging painters exploring the boundary between raw abstract matter and delicate human presence.',
        es: 'Muestra colectiva comisariada en el distrito artístico de Gràcia en Barcelona, reuniendo a pintores emergentes que exploran el límite entre la materia abstracta y la presencia humana.',
      },
      images: [
        {
          url: '/images/Painting_ReyesPortas_Psicopathic-Mind.jpg',
          title: 'Psicopathic Mind',
          caption: {
            en: 'Amanecer',
            es: 'Amanecer',
          },
          aspectRatio: 'vertical',
        },
        {
          url: '/images/sold_cat_artwork.jpeg',
          title: 'Cat Artwork (Sold)',
          caption: {
            en: 'Photograph of cat artwork, sold to a private collector',
            es: 'Fotografía de la obra del gato, vendida a coleccionista particular',
          },
          aspectRatio: 'vertical',
        },
      ],
    },
    {
      id: 'escola-moli-finestrelles-2017',
      year: '2017',
      date: {
        en: 'October 2017',
        es: 'Octubre 2017',
      },
      title: 'Escola Molí de Finestrelles',
      institution: 'Escola Molí de Finestrelles',
      location: 'Barcelona, Spain',
      type: 'Awarded Mural Project',
      description: {
        en: 'Selected as the winning proposal in the public art competition for the civic regeneration of Escola Molí de Finestrelles in Barcelona. An extensive mural intervention transforming architectural surfaces through organic botanical flows.',
        es: 'Propuesta ganadora en el certamen de arte público para la regeneración cívica de Escola Molí de Finestrelles en Barcelona. Una extensa intervención mural que transforma las superficies arquitectónicas mediante ritmos orgánicos y botánicos.',
      },
      sourceLink: {
        url: 'https://www.facebook.com/photo/?fbid=2181823532049374&set=ms.c.eJxFzdsJwEAMA8GOgiW~%3BdP03FjgT53cQK0IQPUCL46qHA2kXuj8ISxebtuBqlOVC8i5MCxg4Cz7R~_Btzu1C8UccLJCIemQ~-~-.bps.a.2181823385382722',
        label: {
          en: 'View original documentation →',
          es: 'Ver documentación original →',
        },
      },
    },
    {
      id: 'mural-uab-2017',
      year: '2017',
      date: {
        en: 'March – April 2017',
        es: 'Marzo – Abril 2017',
      },
      title: 'Mural en Facultad de Ciencias Políticas, UAB',
      institution: 'Universitat Autònoma de Barcelona',
      location: 'Bellaterra, Barcelona, Spain',
      type: 'Public Mural',
      description: {
        en: 'Permanent institutional mural commissioned by the Faculty of Political Science and Sociology at the Universitat Autònoma de Barcelona (UAB). Participatory mural project completed in July 2017 exploring collective voice and civic space.',
        es: 'Mural institucional permanente por encargo de la Facultad de Ciencias Políticas y Sociología de la Universitat Autònoma de Barcelona (UAB). Proyecto mural participativo culminado en julio de 2017 explorando la voz colectiva y el espacio cívico.',
      },
      sourceLink: {
        url: 'https://www.uab.cat/web/sala-de-prensa/detalle-noticia/estudiantes-de-la-escuela-massana-crean-una-pintura-mural-en-la-uab-despues-de-un-proceso-participativo-1345667994339.html?noticiaid=1345734547233',
        label: {
          en: 'Read the UAB article →',
          es: 'Leer artículo en UAB →',
        },
      },
    },
    {
      id: 'meam-2017',
      year: '2017',
      date: {
        en: 'January 2017',
        es: 'Enero 2017',
      },
      title: '“El oficio de pintor”',
      institution: 'MEAM (Museu Europeu d’Art Modern)',
      location: 'Barcelona, Spain',
      type: 'Program & Exhibition',
      description: {
        en: 'Presented within the program at the Museu Europeu d’Art Modern (MEAM) in Barcelona. A dedicated survey demonstrating traditional oil and pigment preparations alongside contemporary mixed media methodologies.',
        es: 'Presentada dentro del programa en el Museu Europeu d’Art Modern (MEAM) de Barcelona. Una muestra divulgativa y técnica sobre preparación tradicional de pigmentos y metodologías contemporáneas de técnicas mixtas.',
      },
      sourceLink: {
        url: 'https://www.youtube.com/watch?v=Wu86d25yVCo',
        label: {
          en: 'Watch the video →',
          es: 'Ver el vídeo →',
        },
      },
    },
    {
      id: 'tapies-2016',
      year: '2016',
      date: {
        en: 'November 2016',
        es: 'Noviembre 2016',
      },
      title: '“Diumenges”',
      institution: 'Fundació Antoni Tàpies',
      location: 'Barcelona, Spain',
      type: 'Artistic Intervention · Exhibition Installation',
      description: {
        en: 'Exhibition installation and artistic intervention associated with “Diumenges” hosted within the Fundació Antoni Tàpies in Barcelona. This entry documents Reyes Portas’ exhibition installation and intervention work.',
        es: 'Instalación de exposición e intervención artística vinculada a “Diumenges” acogida en los espacios de la Fundació Antoni Tàpies en Barcelona. Documenta la labor de montaje e intervención de Reyes Portas.',
      },
      sourceLink: {
        url: 'https://museutapies.org/exposicio/oriol-vilanova-diumenge/',
        label: {
          en: 'View exhibition documentation →',
          es: 'Ver documentación de la exposición →',
        },
      },
    },
  ] as ExhibitionRecord[],
};
