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
        title: 'Excelência Jurídica para Você',
        description: 'Consultoria especializada em Direito do Trabalho, Previdenciário e Administrativo. Mais de 15 anos de experiência em soluções personalizadas.',
        button: 'Fale com um Especialista'
      },
      banner2: {
        title: 'Defenda Seus Direitos Trabalhistas',
        description: 'Atuação em Direito do Trabalho Individual e Coletivo. Proteção completa aos seus direitos com assessoria jurídica de excelência.',
        button: 'Solicite uma Consulta'
      },
      banner3: {
        title: 'Planejamento Previdenciário Completo',
        description: 'Assessoria especializada em Direito Previdenciário. Garanta sua aposentadoria e benefícios com segurança e tranquilidade.',
        button: 'Agende sua Avaliação'
      },
      banner4: {
        title: 'Compromisso com Resultados',
        description: 'Equipe multidisciplinar dedicada a oferecer soluções jurídicas criativas e eficazes. Seu sucesso é nossa prioridade.',
        button: 'Conheça Nossos Serviços'
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
      title: 'Sócios da Mota & Advogados Associados',
      intro1: 'A MOTA & ADVOGADOS ASSOCIADOS conta com uma equipe multidisciplinar de profissionais, sempre fiel ao nosso modo de prestar nossos serviços.',
      intro2: 'O investimento na formação e capacitação dos nossos profissionais, a atuação em diversas áreas, o treinamento da nossa equipe, a dedicação e comprometimento com o profissionalismo nos transformam numa banca capacitada e especializada nas áreas em que atuamos. O resultado disso é a otimização de tempo e recursos e a criatividade nas soluções jurídicas.',
      intro3: 'Tudo isso porque acreditamos que juntos, cada um de nós vale mais e porque temos vocação para a prática da advocacia. E por isso a praticamos com dedicação, prazer e alegria.'
    },
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Estamos prontos para atender você. Entre em contato conosco e agende uma consulta com nossos especialistas.',
      form: {
        title: 'Envie sua Mensagem',
        name: 'Nome Completo',
        namePlaceholder: 'Seu nome',
        email: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        phone: 'Telefone',
        phonePlaceholder: '(51) 99999-9999',
        message: 'Mensagem',
        messagePlaceholder: 'Como podemos ajudá-lo?',
        submit: 'Enviar Mensagem',
        sending: 'Enviando...'
      },
      info: {
        title: 'Informações de Contato',
        availability: 'Nossa equipe está disponível para atendê-lo de segunda a sexta-feira, das 9h às 18h.',
        address: 'Endereço',
        phone: 'Telefone',
        email: 'E-mail',
        hours: 'Horário de Atendimento',
        hoursDetail: 'Segunda a Sexta: 9h às 18h'
      },
      map: {
        title: 'Nossa Localização'
      },
      validation: {
        nameMin: 'Nome deve ter pelo menos 2 caracteres',
        nameMax: 'Nome deve ter no máximo 100 caracteres',
        emailInvalid: 'E-mail inválido',
        emailMax: 'E-mail deve ter no máximo 255 caracteres',
        phoneMin: 'Telefone deve ter pelo menos 10 caracteres',
        phoneMax: 'Telefone deve ter no máximo 20 caracteres',
        messageMin: 'Mensagem deve ter pelo menos 10 caracteres',
        messageMax: 'Mensagem deve ter no máximo 1000 caracteres'
      },
      success: {
        title: 'Mensagem enviada!',
        description: 'Entraremos em contato em breve.'
      },
      error: {
        validation: 'Erro de validação',
        title: 'Erro ao enviar',
        description: 'Tente novamente mais tarde.'
      }
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
        title: 'Excelencia Jurídica para Usted',
        description: 'Consultoría especializada en Derecho Laboral, Previsional y Administrativo. Más de 15 años de experiencia en soluciones personalizadas.',
        button: 'Hable con un Especialista'
      },
      banner2: {
        title: 'Defienda Sus Derechos Laborales',
        description: 'Actuación en Derecho Laboral Individual y Colectivo. Protección completa de sus derechos con asesoría jurídica de excelencia.',
        button: 'Solicite una Consulta'
      },
      banner3: {
        title: 'Planificación Previsional Completa',
        description: 'Asesoría especializada en Derecho Previsional. Garantice su jubilación y beneficios con seguridad y tranquilidad.',
        button: 'Agende su Evaluación'
      },
      banner4: {
        title: 'Compromiso con Resultados',
        description: 'Equipo multidisciplinario dedicado a ofrecer soluciones jurídicas creativas y eficaces. Su éxito es nuestra prioridad.',
        button: 'Conozca Nuestros Servicios'
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
      title: 'Socios de Mota & Abogados Asociados',
      intro1: 'MOTA & ABOGADOS ASOCIADOS cuenta con un equipo multidisciplinario de profesionales, siempre fiel a nuestra forma de prestar nuestros servicios.',
      intro2: 'La inversión en la formación y capacitación de nuestros profesionales, la actuación en diversas áreas, la capacitación de nuestro equipo, la dedicación y el compromiso con el profesionalismo nos transforman en un bufete capacitado y especializado en las áreas en que actuamos. El resultado de esto es la optimización de tiempo y recursos y la creatividad en las soluciones jurídicas.',
      intro3: 'Todo esto porque creemos que juntos, cada uno de nosotros vale más y porque tenemos vocación por la práctica de la abogacía. Y por eso la practicamos con dedicación, placer y alegría.'
    },
    contact: {
      title: 'Póngase en Contacto',
      subtitle: 'Estamos listos para atenderle. Contáctenos y programe una consulta con nuestros especialistas.',
      form: {
        title: 'Envíe su Mensaje',
        name: 'Nombre Completo',
        namePlaceholder: 'Su nombre',
        email: 'Correo Electrónico',
        emailPlaceholder: 'su@email.com',
        phone: 'Teléfono',
        phonePlaceholder: '(51) 99999-9999',
        message: 'Mensaje',
        messagePlaceholder: '¿Cómo podemos ayudarle?',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...'
      },
      info: {
        title: 'Información de Contacto',
        availability: 'Nuestro equipo está disponible para atenderle de lunes a viernes, de 9h a 18h.',
        address: 'Dirección',
        phone: 'Teléfono',
        email: 'Correo Electrónico',
        hours: 'Horario de Atención',
        hoursDetail: 'Lunes a Viernes: 9h a 18h'
      },
      map: {
        title: 'Nuestra Ubicación'
      },
      validation: {
        nameMin: 'El nombre debe tener al menos 2 caracteres',
        nameMax: 'El nombre debe tener como máximo 100 caracteres',
        emailInvalid: 'Correo electrónico inválido',
        emailMax: 'El correo debe tener como máximo 255 caracteres',
        phoneMin: 'El teléfono debe tener al menos 10 caracteres',
        phoneMax: 'El teléfono debe tener como máximo 20 caracteres',
        messageMin: 'El mensaje debe tener al menos 10 caracteres',
        messageMax: 'El mensaje debe tener como máximo 1000 caracteres'
      },
      success: {
        title: '¡Mensaje enviado!',
        description: 'Nos pondremos en contacto pronto.'
      },
      error: {
        validation: 'Error de validación',
        title: 'Error al enviar',
        description: 'Intente nuevamente más tarde.'
      }
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
        title: 'Legal Excellence for You',
        description: 'Specialized consulting in Labor, Social Security and Administrative Law. Over 15 years of experience in personalized solutions.',
        button: 'Talk to a Specialist'
      },
      banner2: {
        title: 'Defend Your Labor Rights',
        description: 'Performance in Individual and Collective Labor Law. Complete protection of your rights with excellent legal advice.',
        button: 'Request a Consultation'
      },
      banner3: {
        title: 'Complete Social Security Planning',
        description: 'Specialized advice in Social Security Law. Ensure your retirement and benefits with safety and peace of mind.',
        button: 'Schedule Your Assessment'
      },
      banner4: {
        title: 'Commitment to Results',
        description: 'Multidisciplinary team dedicated to offering creative and effective legal solutions. Your success is our priority.',
        button: 'Learn About Our Services'
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
      title: 'Partners of Mota & Lawyers Associates',
      intro1: 'MOTA & LAWYERS ASSOCIATES has a multidisciplinary team of professionals, always faithful to our way of providing our services.',
      intro2: 'The investment in the training and qualification of our professionals, the performance in several areas, the training of our team, the dedication and commitment to professionalism transform us into a qualified and specialized firm in the areas in which we operate. The result of this is the optimization of time and resources and creativity in legal solutions.',
      intro3: 'All this because we believe that together, each of us is worth more and because we have a vocation for the practice of law. And that is why we practice it with dedication, pleasure and joy.'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'We are ready to serve you. Contact us and schedule a consultation with our specialists.',
      form: {
        title: 'Send Your Message',
        name: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone',
        phonePlaceholder: '(51) 99999-9999',
        message: 'Message',
        messagePlaceholder: 'How can we help you?',
        submit: 'Send Message',
        sending: 'Sending...'
      },
      info: {
        title: 'Contact Information',
        availability: 'Our team is available to serve you from Monday to Friday, from 9am to 6pm.',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        hours: 'Business Hours',
        hoursDetail: 'Monday to Friday: 9am to 6pm'
      },
      map: {
        title: 'Our Location'
      },
      validation: {
        nameMin: 'Name must have at least 2 characters',
        nameMax: 'Name must have at most 100 characters',
        emailInvalid: 'Invalid email',
        emailMax: 'Email must have at most 255 characters',
        phoneMin: 'Phone must have at least 10 characters',
        phoneMax: 'Phone must have at most 20 characters',
        messageMin: 'Message must have at least 10 characters',
        messageMax: 'Message must have at most 1000 characters'
      },
      success: {
        title: 'Message sent!',
        description: 'We will contact you soon.'
      },
      error: {
        validation: 'Validation error',
        title: 'Error sending',
        description: 'Please try again later.'
      }
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
