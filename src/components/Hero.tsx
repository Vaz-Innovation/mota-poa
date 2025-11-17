import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-brasilia.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Brasília - Capital da República"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Excelência em
            <span className="block text-bronze">Advocacia</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            A MOTA & ADVOGADOS ASSOCIADOS é uma banca de advogados com atuação em Porto Alegre desde 2006, resultado da união de profissionais com relevante experiência e vasto conhecimento nas áreas do Direito Social, com destaque para Direito do Trabalho Individual e Coletivo, Direito Sindical, Direito Previdenciário e Direito Administrativo. Nosso o objetivo é a prestação de serviços jurídicos de excelência, realizados através do trabalho comprometido e da dedicação e paixão pela nossa profissão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="bronze" size="lg" className="text-lg px-8 py-6">
              Conheça Nossas Áreas
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Fale com um Advogado
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
