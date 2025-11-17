import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";
import heroBanner4 from "@/assets/hero-banner-4.jpg";
import logoMota from "@/assets/logo-mota-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

const Hero = () => {
  const { t } = useLanguage();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const banners = [
    {
      id: 1,
      subtitle: t('hero.banner1.subtitle'),
      title: t('hero.banner1.title'),
      description: t('hero.banner1.description'),
      buttonText: t('hero.banner1.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B61995362668&text=Gostaria%20de%20saber%20mais%20sobre%20consultoria%20jur%C3%ADdica&type=phone_number&app_absent=0",
      image: heroBanner1,
    },
    {
      id: 2,
      subtitle: t('hero.banner2.subtitle'),
      title: t('hero.banner2.title'),
      description: t('hero.banner2.description'),
      buttonText: t('hero.banner2.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B61995362668&text=Preciso%20de%20assist%C3%AAncia%20em%20Direito%20do%20Trabalho&type=phone_number&app_absent=0",
      image: heroBanner2,
    },
    {
      id: 3,
      subtitle: t('hero.banner3.subtitle'),
      title: t('hero.banner3.title'),
      description: t('hero.banner3.description'),
      buttonText: t('hero.banner3.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B61995362668&text=Gostaria%20de%20agendar%20uma%20consulta&type=phone_number&app_absent=0",
      image: heroBanner3,
    },
    {
      id: 4,
      subtitle: t('hero.banner4.subtitle'),
      title: t('hero.banner4.title'),
      description: t('hero.banner4.description'),
      buttonText: t('hero.banner4.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B61995362668&text=Quero%20saber%20mais%20sobre%20os%20servi%C3%A7os&type=phone_number&app_absent=0",
      image: heroBanner4,
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-screen"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-screen">
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className="h-screen">
              <div className="relative h-full w-full">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/60" />
                </div>

                {/* Logo Centralizada */}
                <div className="absolute top-16 md:top-20 left-0 right-0 z-20 flex justify-center px-4">
                  <div className={`transition-all duration-800 ${
                    current === index 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 -translate-y-8 scale-95'
                  }`}>
                    <img 
                      src={logoMota} 
                      alt="Mota & Advogados Associados" 
                      className="h-32 md:h-44 lg:h-56 xl:h-64 w-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] brightness-0 invert animate-fade-in"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 lg:px-8 relative z-30 h-full flex items-center">
                  <div className="max-w-2xl ml-16 lg:ml-24 space-y-6">
                    {/* Subtitle */}
                    <p 
                      className={`text-sm md:text-base font-light text-white/80 tracking-widest uppercase transition-all duration-800 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: current === index ? '100ms' : '0ms' }}
                    >
                      {banner.subtitle}
                    </p>
                    
                    {/* Main Title */}
                    <h1 
                      className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-800 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: current === index ? '250ms' : '0ms' }}
                    >
                      {banner.title}
                    </h1>
                    
                    {/* Description */}
                    <p 
                      className={`text-base md:text-lg text-white/90 font-light leading-relaxed transition-all duration-800 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: current === index ? '400ms' : '0ms' }}
                    >
                      {banner.description}
                    </p>
                    
                    {/* CTA Button */}
                    <div
                      className={`transition-all duration-800 pt-4 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: current === index ? '550ms' : '0ms' }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="text-base md:text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      >
                        <a
                          href={banner.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('hero_banner', {
                            banner_id: banner.id,
                            banner_title: banner.title,
                          })}
                        >
                          {banner.buttonText}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 lg:left-8 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110" />
        <CarouselNext className="right-4 lg:right-8 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110" />
        
        {/* Indicadores de Navegação (Dots) */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 backdrop-blur-sm bg-black/10 px-4 py-2 rounded-full">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-10 h-2.5 bg-white shadow-lg"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default Hero;
