import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TrabalheHero from "@/components/trabalheConosco/TrabalheHero";
import TrabalheBenefits from "@/components/trabalheConosco/TrabalheBenefits";
import TrabalheApplicationForm from "@/components/trabalheConosco/TrabalheApplicationForm";
import Link from "next/link";

const TrabalheConosco = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title={t("trabalheConosco.title") || "Trabalhe Conosco"} />
      <Header />


      {/* Hero Section */}
      <TrabalheHero />

      {/* Content Section */}
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* About Section */}
            <TrabalheBenefits />

            {/* Application Form */}
            <TrabalheApplicationForm />

            {/* Back Button */}
            <div className="mt-8 text-center">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Link href="/">{t("trabalheConosco.backHome")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TrabalheConosco;
