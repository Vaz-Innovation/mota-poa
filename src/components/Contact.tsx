import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleMap from "./GoogleMap";

const Contact = () => {
  const { t } = useLanguage();

  // Porto Alegre office coordinates
  const officeCoordinates: [number, number] = [-51.2177, -30.0346];
  const officeAddress = "Rua Siqueira Campos, nº 1.171, 12º andar, sala 1202, Bairro Independência, Porto Alegre - RS";

  return (
    <section id="contato" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Google Map */}
        <div className="max-w-7xl mx-auto">
          <GoogleMap 
            address={officeAddress}
            coordinates={officeCoordinates}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
