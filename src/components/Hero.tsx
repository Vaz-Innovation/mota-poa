import motaVideo from "@/assets/mota-advogados.mp4";

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-[#FF7F3E]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center py-20">
        {/* Video Logo Centralizado */}
        <div className="flex justify-center mb-12 md:mb-16">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="h-64 md:h-80 lg:h-96 xl:h-[32rem] w-auto drop-shadow-2xl animate-fade-in"
          >
            <source src={motaVideo} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Hero;
