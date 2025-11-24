import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { Scale } from "lucide-react";

const Avalie = () => {
  const handleReviewClick = () => {
    window.open("https://share.google/zSKgKz2ENPLLLPQ8M", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl mx-auto">
            {/* Logo e Título */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Scale className="w-8 h-8 text-accent" />
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Mota Advogados Associados
                </h1>
              </div>
            </div>

            {/* Card Principal */}
            <div className="bg-card rounded-lg shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
                Sua opinião é importante
              </h2>
              
              <p className="text-center text-muted-foreground mb-8">
                Ajude-nos a continuar oferecendo serviços jurídicos de excelência em Brasília
              </p>

              {/* Estrelas */}
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-10 h-10 md:w-12 md:h-12 fill-accent text-accent"
                  />
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-center mb-3 text-foreground">
                Avalie Nossa Experiência
              </h3>
              
              <p className="text-center text-muted-foreground mb-6">
                Compartilhe sua experiência com nossos serviços no Google
              </p>

              {/* Caixa de Informação */}
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <div className="flex gap-3">
                  <div className="text-accent text-xl flex-shrink-0">✍️</div>
                  <p className="text-sm text-muted-foreground">
                    Sua avaliação nos ajuda a melhorar continuamente nossos serviços e a 
                    alcançar mais clientes que precisam de assessoria jurídica de qualidade.
                  </p>
                </div>
              </div>

              {/* Botão */}
              <Button
                onClick={handleReviewClick}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-lg shadow-lg transition-all hover:shadow-xl"
              >
                <Star className="w-5 h-5 mr-2" />
                Deixar Avaliação
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Você será redirecionado para o Google Meu Negócio
              </p>
            </div>

            {/* Rodapé da Página */}
            <div className="text-center mt-8 space-y-2">
              <p className="font-semibold text-foreground">
                Mota Advogados Associados • Brasília - DF
              </p>
              <p className="text-sm text-muted-foreground">
                Excelência em serviços jurídicos há mais de 20 anos
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Avalie;
