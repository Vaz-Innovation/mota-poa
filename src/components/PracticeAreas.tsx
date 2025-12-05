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
      icon: Building2,
      title: "Direito Administrativo (Servidor Público)",
      description: "Defesa dos direitos e interesses dos servidores públicos",
      details:
        "Ao longo de sua trajetória nos consolidamos como um dos maiores escritórios de advocacia do país na defesa dos direitos e interesses profissionais dos servidores públicos, atuando de forma resolutiva em milhares de ações judiciais que asseguraram aos servidores públicos o reconhecimento de seus direitos. São inúmeros os servidores assistidos pelo escritório, sempre de forma direta e humanizada, com total transparência, orientação técnica, e encaminhamento jurídico responsável, proporcionando segurança jurídica na tomada de decisões que afetam seus direitos individuais e coletivos.",
    },
    {
      icon: Briefcase,
      title: "Direito do Trabalho Individual e Coletivo",
      description: "Reclamatórias trabalhistas e acompanhamento processual",
      details:
        "Reclamatórias trabalhistas (Horas-extras; Periculosidade/insalubridade; Promoções; Adicional de transferência; Vinculo empregatício; Estabilidade de gestante; Pedido de complementação da aposentadoria; Multa 40% FGTS; Função gratificada; Acidente de trabalho), acompanhamento em audiências, medidas cautelares, contestações, acompanhamento de todos os recursos no âmbito do TRTs e TST.",
    },
    {
      icon: Users,
      title: "Direito Sindical",
      description: "Assessoria completa para entidades sindicais",
      details:
        "Nosso escritório administra uma carteira de grandes clientes constituída por inúmeras associações, sindicatos e outras entidades representativas dos servidores públicos, atuando no âmbito administrativo e judicial, com ênfase em demandas coletivas de interesse dos integrantes das respectivas carreiras.",
    },
    {
      icon: Wallet,
      title: "Direito Previdenciário",
      description: "Concessão e revisão de benefícios previdenciários",
      details:
        "Atuamos no Regime Próprio de Previdência dos Servidores Públicos, no Regime Geral e nos regimes de previdência complementar, abrangendo servidores e empregados públicos.\nEntre nossos serviços estão: planejamento previdenciário, análise de tempo de serviço, orientação sobre contribuições, conversão de tempo especial, averbações, pedidos de aposentadoria, revisões, pensões, habilitação de herdeiros, isenção de IRPF por doença, entre outros.",
    },
    {
      icon: Scale,
      title: "Direito Constitucional",
      description: "Elaboração de ADI e recursos extraordinários",
      details:
        "Área de especialização do escritório que está relacionada ao acompanhamento, elaboração e desenvolvimento de teses jurídicas que envolvem temas de natureza constitucional, sejam elas os recursos extraordinários, ações diretas de inconstitucionalidade (ADI), mandados de injunção, Arguição de Descumprimento de Preceito Fundamental (ADPF), reclamações, dentre outras.",
    },
    {
      icon: ShieldAlert,
      title: "Direito Penal",
      description: "Habeas Corpus e recursos criminais",
      details:
        "O Direito Penal passou a integrar recentemente as áreas de atuação do nosso escritório. Trabalhamos em parceria com profissionais de ampla experiência, oferecendo atendimento especializado nas seguintes frentes:\n\n• Direito Penal Econômico\n• Atendimento personalizado ao cliente\n• Defesa Criminal em todas as instâncias\n• Atuação imediata perante autoridades e órgãos de Justiça",
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
        "MOTA & ADVOGADOS ASSOCIADOS é um dos escritórios com intensa atuação nos Tribunais Superiores, especialmente STJ, TST e STF, e no TSE e STM de forma associada, acompanhando recursos diversos, ou ajuizando ações originárias ou impetrando recursos em prol de clientes de todo os Brasil, e no assessoramento a outros escritórios de advocacia.",
    },
    {
      icon: Home,
      title: "Direito Imobiliário",
      description: "Assessoria completa em negócios e regularização imobiliária",
      details:
        "Atuamos em todas as frentes do direito imobiliário, incluindo estruturação de negócios, cobrança de dívidas, assessoria em compra, venda e locação, avaliações, leilões, dação em pagamento, usucapião, regularização fundiária, desapropriações e acompanhamento perante SPU, INCRA e órgãos ambientais. Também tratamos de loteamentos, parcelamentos, registros imobiliários, projetos hoteleiros, estudos de viabilidade e assessoria para imobiliárias, incorporadoras, investidores e demandas judiciais relacionadas.",
    },
    {
      icon: Heart,
      title: "Direito de Família e Sucessões",
      description: "Inventários, divórcios, pensões e sucessões",
      details:
        "Dedicamos atenção especial a esta área em razão de sua conexão com outras frentes do nosso trabalho, motivo pelo qual estruturamos um departamento exclusivo para atender casos de habilitação de crédito para herdeiros, reconhecimento e regularização de união estável, divórcios, pensões alimentícias, inventários e sobrepartilhas, tanto extrajudiciais quanto judiciais, além de outras demandas relacionadas.",
    },
    {
      icon: Gavel,
      title: "Fazenda Pública e Entes Federados",
      description: "Ações contra União, Estados, DF e Municípios",
      details:
        "Esta área de atuação abrange ações de cobrança, indenizações, execuções contra Fazenda Pública da União, Estados, DF e Municípios, impugnação de autuações, adesão à regimes fiscais especiais, REFIS, desconsideração da personalidade jurídica, e matérias correlatas.",
    },
    {
      icon: Handshake,
      title: "Mediação e Conciliação",
      description: "Métodos alternativos de resolução de conflitos",
      details:
        "Trata-se de uma área dedicada a métodos alternativos de resolução de conflitos, conduzida por profissionais especializados em técnicas de negociação. Por meio dela, pessoas físicas e jurídicas podem solucionar suas demandas de forma extrajudicial, com mais rapidez e eficiência, evitando o ingresso no Poder Judiciário. O processo garante segurança, formalidade e soluções adequadas para cada situação.",
    },
    {
      icon: Receipt,
      title: "Direito Tributário e Empresarial",
      description: "Assessoria jurídica para empresas e matéria tributária",
      details:
        "Diante da crescente demanda nessa área, o escritório estruturou uma equipe exclusiva, coordenada por advogados especializados, para oferecer assessoria jurídica de alta complexidade e apoiar empresas na organização jurídica de seus negócios. Também acompanhamos as principais mudanças legislativas, especialmente em matéria tributária e regulatória, orientando sobre impactos, enquadramento legal, regularização de débitos e identificação de possíveis créditos tributários.",
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
