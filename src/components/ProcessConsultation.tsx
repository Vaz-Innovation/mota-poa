import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Search, MessageCircle, Loader2 } from "lucide-react";
import { z } from "zod";

const ProcessConsultation = () => {
  const { t } = useLanguage();
  const [processNumber, setProcessNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const processSchema = z.object({
    processNumber: z.string()
      .min(20, { message: t('processConsultation.invalidProcess') })
      .regex(/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/, { 
        message: t('processConsultation.invalidProcess')
      }),
    email: z.string()
      .email({ message: t('processConsultation.invalidEmail') })
      .max(255)
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = processSchema.safeParse({ processNumber, email });
    
    if (!validation.success) {
      toast({
        title: t('processConsultation.error'),
        description: validation.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    
    toast({
      title: t('processConsultation.success'),
      description: t('processConsultation.successMessage'),
    });

    setProcessNumber("");
    setEmail("");
  };

  const handleWhatsAppClick = () => {
    if (!processNumber.trim()) {
      toast({
        title: t('processConsultation.error'),
        description: t('processConsultation.invalidProcess'),
        variant: "destructive",
      });
      return;
    }

    const message = `Olá! Gostaria de consultar o processo nº ${processNumber}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5561995362668&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-navy/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bronze/10 mb-6">
              <Search className="w-8 h-8 text-bronze" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              {t('processConsultation.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('processConsultation.description')}
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="bg-white border border-gray-100 rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder={t('processConsultation.processNumberPlaceholder')}
                  value={processNumber}
                  onChange={(e) => setProcessNumber(e.target.value)}
                  className="text-base"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder={t('processConsultation.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="bronze"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('processConsultation.sending')}
                    </>
                  ) : (
                    t('processConsultation.submitButton')
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  disabled={isSubmitting}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t('processConsultation.whatsappButton')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProcessConsultation;
