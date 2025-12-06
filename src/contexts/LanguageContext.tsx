import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'es' | 'en' | 'de' | 'it' | 'fr' | 'zh';

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
      lawyers: 'Equipe',
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
      title: 'Equipe',
      intro: 'Os pilares da MOTA & ADVOGADOS ASSOCIADOS: experiência, ética e resultados.'
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
      title: 'Fique por Dentro',
      description: 'Cadastre-se na newsletter e receba dicas jurídicas e novidades do escritório.',
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
    },
    cookies: {
      title: 'Política de Cookies',
      message: 'Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa política de privacidade.',
      accept: 'Aceitar',
      decline: 'Recusar'
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
      title: 'Manténgase Informado',
      description: 'Suscríbase al boletín y reciba consejos jurídicos y novedades del despacho.',
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
    },
    cookies: {
      title: 'Política de Cookies',
      message: 'Utilizamos cookies para mejorar su experiencia en nuestro sitio. Al continuar navegando, acepta nuestra política de privacidad.',
      accept: 'Aceptar',
      decline: 'Rechazar'
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
      title: 'Stay Informed',
      description: 'Subscribe to the newsletter and receive legal tips and firm updates.',
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
    },
    cookies: {
      title: 'Cookie Policy',
      message: 'We use cookies to improve your experience on our website. By continuing to browse, you agree to our privacy policy.',
      accept: 'Accept',
      decline: 'Decline'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      areas: 'Tätigkeitsbereiche',
      lawyers: 'Anwälte',
      contact: 'Kontakt',
      callUs: 'Kontaktieren Sie Uns',
      access: 'Zugang'
    },
    hero: {
      banner1: {
        subtitle: 'Juristische Exzellenz',
        title: 'Für Sie',
        description: 'Über 15 Jahre Erfahrung in der Umwandlung von Herausforderungen in Lösungen.',
        button: 'Kontaktieren Sie Uns'
      },
      banner2: {
        subtitle: 'Arbeitsrechte',
        title: 'Geschützt',
        description: 'Vollständige Verteidigung Ihrer Rechte mit Expertise.',
        button: 'Experten Konsultieren'
      },
      banner3: {
        subtitle: 'Sozialversicherung',
        title: 'Geplant',
        description: 'Sichern Sie Ihre Zukunft mit Sicherheit und Ruhe.',
        button: 'Beratung Vereinbaren'
      },
      banner4: {
        subtitle: 'Ergebnisse',
        title: 'Bewährt',
        description: 'Kreative und effektive juristische Lösungen.',
        button: 'Mehr Erfahren'
      }
    },
    stats: {
      experience: 'Jahre Erfahrung',
      clients: 'Betreute Mandanten',
      success: 'Erfolgsquote',
      cases: 'Gelöste Fälle'
    },
    about: {
      title: 'Über Uns',
      intro: 'Erfahren Sie mehr über unsere Geschichte, Werte und unser Engagement für juristische Exzellenz.',
      learnMore: 'Mehr erfahren →'
    },
    practiceAreas: {
      title: 'Tätigkeitsbereiche',
      intro: 'Unsere Praxis erstreckt sich über verschiedene Rechtsbereiche, spezialisiert auf Sozialrecht, mit Schwerpunkt auf Individual- und Kollektivarbeitsrecht, Gewerkschaftsrecht, Sozialversicherungsrecht und Verwaltungsrecht. Wir bedienen auch andere Bereiche mit stets qualifizierten Fachleuten.',
      learnMore: 'Mehr erfahren →'
    },
    lawyers: {
      title: 'Partner',
      intro: 'Lernen Sie die Partner kennen, die MOTA & RECHTSANWÄLTE PARTNER mit Exzellenz und Engagement führen.'
    },
    contact: {
      title: 'Standort',
      subtitle: 'Besuchen Sie unser Büro in Porto Alegre.',
    },
    processConsultation: {
      title: 'Ihren Fall Prüfen',
      description: 'Geben Sie die Fallnummer ein und erhalten Sie in wenigen Minuten Updates.',
      processNumberPlaceholder: 'Fallnummer (z.B.: 0000000-00.0000.0.00.0000)',
      emailPlaceholder: 'Ihre beste E-Mail',
      submitButton: 'Per E-Mail Erhalten',
      whatsappButton: 'Via WhatsApp Prüfen',
      sending: 'Wird gesendet...',
      success: 'Anfrage Gesendet!',
      successMessage: 'Sie erhalten das Fall-Update in Kürze per E-Mail.',
      error: 'Fehler',
      invalidProcess: 'Bitte geben Sie eine gültige Fallnummer ein.',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    },
    newsletter: {
      title: 'Bleiben Sie Informiert',
      description: 'Abonnieren Sie den Newsletter und erhalten Sie juristische Tipps und Kanzlei-Neuigkeiten.',
      placeholder: 'Ihre beste E-Mail',
      button: 'Abonnieren',
      sending: 'Wird gesendet...',
      success: 'Erfolg!',
      successMessage: 'Sie wurden für unseren Newsletter angemeldet.',
      error: 'Fehler',
      errorMessage: 'Bitte geben Sie eine gültige E-Mail ein.'
    },
    footer: {
      description: 'Exzellenz in der Rechtspraxis mit Ethik, Transparenz und Engagement.',
      quickLinks: 'Schnelllinks',
      contact: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.'
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      message: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Durch das Fortsetzen der Navigation stimmen Sie unserer Datenschutzrichtlinie zu.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    }
  },
  it: {
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      areas: 'Aree di Pratica',
      lawyers: 'Avvocati',
      contact: 'Contatto',
      callUs: 'Contattaci',
      access: 'Accesso'
    },
    hero: {
      banner1: {
        subtitle: 'Eccellenza Legale',
        title: 'Per Te',
        description: 'Oltre 15 anni di trasformazione delle sfide in soluzioni.',
        button: 'Contattaci'
      },
      banner2: {
        subtitle: 'Diritti del Lavoro',
        title: 'Protetti',
        description: 'Difesa completa dei tuoi diritti con competenza.',
        button: 'Consulta uno Specialista'
      },
      banner3: {
        subtitle: 'Previdenza',
        title: 'Pianificata',
        description: 'Garantisci il tuo futuro con sicurezza e tranquillità.',
        button: 'Prenota una Consulenza'
      },
      banner4: {
        subtitle: 'Risultati',
        title: 'Comprovati',
        description: 'Soluzioni legali creative ed efficaci.',
        button: 'Scopri di Più'
      }
    },
    stats: {
      experience: 'Anni di Esperienza',
      clients: 'Clienti Assistiti',
      success: 'Tasso di Successo',
      cases: 'Casi Risolti'
    },
    about: {
      title: 'Chi Siamo',
      intro: 'Scopri di più sulla nostra storia, valori e impegno per l\'eccellenza legale.',
      learnMore: 'Scopri di più →'
    },
    practiceAreas: {
      title: 'Aree di Pratica',
      intro: 'La nostra pratica si estende a diverse aree del Diritto, specializzati nelle aree del Diritto Sociale, con enfasi sul Diritto del Lavoro Individuale e Collettivo, Diritto Sindacale, Diritto Previdenziale e Diritto Amministrativo. Serviamo anche altre aree, sempre con professionisti qualificati.',
      learnMore: 'Scopri di più →'
    },
    lawyers: {
      title: 'Partner',
      intro: 'Conosci i partner che guidano MOTA & AVVOCATI ASSOCIATI con eccellenza e impegno.'
    },
    contact: {
      title: 'Posizione',
      subtitle: 'Visita il nostro ufficio a Porto Alegre.',
    },
    processConsultation: {
      title: 'Verifica il Tuo Caso',
      description: 'Inserisci il numero del caso e ricevi aggiornamenti in pochi minuti.',
      processNumberPlaceholder: 'Numero del caso (es: 0000000-00.0000.0.00.0000)',
      emailPlaceholder: 'La tua email migliore',
      submitButton: 'Ricevi via Email',
      whatsappButton: 'Verifica via WhatsApp',
      sending: 'Invio in corso...',
      success: 'Richiesta Inviata!',
      successMessage: 'Riceverai l\'aggiornamento del caso via email a breve.',
      error: 'Errore',
      invalidProcess: 'Per favore inserisci un numero di caso valido.',
      invalidEmail: 'Per favore inserisci un indirizzo email valido.'
    },
    newsletter: {
      title: 'Rimani Informato',
      description: 'Iscriviti alla newsletter e ricevi consigli legali e novità dello studio.',
      placeholder: 'La tua email migliore',
      button: 'Iscriviti',
      sending: 'Invio in corso...',
      success: 'Successo!',
      successMessage: 'Sei stato iscritto alla nostra newsletter.',
      error: 'Errore',
      errorMessage: 'Per favore inserisci un\'email valida.'
    },
    footer: {
      description: 'Eccellenza nel diritto con etica, trasparenza e impegno.',
      quickLinks: 'Link Rapidi',
      contact: 'Contatto',
      rights: 'Tutti i diritti riservati.'
    },
    cookies: {
      title: 'Politica dei Cookie',
      message: 'Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando a navigare, accetti la nostra politica sulla privacy.',
      accept: 'Accetta',
      decline: 'Rifiuta'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      areas: 'Domaines de Pratique',
      lawyers: 'Avocats',
      contact: 'Contact',
      callUs: 'Contactez-Nous',
      access: 'Accès'
    },
    hero: {
      banner1: {
        subtitle: 'Excellence Juridique',
        title: 'Pour Vous',
        description: 'Plus de 15 ans à transformer les défis en solutions.',
        button: 'Contactez-Nous'
      },
      banner2: {
        subtitle: 'Droits du Travail',
        title: 'Protégés',
        description: 'Défense complète de vos droits avec expertise.',
        button: 'Consulter un Spécialiste'
      },
      banner3: {
        subtitle: 'Prévoyance',
        title: 'Planifiée',
        description: 'Assurez votre avenir en toute sécurité et tranquillité.',
        button: 'Prendre Rendez-vous'
      },
      banner4: {
        subtitle: 'Résultats',
        title: 'Prouvés',
        description: 'Solutions juridiques créatives et efficaces.',
        button: 'En Savoir Plus'
      }
    },
    stats: {
      experience: 'Années d\'Expérience',
      clients: 'Clients Servis',
      success: 'Taux de Réussite',
      cases: 'Affaires Résolues'
    },
    about: {
      title: 'À Propos de Nous',
      intro: 'Découvrez notre histoire, nos valeurs et notre engagement envers l\'excellence juridique.',
      learnMore: 'En savoir plus →'
    },
    practiceAreas: {
      title: 'Domaines de Pratique',
      intro: 'Notre pratique s\'étend à plusieurs domaines du Droit, spécialisés dans le Droit Social, avec un accent sur le Droit du Travail Individuel et Collectif, le Droit Syndical, le Droit de la Sécurité Sociale et le Droit Administratif. Nous servons également d\'autres domaines, toujours avec des professionnels qualifiés.',
      learnMore: 'En savoir plus →'
    },
    lawyers: {
      title: 'Associés',
      intro: 'Rencontrez les associés qui dirigent MOTA & AVOCATS ASSOCIÉS avec excellence et engagement.'
    },
    contact: {
      title: 'Emplacement',
      subtitle: 'Visitez notre bureau à Porto Alegre.',
    },
    processConsultation: {
      title: 'Vérifiez Votre Dossier',
      description: 'Entrez le numéro du dossier et recevez des mises à jour en quelques minutes.',
      processNumberPlaceholder: 'Numéro de dossier (ex: 0000000-00.0000.0.00.0000)',
      emailPlaceholder: 'Votre meilleur email',
      submitButton: 'Recevoir par Email',
      whatsappButton: 'Vérifier via WhatsApp',
      sending: 'Envoi en cours...',
      success: 'Demande Envoyée!',
      successMessage: 'Vous recevrez la mise à jour du dossier par email sous peu.',
      error: 'Erreur',
      invalidProcess: 'Veuillez entrer un numéro de dossier valide.',
      invalidEmail: 'Veuillez entrer une adresse email valide.'
    },
    newsletter: {
      title: 'Restez Informé',
      description: 'Abonnez-vous à la newsletter et recevez des conseils juridiques et des nouvelles du cabinet.',
      placeholder: 'Votre meilleur email',
      button: 'S\'abonner',
      sending: 'Envoi en cours...',
      success: 'Succès!',
      successMessage: 'Vous avez été inscrit à notre newsletter.',
      error: 'Erreur',
      errorMessage: 'Veuillez entrer un email valide.'
    },
    footer: {
      description: 'Excellence en droit avec éthique, transparence et engagement.',
      quickLinks: 'Liens Rapides',
      contact: 'Contact',
      rights: 'Tous droits réservés.'
    },
    cookies: {
      title: 'Politique de Cookies',
      message: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre politique de confidentialité.',
      accept: 'Accepter',
      decline: 'Refuser'
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      areas: '业务领域',
      lawyers: '律师团队',
      contact: '联系我们',
      callUs: '联系我们',
      access: '访问'
    },
    hero: {
      banner1: {
        subtitle: '法律卓越',
        title: '为您服务',
        description: '超过15年的经验，将挑战转化为解决方案。',
        button: '联系我们'
      },
      banner2: {
        subtitle: '劳动权益',
        title: '受到保护',
        description: '以专业知识全面捍卫您的权益。',
        button: '咨询专家'
      },
      banner3: {
        subtitle: '社会保障',
        title: '规划妥当',
        description: '安全、安心地保障您的未来。',
        button: '预约咨询'
      },
      banner4: {
        subtitle: '成果',
        title: '有目共睹',
        description: '创新有效的法律解决方案。',
        button: '了解更多'
      }
    },
    stats: {
      experience: '年经验',
      clients: '服务客户',
      success: '成功率',
      cases: '已解决案件'
    },
    about: {
      title: '关于我们',
      intro: '了解我们的历史、价值观以及对法律卓越的承诺。',
      learnMore: '了解更多 →'
    },
    practiceAreas: {
      title: '业务领域',
      intro: '我们的业务涵盖法律的多个领域，专注于社会法领域，特别是个人和集体劳动法、工会法、社会保障法和行政法。我们还提供其他领域的服务，始终依靠合格的专业人员。',
      learnMore: '了解更多 →'
    },
    lawyers: {
      title: '合伙人',
      intro: '认识以卓越和承诺领导莫塔律师事务所的合伙人。'
    },
    contact: {
      title: '地址',
      subtitle: '欢迎访问我们位于阿雷格里港的办公室。',
    },
    processConsultation: {
      title: '查询您的案件',
      description: '输入案件编号，几分钟内即可收到更新。',
      processNumberPlaceholder: '案件编号（例：0000000-00.0000.0.00.0000）',
      emailPlaceholder: '您的常用邮箱',
      submitButton: '通过邮件接收',
      whatsappButton: '通过WhatsApp查询',
      sending: '发送中...',
      success: '请求已发送！',
      successMessage: '您将很快通过邮件收到案件更新。',
      error: '错误',
      invalidProcess: '请输入有效的案件编号。',
      invalidEmail: '请输入有效的邮箱地址。'
    },
    newsletter: {
      title: '保持关注',
      description: '订阅我们的通讯，获取法律建议和事务所动态。',
      placeholder: '您的常用邮箱',
      button: '订阅',
      sending: '发送中...',
      success: '成功！',
      successMessage: '您已成功订阅我们的通讯。',
      error: '错误',
      errorMessage: '请输入有效的邮箱。'
    },
    footer: {
      description: '以道德、透明和承诺追求法律卓越。',
      quickLinks: '快速链接',
      contact: '联系方式',
      rights: '版权所有。'
    },
    cookies: {
      title: 'Cookie政策',
      message: '我们使用Cookie来改善您在我们网站上的体验。继续浏览即表示您同意我们的隐私政策。',
      accept: '接受',
      decline: '拒绝'
    }
  }
};
