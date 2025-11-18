import logoMota from "@/assets/mota-logo-new.png";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="inicio" className="relative w-full h-screen flex items-center justify-center bg-hero-orange overflow-hidden">
      {/* Logo Centralizada com Animação */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        <img 
          src={logoMota} 
          alt="Mota & Advogados Associados" 
          className="w-auto h-auto max-w-[80vw] max-h-[60vh] md:max-w-[60vw] md:max-h-[50vh] object-contain"
        />
      </div>

    </section>
  );
};

export default Hero;
