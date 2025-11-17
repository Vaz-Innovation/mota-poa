import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import joseMota from "@/assets/jose-mota.jpg";
import rafaelMota from "@/assets/rafael-mota.jpg";
import maristelaMota from "@/assets/maristela-mota.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Lawyers = () => {
  const { t } = useLanguage();
  
  const lawyers = [
    {
      name: "Dr. José Pinto da Mota Filho",
      specialty: "Direito Previdenciário",
      oab: "OAB/DF 1413-A",
      email: "Josemota@mota.adv.br",
      initials: "JM",
      image: joseMota
    },
    {
      name: "Dra. Maristela Pinto da Mota",
      specialty: "Direito Social",
      oab: "OAB/RS 40.523",
      email: "maristela@mota.adv.br",
      initials: "MM",
      image: maristelaMota
    },
    {
      name: "Dr. Rafael Augusto Dantas Mota",
      specialty: "Direito do Trabalho",
      oab: "OAB/DF 72.907",
      email: "rafael@mota.adv.br",
      initials: "RM",
      image: rafaelMota
    }
  ];

  return (
    <section id="advogados" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('lawyers.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('lawyers.intro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {lawyers.map((lawyer, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/20 border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="relative mb-6 overflow-hidden rounded-full">
                  <Avatar className="w-40 h-40 md:w-48 md:h-48 ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all duration-500">
                    <AvatarImage 
                      src={lawyer.image} 
                      alt={lawyer.name}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <AvatarFallback className="text-3xl bg-accent text-accent-foreground">
                      {lawyer.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="text-2xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                  {lawyer.name}
                </h3>

                <p className="text-base font-medium text-accent mb-3">
                  {lawyer.specialty}
                </p>

                <p className="text-sm text-muted-foreground/80 mb-4">
                  {lawyer.oab}
                </p>

                <a 
                  href={`mailto:${lawyer.email}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 group/link"
                >
                  <Mail className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  <span className="group-hover/link:underline">{lawyer.email}</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lawyers;
