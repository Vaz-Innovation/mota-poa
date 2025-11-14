import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  Calculator,
  Scale,
  Briefcase,
  Home,
  ShoppingCart,
  Users,
  ShieldAlert,
  FileCheck,
  Lightbulb,
} from "lucide-react";

interface PracticeArea {
  icon: any;
  title: string;
  description: string;
  details: string;
}

const PracticeAreas = () => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  const areas: PracticeArea[] = [
    {
      icon: Building2,
      title: "Direito Empresarial",
      description: "Assessoria jurídica completa para empresas de todos os portes",
      details:
        "Oferecemos consultoria estratégica para constituição, fusões, aquisições e reorganizações societárias. Elaboramos contratos comerciais complexos, gerenciamos compliance corporativo e assessoramos em operações de private equity e venture capital. Nossa equipe tem expertise em governança corporativa e direito societário.",
    },
    {
      icon: Calculator,
      title: "Direito Tributário",
      description: "Planejamento fiscal e defesa em questões tributárias",
      details:
        "Atuamos no contencioso administrativo e judicial tributário, planejamento tributário estratégico e recuperação de créditos tributários. Prestamos consultoria para otimização da carga tributária, revisão fiscal e adequação a regimes especiais. Representamos clientes em auditorias fiscais e processos de restituição.",
    },
    {
      icon: Scale,
      title: "Direito Civil",
      description: "Soluções jurídicas para questões cíveis complexas",
      details:
        "Prestamos assessoria em responsabilidade civil, contratos civis, direito das sucessões e inventários. Atuamos em ações de indenização, cobrança, revisão contratual e arbitragem. Nossa equipe tem experiência em litígios complexos envolvendo grandes valores e questões patrimoniais sensíveis.",
    },
    {
      icon: Briefcase,
      title: "Direito Trabalhista",
      description: "Defesa preventiva e contenciosa em relações trabalhistas",
      details:
        "Oferecemos consultoria preventiva para redução de passivos trabalhistas, due diligence em aquisições, e elaboração de políticas internas. Atuamos no contencioso trabalhista, representando empresas e executivos. Prestamos assessoria em reestruturações, programas de demissão voluntária e terceirização.",
    },
    {
      icon: Home,
      title: "Direito Imobiliário",
      description: "Assessoria completa em transações e litígios imobiliários",
      details:
        "Atuamos em incorporações imobiliárias, compra e venda de imóveis, regularização fundiária e questões condominiais. Prestamos consultoria para loteamentos, financiamento imobiliário e contratos de locação. Representamos clientes em ações possessórias, usucapião e disputas de propriedade.",
    },
    {
      icon: ShoppingCart,
      title: "Direito do Consumidor",
      description: "Proteção e defesa dos direitos do consumidor",
      details:
        "Oferecemos assessoria preventiva sobre legislação consumerista, elaboração de políticas de atendimento e contratos. Atuamos na defesa de empresas em processos individuais e coletivos, incluindo ações civis públicas. Prestamos consultoria para adequação às normas de proteção ao consumidor e recall de produtos.",
    },
    {
      icon: Users,
      title: "Direito de Família",
      description: "Acompanhamento sensível em questões familiares",
      details:
        "Prestamos assessoria em divórcio, união estável, guarda de filhos e pensão alimentícia. Atuamos em partilha de bens, inventários e planejamento sucessório. Nossa equipe tem experiência em mediação familiar e busca sempre a solução mais equilibrada para todas as partes envolvidas.",
    },
    {
      icon: ShieldAlert,
      title: "Direito Penal",
      description: "Defesa criminal estratégica e consultoria preventiva",
      details:
        "Oferecemos defesa técnica em investigações e processos criminais, incluindo crimes empresariais, tributários e contra a ordem econômica. Atuamos em habeas corpus, recursos e júri. Prestamos consultoria preventiva para identificação e mitigação de riscos criminais corporativos.",
    },
    {
      icon: FileCheck,
      title: "Compliance",
      description: "Programas de integridade e conformidade legal",
      details:
        "Desenvolvemos e implementamos programas de compliance e integridade corporativa, incluindo código de ética, canal de denúncias e treinamentos. Realizamos due diligence de integridade, investigações internas e adequação à LGPD. Prestamos assessoria em Lei Anticorrupção e remediação de não conformidades.",
    },
    {
      icon: Lightbulb,
      title: "Consultoria Jurídica",
      description: "Assessoria estratégica personalizada",
      details:
        "Oferecemos consultoria jurídica preventiva e estratégica, análise de riscos e oportunidades jurídicas. Prestamos pareceres técnicos, segunda opinião jurídica e assessoria em negociações complexas. Nossa equipe multidisciplinar proporciona visão integrada dos aspectos legais do seu negócio.",
    },
  ];

  return (
    <section id="areas" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Áreas de Atuação
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Oferecemos serviços jurídicos especializados e personalizados para atender às
            mais diversas demandas com excelência e expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Card
                key={index}
                className="group cursor-pointer hover-lift overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent"
                onClick={() => setSelectedArea(area)}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                  <div className="mt-4 text-accent text-sm font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Saiba mais →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dialog for Area Details */}
      <Dialog open={!!selectedArea} onOpenChange={() => setSelectedArea(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedArea && (
                <>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <selectedArea.icon className="w-6 h-6 text-accent" />
                  </div>
                  {selectedArea.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base text-foreground pt-4 leading-relaxed">
              {selectedArea?.details}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PracticeAreas;
