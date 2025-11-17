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
      callUs: 'Fale Conosco'
    },
    hero: {
      title: 'MOTA & ADVOGADOS',
      subtitle: 'ASSOCIADOS',
      description: 'A MOTA & ADVOGADOS ASSOCIADOS é uma banca de advogados com atuação em Porto Alegre desde 2006, resultado da união de profissionais com relevante experiência e vasto conhecimento nas áreas do Direito Social, com destaque para Direito do Trabalho Individual e Coletivo, Direito Sindical, Direito Previdenciário e Direito Administrativo. Nosso o objetivo é a prestação de serviços jurídicos de excelência, realizados através do trabalho comprometido e da dedicação e paixão pela nossa profissão.',
      button: 'Fale com um Advogado'
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
      title: 'Sócios da Mota & Advogados Associados',
      intro1: 'A MOTA & ADVOGADOS ASSOCIADOS conta com uma equipe multidisciplinar de profissionais, sempre fiel ao nosso modo de prestar nossos serviços.',
      intro2: 'O investimento na formação e capacitação dos nossos profissionais, a atuação em diversas áreas, o treinamento da nossa equipe, a dedicação e comprometimento com o profissionalismo nos transformam numa banca capacitada e especializada nas áreas em que atuamos. O resultado disso é a otimização de tempo e recursos e a criatividade nas soluções jurídicas.',
      intro3: 'Tudo isso porque acreditamos que juntos, cada um de nós vale mais e porque temos vocação para a prática da advocacia. E por isso a praticamos com dedicação, prazer e alegria.'
    },
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Estamos prontos para atender você. Entre em contato conosco e agende uma consulta com nossos especialistas.',
      form: {
        name: 'Nome Completo',
        namePlaceholder: 'Seu nome',
        email: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        phone: 'Telefone',
        phonePlaceholder: '(51) 99999-9999',
        message: 'Mensagem',
        messagePlaceholder: 'Como podemos ajudá-lo?',
        submit: 'Enviar Mensagem'
      },
      info: {
        title: 'Informações de Contato',
        availability: 'Nossa equipe está disponível para atendê-lo de segunda a sexta-feira, das 9h às 18h.',
        address: 'Endereço',
        phone: 'Telefone'
      }
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
      callUs: 'Contáctenos'
    },
    hero: {
      title: 'MOTA & ABOGADOS',
      subtitle: 'ASOCIADOS',
      description: 'MOTA & ABOGADOS ASOCIADOS es un bufete de abogados que opera en Porto Alegre desde 2006, resultado de la unión de profesionales con experiencia relevante y amplio conocimiento en las áreas del Derecho Social, con énfasis en Derecho Laboral Individual y Colectivo, Derecho Sindical, Derecho Previsional y Derecho Administrativo. Nuestro objetivo es la prestación de servicios jurídicos de excelencia, realizados a través del trabajo comprometido y la dedicación y pasión por nuestra profesión.',
      button: 'Hable con un Abogado'
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
      title: 'Socios de Mota & Abogados Asociados',
      intro1: 'MOTA & ABOGADOS ASOCIADOS cuenta con un equipo multidisciplinario de profesionales, siempre fiel a nuestra forma de prestar nuestros servicios.',
      intro2: 'La inversión en la formación y capacitación de nuestros profesionales, la actuación en diversas áreas, la capacitación de nuestro equipo, la dedicación y el compromiso con el profesionalismo nos transforman en un bufete capacitado y especializado en las áreas en que actuamos. El resultado de esto es la optimización de tiempo y recursos y la creatividad en las soluciones jurídicas.',
      intro3: 'Todo esto porque creemos que juntos, cada uno de nosotros vale más y porque tenemos vocación por la práctica de la abogacía. Y por eso la practicamos con dedicación, placer y alegría.'
    },
    contact: {
      title: 'Póngase en Contacto',
      subtitle: 'Estamos listos para atenderle. Contáctenos y programe una consulta con nuestros especialistas.',
      form: {
        name: 'Nombre Completo',
        namePlaceholder: 'Su nombre',
        email: 'Correo Electrónico',
        emailPlaceholder: 'su@email.com',
        phone: 'Teléfono',
        phonePlaceholder: '(51) 99999-9999',
        message: 'Mensaje',
        messagePlaceholder: '¿Cómo podemos ayudarle?',
        submit: 'Enviar Mensaje'
      },
      info: {
        title: 'Información de Contacto',
        availability: 'Nuestro equipo está disponible para atenderle de lunes a viernes, de 9h a 18h.',
        address: 'Dirección',
        phone: 'Teléfono'
      }
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
      callUs: 'Contact Us'
    },
    hero: {
      title: 'MOTA & LAWYERS',
      subtitle: 'ASSOCIATES',
      description: 'MOTA & LAWYERS ASSOCIATES is a law firm operating in Porto Alegre since 2006, resulting from the union of professionals with relevant experience and extensive knowledge in the areas of Social Law, with emphasis on Individual and Collective Labor Law, Union Law, Social Security Law and Administrative Law. Our goal is to provide excellent legal services, carried out through committed work and dedication and passion for our profession.',
      button: 'Talk to a Lawyer'
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
      title: 'Partners of Mota & Lawyers Associates',
      intro1: 'MOTA & LAWYERS ASSOCIATES has a multidisciplinary team of professionals, always faithful to our way of providing our services.',
      intro2: 'The investment in the training and qualification of our professionals, the performance in several areas, the training of our team, the dedication and commitment to professionalism transform us into a qualified and specialized firm in the areas in which we operate. The result of this is the optimization of time and resources and creativity in legal solutions.',
      intro3: 'All this because we believe that together, each of us is worth more and because we have a vocation for the practice of law. And that is why we practice it with dedication, pleasure and joy.'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'We are ready to serve you. Contact us and schedule a consultation with our specialists.',
      form: {
        name: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone',
        phonePlaceholder: '(51) 99999-9999',
        message: 'Message',
        messagePlaceholder: 'How can we help you?',
        submit: 'Send Message'
      },
      info: {
        title: 'Contact Information',
        availability: 'Our team is available to serve you from Monday to Friday, from 9am to 6pm.',
        address: 'Address',
        phone: 'Phone'
      }
    },
    footer: {
      description: 'Excellence in law with ethics, transparency and commitment.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.'
    }
  }
};
