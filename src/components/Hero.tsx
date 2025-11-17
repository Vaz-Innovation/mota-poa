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
import { useLanguage } from "@/contexts/LanguageContext";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";

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
      title: t('hero.banner1.title'),
      description: t('hero.banner1.description'),
      buttonText: t('hero.banner1.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B5561995362668&text=Gostaria%20de%20saber%20mais%20sobre%20consultoria%20jur%C3%ADdica",
      image: heroBanner1,
    },
    {
      id: 2,
      title: t('hero.banner2.title'),
      description: t('hero.banner2.description'),
      buttonText: t('hero.banner2.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B5561995362668&text=Preciso%20de%20assist%C3%AAncia%20em%20Direito%20do%20Trabalho",
      image: heroBanner2,
    },
    {
      id: 3,
      title: t('hero.banner3.title'),
      description: t('hero.banner3.description'),
      buttonText: t('hero.banner3.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B5561995362668&text=Gostaria%20de%20agendar%20uma%20consulta",
      image: heroBanner3,
    },
    {
      id: 4,
      title: t('hero.banner4.title'),
      description: t('hero.banner4.description'),
      buttonText: t('hero.banner4.button'),
      buttonLink: "https://api.whatsapp.com/send/?phone=%2B5561995362668&text=Quero%20saber%20mais%20sobre%20os%20servi%C3%A7os",
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
    <section id="inicio" className="relative min-h-screen flex items-center pt-16">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-center">
                  <div className="max-w-3xl">
                    <h1 
                      className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: current === index ? '200ms' : '0ms' }}
                    >
                      {banner.title}
                    </h1>
                    <p 
                      className={`text-lg md:text-xl text-white/90 mb-8 leading-relaxed transition-all duration-700 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: current === index ? '400ms' : '0ms' }}
                    >
                      {banner.description}
                    </p>
                    <div
                      className={`transition-all duration-700 ${
                        current === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: current === index ? '600ms' : '0ms' }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        <a
                          href={banner.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
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
        <CarouselPrevious className="left-4 lg:left-8 bg-white/20 hover:bg-white/30 text-white border-white/30" />
        <CarouselNext className="right-4 lg:right-8 bg-white/20 hover:bg-white/30 text-white border-white/30" />
        
        {/* Indicadores de Navegação (Dots) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-12 h-3 bg-accent"
                  : "w-3 h-3 bg-white/50 hover:bg-white/70"
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
