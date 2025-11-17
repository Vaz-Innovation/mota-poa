import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import ContactMap from "./ContactMap";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema with security in mind
  const contactSchema = z.object({
    name: z.string()
      .trim()
      .min(2, { message: t('contact.validation.nameMin') })
      .max(100, { message: t('contact.validation.nameMax') }),
    email: z.string()
      .trim()
      .email({ message: t('contact.validation.emailInvalid') })
      .max(255, { message: t('contact.validation.emailMax') }),
    phone: z.string()
      .trim()
      .min(10, { message: t('contact.validation.phoneMin') })
      .max(20, { message: t('contact.validation.phoneMax') })
      .optional()
      .or(z.literal('')),
    message: z.string()
      .trim()
      .min(10, { message: t('contact.validation.messageMin') })
      .max(1000, { message: t('contact.validation.messageMax') }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      // Validate with zod
      const validatedData = contactSchema.parse(data);

      // Encode data for WhatsApp
      const whatsappMessage = `*Nova mensagem do site*%0A%0A*Nome:* ${encodeURIComponent(validatedData.name)}%0A*Email:* ${encodeURIComponent(validatedData.email)}%0A*Telefone:* ${encodeURIComponent(validatedData.phone || 'Não informado')}%0A*Mensagem:* ${encodeURIComponent(validatedData.message)}`;
      
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5561995362668&text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('contact.error.validation'),
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t('contact.error.title'),
          description: t('contact.error.description'),
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Porto Alegre office coordinates
  const officeCoordinates: [number, number] = [-51.2177, -30.0346];

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

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
            <h3 className="text-2xl font-bold text-primary mb-6">
              {t('contact.form.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  {t('contact.form.name')} *
                </label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder={t('contact.form.namePlaceholder')} 
                  required 
                  maxLength={100}
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  {t('contact.form.email')} *
                </label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder={t('contact.form.emailPlaceholder')} 
                  required 
                  maxLength={255}
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                  {t('contact.form.phone')}
                </label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  placeholder={t('contact.form.phonePlaceholder')} 
                  maxLength={20}
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  {t('contact.form.message')} *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  required
                  maxLength={1000}
                  className="bg-background resize-none"
                />
              </div>

              <Button 
                type="submit" 
                variant="bronze" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {t('contact.info.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('contact.info.availability')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">{t('contact.info.address')}</h4>
                  <p className="text-muted-foreground text-sm">
                    Rua Siqueira Campos, nº 1.171, 9º andar
                    <br />
                    Ed. Marquês do Herval - Centro
                    <br />
                    Porto Alegre - RS - CEP: 90010-001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">{t('contact.info.phone')}</h4>
                  <a href="tel:+555132866586" className="text-muted-foreground hover:text-accent transition-colors">
                    (51) 3286.6586
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">{t('contact.info.email')}</h4>
                  <a href="mailto:contato@motaadvogados.com.br" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    contato@motaadvogados.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">{t('contact.info.hours')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('contact.info.hoursDetail')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">
            {t('contact.map.title')}
          </h3>
          <ContactMap 
            address="Rua Siqueira Campos, nº 1.171, 9º andar - Centro, Porto Alegre - RS"
            coordinates={officeCoordinates}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
