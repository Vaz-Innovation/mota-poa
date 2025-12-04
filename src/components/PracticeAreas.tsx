import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Building2,
  Scale,
  Briefcase,
  Heart,
  Building,
  Home,
  ShieldAlert,
  Landmark,
  Handshake,
  Gavel,
  FileText,
} from "lucide-react";

interface PracticeArea {
  icon: any;
  title: string;
  summary: string;
  content: string;
}

const PracticeAreas = () => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
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

  const introSections = [
    {
      title: "O ESCRITÓRIO DE ADVOCACIA DO SERVIDOR PÚBLICO",
      content: "Ao longo de sua trajetória nos consolidamos como um dos maiores escritórios de advocacia do país na defesa dos direitos e interesses profissionais dos servidores públicos, atuando de forma resolutiva em milhares de ações judiciais que asseguraram aos servidores públicos o reconhecimento de seus direitos.\n\nSão inúmeros os servidores assistidos pelo escritório, sempre de forma direta e humanizada, com total transparência, orientação técnica, e encaminhamento jurídico responsável, proporcionando segurança jurídica na tomada de decisões que afetam seus direitos individuais e coletivos."
    },
    {
      title: "O ESCRITÓRIO DAS ENTIDADES SINDICAIS E ASSOCIAÇÕES DE SERVIDORES PÚBLICOS",
      content: "Nosso escritório administra uma carteira de grandes clientes constituída por inúmeras associações, sindicatos e outras entidades representativas dos servidores públicos, atuando no âmbito administrativo e judicial, com ênfase em demandas coletivas de interesse dos integrantes das respectivas carreiras.\n\nVerifique com sua entidade se você já não é assistido pelo nosso escritório.\n\nEm caso de dúvida ou informações mantenha contato conosco pelo e-mail: contato@mota.adv.br"
    }
  ];

  const areas: PracticeArea[] = [
    {
      icon: Building2,
      title: "Direito Administrativo",
      summary: "Processos administrativos, licitações e servidores públicos",
      content: "As matérias que envolvem a administração pública e que dependem, na maioria dos casos, do acompanhamento técnico de processos administrativos ou judiciais em Brasília são o foco de nossa atuação jurídica. Temas relacionados a servidores públicos federais, desapropriações, regularizações, matérias de ordem tributária, negociações, parcelamentos, e tantas outros, necessitam de assessoramento jurídico adequado evitando que se perpetuem sem uma solução definitiva, ou que sejam indeferidos por aspectos meramente formais."
    },
    {
      icon: Users,
      title: "Direito Previdenciário",
      summary: "Regime Próprio e Geral de Previdência Social",
      content: "Atuamos com ênfase no Regime Próprio de Previdência Social dos Servidores Públicos, e dos demais regimes de previdência, como o Regime Geral de Previdência Social (RGPS), Regimes de Previdência Complementar dos Servidores Públicos, e Regimes de Previdência Complementar dos empregados de empresas públicas e sociedades de economia mista.\n\nElaboramos Planejamento previdenciário, analisamos o histórico laboral para a busca de tempo de serviço, orientamos sobre contribuições para a aposentadoria, promovemos a conversão de tempo especial em tempo comum (trabalho insalubre ou perigoso), requeremos averbações de certidões, requeremos abono pecuniário, aposentadoria por invalidez, aposentadoria especial, isenção de IRPF em caso de doença, aposentadoria por idade e tempo de contribuição, revisões de aposentadoria, pensões, habilitação de herdeiros, dentre outras matérias."
    },
    {
      icon: Briefcase,
      title: "Direito do Trabalho",
      summary: "Defesa dos direitos dos trabalhadores e negociação coletiva",
      content: "Nosso foco é a defesa dos direitos e interesses dos trabalhadores de um modo em geral, seja na esfera individual, ou na esfera coletiva, especialmente a negociação coletiva perante o Tribunal Superior do Trabalho e os Tribunais Regionais do Trabalho, tais como os dissídios coletivos de natureza econômica, dissídios coletivos de greve ou dissídios coletivos de natureza jurídica e acompanhamento de Recursos, especialmente perante o TST.\n\nAnalisamos e auxiliamos na elaboração de minutas de matérias legislativas de interesse dos seguimentos profissionais, assim como propomos ao Ministério Público do Trabalho a abertura de inquéritos civis públicos e outras providências investigatórias e judiciais, além de propor ações de cumprimento, ações civis públicas e tantas outras."
    },
    {
      icon: Scale,
      title: "Direito Constitucional",
      summary: "ADI, recursos extraordinários e teses constitucionais",
      content: "Área de especialização do escritório que está relacionada ao acompanhamento, elaboração e desenvolvimento de teses jurídicas que envolvem temas de natureza constitucional, sejam elas os recursos extraordinários, ações diretas de inconstitucionalidade (ADI), mandados de injunção, Arguição de Descumprimento de Preceito Fundamental (ADPF), reclamações, dentre outras."
    },
    {
      icon: Heart,
      title: "Direito de Família e Sucessões",
      summary: "Inventários, divórcios, pensões e habilitações de herdeiros",
      content: "Este ramo do direito tem nossa especial atenção em face dos desdobramentos da nossa atuação profissional em outras áreas do direito, e por esta razão criamos um departamento exclusivo para assessoramento aos interessados, especialmente em casos de habilitações de crédito para herdeiros, regularização e reconhecimento de união estável, divórcios, pensões alimentícias, inventários e sobrepartilhas extrajudiciais e judiciais, e demais situações pertinentes a matéria."
    },
    {
      icon: Building,
      title: "Direito Tributário e Empresarial",
      summary: "Assessoria jurídica tributária e estruturação de negócios",
      content: "Em face da demanda crescente nesta área do direito o escritório organizou uma equipe exclusiva coordenada por advogados especialistas na matéria que não só prestam assessoramento jurídico de elevada complexidade, como auxiliam empresas e organizações na estruturação jurídica de seus negócios. Além disso, acompanhamos as principais inovações legislativas especialmente em matéria tributária e regulatória, orientando sobre seus efeitos, impactos, e sobre o enquadramento legal das respectivas atividades econômicas, assim como a regularização de seus débitos tributários, ou identificando potenciais créditos desta mesma natureza."
    },
    {
      icon: Home,
      title: "Direito Imobiliário",
      summary: "Transações imobiliárias, usucapião e regularização fundiária",
      content: "Expertise em transações imobiliárias, estruturação jurídica de negócios imobiliários, execução de dívidas imobiliárias e condominiais, assessoria jurídica na compra, venda e locação de imóveis, avaliações, leilões, dação em pagamento de imóveis, usucapião extrajudicial e judicial, regularização fundiária, desapropriações, acompanhamento de processos junto a Secretaria de Patrimônio da União-SPU, INCRA, e órgãos ambientais, loteamentos, parcelamentos de imóveis, registros imobiliários, estrutura de projetos na área hoteleira, estudos para viabilidade econômica de empreendimentos imobiliários com organização de operações de crédito, assessoria para imobiliárias, incorporadores, investidores, e demais demandas judiciais relativamente ao tema."
    },
    {
      icon: ShieldAlert,
      title: "Direito Penal Econômico",
      summary: "Crimes financeiros, tributários e contra a administração pública",
      content: "O Direito Penal é uma das áreas recentemente integradas ao nosso escritório, que de forma associada com profissionais de larga experiência profissional, atua nas seguintes áreas:\n\n• Crimes contra o sistema financeiro nacional\n• Crime considerados como de lavagem de dinheiro\n• Crime de sonegação previdenciária\n• Crimes contra a ordem econômica\n• Crimes contra o meio ambiente\n• Crimes enquadrados como corrupção\n• Crimes de licitação\n• Crimes praticados por agentes públicos\n• Crimes contra administração pública\n• Crimes falimentares\n• Crimes de estelionato e outras fraudes\n• Crimes contra a saúde pública\n• Crimes eleitorais\n• Crimes contra o consumidor\n• Crimes contra a propriedade intelectual\n• Crimes contra a honra\n• Crimes contra a organização do trabalho\n• Crimes de falsidades\n• Compliance Jurídico\n• Crimes contra a ordem tributária"
    },
    {
      icon: FileText,
      title: "Fazenda Pública e Entes Federados",
      summary: "Ações contra Fazenda Pública e regimes fiscais especiais",
      content: "Esta área de atuação abrange ações de cobrança, indenizações, execuções contra Fazenda Pública da União, Estados, DF e Municípios, impugnação de autuações, adesão à regimes fiscais especiais, REFIS, desconsideração da personalidade jurídica, e matérias correlatas."
    },
    {
      icon: Landmark,
      title: "Atuação nos Tribunais Superiores",
      summary: "Intensa atuação no STJ, TST, STF, TSE e STM",
      content: "MOTA & ADVOGADOS ASSOCIADOS é um dos escritórios com intensa atuação nos Tribunais Superiores, especialmente STJ, TST e STF, e no TSE e STM de forma associada, acompanhando recursos diversos, ou ajuizando ações originárias ou impetrando recursos em prol de clientes de todo os Brasil, e no assessoramento a outros escritórios de advocacia."
    },
    {
      icon: Handshake,
      title: "Mediação e Conciliação",
      summary: "Métodos alternativos de resolução de conflitos",
      content: "Área específica de métodos alternativos de resolução de conflitos onde atuam profissionais especializados em técnicas de negociação. Por meio deles, pessoas físicas e jurídicas podem resolver suas demandas de forma extrajudicial sem que seja necessário levá-los ao Poder Judiciário, alcançando assim formas mais céleres e rápidas de resolução de litígios, com soluções satisfatórias para demandas específicas, com total segurança e formalização de atos jurídicos próprios."
    },
    {
      icon: Gavel,
      title: "Direito Sindical",
      summary: "Registro sindical, acordos e convenções coletivas",
      content: "Registro sindical e controvérsias sindicais, acordos, convenções e negociações coletivas e assessoramento às entidades sindicais."
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="areas" 
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <div className="h-1 w-20 bg-accent mx-auto mb-6 rounded-full" />
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Áreas de Atuação
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Especializados em Direito Constitucional e atuantes em diversas áreas do Direito.
          </p>
        </div>

        {/* Intro Sections */}
        <div className="max-w-5xl mx-auto mb-20 space-y-12">
          {introSections.map((section, index) => (
            <div 
              key={index}
              className={`bg-background/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border/50 shadow-lg transition-all duration-700 delay-${(index + 1) * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-accent mb-6 tracking-tight">
                {section.title}
              </h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {areas.map((area, index) => {
            const Icon = area.icon;
            const delay = index * 50;
            
            return (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${delay + 300}ms` }}
                onClick={() => setSelectedArea(area)}
              >
                <div className="h-full p-6 md:p-8 rounded-2xl backdrop-blur-sm bg-background/60 border border-border/50 hover:border-accent/50 hover:shadow-2xl hover:-translate-y-2 hover:bg-background/80 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-5 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {area.summary}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <span>Saiba mais</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dialog */}
        <Dialog open={selectedArea !== null} onOpenChange={() => setSelectedArea(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-background/95 border-accent/20">
            {selectedArea && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center">
                      <selectedArea.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-primary mb-2 tracking-tight">
                    {selectedArea.title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-4 whitespace-pre-line">
                    {selectedArea.content}
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