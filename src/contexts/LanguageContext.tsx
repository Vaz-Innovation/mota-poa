import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      areas: 'Áreas de Atuação',
      lawyers: 'Advogados',
      contact: 'Contato',
      callUs: 'Fale Conosco',
      access: 'Acessos'
    },
    hero: {
      banner1: {
        subtitle: 'Excelência Jurídica',
        title: 'Para Você',
        description: 'Mais de 15 anos transformando desafios em soluções.',
        button: 'Fale Conosco'
      },
      banner2: {
        subtitle: 'Direitos Trabalhistas',
        title: 'Protegidos',
        description: 'Defesa completa dos seus direitos com expertise.',
        button: 'Consulte um Especialista'
      },
      banner3: {
        subtitle: 'Previdência',
        title: 'Planejada',
        description: 'Garanta seu futuro com segurança e tranquilidade.',
        button: 'Agende uma Consulta'
      },
      banner4: {
        subtitle: 'Resultados',
        title: 'Comprovados',
        description: 'Soluções jurídicas criativas e eficazes.',
        button: 'Saiba Mais'
      }
    },
    stats: {
      experience: 'Anos de Experiência',
      clients: 'Clientes Atendidos',
      success: 'Taxa de Sucesso',
      cases: 'Casos Resolvidos'
    },
    about: {
      title: 'Sobre Nós',
      intro: 'Conheça mais sobre nossa história, valores e compromisso com a excelência jurídica.',
      learnMore: 'Saiba mais →'
    },
    practiceAreas: {
      title: 'Áreas de Atuação',
      intro: 'Temos nossa atuação inserida em diversas áreas do Direito, especializados nas áreas do Direito Social, com destaque para Direito do Trabalho Individual e Coletivo, Direito Sindical, Direito Previdenciário e Direito Administrativo. Também atendemos outras áreas, contando sempre com profissionais qualificados.',
      learnMore: 'Saiba mais →'
    },
    lawyers: {
      title: 'Sócios',
      intro: 'Conheça os sócios que lideram a MOTA & ADVOGADOS ASSOCIADOS com excelência e comprometimento.'
    },
    contact: {
      title: 'Localização',
      subtitle: 'Visite nosso escritório em Porto Alegre.',
    },
    processConsultation: {
      title: 'Consulte Seu Processo',
      description: 'Digite o número do processo e receba atualizações em poucos minutos.',
      processNumberPlaceholder: 'Número do processo (ex: 0000000-00.0000.0.00.0000)',
      emailPlaceholder: 'Seu melhor e-mail',
      submitButton: 'Receber por E-mail',
      whatsappButton: 'Consultar via WhatsApp',
      sending: 'Enviando...',
      success: 'Solicitação Enviada!',
      successMessage: 'Você receberá a atualização do processo em seu e-mail em breve.',
      error: 'Erro',
      invalidProcess: 'Por favor, insira um número de processo válido.',
      invalidEmail: 'Por favor, insira um e-mail válido.'
    },
    newsletter: {
      title: 'Receba Nossas Novidades',
      description: 'Inscreva-se em nossa newsletter e receba atualizações sobre direito, dicas jurídicas e notícias do escritório.',
      placeholder: 'Seu melhor e-mail',
      button: 'Inscrever',
      sending: 'Enviando...',
      success: 'Sucesso!',
      successMessage: 'Você foi inscrito em nossa newsletter.',
      error: 'Erro',
      errorMessage: 'Por favor, insira um e-mail válido.'
    },
    footer: {
      description: 'Excelência em advocacia com ética, transparência e comprometimento.',
      quickLinks: 'Links Rápidos',
      contact: 'Contato',
      rights: 'Todos os direitos reservados.'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      areas: 'Áreas de Práctica',
      lawyers: 'Abogados',
      contact: 'Contacto',
      callUs: 'Contáctenos',
      access: 'Accesos'
    },
    hero: {
      banner1: {
        subtitle: 'Excelencia Jurídica',
        title: 'Para Usted',
        description: 'Más de 15 años transformando desafíos en soluciones.',
        button: 'Contáctenos'
      },
      banner2: {
        subtitle: 'Derechos Laborales',
        title: 'Protegidos',
        description: 'Defensa completa de sus derechos con experiencia.',
        button: 'Consulte un Especialista'
      },
      banner3: {
        subtitle: 'Previsión',
        title: 'Planificada',
        description: 'Garantice su futuro con seguridad y tranquilidad.',
        button: 'Agende una Consulta'
      },
      banner4: {
        subtitle: 'Resultados',
        title: 'Comprobados',
        description: 'Soluciones jurídicas creativas y eficaces.',
        button: 'Más Información'
      }
    },
    stats: {
      experience: 'Años de Experiencia',
      clients: 'Clientes Atendidos',
      success: 'Tasa de Éxito',
      cases: 'Casos Resueltos'
    },
    about: {
      title: 'Sobre Nosotros',
      intro: 'Conozca más sobre nuestra historia, valores y compromiso con la excelencia jurídica.',
      learnMore: 'Más información →'
    },
    practiceAreas: {
      title: 'Áreas de Práctica',
      intro: 'Tenemos nuestra actuación insertada en diversas áreas del Derecho, especializados en las áreas del Derecho Social, con énfasis en Derecho Laboral Individual y Colectivo, Derecho Sindical, Derecho Previsional y Derecho Administrativo. También atendemos otras áreas, contando siempre con profesionales calificados.',
      learnMore: 'Más información →'
    },
    lawyers: {
      title: 'Socios',
      intro: 'Conozca los socios que lideran MOTA & ABOGADOS ASOCIADOS con excelencia y compromiso.'
    },
    contact: {
      title: 'Ubicación',
      subtitle: 'Visite nuestra oficina en Porto Alegre.',
    },
    processConsultation: {
      title: 'Consulte Su Proceso',
      description: 'Ingrese el número del proceso y reciba actualizaciones en pocos minutos.',
      processNumberPlaceholder: 'Número de proceso (ej: 0000000-00.0000.0.00.0000)',
      emailPlaceholder: 'Su mejor correo electrónico',
      submitButton: 'Recibir por Correo',
      whatsappButton: 'Consultar vía WhatsApp',
      sending: 'Enviando...',
      success: '¡Solicitud Enviada!',
      successMessage: 'Recibirá la actualización del proceso en su correo pronto.',
      error: 'Error',
      invalidProcess: 'Por favor, ingrese un número de proceso válido.',
      invalidEmail: 'Por favor, ingrese un correo electrónico válido.'
    },
    newsletter: {
      title: 'Reciba Nuestras Novedades',
      description: 'Suscríbase a nuestro boletín y reciba actualizaciones sobre derecho, consejos jurídicos y noticias del despacho.',
      placeholder: 'Su mejor correo electrónico',
      button: 'Suscribirse',
      sending: 'Enviando...',
      success: '¡Éxito!',
      successMessage: 'Ha sido suscrito a nuestro boletín.',
      error: 'Error',
      errorMessage: 'Por favor, ingrese un correo electrónico válido.'
    },
    footer: {
      description: 'Excelencia en abogacía con ética, transparencia y compromiso.',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      areas: 'Practice Areas',
      lawyers: 'Lawyers',
      contact: 'Contact',
      callUs: 'Contact Us',
      access: 'Access'
    },
    hero: {
      banner1: {
        subtitle: 'Legal Excellence',
        title: 'For You',
        description: 'Over 15 years transforming challenges into solutions.',
        button: 'Contact Us'
      },
      banner2: {
        subtitle: 'Labor Rights',
        title: 'Protected',
        description: 'Complete defense of your rights with expertise.',
        button: 'Consult a Specialist'
      },
      banner3: {
        subtitle: 'Social Security',
        title: 'Planned',
        description: 'Secure your future with safety and peace of mind.',
        button: 'Schedule a Consultation'
      },
      banner4: {
        subtitle: 'Results',
        title: 'Proven',
        description: 'Creative and effective legal solutions.',
        button: 'Learn More'
      }
    },
    stats: {
      experience: 'Years of Experience',
      clients: 'Clients Served',
      success: 'Success Rate',
      cases: 'Cases Resolved'
    },
    about: {
      title: 'About Us',
      intro: 'Learn more about our history, values and commitment to legal excellence.',
      learnMore: 'Learn more →'
    },
    practiceAreas: {
      title: 'Practice Areas',
      intro: 'We have our practice inserted in several areas of Law, specialized in the areas of Social Law, with emphasis on Individual and Collective Labor Law, Union Law, Social Security Law and Administrative Law. We also serve other areas, always counting on qualified professionals.',
      learnMore: 'Learn more →'
    },
    lawyers: {
      title: 'Partners',
      intro: 'Meet the partners who lead MOTA & LAWYERS ASSOCIATES with excellence and commitment.'
    },
    contact: {
      title: 'Location',
      subtitle: 'Visit our office in Porto Alegre.',
    },
    processConsultation: {
      title: 'Check Your Case',
      description: 'Enter the case number and receive updates in just a few minutes.',
      processNumberPlaceholder: 'Case number (ex: 0000000-00.0000.0.00.0000)',
      emailPlaceholder: 'Your best email',
      submitButton: 'Receive by Email',
      whatsappButton: 'Check via WhatsApp',
      sending: 'Sending...',
      success: 'Request Sent!',
      successMessage: 'You will receive the case update in your email soon.',
      error: 'Error',
      invalidProcess: 'Please enter a valid case number.',
      invalidEmail: 'Please enter a valid email address.'
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to our newsletter and receive updates on law, legal tips and firm news.',
      placeholder: 'Your best email',
      button: 'Subscribe',
      sending: 'Sending...',
      success: 'Success!',
      successMessage: 'You have been subscribed to our newsletter.',
      error: 'Error',
      errorMessage: 'Please enter a valid email.'
    },
    footer: {
      description: 'Excellence in law with ethics, transparency and commitment.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.'
    }
  }
};
