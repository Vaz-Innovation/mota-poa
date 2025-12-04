import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const Stats = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      id: 1,
      value: 25,
      suffix: "+",
      label: t('stats.experience'),
      duration: 2000,
    },
    {
      id: 2,
      value: 22500,
      suffix: "+",
      label: t('stats.clients'),
      duration: 2500,
    },
    {
      id: 3,
      value: 95,
      suffix: "%",
      label: t('stats.success'),
      duration: 2000,
    },
    {
      id: 4,
      value: 15000,
      suffix: "+",
      label: t('stats.cases'),
      duration: 3000,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 bg-primary relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center"
            >
              <div className="mb-3">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-white/80 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  duration: number;
  isVisible: boolean;
}

const AnimatedCounter = ({ target, suffix, duration, isVisible }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isVisible]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white block">
      {count.toLocaleString('pt-BR')}
      <span className="text-accent">{suffix}</span>
    </span>
  );
};

export default Stats;
