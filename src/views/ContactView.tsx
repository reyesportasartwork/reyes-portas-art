import React, { useState, useEffect } from 'react';
import { aboutData } from '../data/about';
import { useLanguage } from '../context/LanguageContext';

interface ContactViewProps {
  initialSubject?: string;
  initialMessage?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialSubject = '',
  initialMessage = '',
}) => {
  const { lang } = useLanguage();
  const contactInfo = aboutData.en.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: initialMessage || '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage,
      }));
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoSubject = encodeURIComponent(
    `[Reyes Portas Studio] ${formData.name || (lang === 'es' ? 'Consulta web' : 'Website Visitor')}`
  );
  const mailtoBody = encodeURIComponent(
    `Name / Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMessage / Mensaje:\n${formData.message}`
  );
  const directMailtoUrl = `mailto:${contactInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="w-full bg-[#FBF9F5] text-[#1C1C1A]">
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-32 space-y-16">
        {/* Title */}
        <div className="border-b border-[#1C1C1A]/8 pb-4 flex justify-between items-baseline">
          <h1 className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-light text-[#1C1C1A]">
            {lang === 'es' ? 'CONTACTO' : 'CONTACT'}
          </h1>
          <span className="text-[11px] tracking-[0.2em] text-[#8F8C84] uppercase">
            {lang === 'es' ? 'Estudio y Consultas' : 'Studio & Enquiries'}
          </span>
        </div>

        {/* Minimal Content */}
        <div className="max-w-2xl mx-auto space-y-12">
          <p className="font-serif italic text-lg sm:text-xl text-[#5C5A54] leading-relaxed text-center font-light">
            {lang === 'es'
              ? 'Para consultas de obras originales, encargos, colaboraciones o proyectos expositivos:'
              : 'For artwork enquiries, commissions, collaborations or exhibitions:'}
          </p>

          {/* Coordinates */}
          <div className="space-y-4 text-center">
            <div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-serif text-2xl sm:text-3xl text-[#1C1C1A] hover:underline underline-offset-8 block"
              >
                {contactInfo.email}
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm tracking-[0.16em] text-[#5C5A54]">
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1C1C1A] transition-colors"
              >
                Instagram: {contactInfo.instagramHandle} ↗
              </a>
              <span className="hidden sm:inline text-[#8F8C84]/40">·</span>
              <a
                href={contactInfo.linkedinUrl || 'https://www.linkedin.com/in/reyesartandeducation'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1C1C1A] transition-colors"
              >
                LinkedIn: {contactInfo.linkedinHandle || 'www.linkedin.com/in/reyesartandeducation'} ↗
              </a>
            </div>
          </div>

          {/* Direct Simple Form */}
          <div className="pt-10 border-t border-[#1C1C1A]/8">
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <p className="font-serif text-2xl text-[#1C1C1A]">
                  {lang === 'es'
                    ? 'Gracias. Tu mensaje ha sido preparado.'
                    : 'Thank you. Your message has been prepared.'}
                </p>
                <div className="pt-2">
                  <a
                    href={directMailtoUrl}
                    className="inline-block py-2.5 px-6 border border-[#1C1C1A] text-xs tracking-[0.2em] uppercase text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#FBF9F5] transition-colors"
                  >
                    {lang === 'es'
                      ? 'Enviar directamente desde tu gestor de correo ↗'
                      : 'Send directly via Email Client ↗'}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-[11px] tracking-[0.18em] uppercase text-[#8F8C84]">
                    {lang === 'es' ? 'Nombre' : 'Name'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F4F0EA]/50 border border-[#1C1C1A]/10 px-4 py-3 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[11px] tracking-[0.18em] uppercase text-[#8F8C84]">
                    {lang === 'es' ? 'Correo electrónico' : 'Email'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F4F0EA]/50 border border-[#1C1C1A]/10 px-4 py-3 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-[11px] tracking-[0.18em] uppercase text-[#8F8C84]">
                    {lang === 'es' ? 'Mensaje' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'es'
                        ? 'Consultar sobre una obra original, estampa gráfica o proyecto...'
                        : 'Inquire about an artwork, print or project...'
                    }
                    className="w-full bg-[#F4F0EA]/50 border border-[#1C1C1A]/10 px-4 py-3 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A] resize-y"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1C1C1A] text-[#FBF9F5] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#C5A059] hover:text-[#1C1C1A] transition-colors cursor-pointer shadow-sm"
                  >
                    {lang === 'es' ? 'ENVIAR MENSAJE' : 'SEND MESSAGE'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
