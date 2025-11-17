import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import joseMota from "@/assets/jose-mota.jpg";
import rafaelMota from "@/assets/rafael-mota.jpg";
import maristelaMota from "@/assets/maristela-mota.jpg";

const Lawyers = () => {
  const lawyers = [
    {
      name: "Dr. José Pinto da Mota Filho",
      oab: "OAB/DF 1.413-A",
      initials: "JM",
      image: joseMota
    },
    {
      name: "Dra. Maristela Pinto da Mota",
      oab: "OAB/RS 40.523",
      initials: "MM",
      image: maristelaMota
    },
    {
      name: "Dr. Rafael Augusto Dantas Mota",
      oab: "OAB/DF 72.907",
      initials: "RM",
      image: rafaelMota
    }
  ];

  return (
    <section id="advogados" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Sócios da Mota & Advogados Associados
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground">
            <p>
              A MOTA & ADVOGADOS ASSOCIADOS conta com uma equipe multidisciplinar de profissionais, 
              sempre fiel ao nosso modo de prestar nossos serviços.
            </p>
            <p>
              O investimento na formação e capacitação dos nossos profissionais, a atuação em diversas áreas, 
              o treinamento da nossa equipe, a dedicação e comprometimento com o profissionalismo nos transformam 
              numa banca capacitada e especializada nas áreas em que atuamos. O resultado disso é a otimização de 
              tempo e recursos e a criatividade nas soluções jurídicas.
            </p>
            <p>
              Tudo isso porque acreditamos que juntos, cada um de nós vale mais e porque temos vocação para a 
              prática da advocacia. E por isso a praticamos com dedicação, prazer e alegria.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {lawyers.map((lawyer, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background border-border"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={lawyer.image} alt={lawyer.name} />
                  <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                    {lawyer.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-primary mb-2">{lawyer.name}</h3>
                <p className="text-sm text-muted-foreground">{lawyer.oab}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lawyers;
