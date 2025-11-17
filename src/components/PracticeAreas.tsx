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
  Briefcase,
  Users,
  Wallet,
  Building2,
  MapPin,
  Scale,
  ShieldAlert,
  Vote,
  Landmark,
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
      icon: MapPin,
      title: "Direito Administrativo com ênfase no Distrito Federal",
      description: "Especialização em servidores do Distrito Federal",
      details:
        "Regime jurídico único dos servidores do Distrito Federal; Licitações e processos administrativos. Acompanhamento de procedimentos judiciais e administrativos, inclusive Tribunal de Contas do Distrito Federal.",
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
    <section id="areas" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Áreas de Atuação
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Temos nossa atuação inserida em diversas áreas do Direito, especializados nas áreas do Direito Social, com destaque para Direito do Trabalho Individual e Coletivo, Direito Sindical, Direito Previdenciário e Direito Administrativo. Também atendemos outras áreas, contando sempre com profissionais qualificados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background border-border group"
                onClick={() => setSelectedArea(area)}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {area.description}
                  </p>
                  <span className="text-sm font-semibold text-accent group-hover:underline">
                    Saiba mais →
                  </span>
                </CardContent>
              </Card>
            );
          })}
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
