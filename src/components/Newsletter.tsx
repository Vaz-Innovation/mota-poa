import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t('newsletter.error'),
        description: t('newsletter.errorMessage'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulação de envio - aqui você pode integrar com seu serviço de email
    setTimeout(() => {
      toast({
        title: t('newsletter.success'),
        description: t('newsletter.successMessage'),
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

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
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-bronze"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="bronze"
              size="lg"
              disabled={isLoading}
              className="sm:w-auto w-full"
            >
              {isLoading ? t('newsletter.sending') : t('newsletter.button')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
