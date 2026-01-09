import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  Users,
  Wallet,
  Building2,
  Scale,
  ShieldAlert,
  Vote,
  Landmark,
  Home,
  Heart,
  Gavel,
  Handshake,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface PracticeArea {
  icon: any;
  key: string;
}

const PracticeAreas = () => {
  const { t } = useLanguage();
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
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

  const areas: PracticeArea[] = [
    { icon: Building2, key: "administrative" },
    { icon: Briefcase, key: "labor" },
    { icon: Users, key: "union" },
    { icon: Wallet, key: "socialSecurity" },
    { icon: Scale, key: "constitutional" },
    { icon: ShieldAlert, key: "criminal" },
    { icon: Vote, key: "electoral" },
    { icon: Landmark, key: "superiorCourts" },
    { icon: Home, key: "realEstate" },
    { icon: Heart, key: "family" },
    { icon: Gavel, key: "publicTreasury" },
    { icon: Handshake, key: "mediation" },
    { icon: Receipt, key: "taxBusiness" },
  ];

  return (
    <section id="areas" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('practiceAreas.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('practiceAreas.subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
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
              {areas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div
                    key={index}
                    className="flex-[0_0_85%] min-w-0 pl-4 md:pl-0 sm:flex-[0_0_70%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] touch-pan-y"
                  >
                    <Card
                      className="cursor-pointer transition-all duration-500 bg-background border-border group relative overflow-hidden hover-lift h-full select-none"
                      onClick={() => setSelectedArea(area)}
                      onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                      onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      <CardContent className="p-8 relative z-10">
                        {/* Icon container with enhanced hover effect */}
                        <div className="relative mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                            <Icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          {/* Floating shadow effect */}
                          <div className="absolute inset-0 w-20 h-20 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300 min-h-[3.5rem]">
                          {t(`practiceAreas.areas.${area.key}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-5 leading-relaxed">
                          {t(`practiceAreas.areas.${area.key}.description`)}
                        </p>
                        
                        {/* Call to action with arrow animation */}
                        <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                          <span>{t('practiceAreas.learnMore')}</span>
                          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Dots - Mobile Only */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {areas.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-border hover:bg-accent/50"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Hint - Mobile Only, fades out after first interaction */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden opacity-60 animate-pulse">
            <span className="text-sm text-muted-foreground">{t('practiceAreas.swipeHint')}</span>
          </div>
        </div>

        <Dialog open={selectedArea !== null} onOpenChange={() => setSelectedArea(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedArea && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-primary mb-2">
                    {t(`practiceAreas.areas.${selectedArea.key}.title`)}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-4 whitespace-pre-line">
                    {t(`practiceAreas.areas.${selectedArea.key}.details`)}
                  </DialogDescription>
                </DialogHeader>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PracticeAreas;