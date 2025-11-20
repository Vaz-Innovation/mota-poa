import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, FileText, Briefcase, Upload } from "lucide-react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TrabalheConosco = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [cargo, setCargo] = useState("");
  
  const jobApplicationSchema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
    email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
    phone: z.string().trim().min(1, "Telefone é obrigatório").max(20, "Telefone muito longo"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    area: z.string().trim().min(1, "Área de interesse é obrigatória"),
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
      cargo: cargo,
      area: formData.get("area") as string,
      message: formData.get("message") as string,
    };

    try {
      const validatedData = jobApplicationSchema.parse(data);
      
      // Encode data for WhatsApp
      const whatsappMessage = `*Candidatura - Trabalhe Conosco*%0A%0A*Nome:* ${encodeURIComponent(validatedData.name)}%0A*Telefone:* ${encodeURIComponent(validatedData.phone)}%0A*Email:* ${encodeURIComponent(validatedData.email)}%0A*Cargo:* ${encodeURIComponent(validatedData.cargo)}%0A*Área de Interesse:* ${encodeURIComponent(validatedData.area)}%0A*Mensagem:* ${encodeURIComponent(validatedData.message)}`;
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/5551995362668?text=${whatsappMessage}`, '_blank');
      
      toast({
        title: "Candidatura enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      // Reset form
      e.currentTarget.reset();
      setCargo("");
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
          description: "Ocorreu um erro ao enviar sua candidatura. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in">
              Trabalhe Conosco
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Faça parte de uma equipe de excelência comprometida com a justiça e o sucesso de nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* About Section */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Por que trabalhar conosco?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  <Briefcase className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Ambiente Colaborativo</h3>
                  <p className="text-muted-foreground">
                    Trabalhe em uma equipe que valoriza a colaboração e o desenvolvimento profissional.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Casos Desafiadores</h3>
                  <p className="text-muted-foreground">
                    Participe de casos complexos e relevantes em diversas áreas do direito.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  <User className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Crescimento Profissional</h3>
                  <p className="text-muted-foreground">
                    Desenvolva sua carreira em um escritório com tradição e excelência jurídica.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Envie sua Candidatura
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Cargo Field */}
                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" />
                    Cargo
                  </Label>
                  <Select value={cargo} onValueChange={setCargo} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o cargo desejado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Estagiário">Estagiário</SelectItem>
                      <SelectItem value="Assistente Administrativo">Assistente Administrativo</SelectItem>
                      <SelectItem value="Advogado">Advogado</SelectItem>
                      <SelectItem value="Advogado Correspondente">Advogado Correspondente</SelectItem>
                      <SelectItem value="Advogado Parceiro">Advogado Parceiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Field */}
                <div className="space-y-2">
                  <Label htmlFor="area" className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" />
                    Área de Interesse
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    type="text"
                    placeholder="Ex: Direito Civil, Direito Trabalhista, etc."
                    required
                    className="w-full"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    Mensagem / Experiência Profissional
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Conte-nos sobre sua experiência e por que deseja trabalhar conosco..."
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={6}
                    className="w-full resize-none"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Upload className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Envio de Currículo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Após enviar este formulário, você será redirecionado ao WhatsApp onde poderá anexar seu currículo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Voltar para Home
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
