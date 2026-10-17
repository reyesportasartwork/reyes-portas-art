import React, { useState } from 'react';
import { ActiveView } from './Header';
import { aboutData } from '../data/about';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ activeView, setActiveView }) => {
  const { lang } = useLanguage();
  const contactInfo = aboutData.en.contact;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedbackMessage(
        lang === 'es'
          ? 'Por favor, introduce un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('reyes_portas_subscribers') || '[]');
        if (!existing.includes(email.toLowerCase())) {
          existing.push(email.toLowerCase());
          localStorage.setItem('reyes_portas_subscribers', JSON.stringify(existing));
        }
      } catch {
        // Fallback
      }

      setStatus('success');
      setFeedbackMessage(
        lang === 'es'
          ? 'Gracias por suscribirte. Recibirás avisos exclusivos sobre nuevas series y exposiciones.'
          : 'Thank you for subscribing. You will receive private announcements regarding new series and exhibitions.'
      );
      setEmail('');
    }, 400);
  };

  return (
    <footer className="w-full border-t border-[#1C1C1A]/10 bg-[#FBF9F5] mt-auto">
      {/* 
        Discreet Newsletter Subscription Form for Collectors
        Allows collectors and patrons to stay updated on new series and exhibitions.
      */}
      <div className="border-b border-[#1C1C1A]/8 py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
              {lang === 'es' ? 'BOLETÍN PARA COLECCIONISTAS' : 'COLLECTOR UPDATES'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1C1C1A] tracking-wide mb-2.5">
              {lang === 'es'
                ? 'Mantente al día sobre nuevas series y exposiciones'
                : 'Stay updated on new series and exhibitions'}
            </h3>
            <p className="text-xs font-light text-[#5C5A54] leading-relaxed tracking-wider mb-6 max-w-xl">
              {lang === 'es'
                ? 'Recibe avisos directos de estudio sobre la presentación de nuevas obras, ediciones gráficas y futuras exposiciones en galerías y museos.'
                : 'Receive direct studio announcements regarding the unveiling of new series, archival print editions, and upcoming gallery and museum exhibitions.'}
            </p>

            {status === 'success' ? (
              <div className="p-4 bg-[#F4F0EA] border border-[#C5A059]/40 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <p className="text-xs text-[#1C1C1A] tracking-wider font-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>{feedbackMessage}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-[11px] text-[#8F8C84] hover:text-[#1C1C1A] uppercase tracking-[0.16em] underline text-left cursor-pointer"
                >
                  {lang === 'es' ? 'Añadir otro email' : 'Add another email'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3 max-w-lg">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {lang === 'es' ? 'Correo electrónico' : 'Email address'}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={lang === 'es' ? 'Introduce tu correo electrónico' : 'Enter your email address'}
                    className="w-full px-4 py-2.5 text-xs tracking-wider bg-transparent border border-[#1C1C1A]/20 focus:border-[#C5A059] text-[#1C1C1A] placeholder-[#8F8C84] transition-colors focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-6 py-2.5 bg-[#1C1C1A] text-[#FBF9F5] text-xs tracking-[0.2em] uppercase hover:bg-[#C5A059] hover:text-[#1C1C1A] transition-colors disabled:opacity-50 cursor-pointer shrink-0 font-light"
                  >
                    {status === 'submitting'
                      ? (lang === 'es' ? 'Enviando...' : 'Subscribing...')
                      : (lang === 'es' ? 'Suscribirme' : 'Subscribe')}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-700 tracking-wider">
                    {feedbackMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Quiet Footer Coordinates */}
      <div className="py-10 md:py-14">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-baseline gap-8 text-xs tracking-wider text-[#8F8C84]">
          {/* Artist Identification */}
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className="font-serif text-lg text-[#1C1C1A] tracking-[0.2em] uppercase hover:text-[#5C5A54] cursor-pointer"
            >
              REYES PORTAS
            </button>
            <p className="text-[11px] font-light text-[#8F8C84]">
              {lang === 'es' ? 'Arte Contemporáneo' : 'Contemporary Fine Art'}
            </p>
          </div>

          {/* Quiet navigation */}
          <div className="flex flex-wrap gap-6 text-[11px] tracking-[0.2em] uppercase text-[#5C5A54] font-light">
            <button onClick={() => handleNav('portfolio')} className="hover:text-[#1C1C1A] cursor-pointer">
              {lang === 'es' ? 'PORTAFOLIO' : 'PORTFOLIO'}
            </button>
            <button onClick={() => handleNav('prints')} className="hover:text-[#1C1C1A] cursor-pointer">
              PRINTS
            </button>
            <button onClick={() => handleNav('about')} className="hover:text-[#1C1C1A] cursor-pointer">
              {lang === 'es' ? 'SOBRE MÍ' : 'ABOUT'}
            </button>
            <button onClick={() => handleNav('exhibitions')} className="hover:text-[#1C1C1A] cursor-pointer">
              {lang === 'es' ? 'EXPOSICIONES' : 'EXHIBITIONS'}
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-[#1C1C1A] cursor-pointer">
              {lang === 'es' ? 'CONTACTO' : 'CONTACT'}
            </button>
          </div>

          {/* Studio Direct Coordinate */}
          <div className="space-y-1 text-left md:text-right font-light text-[11px]">
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-[#1C1C1A] hover:underline block"
            >
              {contactInfo.email}
            </a>
            <p>
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1C1C1A]"
              >
                Instagram: {contactInfo.instagramHandle} ↗
              </a>
            </p>
            <p>
              <a
                href={contactInfo.linkedinUrl || 'https://www.linkedin.com/in/reyesartandeducation'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1C1C1A]"
              >
                LinkedIn: {contactInfo.linkedinHandle || 'www.linkedin.com/in/reyesartandeducation'} ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
