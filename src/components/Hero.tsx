import { Button } from "@/components/ui/button";
import logoMota from "@/assets/mota-logo-new.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-[#FF7F3E]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center py-20">
        {/* Logo Centralizada */}
        <div className="flex justify-center mb-12 md:mb-16">
          <img 
            src={logoMota} 
            alt="Mota & Advogados Associados" 
            className="h-32 md:h-44 lg:h-56 xl:h-64 w-auto drop-shadow-2xl animate-fade-in"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Content */}
        <div className="max-w-2xl ml-0 md:ml-16 lg:ml-24 space-y-6 animate-fade-in">
          {/* Subtitle */}
          <p className="text-sm md:text-base font-light text-white/90 tracking-widest uppercase">
            {t('hero.banner1.subtitle')}
          </p>
          
          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('hero.banner1.title')}
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-lg text-white/90 font-light leading-relaxed">
            {t('hero.banner1.description')}
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="text-base md:text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#FF7F3E] rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <a
                href="https://wa.me/5561995362668?text=Gostaria%20de%20saber%20mais%20sobre%20consultoria%20jur%C3%ADdica"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero_banner', {
                  banner_id: 1,
                  banner_title: t('hero.banner1.title'),
                })}
              >
                {t('hero.banner1.button')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
