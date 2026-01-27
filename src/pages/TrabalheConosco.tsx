import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TrabalheHero from "@/pages/trabalheConosco/TrabalheHero";
import TrabalheBenefits from "@/pages/trabalheConosco/TrabalheBenefits";
import TrabalheApplicationForm from "@/pages/trabalheConosco/TrabalheApplicationForm";

const TrabalheConosco = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
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
                variant="outline"
                onClick={() => navigate('/')}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {t("trabalheConosco.backHome")}
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
