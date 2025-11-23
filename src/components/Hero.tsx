import logoMota from "@/assets/logo-mota-new.png";

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-[#FF7F3E]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center py-24 md:py-28 pb-24 md:pb-32">
        {/* Logo Centralizada */}
        <div className="flex justify-center mb-12 md:mb-16">
          <img 
            src={logoMota} 
            alt="Mota & Advogados Associados" 
            className="h-72 md:h-[22rem] lg:h-[28rem] xl:h-[36rem] w-auto drop-shadow-2xl animate-fade-in animate-float animate-glow"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
