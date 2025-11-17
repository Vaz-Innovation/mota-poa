import { Building2, Target, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    {
      icon: FileText,
      title: "Trajetória",
      summary: "Nossa história desde 2006 em Porto Alegre",
      content: (
        <>
          <p className="mb-4">
            A MOTA & ADVOGADOS ASSOCIADOS é uma banca de advogados com atuação em Porto Alegre desde 2006, resultado da união de profissionais com relevante experiência e vasto conhecimento nas áreas do Direito Social, com destaque para Direito do Trabalho Individual e Coletivo, Direito Sindical, Direito Previdenciário e Direito Administrativo. Nosso objetivo é a prestação de serviços jurídicos de excelência, realizados através do trabalho comprometido e da dedicação e paixão pela nossa profissão.
          </p>
          <p className="mb-4">
            Estamos sempre acompanhando as inúmeras transformações que refletem no Direito e em suas práticas e é na atualização e no constante aperfeiçoamento técnico-profissional e multidisciplinar que encontramos o complemento imprescindível para o domínio das áreas jurídicas nas quais temos nossa atuação inserida.
          </p>
          <p>
            Competência. Além do saber - jurídico, é fundamental ter planejamento e estratégia na hora de agir. Sabemos que por trás de todo o direito reclamado, há um patrimônio jurídico lesado e nosso trabalho é estarmos ao lado daqueles que nos confiam à busca pela melhor solução. Por isso, nosso atendimento é pautado pela personalização de todas as questões que nos são trazidas. São nesses preceitos que firmamos nossa atuação.
          </p>
        </>
      ),
    },
    {
      icon: Building2,
      title: "Pilares Consolidados",
      summary: "Princípios de uma advocacia ética e comprometida",
      content: (
        <>
          <p className="mb-4">
            A MOTA & ADVOGADOS ASSOCIADOS tem sua atuação fundada nos princípios de uma advocacia ética, do trabalho comprometido, sério e eficiente, atento às mudanças da sociedade e às necessidades de cada cliente, sem dispensar a boa técnica e o papel social do advogado na busca pela solução eficaz.
          </p>
          <p className="mb-4">
            Nosso propósito é promover o equilíbrio das relações sociais através da prestação de um trabalho empenhado e competente, priorizando sempre o relacionamento com o cliente.
          </p>
          <p>
            Nossa atuação, seja ela de forma preventiva, administrativa ou judicial, é focada na busca pela garantia dos direitos, na segurança do nosso trabalho e na satisfação de nossos clientes e da nossa equipe, valorizando principalmente nosso ponto mais forte: as pessoas.
          </p>
        </>
      ),
    },
    {
      icon: Target,
      title: "Nossa Missão",
      summary: "Relacionamento de qualidade e serviços eficazes",
      content: (
        <>
          <p className="mb-4">
            Estamos inseridos numa sociedade que está em constante movimento, bem como o Direito que a regula também está. Cotidianamente diversos paradigmas são rompidos e novos conceitos nos são trazidos. Por isso estamos sempre nos reciclando e reinventando para bem serví-los.
          </p>
          <p>
            Nossa missão está diretamente ligada a um relacionamento de qualidade com o nosso cliente, oferecendo serviços jurídicos criativos, seguros e eficazes. Visamos atrair e desenvolver os melhores talentos, formando equipes sempre capacitadas, com o objetivo de aprimorar e compartilhar, constantemente o conhecimento, praticando e transmitindo valores nos quais acreditamos.
          </p>
        </>
      ),
    },
    {
      icon: MapPin,
      title: "Escritório",
      summary: "Atuação nacional com sede em Porto Alegre",
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
    <section id="sobre" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Sobre Nós
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Desde 2006 em Porto Alegre, a MOTA & ADVOGADOS ASSOCIADOS reúne advogados altamente especializados em Direito Previdenciário. Oferecemos serviços jurídicos de excelência, sempre com ética, comprometimento e eficiência.
            Nosso atendimento é 100% personalizado: escutamos você com atenção, entendemos profundamente o seu caso e trabalhamos incansavelmente pela solução mais segura e vantajosa para a sua vida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background border-border group"
                onClick={() => setSelectedTopic(index)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{topic.summary}</p>
                  <span className="text-sm font-semibold text-accent group-hover:underline">
                    Saiba mais →
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Dialog open={selectedTopic !== null} onOpenChange={() => setSelectedTopic(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedTopic !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-primary mb-2">
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
