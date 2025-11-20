import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleMap from "./GoogleMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import { z } from "zod";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const contactSchema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
    email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
    phone: z.string().trim().min(1, "Telefone é obrigatório").max(20, "Telefone muito longo"),
    cpf: z.string().trim().min(1, "CPF é obrigatório").max(14, "CPF inválido"),
    processNumber: z.string().trim().min(1, "Número do processo é obrigatório").max(50, "Número do processo muito longo"),
    message: z.string().trim().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(1000, "Mensagem muito longa")
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
      const whatsappMessage = `*Nova mensagem do site*%0A%0A*Nome:* ${encodeURIComponent(validatedData.name)}%0A*Email:* ${encodeURIComponent(validatedData.email)}%0A*Telefone:* ${encodeURIComponent(validatedData.phone)}%0A*CPF:* ${encodeURIComponent(validatedData.cpf)}%0A*Número do Processo:* ${encodeURIComponent(validatedData.processNumber)}%0A*Mensagem:* ${encodeURIComponent(validatedData.message)}`;
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/5551995362668?text=${whatsappMessage}`, '_blank');
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-7xl mx-auto mb-20">
          <GoogleMap 
            address={officeAddress}
            coordinates={officeCoordinates}
          />
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Entre em Contato
            </h3>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário abaixo e entraremos em contato o mais breve possível
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-lg">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                Nome Completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                required
                maxLength={100}
                className="w-full"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                maxLength={255}
                className="w-full"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                Telefone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                required
                maxLength={20}
                className="w-full"
              />
            </div>

            {/* CPF Field */}
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                CPF
              </Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                required
                maxLength={14}
                className="w-full"
              />
            </div>

            {/* Process Number Field */}
            <div className="space-y-2">
              <Label htmlFor="processNumber" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                Número do Processo
              </Label>
              <Input
                id="processNumber"
                name="processNumber"
                type="text"
                placeholder="0000000-00.0000.0.00.0000"
                required
                maxLength={50}
                className="w-full"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                Mensagem
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Descreva como podemos ajudá-lo..."
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
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
