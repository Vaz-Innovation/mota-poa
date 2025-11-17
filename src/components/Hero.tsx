import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-brasilia.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Brasília - Capital da República"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block text-bronze">{t('hero.title')}</span>
            {t('hero.subtitle')}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-white"
            >
              <a
                href="https://api.whatsapp.com/send/?phone=%2B5561995362668&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('hero.button')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
