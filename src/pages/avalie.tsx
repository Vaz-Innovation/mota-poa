import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Avalie = () => {
  const { t } = useLanguage();

  const handleReviewClick = () => {
    window.open("https://share.google/XEKsZcXVK5q5gBPEB", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t("avalie.heroTitle") || "Avalie nossos serviços"} 
        description={t("avalie.heroSubtitle") || "Deixe sua avaliação sobre o atendimento do Mota Advogados. Sua opinião é muito importante para nós."}
        keywords={["avaliação", "feedback", "Mota Advogados", "Porto Alegre", "atendimento jurídico"]}
      />
      <Header />

      <main className="flex-1 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl mx-auto">
            {/* Card Principal */}
            <div className="bg-card rounded-lg shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
                {t("avalie.heroTitle")}
              </h2>

              <p className="text-center text-muted-foreground mb-8">
                {t("avalie.heroSubtitle")}
              </p>

              {/* Estrelas */}
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className="w-10 h-10 md:w-12 md:h-12 fill-accent text-accent"
                  />
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-center mb-3 text-foreground">
                {t("avalie.cardTitle")}
              </h3>

              <p className="text-center text-muted-foreground mb-6">
                {t("avalie.cardSubtitle")}
              </p>

              {/* Caixa de Informação */}
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <div className="flex gap-3">
                  <div className="text-accent text-xl flex-shrink-0">✍️</div>
                  <p className="text-sm text-muted-foreground">
                    {t("avalie.note")}
                  </p>
                </div>
              </div>

              {/* Botão */}
              <Button
                onClick={handleReviewClick}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-lg shadow-lg transition-all hover:shadow-xl"
              >
                <Star className="w-5 h-5 mr-2" />
                {t("avalie.cta")}
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                {t("avalie.disclaimer")}
              </p>
            </div>

            {/* Rodapé da Página */}
            <div className="text-center mt-8 space-y-2">
              <p className="font-semibold text-foreground">
                Mota Advogados Associados • Porto Alegre - RS
              </p>
              <p className="text-sm text-muted-foreground">
                {t("avalie.footerLine")}
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
