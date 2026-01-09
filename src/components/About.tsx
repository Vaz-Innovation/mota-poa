import { TrendingUp, Shield, Target, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const topics = [
    {
      icon: TrendingUp,
      title: t('about.trajectory.title'),
      badge: t('about.trajectory.badge'),
      summary: t('about.trajectory.summary'),
      content: (
        <>
          <p className="mb-4">
            {t('about.trajectory.content1')}
          </p>
          <p>
            {t('about.trajectory.content2')}
          </p>
        </>
      ),
    },
    {
      icon: Shield,
      title: t('about.pillars.title'),
      badge: t('about.pillars.badge'),
      summary: t('about.pillars.summary'),
      content: (
        <>
          <p className="mb-4">
            {t('about.pillars.content1')}
          </p>
          <p className="mb-4">
            {t('about.pillars.content2')}
          </p>
          <p>
            {t('about.pillars.content3')}
          </p>
        </>
      ),
    },
    {
      icon: Target,
      title: t('about.mission.title'),
      badge: t('about.mission.badge'),
      summary: t('about.mission.summary'),
      content: (
        <>
          <p>
            {t('about.mission.content')}
          </p>
        </>
      ),
    },
    {
      icon: MapPin,
      title: t('about.office.title'),
      badge: t('about.office.badge'),
      summary: t('about.office.summary'),
      content: (
        <>
          <p className="mb-2">
            {t('about.office.content1')}
          </p>
          <p className="mb-2">
            {t('about.office.content2')}
          </p>
          <p>
            {t('about.office.content3')}
          </p>
        </>
      ),
    },
  ];


  return (
    <section 
      ref={sectionRef}
      id="sobre" 
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(var(--navy-deep)) 0%, hsl(var(--background)) 40%, hsl(var(--background)) 60%, hsl(var(--navy-deep) / 0.05) 100%)"
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block mb-4">
            <div className="h-1 w-20 bg-accent mx-auto mb-6 rounded-full" />
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold text-navy mb-6 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t('about.sectionTitle')}
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t('about.sectionSubtitle')}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const isHovered = hoveredCard === index;
            const delay = index * 100;
            
            return (
              <div
                key={index}
            className={`
              group cursor-pointer
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
                style={{ transitionDelay: `${delay + 300}ms` }}
                onClick={() => setSelectedTopic(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`
                  h-full p-8 rounded-2xl
                  backdrop-blur-lg bg-background/40 
                  border transition-all duration-500
                  ${isHovered 
                    ? 'border-accent/50 shadow-2xl -translate-y-2 bg-background/60' 
                    : 'border-border/50 shadow-lg'
                  }
                `}>
                  {/* Icon Container */}
                  <div className={`
                    w-20 h-20 mb-6
                    bg-accent/10 border border-accent/20 rounded-full
                    flex items-center justify-center
                    transition-all duration-300
                    ${isHovered ? 'scale-110 rotate-6' : ''}
                  `}>
                    <Icon className={`w-10 h-10 text-accent transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
                  </div>

                  {/* Badge */}
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20">
                    <span className="text-xs font-semibold text-accent">{topic.badge}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-navy mb-3 tracking-tight">
                    {topic.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {topic.summary}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>{t('about.explore')}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Dialog */}
        <Dialog open={selectedTopic !== null} onOpenChange={() => setSelectedTopic(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-background/95 border-accent/20">
            {selectedTopic !== null && (
              <>
                <DialogHeader>
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20 w-fit">
                    <span className="text-xs font-semibold text-accent">{topics[selectedTopic].badge}</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold text-navy mb-2 tracking-tight">
                    {topics[selectedTopic].title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-4">
                    {topics[selectedTopic].content}
                  </DialogDescription>
                </DialogHeader>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default About;
