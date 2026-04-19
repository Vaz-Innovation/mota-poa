import { useLanguage } from "@/contexts/LanguageContext";

export default function TrabalheHero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in">
            {t("trabalheConosco.heroTitle")}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {t("trabalheConosco.heroSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
