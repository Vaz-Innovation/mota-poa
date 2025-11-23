import logoMota from "@/assets/logo-mota-new.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-[#FF7F3E] overflow-hidden">
      {/* Spotlight effect - Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#FF7F3E] via-[#FF7F3E] to-[#E86A2E]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-white/15 via-white/5 to-transparent rounded-full animate-spotlight blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center py-20">
        {/* Logo Container */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="relative group">
            {/* Enhanced glow effect behind logo */}
            <div className="absolute inset-0 -z-10 scale-110">
              <div className="absolute inset-0 bg-gradient-radial from-white/10 via-white/5 to-transparent blur-3xl animate-pulse-subtle"></div>
              <div className="absolute inset-0 bg-white/5 blur-2xl scale-125 animate-glow-elegant"></div>
            </div>
            
            {/* Logo with reveal/draw animation */}
            <div className="relative">
              {/* Base logo with entrance animation */}
              <img 
                src={logoMota} 
                alt="Mota & Advogados Associados" 
                className="h-96 md:h-[28rem] lg:h-[36rem] xl:h-[48rem] w-auto 
                           opacity-0 animate-logo-entrance
                           transition-all duration-500 ease-out
                           group-hover:scale-105 group-hover:brightness-110
                           cursor-pointer select-none"
                style={{ 
                  animationDelay: '0.3s',
                  animationFillMode: 'forwards',
                }}
              />
              
              {/* Overlay logo with drawing reveal effect */}
              <img 
                src={logoMota} 
                alt="" 
                className="absolute inset-0 h-96 md:h-[28rem] lg:h-[36rem] xl:h-[48rem] w-auto 
                           animate-logo-reveal animate-glow-elegant
                           pointer-events-none"
                style={{ 
                  animationDelay: '0.5s',
                  filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8))',
                }}
              />
            </div>

            {/* Continuous levitation after entrance */}
            <div className="absolute inset-0 animate-levitate" style={{ animationDelay: '2s' }}>
              <div className="h-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
