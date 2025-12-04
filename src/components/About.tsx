import { TrendingUp, Shield, Target, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const About = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const topics = [
    {
      icon: TrendingUp,
      title: "Trajetória",
      badge: "Desde 2000",
      summary: "Mais de 25 anos de excelência jurídica em Porto Alegre",
      content: (
        <>
          <p className="mb-4">
            A MOTA & ADVOGADOS ASSOCIADOS é uma sociedade de advogados com sede na cidade de Porto Alegre, RS, desde 2000, e com atuação nacional.
          </p>
          <p>
            A prestação de serviços jurídicos de excelência é nosso objetivo e se reflete nos resultados alcançados e na satisfação dos nossos clientes.
          </p>
        </>
      ),
    },
    {
      icon: Shield,
      title: "Pilares Consolidados",
      badge: "Ética | Comprometimento",
      summary: "Os pilares de uma advocacia que une ética, excelência e resultados",
      content: (
        <>
          <p className="mb-4">
            A MOTA & ADVOGADOS ASSOCIADOS tem sua atuação fundada nos princípios de uma advocacia ética, do trabalho comprometido, sério e eficiente, atento às mudanças da sociedade e às necessidades de cada cliente, sem dispensar a boa técnica e o papel social do advogado na busca pela solução eficaz.
          </p>
          <p className="mb-4">
            Nosso propósito é promover o equilíbrio das relações sociais através da prestação de um trabalho empenhado juridicamente e competente, priorizando o relacionamento profissional com o cliente.
          </p>
          <p>
            Nossa atuação, seja ela de forma preventiva, administrativa ou judicial, é focada na busca pela garantia dos direitos, na segurança juridica, valorizando principalmente nosso ponto mais forte: as pessoas e a satisfação do trabalho desenvolvido.
          </p>
        </>
      ),
    },
    {
      icon: Target,
      title: "Nossa Missão",
      badge: "Excelência",
      summary: "Relacionamento de qualidade e serviços jurídicos eficazes",
      content: (
        <>
          <p>
            Estamos inseridos em uma sociedade em constante evolução, o que se reflete na atualização recorrente do arcabouço normativo do Direito. Cotidianamente, observamos mudanças na legislação e na jurisprudência, por isso estamos constantemente reciclando nossa equipe e nos reinventando para atender nossos clientes com ainda mais eficiência e resolutividade.
          </p>
        </>
      ),
    },
    {
      icon: MapPin,
      title: "Escritório",
      badge: "Atuação Nacional",
      summary: "Sede em Porto Alegre com cobertura nacional",
      content: (
        <>
          <p className="mb-4">
            Com a nossa sede na cidade de Porto Alegre, temos focado nossa atuação na Região Sul do Brasil, atendendo demandas nos estados do Rio Grande do Sul, Santa Catarina e Paraná.
          </p>
          <p>
            Ainda, contamos com um escritório conveniado em Brasília, conseguindo assim atingir atuação nacional e principalmente, nas instâncias superiores. Mantemos parcerias com escritórios de advocacia localizados em Florianópolis, Foz do Iguaçu, Rio de Janeiro, São Paulo, Belo Horizonte, Cuiabá, Salvador, Natal, Boa Vista, Recife, Belém e Manaus.
          </p>
        </>
      ),
    },
  ];


  return (
    <section 
      ref={sectionRef}
      id="sobre" 
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(var(--navy-deep)) 0%, hsl(var(--background)) 40%, hsl(var(--background)) 60%, hsl(var(--navy-deep) / 0.05) 100%)"
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block mb-4">
            <div className="h-1 w-20 bg-accent mx-auto mb-6 rounded-full" />
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold text-navy mb-6 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Escritório
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Construindo soluções jurídicas com excelência, ética e resultado desde 2000 com atuação nacional
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const isHovered = hoveredCard === index;
            const delay = index * 100;
            
            return (
              <div
                key={index}
            className={`
              group cursor-pointer
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
                style={{ transitionDelay: `${delay + 300}ms` }}
                onClick={() => setSelectedTopic(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`
                  h-full p-8 rounded-2xl
                  backdrop-blur-lg bg-background/40 
                  border transition-all duration-500
                  ${isHovered 
                    ? 'border-accent/50 shadow-2xl -translate-y-2 bg-background/60' 
                    : 'border-border/50 shadow-lg'
                  }
                `}>
                  {/* Icon Container */}
                  <div className={`
                    w-20 h-20 mb-6
                    bg-accent/10 border border-accent/20 rounded-full
                    flex items-center justify-center
                    transition-all duration-300
                    ${isHovered ? 'scale-110 rotate-6' : ''}
                  `}>
                    <Icon className={`w-10 h-10 text-accent transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
                  </div>

                  {/* Badge */}
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20">
                    <span className="text-xs font-semibold text-accent">{topic.badge}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-navy mb-3 tracking-tight">
                    {topic.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {topic.summary}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Explorar</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Dialog */}
        <Dialog open={selectedTopic !== null} onOpenChange={() => setSelectedTopic(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-background/95 border-accent/20">
            {selectedTopic !== null && (
              <>
                <DialogHeader>
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20 w-fit">
                    <span className="text-xs font-semibold text-accent">{topics[selectedTopic].badge}</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold text-navy mb-2 tracking-tight">
                    {topics[selectedTopic].title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-4">
                    {topics[selectedTopic].content}
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

export default About;
