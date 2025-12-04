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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

interface PracticeArea {
  icon: any;
  title: string;
  description: string;
  details: string;
}

const PracticeAreas = () => {
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
    {
      icon: Briefcase,
      title: "Direito do Trabalho Individual e Coletivo",
      description: "Reclamatórias trabalhistas e acompanhamento processual",
      details:
        "Reclamatórias trabalhistas (Horas-extras; Periculosidade/insalubridade; Promoções; Adicional de transferência; Vinculo empregatício; Estabilidade de gestante; Pedido de complementação da aposentadoria; Multa 40% FGTS; Função gratificada; Acidente de trabalho), acompanhamento em audiências, medidas cautelares, contestações, acompanhamento de todos os recursos no âmbito do TRT 4ª e 10ª Regiões e TST.",
    },
    {
      icon: Users,
      title: "Direito Sindical",
      description: "Assessoria completa para entidades sindicais",
      details:
        "Registro sindical e controvérsias sindicais, acordos, convenções e negociações coletivas e assessoramento às entidades sindicais.",
    },
    {
      icon: Wallet,
      title: "Direito Previdenciário",
      description: "Concessão e revisão de benefícios previdenciários",
      details:
        "Processos Administrativos - processo inicial junto ao INSS, acompanhamento, apresentação de defesas e recursos administrativos; Concessão de Benefícios - propositura de ação visando à concessão de benefícios previdenciários. Revisionais de Aposentadoria e Benefícios Previdenciários. Mandado de Segurança - impetração de mandado de segurança visando o reconhecimento dos direitos dos clientes em face de atos ilegais e arbitrários cometidos por agentes públicos, que não reconhecem o direito ao recebimento de pensão ou aposentadoria.\n\nProcessos Judiciais - processos negados pelo INSS dos seguintes benefícios: AUXILIO-DOENÇA, APOSENTADORIA POR IDADE, APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO, APOSENTADORIA POR INVALIDEZ, PENSÃO POR MORTE, SALÁRIO MATERNIDADE, AUXILIO RECLUSÃO E ACIDENTE DO TRABALHO.\n\nAinda, aposentados e pensionistas da União, Distrito Federal, Estados, Municípios e do INSS têm assessoria completa para revisão de seus benefícios. Realizamos estudos, análise dos planos de benefícios instituídos por fundos de pensão e do sistema de previdência complementar com ênfase nos aspectos jurídicos, tributários, com orientação para entidades associativas e sindicais.",
    },
    {
      icon: Building2,
      title: "Direito Administrativo",
      description: "Defesa em processos administrativos e licitações",
      details:
        "Regime jurídico único dos servidores públicos federais, autarquias e fundações públicas – RJU – Lei nº 8.112/90; Licitações – Lei nº 8.666/93; Defesa administrativa em sindicâncias e processos administrativos tanto em matéria disciplinar como de licitações; Atuação perante o Tribunal de Contas da União em todas as matérias do âmbito de sua competência; Regime jurídico de servidores estaduais, municipais, e ex-territórios.",
    },
    {
      icon: Scale,
      title: "Direito Constitucional",
      description: "Elaboração de ADI e recursos extraordinários",
      details:
        "Ação direta de inconstitucionalidade, para entidades legitimadas perante o Supremo Tribunal Federal; Petições para intervenção como Amicus Curie; Elaboração de Recursos Extraordinários e demais recursos e ações originárias perante o Supremo Tribunal Federal.",
    },
    {
      icon: ShieldAlert,
      title: "Direito Penal",
      description: "Habeas Corpus e recursos criminais",
      details:
        "Impetração e acompanhamento de Habeas Corpus ou Recurso em Habeas Corpus perante a Justiça Federal, Tribunais Regionais Federais, Superior Tribunal de Justiça, Supremo Tribunal Federal, Tribunal de Justiça do Rio Grande do Sul e Distrito Federal.",
    },
    {
      icon: Vote,
      title: "Direito Eleitoral",
      description: "Assessoria eleitoral completa",
      details:
        "Assessoria eleitoral a partidos, candidatos, elaboração de recursos, sustentação oral e demais providências de ordem administrativa perante Tribunais Regionais Eleitorais e Tribunal Superior Eleitoral.",
    },
    {
      icon: Landmark,
      title: "Tribunais Superiores",
      description: "Atuação em Brasília junto aos Tribunais Superiores",
      details:
        "A partir da nossa forte atuação em Brasília atuamos como representantes de escritórios de advocacia de inúmeros estados e até do exterior, diligenciando processos, protocolando documentos, elaborando peças processuais urgentes e realizando sustentação oral sempre que solicitado em todos os Tribunais Superiores lá localizados.",
    },
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
            Áreas de Atuação
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Especializados em Direito Constitucional e atuantes em diversas áreas do Direito.
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
                          {area.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-5 leading-relaxed">
                          {area.description}
                        </p>
                        
                        {/* Call to action with arrow animation */}
                        <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                          <span>Saiba mais</span>
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
            <span className="text-sm text-muted-foreground">← Deslize para navegar →</span>
          </div>
        </div>

        <Dialog open={selectedArea !== null} onOpenChange={() => setSelectedArea(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedArea && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-primary mb-2">
                    {selectedArea.title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-4 whitespace-pre-line">
                    {selectedArea.details}
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
