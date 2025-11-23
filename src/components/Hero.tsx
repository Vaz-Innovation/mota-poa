import logoMota from "@/assets/logo-mota-new.png";

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-start pt-20 bg-[#FF7F3E]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-start pt-32 md:pt-40 pb-32 md:pb-48">
        {/* Logo Centralizada */}
        <div className="flex justify-center mb-16 md:mb-20">
          <img 
            src={logoMota} 
            alt="Mota & Advogados Associados" 
            className="h-[27rem] md:h-[33rem] lg:h-[42rem] xl:h-[54rem] w-auto drop-shadow-2xl animate-fade-in animate-float animate-glow"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
