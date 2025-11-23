import logoMota from "@/assets/logo-mota-new.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-[#FF7F3E] overflow-hidden">
      {/* Spotlight effect - Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#FF7F3E] via-[#FF7F3E] to-[#E86A2E]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/10 via-transparent to-transparent rounded-full animate-spotlight blur-3xl"></div>
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-particle-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-particle-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-particle-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-particle-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center py-20">
        {/* Logo Container */}
        <div className="flex justify-center mb-12 md:mb-16 perspective-1000">
          <div className="relative group">
            {/* Glow rings behind logo */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl scale-110 animate-pulse-subtle"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl scale-125"></div>
            </div>
            
            {/* Logo with enhanced animations */}
            <img 
              src={logoMota} 
              alt="Mota & Advogados Associados" 
              className="h-96 md:h-[28rem] lg:h-[36rem] xl:h-[48rem] w-auto 
                         animate-logo-entrance animate-levitate animate-glow-elegant
                         transition-all duration-500 ease-out
                         group-hover:scale-105 group-hover:brightness-110
                         cursor-pointer select-none"
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Decorative elements around logo */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
