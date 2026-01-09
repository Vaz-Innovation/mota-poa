import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleMap from "./GoogleMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, MessageSquare, Car } from "lucide-react";
import { z } from "zod";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const contactSchema = z.object({
    name: z.string().trim().min(1, t('contact.validation.nameRequired')).max(100, t('contact.validation.nameTooLong')),
    email: z.string().trim().email(t('contact.validation.emailInvalid')).max(255, t('contact.validation.emailTooLong')),
    phone: z.string().trim().min(1, t('contact.validation.phoneRequired')).max(20, t('contact.validation.phoneTooLong')),
    cpf: z.string().trim().min(1, t('contact.validation.cpfRequired')).max(14, t('contact.validation.cpfInvalid')),
    processNumber: z.string().trim().max(50, t('contact.validation.processNumberTooLong')).optional(),
    message: z.string().trim().min(10, t('contact.validation.messageTooShort')).max(1000, t('contact.validation.messageTooLong'))
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      cpf: formData.get("cpf") as string,
      processNumber: formData.get("processNumber") as string,
      message: formData.get("message") as string,
    };

    try {
      const validatedData = contactSchema.parse(data);
      
      // Encode data for WhatsApp
      const whatsappMessage = `Nome: ${encodeURIComponent(validatedData.name)}%0ACPF: ${encodeURIComponent(validatedData.cpf)}%0ATelefone: ${encodeURIComponent(validatedData.phone)}%0AE-mail: ${encodeURIComponent(validatedData.email)}${validatedData.processNumber ? `%0ANúmero do Processo: ${encodeURIComponent(validatedData.processNumber)}` : ''}%0AMensagem: ${encodeURIComponent(validatedData.message)}`;
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/5551981981210?text=${whatsappMessage}`, '_blank');
      
      toast({
        title: t('contact.toastSuccessTitle'),
        description: t('contact.toastSuccessDescription'),
      });
      
      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('contact.toastValidationErrorTitle'),
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t('contact.toastGenericErrorTitle'),
          description: t('contact.toastGenericErrorDescription'),
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Porto Alegre office address
  const officeAddress = "R. Siqueira Campos, 1171 - Centro Histórico, Porto Alegre - RS, 90010-001";

  return (
    <section id="contato" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {t('contact.subtitle')}
          </p>
          
          {/* Parking Information */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Car className="w-4 h-4" />
            <p className="text-sm">
              {t('contact.parkingText')} - {" "}
              <a 
                href="https://maps.app.goo.gl/pMeXvfLdYfhFseow5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {t('contact.parkingLinkText')}
              </a>
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="max-w-7xl mx-auto mb-20">
          <GoogleMap address={officeAddress} />
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('contact.formTitle')}
            </h3>
            <p className="text-lg text-muted-foreground">
              {t('contact.formSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-lg">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                {t('contact.fields.fullNameLabel')}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t('contact.fields.fullNamePlaceholder')}
                required
                maxLength={100}
                className="w-full"
              />
            </div>

            {/* CPF Field */}
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                {t('contact.fields.cpfLabel')}
              </Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder={t('contact.fields.cpfPlaceholder')}
                required
                maxLength={14}
                className="w-full"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                {t('contact.fields.phoneLabel')}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t('contact.fields.phonePlaceholder')}
                required
                maxLength={20}
                className="w-full"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                {t('contact.fields.emailLabel')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('contact.fields.emailPlaceholder')}
                required
                maxLength={255}
                className="w-full"
              />
            </div>

            {/* Process Number Field */}
            <div className="space-y-2">
              <Label htmlFor="processNumber" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                {t('contact.fields.processNumberLabelOptional')}
              </Label>
              <Input
                id="processNumber"
                name="processNumber"
                type="text"
                placeholder={t('contact.fields.processNumberPlaceholder')}
                maxLength={50}
                className="w-full"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                {t('contact.fields.messageLabel')}
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t('contact.fields.messagePlaceholder')}
                required
                minLength={10}
                maxLength={1000}
                rows={6}
                className="w-full resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              {isSubmitting ? t('contact.submitting') : t('contact.submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
