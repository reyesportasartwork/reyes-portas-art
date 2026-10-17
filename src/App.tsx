import { useState, useEffect } from 'react';
import { Header, ActiveView } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumb } from './components/Breadcrumb';
import { HomeView } from './views/HomeView';
import { WorkView } from './views/WorkView';
import { ExhibitionsView } from './views/ExhibitionsView';
import { PrintsView } from './views/PrintsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { ArtworkModal } from './components/ArtworkModal';
import { Artwork, PrintItem, PortfolioCategory } from './types';
import { artworksData } from './data/artworks';
import { printsData } from './data/prints';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [contactSubject, setContactSubject] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [portfolioCategory, setPortfolioCategory] = useState<PortfolioCategory | 'ALL'>('ALL');

  // Synchronize document title with active view
  useEffect(() => {
    const titles: Record<ActiveView, string> = {
      home: 'Reyes Portas',
      portfolio: 'Portfolio — Reyes Portas',
      prints: 'Prints — Reyes Portas',
      about: 'About — Reyes Portas',
      exhibitions: 'Exhibitions — Reyes Portas',
      contact: 'Contact — Reyes Portas',
    };

    document.title = titles[activeView] || 'Reyes Portas';
  }, [activeView]);

  const handleOpenArtworkModal = (artworkId: string) => {
    const foundArtwork = artworksData.find((a) => a.id === artworkId);
    if (foundArtwork) {
      setSelectedArtwork(foundArtwork);
      return;
    }
    const foundPrint = printsData.find((p) => p.id === artworkId);
    if (foundPrint) {
      const matchingArt = artworksData.find(
        (a) => a.title.toLowerCase() === foundPrint.title.toLowerCase()
      );
      if (matchingArt) {
        setSelectedArtwork(matchingArt);
      } else {
        setSelectedArtwork({
          id: foundPrint.id,
          image: foundPrint.image,
          title: foundPrint.title,
          year: foundPrint.year,
          medium: foundPrint.medium || foundPrint.edition,
          dimensions: foundPrint.dimensions,
          aspectRatio: foundPrint.aspectRatio,
          category: 'ABSTRACT / MATTER',
        });
      }
    }
  };

  const handleInquireArtwork = (artwork: Artwork) => {
    const subject = `Inquiry: ${artwork.title || 'Selected Artwork'}`;
    const message = `Hello Reyes,\n\nI am interested in learning more about the availability and details of "${artwork.title}" (${artwork.year}, ${artwork.dimensions}).\n\nThank you.`;
    setContactSubject(subject);
    setContactMessage(message);
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquirePrint = (print: PrintItem) => {
    const subject = `Print Inquiry: ${print.title}`;
    const message = `Hello Reyes,\n\nI am interested in acquiring an archival print of "${print.title}". Could you please provide information on edition availability and acquisition details?\n\nThank you.`;
    setContactSubject(subject);
    setContactMessage(message);
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1C1A]">
      {/* Contemporary artist navigation header */}
      <Header activeView={activeView} setActiveView={setActiveView} />

      {/* Subtle breadcrumb navigation on sub-pages (Portfolio, Prints, Exhibitions) */}
      <Breadcrumb
        activeView={activeView}
        onNavigate={setActiveView}
        categoryFilter={activeView === 'portfolio' && portfolioCategory !== 'ALL' ? portfolioCategory : null}
        onResetCategoryFilter={() => setPortfolioCategory('ALL')}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeView === 'home' && (
          <HomeView setActiveView={setActiveView} />
        )}

        {activeView === 'portfolio' && (
          <WorkView
            setActiveView={setActiveView}
            onOpenArtworkModal={handleOpenArtworkModal}
            selectedCategory={portfolioCategory}
            onCategoryChange={setPortfolioCategory}
          />
        )}

        {activeView === 'prints' && (
          <PrintsView
            setActiveView={setActiveView}
            onSelectPrintToInquire={handleInquirePrint}
            onOpenArtworkModal={handleOpenArtworkModal}
          />
        )}

        {activeView === 'about' && (
          <AboutView setActiveView={setActiveView} />
        )}

        {activeView === 'exhibitions' && (
          <ExhibitionsView setActiveView={setActiveView} />
        )}

        {activeView === 'contact' && (
          <ContactView
            initialSubject={contactSubject}
            initialMessage={contactMessage}
          />
        )}
      </main>

      {/* Artwork High-Res Detail Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          allArtworks={artworksData}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
          onInquire={handleInquireArtwork}
        />
      )}

      {/* Minimal artist footer */}
      <Footer activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
