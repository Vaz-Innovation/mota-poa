import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import joseMota from "@/assets/jose-mota.jpg";
import rafaelMota from "@/assets/rafael-mota.jpg";
import maristelaMota from "@/assets/maristela-mota.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Lawyers = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  
  const lawyers = [
    {
      name: "Dr. José Pinto da Mota Filho",
      specialty: "Direito Previdenciário",
      oab: "OAB/RS 22.378",
      email: "Josemota@mota.adv.br",
      initials: "JM",
      image: joseMota
    },
    {
      name: "Dra. Maristela Pinto da Mota",
      specialty: "Direito Social",
      oab: "OAB/RS 40.523",
      email: "maristela@mota.adv.br",
      initials: "MM",
      image: maristelaMota
    },
    {
      name: "Dr. Rafael Augusto Dantas Mota",
      specialty: "Direito do Trabalho",
      oab: "OAB/RS 138.765",
      email: "rafael@mota.adv.br",
      initials: "RM",
      image: rafaelMota
    }
  ];

  return (
    <section id="advogados" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('lawyers.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('lawyers.intro')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons - Hidden on Mobile, Visible on Desktop */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-background/95 backdrop-blur-sm border-2 border-accent/30 hover:bg-accent hover:border-accent shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-background/95 backdrop-blur-sm border-2 border-accent/30 hover:bg-accent hover:border-accent shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Embla Carousel with Touch Gestures */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6 -ml-4 md:-ml-0">
              {lawyers.map((lawyer, index) => (
                <div
                  key={index}
                  className="flex-[0_0_85%] min-w-0 pl-4 md:pl-0 sm:flex-[0_0_70%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] touch-pan-y"
                >
                  <Card 
                    className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/20 border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] select-none h-full"
                    onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="relative mb-6 overflow-hidden rounded-full">
                        <Avatar className="w-40 h-40 md:w-48 md:h-48 ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all duration-500">
                          <AvatarImage 
                            src={lawyer.image} 
                            alt={lawyer.name}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <AvatarFallback className="text-3xl bg-accent text-accent-foreground">
                            {lawyer.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <h3 className="text-2xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {lawyer.name}
                      </h3>

                      <p className="text-base font-medium text-accent mb-3">
                        {lawyer.specialty}
                      </p>

                      <p className="text-sm text-muted-foreground/80 mb-4">
                        {lawyer.oab}
                      </p>

                      <a 
                        href={`mailto:${lawyer.email}`}
                        className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 group/link"
                      >
                        <Mail className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        <span className="group-hover/link:underline">{lawyer.email}</span>
                      </a>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots - Mobile Only */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {lawyers.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-border hover:bg-accent/50"
                }`}
                aria-label={`Ir para sócio ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Hint - Mobile Only */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden opacity-60 animate-pulse">
            <span className="text-sm text-muted-foreground">← Deslize para navegar →</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lawyers;
