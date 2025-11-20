import logoMota from "@/assets/logo-mota-new.png";

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-[#FF7F3E]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center py-20">
        {/* Logo Centralizada */}
        <div className="flex justify-center mb-12 md:mb-16">
          <img 
            src={logoMota} 
            alt="Mota & Advogados Associados" 
            className="h-96 md:h-[28rem] lg:h-[36rem] xl:h-[48rem] w-auto drop-shadow-2xl animate-fade-in animate-float animate-glow"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
