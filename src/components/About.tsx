import { Scale, Shield, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Ética",
      description:
        "Conduta profissional pautada pelos mais altos padrões éticos e morais em todas as nossas ações.",
    },
    {
      icon: Scale,
      title: "Transparência",
      description:
        "Comunicação clara e honesta com nossos clientes, mantendo-os informados em todas as etapas.",
    },
    {
      icon: Target,
      title: "Comprometimento",
      description:
        "Dedicação integral aos interesses de nossos clientes, buscando sempre os melhores resultados.",
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Sobre Nós
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Com sólida atuação em Brasília, somos reconhecidos pela excelência jurídica e
            pelo atendimento personalizado a cada cliente. Nossa equipe altamente
            qualificada está preparada para oferecer soluções estratégicas e eficazes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-background p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
