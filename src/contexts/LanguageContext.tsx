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
      learnMore: 'Saiba mais →',
      sectionTitle: 'Escritório',
      sectionSubtitle: 'Construindo soluções jurídicas com excelência, ética e resultados desde 2000 com atuação nacional',
      explore: 'Explorar',
      trajectory: {
        title: 'Trajetória',
        badge: 'Desde 2000',
        summary: 'Mais de 25 anos de excelência jurídica',
        content1: 'A MOTA & ADVOGADOS ASSOCIADOS é uma sociedade de advogados desde 2000, com atuação nacional.',
        content2: 'A prestação de serviços jurídicos de excelência é nosso objetivo e se reflete nos resultados alcançados e na satisfação dos nossos clientes.'
      },
      pillars: {
        title: 'Pilares Consolidados',
        badge: 'Ética | Comprometimento',
        summary: 'Os pilares de uma advocacia que une ética, excelência e resultados',
        content1: 'A MOTA & ADVOGADOS ASSOCIADOS tem sua atuação fundada nos princípios de uma advocacia ética, do trabalho comprometido, sério e eficiente, atento às mudanças da sociedade e às necessidades de cada cliente, sem dispensar a boa técnica e o papel social do advogado na busca pela solução eficaz.',
        content2: 'Nosso propósito é promover o equilíbrio das relações sociais através da prestação de um trabalho juridicamente competente, priorizando o relacionamento profissional com o cliente.',
        content3: 'Nossa atuação, seja ela de forma preventiva, administrativa ou judicial, é focada na busca pela garantia dos direitos, na segurança jurídica, valorizando principalmente nosso ponto mais forte: as pessoas e a satisfação com o trabalho desenvolvido.'
      },
      mission: {
        title: 'Nossa Missão',
        badge: 'Excelência',
        summary: 'Relacionamento de qualidade e serviços jurídicos eficazes',
        content: 'Estamos inseridos em uma sociedade em constante evolução, o que reflete a necessidade de capacitação contínua de nossa equipe. Alterações legislativas, normativas e jurisprudenciais exigem cada vez mais qualificação técnica e a incorporação de novas tecnologias, para que o atendimento aos nossos clientes proporcione satisfação, alcance eficiência, resolutividade e, principalmente, agilidade.'
      },
      office: {
        title: 'Escritório',
        badge: 'Atuação Nacional',
        summary: 'Sede em Porto Alegre com cobertura nacional',
        content1: 'Tecnologia, agilidade e alcance nacional.',
        content2: 'Presença em todo o território, soluções em cada detalhe.',
        content3: 'Com endereços, também, em São Paulo, Brasília, e Natal.'
      }
    },
    practiceAreas: {
      title: 'Áreas de Atuação',
      subtitle: 'Especializados em Direito Constitucional e atuantes em diversas áreas do Direito.',
      learnMore: 'Saiba mais',
      swipeHint: '← Deslize para navegar →',
      areas: {
        administrative: {
          title: 'Direito Administrativo (Servidor Público)',
          description: 'Defesa dos direitos e interesses dos servidores públicos',
          details: 'Ao longo de sua trajetória nos consolidamos como um dos maiores escritórios de advocacia do país na defesa dos direitos e interesses profissionais dos servidores públicos, atuando de forma resolutiva em milhares de ações judiciais que asseguraram aos servidores públicos o reconhecimento de seus direitos. São inúmeros os servidores assistidos pelo escritório, sempre de forma direta e humanizada, com total transparência, orientação técnica, e encaminhamento jurídico responsável, proporcionando segurança jurídica na tomada de decisões que afetam seus direitos individuais e coletivos.'
        },
        labor: {
          title: 'Direito do Trabalho Individual e Coletivo',
          description: 'Reclamatórias trabalhistas e acompanhamento processual',
          details: 'Reclamatórias trabalhistas (Horas-extras; Periculosidade/insalubridade; Promoções; Adicional de transferência; Vinculo empregatício; Estabilidade de gestante; Pedido de complementação da aposentadoria; Multa 40% FGTS; Função gratificada; Acidente de trabalho), acompanhamento em audiências, medidas cautelares, contestações, acompanhamento de todos os recursos no âmbito do TRTs e TST.'
        },
        union: {
          title: 'Direito Sindical',
          description: 'Assessoria completa para entidades sindicais',
          details: 'Nosso escritório administra uma carteira de grandes clientes constituída por inúmeras associações, sindicatos e outras entidades representativas dos servidores públicos, atuando no âmbito administrativo e judicial, com ênfase em demandas coletivas de interesse dos integrantes das respectivas carreiras.'
        },
        socialSecurity: {
          title: 'Direito Previdenciário',
          description: 'Concessão e revisão de benefícios previdenciários',
          details: 'Atuamos no Regime Próprio de Previdência dos Servidores Públicos, no Regime Geral e nos regimes de previdência complementar, abrangendo servidores e empregados públicos.\nEntre nossos serviços estão: planejamento previdenciário, análise de tempo de serviço, orientação sobre contribuições, conversão de tempo especial, averbações, pedidos de aposentadoria, revisões, pensões, habilitação de herdeiros, isenção de IRPF por doença, entre outros.'
        },
        constitutional: {
          title: 'Direito Constitucional',
          description: 'Elaboração de ADI e recursos extraordinários',
          details: 'Área de especialização do escritório que está relacionada ao acompanhamento, elaboração e desenvolvimento de teses jurídicas que envolvem temas de natureza constitucional, sejam elas os recursos extraordinários, ações diretas de inconstitucionalidade (ADI), mandados de injunção, Arguição de Descumprimento de Preceito Fundamental (ADPF), reclamações, dentre outras.'
        },
        criminal: {
          title: 'Direito Penal',
          description: 'Habeas Corpus e recursos criminais',
          details: 'O Direito Penal passou a integrar recentemente as áreas de atuação do nosso escritório. Trabalhamos em parceria com profissionais de ampla experiência, oferecendo atendimento especializado nas seguintes frentes:\n\n• Direito Penal Econômico\n• Atendimento personalizado ao cliente\n• Defesa Criminal em todas as instâncias\n• Atuação imediata perante autoridades e órgãos de Justiça'
        },
        electoral: {
          title: 'Direito Eleitoral',
          description: 'Assessoria eleitoral completa',
          details: 'Assessoria eleitoral a partidos, candidatos, elaboração de recursos, sustentação oral e demais providências de ordem administrativa perante Tribunais Regionais Eleitorais e Tribunal Superior Eleitoral.'
        },
        superiorCourts: {
          title: 'Tribunais Superiores',
          description: 'Atuação em Brasília junto aos Tribunais Superiores',
          details: 'MOTA & ADVOGADOS ASSOCIADOS é um dos escritórios com intensa atuação nos Tribunais Superiores, especialmente STJ, TST e STF, e no TSE e STM de forma associada, acompanhando recursos diversos, ou ajuizando ações originárias ou impetrando recursos em prol de clientes de todo os Brasil, e no assessoramento a outros escritórios de advocacia.'
        },
        realEstate: {
          title: 'Direito Imobiliário',
          description: 'Assessoria completa em negócios e regularização imobiliária',
          details: 'Atuamos em todas as frentes do direito imobiliário, incluindo estruturação de negócios, cobrança de dívidas, assessoria em compra, venda e locação, avaliações, leilões, dação em pagamento, usucapião, regularização fundiária, desapropriações e acompanhamento perante SPU, INCRA e órgãos ambientais. Também tratamos de loteamentos, parcelamentos, registros imobiliários, projetos hoteleiros, estudos de viabilidade e assessoria para imobiliárias, incorporadoras, investidores e demandas judiciais relacionadas.'
        },
        family: {
          title: 'Direito de Família e Sucessões',
          description: 'Inventários, divórcios, pensões e sucessões',
          details: 'Dedicamos atenção especial a esta área em razão de sua conexão com outras frentes do nosso trabalho, motivo pelo qual estruturamos um departamento exclusivo para atender casos de habilitação de crédito para herdeiros, reconhecimento e regularização de união estável, divórcios, pensões alimentícias, inventários e sobrepartilhas, tanto extrajudiciais quanto judiciais, além de outras demandas relacionadas.'
        },
        publicTreasury: {
          title: 'Fazenda Pública e Entes Federados',
          description: 'Ações contra União, Estados, DF e Municípios',
          details: 'Esta área de atuação abrange ações de cobrança, indenizações, execuções contra Fazenda Pública da União, Estados, DF e Municípios, impugnação de autuações, adesão à regimes fiscais especiais, REFIS, desconsideração da personalidade jurídica, e matérias correlatas.'
        },
        mediation: {
          title: 'Mediação e Conciliação',
          description: 'Métodos alternativos de resolução de conflitos',
          details: 'Trata-se de uma área dedicada a métodos alternativos de resolução de conflitos, conduzida por profissionais especializados em técnicas de negociação. Por meio dela, pessoas físicas e jurídicas podem solucionar suas demandas de forma extrajudicial, com mais rapidez e eficiência, evitando o ingresso no Poder Judiciário. O processo garante segurança, formalidade e soluções adequadas para cada situação.'
        },
        taxBusiness: {
          title: 'Direito Tributário e Empresarial',
          description: 'Assessoria jurídica para empresas e matéria tributária',
          details: 'Diante da crescente demanda nessa área, o escritório estruturou uma equipe exclusiva, coordenada por advogados especializados, para oferecer assessoria jurídica de alta complexidade e apoiar empresas na organização jurídica de seus negócios. Também acompanhamos as principais mudanças legislativas, especialmente em matéria tributária e regulatória, orientando sobre impactos, enquadramento legal, regularização de débitos e identificação de possíveis créditos tributários.'
        }
      }
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
      learnMore: 'Más información →',
      sectionTitle: 'Oficina',
      sectionSubtitle: 'Construyendo soluciones jurídicas con excelencia, ética y resultados desde 2000 con actuación nacional',
      explore: 'Explorar',
      trajectory: {
        title: 'Trayectoria',
        badge: 'Desde 2000',
        summary: 'Más de 25 años de excelencia jurídica',
        content1: 'MOTA & ABOGADOS ASOCIADOS es una sociedad de abogados desde 2000, con actuación nacional.',
        content2: 'La prestación de servicios jurídicos de excelencia es nuestro objetivo y se refleja en los resultados alcanzados y en la satisfacción de nuestros clientes.'
      },
      pillars: {
        title: 'Pilares Consolidados',
        badge: 'Ética | Compromiso',
        summary: 'Los pilares de una abogacía que une ética, excelencia y resultados',
        content1: 'MOTA & ABOGADOS ASOCIADOS tiene su actuación fundada en los principios de una abogacía ética, del trabajo comprometido, serio y eficiente, atento a los cambios de la sociedad y a las necesidades de cada cliente, sin prescindir de la buena técnica y el papel social del abogado en la búsqueda de la solución eficaz.',
        content2: 'Nuestro propósito es promover el equilibrio de las relaciones sociales a través de la prestación de un trabajo jurídicamente competente, priorizando la relación profesional con el cliente.',
        content3: 'Nuestra actuación, sea de forma preventiva, administrativa o judicial, está enfocada en la búsqueda de la garantía de los derechos, en la seguridad jurídica, valorizando principalmente nuestro punto más fuerte: las personas y la satisfacción con el trabajo desarrollado.'
      },
      mission: {
        title: 'Nuestra Misión',
        badge: 'Excelencia',
        summary: 'Relación de calidad y servicios jurídicos eficaces',
        content: 'Estamos insertos en una sociedad en constante evolución, lo que refleja la necesidad de capacitación continua de nuestro equipo. Cambios legislativos, normativos y jurisprudenciales exigen cada vez más calificación técnica y la incorporación de nuevas tecnologías, para que la atención a nuestros clientes proporcione satisfacción, alcance eficiencia, resolutividad y, principalmente, agilidad.'
      },
      office: {
        title: 'Oficina',
        badge: 'Actuación Nacional',
        summary: 'Sede en Porto Alegre con cobertura nacional',
        content1: 'Tecnología, agilidad y alcance nacional.',
        content2: 'Presencia en todo el territorio, soluciones en cada detalle.',
        content3: 'Con direcciones, también, en São Paulo, Brasilia y Natal.'
      }
    },
    practiceAreas: {
      title: 'Áreas de Práctica',
      subtitle: 'Especializados en Derecho Constitucional y actuantes en diversas áreas del Derecho.',
      learnMore: 'Más información',
      swipeHint: '← Desliza para navegar →',
      areas: {
        administrative: {
          title: 'Derecho Administrativo (Servidor Público)',
          description: 'Defensa de los derechos e intereses de los servidores públicos',
          details: 'A lo largo de nuestra trayectoria nos consolidamos como uno de los mayores despachos de abogados del país en la defensa de los derechos e intereses profesionales de los servidores públicos, actuando de forma resolutiva en miles de acciones judiciales que aseguraron a los servidores públicos el reconocimiento de sus derechos.'
        },
        labor: {
          title: 'Derecho Laboral Individual y Colectivo',
          description: 'Reclamaciones laborales y seguimiento procesal',
          details: 'Reclamaciones laborales (horas extras, peligrosidad/insalubridad, promociones, adicional de transferencia, vínculo laboral, estabilidad de gestante, solicitud de complementación de jubilación, multa 40% FGTS, función gratificada, accidente de trabajo), seguimiento en audiencias, medidas cautelares, contestaciones.'
        },
        union: {
          title: 'Derecho Sindical',
          description: 'Asesoría completa para entidades sindicales',
          details: 'Nuestro despacho administra una cartera de grandes clientes constituida por numerosas asociaciones, sindicatos y otras entidades representativas de los servidores públicos, actuando en el ámbito administrativo y judicial.'
        },
        socialSecurity: {
          title: 'Derecho Previsional',
          description: 'Concesión y revisión de beneficios previsionales',
          details: 'Actuamos en el Régimen Propio de Previsión de los Servidores Públicos, en el Régimen General y en los regímenes de previsión complementaria, abarcando servidores y empleados públicos.'
        },
        constitutional: {
          title: 'Derecho Constitucional',
          description: 'Elaboración de ADI y recursos extraordinarios',
          details: 'Área de especialización del despacho relacionada con el seguimiento, elaboración y desarrollo de tesis jurídicas que involucran temas de naturaleza constitucional.'
        },
        criminal: {
          title: 'Derecho Penal',
          description: 'Habeas Corpus y recursos criminales',
          details: 'El Derecho Penal pasó a integrar recientemente las áreas de actuación de nuestro despacho. Trabajamos en asociación con profesionales de amplia experiencia.'
        },
        electoral: {
          title: 'Derecho Electoral',
          description: 'Asesoría electoral completa',
          details: 'Asesoría electoral a partidos, candidatos, elaboración de recursos, sustentación oral y demás providencias de orden administrativa ante Tribunales Regionales Electorales y Tribunal Superior Electoral.'
        },
        superiorCourts: {
          title: 'Tribunales Superiores',
          description: 'Actuación en Brasilia ante los Tribunales Superiores',
          details: 'MOTA & ABOGADOS ASOCIADOS es uno de los despachos con intensa actuación en los Tribunales Superiores, especialmente STJ, TST y STF.'
        },
        realEstate: {
          title: 'Derecho Inmobiliario',
          description: 'Asesoría completa en negocios y regularización inmobiliaria',
          details: 'Actuamos en todos los frentes del derecho inmobiliario, incluyendo estructuración de negocios, cobro de deudas, asesoría en compra, venta y alquiler.'
        },
        family: {
          title: 'Derecho de Familia y Sucesiones',
          description: 'Inventarios, divorcios, pensiones y sucesiones',
          details: 'Dedicamos atención especial a esta área debido a su conexión con otras áreas de nuestro trabajo, por lo que estructuramos un departamento exclusivo.'
        },
        publicTreasury: {
          title: 'Hacienda Pública y Entes Federados',
          description: 'Acciones contra Unión, Estados, DF y Municipios',
          details: 'Esta área de actuación abarca acciones de cobro, indemnizaciones, ejecuciones contra Hacienda Pública de la Unión, Estados, DF y Municipios.'
        },
        mediation: {
          title: 'Mediación y Conciliación',
          description: 'Métodos alternativos de resolución de conflictos',
          details: 'Se trata de un área dedicada a métodos alternativos de resolución de conflictos, conducida por profesionales especializados en técnicas de negociación.'
        },
        taxBusiness: {
          title: 'Derecho Tributario y Empresarial',
          description: 'Asesoría jurídica para empresas y materia tributaria',
          details: 'Ante la creciente demanda en esta área, el despacho estructuró un equipo exclusivo, coordinado por abogados especializados.'
        }
      }
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
      learnMore: 'Learn more →',
      sectionTitle: 'Office',
      sectionSubtitle: 'Building legal solutions with excellence, ethics and results since 2000 with national coverage',
      explore: 'Explore',
      trajectory: {
        title: 'Trajectory',
        badge: 'Since 2000',
        summary: 'Over 25 years of legal excellence',
        content1: 'MOTA & LAWYERS ASSOCIATES is a law firm since 2000, with national coverage.',
        content2: 'Providing excellent legal services is our goal and is reflected in the results achieved and in our clients\' satisfaction.'
      },
      pillars: {
        title: 'Consolidated Pillars',
        badge: 'Ethics | Commitment',
        summary: 'The pillars of a law practice that unites ethics, excellence and results',
        content1: 'MOTA & LAWYERS ASSOCIATES has its practice founded on the principles of ethical advocacy, committed, serious and efficient work, attentive to changes in society and the needs of each client, without dispensing with good technique and the lawyer\'s social role in the search for effective solutions.',
        content2: 'Our purpose is to promote the balance of social relations through the provision of legally competent work, prioritizing the professional relationship with the client.',
        content3: 'Our practice, whether preventive, administrative or judicial, is focused on seeking the guarantee of rights, legal security, valuing mainly our strongest point: people and satisfaction with the work developed.'
      },
      mission: {
        title: 'Our Mission',
        badge: 'Excellence',
        summary: 'Quality relationships and effective legal services',
        content: 'We are part of a constantly evolving society, which reflects the need for continuous training of our team. Legislative, regulatory and jurisprudential changes require more and more technical qualification and the incorporation of new technologies, so that the service to our clients provides satisfaction, achieves efficiency, resolution and, above all, agility.'
      },
      office: {
        title: 'Office',
        badge: 'National Coverage',
        summary: 'Headquarters in Porto Alegre with national coverage',
        content1: 'Technology, agility and national reach.',
        content2: 'Presence throughout the territory, solutions in every detail.',
        content3: 'With addresses also in São Paulo, Brasília, and Natal.'
      }
    },
    practiceAreas: {
      title: 'Practice Areas',
      subtitle: 'Specialized in Constitutional Law and practicing in various areas of Law.',
      learnMore: 'Learn more',
      swipeHint: '← Swipe to navigate →',
      areas: {
        administrative: {
          title: 'Administrative Law (Public Servants)',
          description: 'Defense of the rights and interests of public servants',
          details: 'Throughout our trajectory we have consolidated ourselves as one of the largest law firms in the country in defending the professional rights and interests of public servants, acting decisively in thousands of lawsuits that ensured public servants the recognition of their rights.'
        },
        labor: {
          title: 'Individual and Collective Labor Law',
          description: 'Labor claims and procedural follow-up',
          details: 'Labor claims (overtime, hazard/unhealthiness pay, promotions, transfer allowance, employment relationship, maternity stability, retirement supplement request, 40% FGTS fine, gratified function, work accident), hearing accompaniment, precautionary measures, contestations.'
        },
        union: {
          title: 'Union Law',
          description: 'Complete advisory for union entities',
          details: 'Our firm manages a portfolio of major clients consisting of numerous associations, unions and other representative entities of public servants, acting in the administrative and judicial spheres.'
        },
        socialSecurity: {
          title: 'Social Security Law',
          description: 'Granting and revision of social security benefits',
          details: 'We work in the Public Servants Own Social Security Regime, in the General Regime and in complementary social security regimes, covering public servants and employees.'
        },
        constitutional: {
          title: 'Constitutional Law',
          description: 'Preparation of ADI and extraordinary appeals',
          details: 'Specialty area of the firm related to the monitoring, preparation and development of legal theses involving constitutional matters.'
        },
        criminal: {
          title: 'Criminal Law',
          description: 'Habeas Corpus and criminal appeals',
          details: 'Criminal Law has recently become part of our firm practice areas. We work in partnership with highly experienced professionals.'
        },
        electoral: {
          title: 'Electoral Law',
          description: 'Complete electoral advisory',
          details: 'Electoral advisory to parties, candidates, preparation of appeals, oral arguments and other administrative measures before Regional Electoral Courts and Superior Electoral Court.'
        },
        superiorCourts: {
          title: 'Superior Courts',
          description: 'Practice in Brasilia before Superior Courts',
          details: 'MOTA & LAWYERS ASSOCIATES is one of the firms with intense activity in the Superior Courts, especially STJ, TST and STF.'
        },
        realEstate: {
          title: 'Real Estate Law',
          description: 'Complete advisory in business and real estate regularization',
          details: 'We work on all fronts of real estate law, including business structuring, debt collection, advisory in buying, selling and leasing.'
        },
        family: {
          title: 'Family and Succession Law',
          description: 'Inventories, divorces, alimony and successions',
          details: 'We dedicate special attention to this area due to its connection with other fronts of our work, which is why we have structured an exclusive department.'
        },
        publicTreasury: {
          title: 'Public Treasury and Federated Entities',
          description: 'Actions against Union, States, DF and Municipalities',
          details: 'This practice area covers collection actions, indemnities, executions against the Public Treasury of the Union, States, DF and Municipalities.'
        },
        mediation: {
          title: 'Mediation and Conciliation',
          description: 'Alternative methods of conflict resolution',
          details: 'This is an area dedicated to alternative methods of conflict resolution, conducted by professionals specialized in negotiation techniques.'
        },
        taxBusiness: {
          title: 'Tax and Business Law',
          description: 'Legal advisory for companies and tax matters',
          details: 'Given the growing demand in this area, the firm has structured an exclusive team, coordinated by specialized lawyers.'
        }
      }
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
      learnMore: 'Mehr erfahren →',
      sectionTitle: 'Kanzlei',
      sectionSubtitle: 'Juristische Lösungen mit Exzellenz, Ethik und Ergebnissen seit 2000 mit nationaler Reichweite',
      explore: 'Erkunden',
      trajectory: {
        title: 'Geschichte',
        badge: 'Seit 2000',
        summary: 'Über 25 Jahre juristische Exzellenz',
        content1: 'MOTA & RECHTSANWÄLTE PARTNER ist eine Anwaltskanzlei seit 2000 mit nationaler Reichweite.',
        content2: 'Exzellente Rechtsdienstleistungen zu erbringen ist unser Ziel und spiegelt sich in den erzielten Ergebnissen und der Zufriedenheit unserer Mandanten wider.'
      },
      pillars: {
        title: 'Konsolidierte Grundsätze',
        badge: 'Ethik | Engagement',
        summary: 'Die Grundsätze einer Anwaltspraxis, die Ethik, Exzellenz und Ergebnisse vereint',
        content1: 'MOTA & RECHTSANWÄLTE PARTNER hat seine Praxis auf den Grundsätzen ethischer Rechtsvertretung, engagierter, seriöser und effizienter Arbeit gegründet, aufmerksam auf gesellschaftliche Veränderungen und die Bedürfnisse jedes Mandanten, ohne auf gute Technik und die soziale Rolle des Anwalts bei der Suche nach effektiven Lösungen zu verzichten.',
        content2: 'Unser Ziel ist es, das Gleichgewicht der sozialen Beziehungen durch rechtlich kompetente Arbeit zu fördern und die professionelle Beziehung zum Mandanten zu priorisieren.',
        content3: 'Unsere Praxis, ob präventiv, administrativ oder gerichtlich, konzentriert sich auf die Garantie der Rechte, die Rechtssicherheit und schätzt vor allem unsere größte Stärke: die Menschen und die Zufriedenheit mit der geleisteten Arbeit.'
      },
      mission: {
        title: 'Unsere Mission',
        badge: 'Exzellenz',
        summary: 'Qualitätsbeziehungen und effektive Rechtsdienstleistungen',
        content: 'Wir sind Teil einer sich ständig weiterentwickelnden Gesellschaft, was die Notwendigkeit kontinuierlicher Weiterbildung unseres Teams widerspiegelt. Gesetzliche, regulatorische und rechtsprechende Änderungen erfordern immer mehr technische Qualifikation und die Integration neuer Technologien, damit der Service für unsere Mandanten Zufriedenheit bietet, Effizienz erreicht, Lösungen findet und vor allem Agilität gewährleistet.'
      },
      office: {
        title: 'Kanzlei',
        badge: 'Nationale Reichweite',
        summary: 'Hauptsitz in Porto Alegre mit nationaler Abdeckung',
        content1: 'Technologie, Agilität und nationale Reichweite.',
        content2: 'Präsenz im ganzen Land, Lösungen in jedem Detail.',
        content3: 'Mit Adressen auch in São Paulo, Brasília und Natal.'
      }
    },
    practiceAreas: {
      title: 'Tätigkeitsbereiche',
      subtitle: 'Spezialisiert auf Verfassungsrecht und tätig in verschiedenen Rechtsgebieten.',
      learnMore: 'Mehr erfahren',
      swipeHint: '← Wischen zum Navigieren →',
      areas: {
        administrative: {
          title: 'Verwaltungsrecht (Öffentlicher Dienst)',
          description: 'Verteidigung der Rechte und Interessen der Beamten',
          details: 'Im Laufe unserer Geschichte haben wir uns als eine der größten Anwaltskanzleien des Landes bei der Verteidigung der beruflichen Rechte und Interessen von Beamten etabliert.'
        },
        labor: {
          title: 'Individual- und Kollektivarbeitsrecht',
          description: 'Arbeitsklagen und Prozessbegleitung',
          details: 'Arbeitsklagen (Überstunden, Gefahren-/Gesundheitszulage, Beförderungen, Versetzungszulage, Arbeitsverhältnis, Mutterschutz, Rentenergänzungsantrag, 40% FGTS-Strafe, Gratifikationsfunktion, Arbeitsunfall).'
        },
        union: {
          title: 'Gewerkschaftsrecht',
          description: 'Vollständige Beratung für Gewerkschaften',
          details: 'Unsere Kanzlei verwaltet ein Portfolio großer Kunden, bestehend aus zahlreichen Verbänden, Gewerkschaften und anderen Vertretungsorganen der Beamten.'
        },
        socialSecurity: {
          title: 'Sozialversicherungsrecht',
          description: 'Gewährung und Überprüfung von Sozialversicherungsleistungen',
          details: 'Wir arbeiten im eigenen Sozialversicherungssystem der Beamten, im allgemeinen System und in ergänzenden Sozialversicherungssystemen.'
        },
        constitutional: {
          title: 'Verfassungsrecht',
          description: 'Erstellung von ADI und außerordentlichen Rechtsmitteln',
          details: 'Fachgebiet der Kanzlei im Zusammenhang mit der Überwachung, Erstellung und Entwicklung rechtlicher Thesen zu verfassungsrechtlichen Themen.'
        },
        criminal: {
          title: 'Strafrecht',
          description: 'Habeas Corpus und Strafberufungen',
          details: 'Das Strafrecht ist kürzlich zu unseren Tätigkeitsbereichen hinzugekommen. Wir arbeiten in Partnerschaft mit hocherfahrenen Fachleuten.'
        },
        electoral: {
          title: 'Wahlrecht',
          description: 'Vollständige Wahlberatung',
          details: 'Wahlberatung für Parteien, Kandidaten, Erstellung von Rechtsmitteln, mündliche Vorträge und andere Verwaltungsmaßnahmen vor Wahlgerichten.'
        },
        superiorCourts: {
          title: 'Oberste Gerichte',
          description: 'Tätigkeit in Brasília vor den Obersten Gerichten',
          details: 'MOTA & RECHTSANWÄLTE PARTNER ist eine der Kanzleien mit intensiver Tätigkeit an den Obersten Gerichten, insbesondere STJ, TST und STF.'
        },
        realEstate: {
          title: 'Immobilienrecht',
          description: 'Vollständige Beratung in Immobiliengeschäften und -regularisierung',
          details: 'Wir arbeiten an allen Fronten des Immobilienrechts, einschließlich Geschäftsstrukturierung, Inkasso, Beratung bei Kauf, Verkauf und Vermietung.'
        },
        family: {
          title: 'Familien- und Erbrecht',
          description: 'Inventare, Scheidungen, Unterhalt und Erbschaften',
          details: 'Wir widmen diesem Bereich besondere Aufmerksamkeit aufgrund seiner Verbindung mit anderen Bereichen unserer Arbeit.'
        },
        publicTreasury: {
          title: 'Öffentliche Finanzen und Föderale Einheiten',
          description: 'Klagen gegen Bund, Länder, DF und Gemeinden',
          details: 'Dieser Tätigkeitsbereich umfasst Inkassoklagen, Entschädigungen, Vollstreckungen gegen die öffentliche Kasse des Bundes, der Länder, DF und Gemeinden.'
        },
        mediation: {
          title: 'Mediation und Schlichtung',
          description: 'Alternative Methoden der Konfliktlösung',
          details: 'Dies ist ein Bereich, der alternativen Methoden der Konfliktlösung gewidmet ist, durchgeführt von Fachleuten, die auf Verhandlungstechniken spezialisiert sind.'
        },
        taxBusiness: {
          title: 'Steuer- und Unternehmensrecht',
          description: 'Rechtsberatung für Unternehmen und Steuerangelegenheiten',
          details: 'Angesichts der wachsenden Nachfrage in diesem Bereich hat die Kanzlei ein exklusives Team strukturiert, koordiniert von spezialisierten Anwälten.'
        }
      }
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
      learnMore: 'Scopri di più →',
      sectionTitle: 'Studio',
      sectionSubtitle: 'Costruendo soluzioni legali con eccellenza, etica e risultati dal 2000 con copertura nazionale',
      explore: 'Esplora',
      trajectory: {
        title: 'Storia',
        badge: 'Dal 2000',
        summary: 'Oltre 25 anni di eccellenza legale',
        content1: 'MOTA & AVVOCATI ASSOCIATI è uno studio legale dal 2000, con copertura nazionale.',
        content2: 'Fornire servizi legali eccellenti è il nostro obiettivo e si riflette nei risultati raggiunti e nella soddisfazione dei nostri clienti.'
      },
      pillars: {
        title: 'Pilastri Consolidati',
        badge: 'Etica | Impegno',
        summary: 'I pilastri di una pratica legale che unisce etica, eccellenza e risultati',
        content1: 'MOTA & AVVOCATI ASSOCIATI ha la sua pratica fondata sui principi della difesa etica, del lavoro impegnato, serio ed efficiente, attento ai cambiamenti della società e alle esigenze di ogni cliente, senza rinunciare alla buona tecnica e al ruolo sociale dell\'avvocato nella ricerca di soluzioni efficaci.',
        content2: 'Il nostro scopo è promuovere l\'equilibrio delle relazioni sociali attraverso la prestazione di un lavoro giuridicamente competente, dando priorità al rapporto professionale con il cliente.',
        content3: 'La nostra pratica, sia essa preventiva, amministrativa o giudiziaria, è focalizzata sulla ricerca della garanzia dei diritti, della sicurezza giuridica, valorizzando principalmente il nostro punto di forza: le persone e la soddisfazione per il lavoro svolto.'
      },
      mission: {
        title: 'La Nostra Missione',
        badge: 'Eccellenza',
        summary: 'Relazioni di qualità e servizi legali efficaci',
        content: 'Siamo parte di una società in continua evoluzione, che riflette la necessità di formazione continua del nostro team. I cambiamenti legislativi, normativi e giurisprudenziali richiedono sempre più qualificazione tecnica e l\'incorporazione di nuove tecnologie, affinché il servizio ai nostri clienti fornisca soddisfazione, raggiunga efficienza, risoluzione e, soprattutto, agilità.'
      },
      office: {
        title: 'Studio',
        badge: 'Copertura Nazionale',
        summary: 'Sede a Porto Alegre con copertura nazionale',
        content1: 'Tecnologia, agilità e portata nazionale.',
        content2: 'Presenza su tutto il territorio, soluzioni in ogni dettaglio.',
        content3: 'Con indirizzi anche a São Paulo, Brasília e Natal.'
      }
    },
    practiceAreas: {
      title: 'Aree di Pratica',
      subtitle: 'Specializzati in Diritto Costituzionale e operanti in diverse aree del Diritto.',
      learnMore: 'Scopri di più',
      swipeHint: '← Scorri per navigare →',
      areas: {
        administrative: {
          title: 'Diritto Amministrativo (Dipendenti Pubblici)',
          description: 'Difesa dei diritti e interessi dei dipendenti pubblici',
          details: 'Nel corso della nostra storia ci siamo consolidati come uno dei più grandi studi legali del paese nella difesa dei diritti e interessi professionali dei dipendenti pubblici.'
        },
        labor: {
          title: 'Diritto del Lavoro Individuale e Collettivo',
          description: 'Reclami lavorativi e follow-up processuale',
          details: 'Reclami lavorativi (straordinari, indennità di rischio/insalubrità, promozioni, indennità di trasferimento, rapporto di lavoro, stabilità maternità, richiesta di integrazione pensione).'
        },
        union: {
          title: 'Diritto Sindacale',
          description: 'Consulenza completa per enti sindacali',
          details: 'Il nostro studio gestisce un portafoglio di grandi clienti costituito da numerose associazioni, sindacati e altri enti rappresentativi dei dipendenti pubblici.'
        },
        socialSecurity: {
          title: 'Diritto Previdenziale',
          description: 'Concessione e revisione dei benefici previdenziali',
          details: 'Operiamo nel Regime Previdenziale Proprio dei Dipendenti Pubblici, nel Regime Generale e nei regimi di previdenza complementare.'
        },
        constitutional: {
          title: 'Diritto Costituzionale',
          description: 'Elaborazione di ADI e ricorsi straordinari',
          details: 'Area di specializzazione dello studio relativa al monitoraggio, elaborazione e sviluppo di tesi giuridiche che coinvolgono questioni costituzionali.'
        },
        criminal: {
          title: 'Diritto Penale',
          description: 'Habeas Corpus e ricorsi penali',
          details: 'Il Diritto Penale è recentemente entrato a far parte delle aree di pratica del nostro studio. Lavoriamo in collaborazione con professionisti di grande esperienza.'
        },
        electoral: {
          title: 'Diritto Elettorale',
          description: 'Consulenza elettorale completa',
          details: 'Consulenza elettorale a partiti, candidati, elaborazione di ricorsi, arringhe orali e altre misure amministrative presso i Tribunali Elettorali.'
        },
        superiorCourts: {
          title: 'Corti Superiori',
          description: 'Attività a Brasilia presso le Corti Superiori',
          details: 'MOTA & AVVOCATI ASSOCIATI è uno degli studi con intensa attività presso le Corti Superiori, in particolare STJ, TST e STF.'
        },
        realEstate: {
          title: 'Diritto Immobiliare',
          description: 'Consulenza completa in affari e regolarizzazione immobiliare',
          details: 'Operiamo su tutti i fronti del diritto immobiliare, inclusa la strutturazione aziendale, il recupero crediti, la consulenza in acquisto, vendita e locazione.'
        },
        family: {
          title: 'Diritto di Famiglia e Successioni',
          description: 'Inventari, divorzi, alimenti e successioni',
          details: 'Dedichiamo particolare attenzione a quest area a causa della sua connessione con altre aree del nostro lavoro.'
        },
        publicTreasury: {
          title: 'Tesoro Pubblico ed Enti Federati',
          description: 'Azioni contro Unione, Stati, DF e Comuni',
          details: 'Quest area di pratica copre azioni di recupero crediti, indennizzi, esecuzioni contro il Tesoro Pubblico dell Unione, Stati, DF e Comuni.'
        },
        mediation: {
          title: 'Mediazione e Conciliazione',
          description: 'Metodi alternativi di risoluzione dei conflitti',
          details: 'Quest area è dedicata a metodi alternativi di risoluzione dei conflitti, condotta da professionisti specializzati in tecniche di negoziazione.'
        },
        taxBusiness: {
          title: 'Diritto Tributario e Societario',
          description: 'Consulenza legale per aziende e questioni fiscali',
          details: 'Data la crescente domanda in quest area, lo studio ha strutturato un team esclusivo, coordinato da avvocati specializzati.'
        }
      }
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
      learnMore: 'En savoir plus →',
      sectionTitle: 'Cabinet',
      sectionSubtitle: 'Construire des solutions juridiques avec excellence, éthique et résultats depuis 2000 avec une couverture nationale',
      explore: 'Explorer',
      trajectory: {
        title: 'Trajectoire',
        badge: 'Depuis 2000',
        summary: 'Plus de 25 ans d\'excellence juridique',
        content1: 'MOTA & AVOCATS ASSOCIÉS est un cabinet d\'avocats depuis 2000, avec une couverture nationale.',
        content2: 'Fournir d\'excellents services juridiques est notre objectif et se reflète dans les résultats obtenus et la satisfaction de nos clients.'
      },
      pillars: {
        title: 'Piliers Consolidés',
        badge: 'Éthique | Engagement',
        summary: 'Les piliers d\'une pratique juridique qui unit éthique, excellence et résultats',
        content1: 'MOTA & AVOCATS ASSOCIÉS a sa pratique fondée sur les principes d\'une défense éthique, d\'un travail engagé, sérieux et efficace, attentif aux changements de la société et aux besoins de chaque client, sans renoncer à la bonne technique et au rôle social de l\'avocat dans la recherche de solutions efficaces.',
        content2: 'Notre objectif est de promouvoir l\'équilibre des relations sociales grâce à la prestation d\'un travail juridiquement compétent, en privilégiant la relation professionnelle avec le client.',
        content3: 'Notre pratique, qu\'elle soit préventive, administrative ou judiciaire, est axée sur la recherche de la garantie des droits, de la sécurité juridique, en valorisant principalement notre point le plus fort: les personnes et la satisfaction du travail accompli.'
      },
      mission: {
        title: 'Notre Mission',
        badge: 'Excellence',
        summary: 'Relations de qualité et services juridiques efficaces',
        content: 'Nous faisons partie d\'une société en constante évolution, ce qui reflète la nécessité d\'une formation continue de notre équipe. Les changements législatifs, réglementaires et jurisprudentiels exigent de plus en plus de qualification technique et l\'incorporation de nouvelles technologies, afin que le service à nos clients apporte satisfaction, atteigne l\'efficacité, la résolution et, surtout, l\'agilité.'
      },
      office: {
        title: 'Cabinet',
        badge: 'Couverture Nationale',
        summary: 'Siège à Porto Alegre avec couverture nationale',
        content1: 'Technologie, agilité et portée nationale.',
        content2: 'Présence sur tout le territoire, solutions dans chaque détail.',
        content3: 'Avec des adresses également à São Paulo, Brasília et Natal.'
      }
    },
    practiceAreas: {
      title: 'Domaines de Pratique',
      subtitle: 'Spécialisés en Droit Constitutionnel et pratiquant dans divers domaines du Droit.',
      learnMore: 'En savoir plus',
      swipeHint: '← Glissez pour naviguer →',
      areas: {
        administrative: {
          title: 'Droit Administratif (Fonctionnaires)',
          description: 'Défense des droits et intérêts des fonctionnaires',
          details: 'Au cours de notre histoire, nous nous sommes consolidés comme l un des plus grands cabinets d avocats du pays dans la défense des droits et intérêts professionnels des fonctionnaires.'
        },
        labor: {
          title: 'Droit du Travail Individuel et Collectif',
          description: 'Réclamations de travail et suivi procédural',
          details: 'Réclamations de travail (heures supplémentaires, prime de danger/insalubrité, promotions, prime de transfert, relation de travail, stabilité maternité, demande de complément de retraite).'
        },
        union: {
          title: 'Droit Syndical',
          description: 'Conseil complet pour les entités syndicales',
          details: 'Notre cabinet gère un portefeuille de grands clients composé de nombreuses associations, syndicats et autres entités représentatives des fonctionnaires.'
        },
        socialSecurity: {
          title: 'Droit de la Sécurité Sociale',
          description: 'Octroi et révision des prestations de sécurité sociale',
          details: 'Nous travaillons dans le Régime Propre de Prévoyance des Fonctionnaires, dans le Régime Général et dans les régimes de prévoyance complémentaire.'
        },
        constitutional: {
          title: 'Droit Constitutionnel',
          description: 'Élaboration d ADI et recours extraordinaires',
          details: 'Domaine de spécialisation du cabinet lié au suivi, à l élaboration et au développement de thèses juridiques impliquant des questions constitutionnelles.'
        },
        criminal: {
          title: 'Droit Pénal',
          description: 'Habeas Corpus et recours pénaux',
          details: 'Le Droit Pénal fait récemment partie des domaines de pratique de notre cabinet. Nous travaillons en partenariat avec des professionnels hautement expérimentés.'
        },
        electoral: {
          title: 'Droit Électoral',
          description: 'Conseil électoral complet',
          details: 'Conseil électoral aux partis, candidats, élaboration de recours, plaidoiries orales et autres mesures administratives devant les Tribunaux Électoraux.'
        },
        superiorCourts: {
          title: 'Cours Supérieures',
          description: 'Pratique à Brasilia devant les Cours Supérieures',
          details: 'MOTA & AVOCATS ASSOCIÉS est l un des cabinets avec une activité intense devant les Cours Supérieures, notamment STJ, TST et STF.'
        },
        realEstate: {
          title: 'Droit Immobilier',
          description: 'Conseil complet en affaires et régularisation immobilière',
          details: 'Nous travaillons sur tous les fronts du droit immobilier, y compris la structuration d entreprise, le recouvrement de créances, le conseil en achat, vente et location.'
        },
        family: {
          title: 'Droit de la Famille et des Successions',
          description: 'Inventaires, divorces, pensions alimentaires et successions',
          details: 'Nous accordons une attention particulière à ce domaine en raison de sa connexion avec d autres domaines de notre travail.'
        },
        publicTreasury: {
          title: 'Trésor Public et Entités Fédérées',
          description: 'Actions contre l Union, les États, le DF et les Municipalités',
          details: 'Ce domaine de pratique couvre les actions de recouvrement, les indemnisations, les exécutions contre le Trésor Public de l Union, des États, du DF et des Municipalités.'
        },
        mediation: {
          title: 'Médiation et Conciliation',
          description: 'Méthodes alternatives de résolution des conflits',
          details: 'Il s agit d un domaine dédié aux méthodes alternatives de résolution des conflits, mené par des professionnels spécialisés dans les techniques de négociation.'
        },
        taxBusiness: {
          title: 'Droit Fiscal et des Affaires',
          description: 'Conseil juridique aux entreprises et matières fiscales',
          details: 'Face à la demande croissante dans ce domaine, le cabinet a structuré une équipe exclusive, coordonnée par des avocats spécialisés.'
        }
      }
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
      learnMore: '了解更多 →',
      sectionTitle: '事务所',
      sectionSubtitle: '自2000年以来，以卓越、道德和成果构建法律解决方案，覆盖全国',
      explore: '探索',
      trajectory: {
        title: '发展历程',
        badge: '始于2000年',
        summary: '超过25年的法律卓越',
        content1: '莫塔律师事务所自2000年成立以来，业务覆盖全国。',
        content2: '提供卓越的法律服务是我们的目标，这体现在我们取得的成果和客户的满意度上。'
      },
      pillars: {
        title: '坚实基础',
        badge: '道德 | 承诺',
        summary: '将道德、卓越和成果融为一体的法律实践基础',
        content1: '莫塔律师事务所的实践建立在道德辩护、认真、严肃和高效工作的原则之上，关注社会变化和每位客户的需求，同时不放弃良好的技术和律师在寻求有效解决方案中的社会角色。',
        content2: '我们的目标是通过提供法律上合格的工作来促进社会关系的平衡，优先考虑与客户的专业关系。',
        content3: '我们的实践，无论是预防性的、行政性的还是司法性的，都专注于寻求权利保障、法律安全，最重要的是重视我们最强大的优势：人员和对所完成工作的满意度。'
      },
      mission: {
        title: '我们的使命',
        badge: '卓越',
        summary: '优质关系和有效的法律服务',
        content: '我们是一个不断发展的社会的一部分，这反映了我们团队持续培训的必要性。立法、监管和司法判例的变化要求越来越多的技术资格和新技术的融入，以便为客户提供满意的服务，实现效率、解决问题，最重要的是敏捷性。'
      },
      office: {
        title: '事务所',
        badge: '全国覆盖',
        summary: '总部位于阿雷格里港，覆盖全国',
        content1: '技术、敏捷性和全国覆盖。',
        content2: '遍布全国，在每个细节上提供解决方案。',
        content3: '在圣保罗、巴西利亚和纳塔尔也设有办事处。'
      }
    },
    practiceAreas: {
      title: '业务领域',
      subtitle: '专注于宪法法律并在法律的各个领域执业。',
      learnMore: '了解更多',
      swipeHint: '← 滑动浏览 →',
      areas: {
        administrative: {
          title: '行政法（公务员）',
          description: '捍卫公务员的权利和利益',
          details: '在我们的发展历程中，我们已成为该国在捍卫公务员专业权利和利益方面最大的律师事务所之一。'
        },
        labor: {
          title: '个人和集体劳动法',
          description: '劳动索赔和程序跟进',
          details: '劳动索赔（加班费、危险/不健康津贴、晋升、调动津贴、劳动关系、孕妇稳定性、退休补充申请）。'
        },
        union: {
          title: '工会法',
          description: '为工会实体提供全面咨询',
          details: '我们的事务所管理着由众多协会、工会和其他公务员代表机构组成的大客户群。'
        },
        socialSecurity: {
          title: '社会保障法',
          description: '社会保障福利的授予和审查',
          details: '我们在公务员自身社会保障制度、一般制度和补充社会保障制度中工作。'
        },
        constitutional: {
          title: '宪法',
          description: '编制ADI和非常上诉',
          details: '事务所的专业领域，涉及监测、编制和发展涉及宪法事项的法律论点。'
        },
        criminal: {
          title: '刑法',
          description: '人身保护令和刑事上诉',
          details: '刑法最近成为我们事务所的业务领域之一。我们与经验丰富的专业人士合作。'
        },
        electoral: {
          title: '选举法',
          description: '完整的选举咨询',
          details: '为政党、候选人提供选举咨询，编制上诉、口头辩论和其他选举法庭的行政措施。'
        },
        superiorCourts: {
          title: '上级法院',
          description: '在巴西利亚的上级法院执业',
          details: '莫塔律师事务所是在上级法院有密集活动的事务所之一，特别是STJ、TST和STF。'
        },
        realEstate: {
          title: '房地产法',
          description: '房地产业务和正规化的全面咨询',
          details: '我们在房地产法的各个方面开展工作，包括业务结构、债务追收、买卖和租赁咨询。'
        },
        family: {
          title: '家庭和继承法',
          description: '遗产清单、离婚、赡养费和继承',
          details: '由于该领域与我们其他工作领域的联系，我们对其给予特别关注。'
        },
        publicTreasury: {
          title: '公共财政和联邦实体',
          description: '针对联邦、州、联邦区和市政府的诉讼',
          details: '该业务领域涵盖追收诉讼、赔偿、针对联邦、州、联邦区和市政府公共财政的执行。'
        },
        mediation: {
          title: '调解与和解',
          description: '冲突解决的替代方法',
          details: '这是一个致力于冲突解决替代方法的领域，由专门从事谈判技巧的专业人员进行。'
        },
        taxBusiness: {
          title: '税务和商业法',
          description: '为企业和税务事项提供法律咨询',
          details: '鉴于该领域需求不断增长，事务所组建了一个由专业律师协调的专属团队。'
        }
      }
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
