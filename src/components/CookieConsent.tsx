import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg bg-card border border-border shadow-lg backdrop-blur-sm">
          <button
            onClick={handleDecline}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="p-6 pr-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('cookies.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('cookies.message')}
                </p>
              </div>
              
              <div className="flex gap-3 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="min-w-[100px]"
                >
                  {t('cookies.decline')}
                </Button>
                <Button
                  onClick={handleAccept}
                  className="min-w-[100px]"
                >
                  {t('cookies.accept')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
