import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Beehiiv embed script
    const script = document.createElement("script");
    script.src = "https://subscribe-forms.beehiiv.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Load Beehiiv attribution script
    const attributionScript = document.createElement("script");
    attributionScript.src = "https://subscribe-forms.beehiiv.com/attribution.js";
    attributionScript.type = "text/javascript";
    attributionScript.async = true;
    document.body.appendChild(attributionScript);

    return () => {
      // Cleanup scripts on unmount
      document.body.removeChild(script);
      document.body.removeChild(attributionScript);
    };
  }, []);

  return (
    <section className="py-16 bg-navy">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bronze/20 mb-6">
            <Mail className="w-8 h-8 text-bronze" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg text-white/80 mb-8">
            {t('newsletter.description')}
          </p>
          
          <div className="flex justify-center">
            <iframe 
              src="https://subscribe-forms.beehiiv.com/092332b5-4048-4b0f-9719-736bac706b1b" 
              className="beehiiv-embed" 
              data-test-id="beehiiv-embed" 
              frameBorder="0" 
              scrolling="no" 
              style={{
                width: "560px",
                height: "207px",
                margin: 0,
                borderRadius: "0px",
                backgroundColor: "transparent",
                boxShadow: "none",
                maxWidth: "100%"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
