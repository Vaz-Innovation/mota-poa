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
      blog: 'Blog',
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
      sectionSubtitle: 'Construindo soluções jurídicas com excelência, ética e resultados desde 2000, com atuação em todo o território nacional.',
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
      subtitle: 'Especializados em Direito Administrativo e atuantes em diversas áreas do Direito.',
      learnMore: 'Saiba mais',
      swipeHint: '← Deslize para navegar →',
      prev: 'Anterior',
      next: 'Próximo',
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
      intro: 'Construindo soluções jurídicas com excelência, ética e resultados desde 2000, com atuação em todo o território nacional.',
      swipeHint: '← Deslize para navegar →',
      prev: 'Anterior',
      next: 'Próximo'
    },
    contact: {
      title: 'Localização',
      subtitle: 'Visite nosso escritório em Porto Alegre.',
      parkingText: 'Opção de estacionamento para acesso ao escritório',
      parkingLinkText: 'mapa do estacionamento',
      formTitle: 'Contato',
      formSubtitle: 'Preencha o formulário abaixo e entraremos em contato o mais breve possível',
      fields: {
        fullNameLabel: 'Nome Completo',
        fullNamePlaceholder: 'Seu nome completo',
        cpfLabel: 'CPF',
        cpfPlaceholder: '000.000.000-00',
        phoneLabel: 'Telefone',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        processNumberLabelOptional: 'Número do Processo (Opcional)',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: 'Mensagem',
        messagePlaceholder: 'Descreva como podemos ajudá-lo...'
      },
      submit: 'Enviar Mensagem',
      submitting: 'Enviando...',
      toastSuccessTitle: 'Mensagem enviada!',
      toastSuccessDescription: 'Entraremos em contato em breve.',
      toastValidationErrorTitle: 'Erro de validação',
      toastGenericErrorTitle: 'Erro',
      toastGenericErrorDescription: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.',
      validation: {
        nameRequired: 'Nome é obrigatório',
        nameTooLong: 'Nome muito longo',
        emailInvalid: 'E-mail inválido',
        emailTooLong: 'E-mail muito longo',
        phoneRequired: 'Telefone é obrigatório',
        phoneTooLong: 'Telefone muito longo',
        cpfRequired: 'CPF é obrigatório',
        cpfInvalid: 'CPF inválido',
        processNumberTooLong: 'Número do processo muito longo',
        messageTooShort: 'Mensagem deve ter pelo menos 10 caracteres',
        messageTooLong: 'Mensagem muito longa'
      }
    },
    processConsultation: {
      title: 'Consulte Seu Processo',
      description: 'Digite o número do processo e receba atualizações em poucos minutos.',
      processNumberPlaceholder: 'Número do processo (ex: 0000000-00.0000.0.00.0000)',
      fullNamePlaceholder: 'Nome completo',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: 'Por favor, preencha todos os campos obrigatórios',
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
      rights: 'Todos os direitos reservados.',
      socialMedia: 'Redes Sociais',
      workWithUs: 'Trabalhe Conosco',
      rateUs: 'Avalie-nos'
    },
    cookies: {
      title: 'Política de Cookies',
      message: 'Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa política de privacidade.',
      accept: 'Aceitar',
      decline: 'Recusar'
    },
    blog: {
      title: 'Blog Jurídico',
      subtitle: 'Artigos, notícias e análises sobre as mais recentes mudanças na legislação e jurisprudência brasileira.',
      searchPlaceholder: 'Buscar artigos...',
      all: 'Todos',
      filterByTag: 'Filtrar por tag',
      allTags: 'Todas as tags',
      clear: 'Limpar',
      noArticles: 'Nenhum artigo encontrado.',
      readMore: 'Ler mais',
      backToBlog: 'Voltar ao Blog',
      share: 'Compartilhar',
      minRead: 'min de leitura',
      tags: 'Tags',
      articleNotFound: 'Artigo não encontrado',
      articleNotFoundDesc: 'O artigo que você procura não existe ou foi removido.',
      linkCopied: 'Link copiado para a área de transferência!'
    },
    avalie: {
      heroTitle: 'Sua opinião é importante',
      heroSubtitle: 'Ajude-nos a continuar oferecendo serviços jurídicos de excelência',
      cardTitle: 'Avalie Nossa Experiência',
      cardSubtitle: 'Compartilhe sua experiência com nossos serviços no Google',
      note: 'Sua avaliação nos ajuda a melhorar continuamente nossos serviços e a alcançar mais clientes que precisam de assessoria jurídica de qualidade.',
      cta: 'Deixar Avaliação',
      disclaimer: 'Você será redirecionado para o Google Meu Negócio',
      footerLine: 'Excelência em serviços jurídicos há mais de 20 anos'
    },
    trabalheConosco: {
      heroTitle: 'Trabalhe Conosco',
      heroSubtitle: 'Junte-se a nós e construa o futuro da advocacia com ética, inovação e compromisso com resultados.',
      whyTitle: 'Por que trabalhar conosco?',
      benefits: {
        collaborativeTitle: 'Ambiente Colaborativo',
        collaborativeDesc: 'Trabalhe em uma equipe que valoriza a colaboração e o desenvolvimento profissional.',
        challengingTitle: 'Casos Desafiadores',
        challengingDesc: 'Participe de casos complexos e relevantes em diversas áreas do direito.',
        growthTitle: 'Crescimento Profissional',
        growthDesc: 'Desenvolva sua carreira em um escritório com tradição e excelência jurídica.'
      },
      formTitle: 'Envie sua Candidatura',
      fields: {
        nameLabel: 'Nome Completo',
        namePlaceholder: 'Seu nome completo',
        emailLabel: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        phoneLabel: 'Telefone',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: 'Cargo',
        rolePlaceholder: 'Selecione o cargo desejado',
        interestAreaLabel: 'Área de Interesse',
        interestAreaPlaceholder: 'Ex: Direito Civil, Direito Trabalhista, etc.',
        messageLabel: 'Mensagem / Experiência Profissional',
        messagePlaceholder: 'Conte-nos sobre sua experiência e por que deseja trabalhar conosco...'
      },
      roles: {
        intern: 'Estagiário',
        adminAssistant: 'Assistente Administrativo',
        lawyer: 'Advogado',
        correspondentLawyer: 'Advogado Correspondente',
        partnerLawyer: 'Advogado Parceiro'
      },
      resumeBox: {
        title: 'Envio de Currículo',
        description: 'Após enviar este formulário, você será redirecionado ao WhatsApp onde poderá anexar seu currículo.'
      },
      submit: 'Enviar',
      submitting: 'Enviando...',
      backHome: 'Voltar para Home',
      toastSuccessTitle: 'Candidatura enviada!',
      toastSuccessDescription: 'Entraremos em contato em breve.',
      toastValidationErrorTitle: 'Erro de validação',
      toastGenericErrorTitle: 'Erro',
      toastGenericErrorDescription: 'Ocorreu um erro ao enviar sua candidatura. Tente novamente.',
      validation: {
        nameRequired: 'Nome é obrigatório',
        nameTooLong: 'Nome muito longo',
        emailInvalid: 'E-mail inválido',
        emailTooLong: 'E-mail muito longo',
        phoneRequired: 'Telefone é obrigatório',
        phoneTooLong: 'Telefone muito longo',
        roleRequired: 'Cargo é obrigatório',
        interestAreaRequired: 'Área de interesse é obrigatória',
        messageTooShort: 'Mensagem deve ter pelo menos 10 caracteres',
        messageTooLong: 'Mensagem muito longa'
      },
      whatsapp: {
        title: 'Candidatura - Trabalhe Conosco',
        name: 'Nome',
        phone: 'Telefone',
        email: 'Email',
        role: 'Cargo',
        interestArea: 'Área de Interesse',
        message: 'Mensagem'
      }
    },
    auth: {
      adminArea: 'Área Administrativa',
      accessPanel: 'Acesse o painel de gerenciamento do blog',
      login: 'Entrar',
      signup: 'Cadastrar',
      email: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      password: 'Senha',
      passwordPlaceholder: '••••••••',
      fullName: 'Nome completo',
      fullNamePlaceholder: 'Seu nome',
      confirmPassword: 'Confirmar senha',
      loggingIn: 'Entrando...',
      signingUp: 'Cadastrando...',
      backToSite: '← Voltar ao site',
      loginSuccess: 'Login realizado com sucesso!',
      accountCreated: 'Conta criada com sucesso!',
      invalidCredentials: 'E-mail ou senha incorretos',
      loginError: 'Erro ao fazer login. Tente novamente.',
      emailAlreadyRegistered: 'Este e-mail já está cadastrado',
      signupError: 'Erro ao criar conta. Tente novamente.',
      validation: {
        emailInvalid: 'E-mail inválido',
        passwordMin: 'Senha deve ter no mínimo 6 caracteres',
        nameMin: 'Nome deve ter no mínimo 2 caracteres',
        passwordsDoNotMatch: 'As senhas não coincidem'
      }
    },
    admin: {
      panel: 'Painel Administrativo',
      blogManagement: 'Gerenciamento do Blog',
      site: 'Site',
      logout: 'Sair',
      totalPosts: 'Total de Posts',
      published: 'publicados',
      categories: 'Categorias',
      categoriesCreated: 'categorias criadas',
      drafts: 'Rascunhos',
      awaitingPublication: 'aguardando publicação',
      posts: 'Posts',
      blogPosts: 'Posts do Blog',
      manageArticles: 'Gerencie os artigos publicados',
      newPost: 'Novo Post',
      noPostsFound: 'Nenhum post encontrado. Crie seu primeiro artigo!',
      title: 'Título',
      category: 'Categoria',
      status: 'Status',
      date: 'Data',
      actions: 'Ações',
      publishedStatus: 'Publicado',
      draftStatus: 'Rascunho',
      deletePost: 'Excluir post?',
      deletePostDesc: 'Esta ação não pode ser desfeita. O post será permanentemente excluído.',
      cancel: 'Cancelar',
      delete: 'Excluir',
      organizeByCategory: 'Organize os posts por categoria',
      newCategory: 'Nova Categoria',
      noCategoriesFound: 'Nenhuma categoria encontrada. Crie sua primeira categoria!',
      name: 'Nome',
      slug: 'Slug',
      deleteCategory: 'Excluir categoria?',
      deleteCategoryDesc: 'Esta ação não pode ser desfeita. Os posts vinculados ficarão sem categoria.',
      accessDenied: 'Acesso Negado',
      accessDeniedDesc: 'Você não tem permissão para acessar esta página. Entre em contato com o administrador.',
      backToSite: 'Voltar ao Site',
      loadError: 'Erro ao carregar posts',
      deleteError: 'Erro ao excluir post',
      deleteSuccess: 'Post excluído com sucesso',
      deleteCategoryError: 'Erro ao excluir categoria',
      deleteCategorySuccess: 'Categoria excluída com sucesso',
      back: 'Voltar',
      editPost: 'Editar Post',
      newPostTitle: 'Novo Post',
      save: 'Salvar',
      saving: 'Salvando...',
      preview: 'Visualizar',
      importFromUrl: 'Importar de URL',
      importFromUrlDesc: 'Cole o link de um artigo para preencher automaticamente com IA',
      importPlaceholder: 'https://exemplo.com/artigo',
      importing: 'Importando...',
      import: 'Importar',
      content: 'Conteúdo',
      titleRequired: 'Título *',
      titlePlaceholder: 'Título do artigo',
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: 'titulo-do-artigo',
      excerpt: 'Resumo',
      excerptPlaceholder: 'Breve resumo do artigo (aparece na listagem)',
      characters: 'caracteres',
      contentRequired: 'Conteúdo *',
      contentPlaceholder: 'Escreva o conteúdo do artigo... (suporta HTML)',
      htmlHint: 'Você pode usar HTML para formatação (h2, h3, p, ul, li, strong, em, a, etc.)',
      featuredImage: 'Imagem Destacada',
      uploadImage: 'Carregar imagem',
      orPasteUrl: 'Ou cole a URL',
      organization: 'Organização',
      selectCategory: 'Selecione uma categoria',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'direito, legislação, STF',
      tagsSeparator: 'Separe as tags por vírgula',
      seo: 'SEO',
      metaTitle: 'Meta Título',
      metaTitlePlaceholder: 'Título para mecanismos de busca',
      metaTitleHint: 'Máx. 60 caracteres. Deixe em branco para usar o título.',
      metaDescription: 'Meta Descrição',
      metaDescriptionPlaceholder: 'Descrição para mecanismos de busca',
      metaDescriptionHint: 'Máx. 160 caracteres. Deixe em branco para usar o resumo.',
      editCategory: 'Editar Categoria',
      newCategoryTitle: 'Nova Categoria',
      categoryDetails: 'Detalhes da Categoria',
      categoryName: 'Nome *',
      categoryNamePlaceholder: 'Nome da categoria',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: 'nome-da-categoria',
      categoryDescription: 'Descrição',
      categoryDescriptionPlaceholder: 'Descrição da categoria (opcional)',
      postUpdated: 'Post atualizado com sucesso',
      postCreated: 'Post criado com sucesso',
      postUpdateError: 'Erro ao atualizar post',
      postCreateError: 'Erro ao criar post',
      slugExists: 'Já existe um post com este slug',
      categoryUpdated: 'Categoria atualizada com sucesso',
      categoryCreated: 'Categoria criada com sucesso',
      categoryUpdateError: 'Erro ao atualizar categoria',
      categoryCreateError: 'Erro ao criar categoria',
      categorySlugExists: 'Já existe uma categoria com este nome ou slug',
      importSuccess: 'Conteúdo importado com sucesso! Revise antes de publicar.',
      importError: 'Erro ao importar conteúdo',
      enterUrlToImport: 'Digite uma URL para importar',
      loadPostError: 'Erro ao carregar post',
      loadCategoryError: 'Erro ao carregar categoria',
      imageUploadError: 'Erro ao fazer upload da imagem',
      imageUploadSuccess: 'Imagem enviada com sucesso',
      generateTranslations: 'Gerar Traduções',
      translating: 'Traduzindo...',
      translationsGenerated: 'Traduções geradas com sucesso!',
      translationError: 'Erro ao gerar traduções',
      saveBeforeTranslating: 'Salve o post antes de gerar traduções',
      validation: {
        titleMin: 'Título deve ter no mínimo 3 caracteres',
        titleMax: 'Título muito longo',
        slugMin: 'Slug deve ter no mínimo 3 caracteres',
        slugMax: 'Slug muito longo',
        excerptMax: 'Resumo deve ter no máximo 300 caracteres',
        contentMin: 'Conteúdo deve ter no mínimo 10 caracteres',
        metaTitleMax: 'Meta título deve ter no máximo 60 caracteres',
        metaDescriptionMax: 'Meta descrição deve ter no máximo 160 caracteres',
        categoryNameMin: 'Nome deve ter no mínimo 2 caracteres',
        categoryNameMax: 'Nome muito longo',
        categorySlugMin: 'Slug deve ter no mínimo 2 caracteres',
        categorySlugMax: 'Slug muito longo',
        categoryDescriptionMax: 'Descrição deve ter no máximo 200 caracteres'
      }
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      areas: 'Áreas de Práctica',
      lawyers: 'Abogados',
      contact: 'Contacto',
      blog: 'Blog',
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
      prev: 'Anterior',
      next: 'Siguiente',
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
      intro: 'Conozca los socios que lideran MOTA & ABOGADOS ASOCIADOS con excelencia y compromiso.',
      swipeHint: '← Desliza para navegar →',
      prev: 'Anterior',
      next: 'Siguiente'
    },
    contact: {
      title: 'Ubicación',
      subtitle: 'Visite nuestra oficina en Porto Alegre.',
      parkingText: 'Opción de estacionamiento para acceder a la oficina',
      parkingLinkText: 'mapa del estacionamiento',
      formTitle: 'Contacto',
      formSubtitle: 'Complete el formulario y nos pondremos en contacto lo antes posible',
      fields: {
        fullNameLabel: 'Nombre completo',
        fullNamePlaceholder: 'Su nombre completo',
        cpfLabel: 'CPF',
        cpfPlaceholder: 'CPF (000.000.000-00)',
        phoneLabel: 'Teléfono',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: 'Correo electrónico',
        emailPlaceholder: 'su@email.com',
        processNumberLabelOptional: 'Número de proceso (opcional)',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: 'Mensaje',
        messagePlaceholder: 'Describa cómo podemos ayudarle...'
      },
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      toastSuccessTitle: '¡Mensaje enviado!',
      toastSuccessDescription: 'Nos pondremos en contacto pronto.',
      toastValidationErrorTitle: 'Error de validación',
      toastGenericErrorTitle: 'Error',
      toastGenericErrorDescription: 'Ocurrió un error al enviar su mensaje. Inténtelo de nuevo.',
      validation: {
        nameRequired: 'El nombre es obligatorio',
        nameTooLong: 'Nombre demasiado largo',
        emailInvalid: 'Correo electrónico inválido',
        emailTooLong: 'Correo electrónico demasiado largo',
        phoneRequired: 'El teléfono es obligatorio',
        phoneTooLong: 'Teléfono demasiado largo',
        cpfRequired: 'El CPF es obligatorio',
        cpfInvalid: 'CPF inválido',
        processNumberTooLong: 'Número de proceso demasiado largo',
        messageTooShort: 'El mensaje debe tener al menos 10 caracteres',
        messageTooLong: 'Mensaje demasiado largo'
      }
    },
    processConsultation: {
      title: 'Consulte Su Proceso',
      description: 'Ingrese el número del proceso y reciba actualizaciones en pocos minutos.',
      processNumberPlaceholder: 'Número de proceso (ej: 0000000-00.0000.0.00.0000)',
      fullNamePlaceholder: 'Nombre completo',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: 'Por favor, complete todos los campos obligatorios',
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
      rights: 'Todos los derechos reservados.',
      socialMedia: 'Redes Sociales',
      workWithUs: 'Trabaje Con Nosotros',
      rateUs: 'Evalúenos'
    },
    cookies: {
      title: 'Política de Cookies',
      message: 'Utilizamos cookies para mejorar su experiencia en nuestro sitio. Al continuar navegando, acepta nuestra política de privacidad.',
      accept: 'Aceptar',
      decline: 'Rechazar'
    },
    blog: {
      title: 'Blog Jurídico',
      subtitle: 'Artículos, noticias y análisis sobre los cambios más recientes en la legislación y jurisprudencia brasileña.',
      searchPlaceholder: 'Buscar artículos...',
      all: 'Todos',
      filterByTag: 'Filtrar por etiqueta',
      allTags: 'Todas las etiquetas',
      clear: 'Limpiar',
      noArticles: 'No se encontraron artículos.',
      readMore: 'Leer más',
      backToBlog: 'Volver al Blog',
      share: 'Compartir',
      minRead: 'min de lectura',
      tags: 'Etiquetas',
      articleNotFound: 'Artículo no encontrado',
      articleNotFoundDesc: 'El artículo que busca no existe o fue eliminado.',
      linkCopied: '¡Enlace copiado al portapapeles!'
    },
    avalie: {
      heroTitle: 'Tu opinión es importante',
      heroSubtitle: 'Ayúdanos a seguir ofreciendo servicios jurídicos de excelencia',
      cardTitle: 'Evalúa Nuestra Experiencia',
      cardSubtitle: 'Comparte tu experiencia con nuestros servicios en Google',
      note: 'Tu reseña nos ayuda a mejorar continuamente nuestros servicios y a llegar a más clientes que necesitan asesoría jurídica de calidad.',
      cta: 'Dejar Reseña',
      disclaimer: 'Serás redirigido a Google Business',
      footerLine: 'Excelencia en servicios jurídicos desde hace más de 20 años'
    },
    trabalheConosco: {
      heroTitle: 'Trabaja con Nosotros',
      heroSubtitle: 'Únete a nosotros y construye el futuro de la abogacía con ética, innovación y compromiso con resultados.',
      whyTitle: '¿Por qué trabajar con nosotros?',
      benefits: {
        collaborativeTitle: 'Ambiente Colaborativo',
        collaborativeDesc: 'Trabaja en un equipo que valora la colaboración y el desarrollo profesional.',
        challengingTitle: 'Casos Desafiantes',
        challengingDesc: 'Participa en casos complejos y relevantes en diversas áreas del derecho.',
        growthTitle: 'Crecimiento Profesional',
        growthDesc: 'Desarrolla tu carrera en un despacho con tradición y excelencia jurídica.'
      },
      formTitle: 'Envía tu Candidatura',
      fields: {
        nameLabel: 'Nombre Completo',
        namePlaceholder: 'Tu nombre completo',
        emailLabel: 'Correo electrónico',
        emailPlaceholder: 'tu@email.com',
        phoneLabel: 'Teléfono',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: 'Puesto',
        rolePlaceholder: 'Selecciona el puesto deseado',
        interestAreaLabel: 'Área de Interés',
        interestAreaPlaceholder: 'Ej: Derecho Civil, Derecho Laboral, etc.',
        messageLabel: 'Mensaje / Experiencia Profesional',
        messagePlaceholder: 'Cuéntanos sobre tu experiencia y por qué quieres trabajar con nosotros...'
      },
      roles: {
        intern: 'Practicante',
        adminAssistant: 'Asistente Administrativo',
        lawyer: 'Abogado',
        correspondentLawyer: 'Abogado Corresponsal',
        partnerLawyer: 'Abogado Socio'
      },
      resumeBox: {
        title: 'Envío de Currículum',
        description: 'Después de enviar este formulario, serás redirigido a WhatsApp donde podrás adjuntar tu currículum.'
      },
      submit: 'Enviar',
      submitting: 'Enviando...',
      backHome: 'Volver al Inicio',
      toastSuccessTitle: '¡Candidatura enviada!',
      toastSuccessDescription: 'Nos pondremos en contacto pronto.',
      toastValidationErrorTitle: 'Error de validación',
      toastGenericErrorTitle: 'Error',
      toastGenericErrorDescription: 'Ocurrió un error al enviar tu candidatura. Inténtalo de nuevo.',
      validation: {
        nameRequired: 'El nombre es obligatorio',
        nameTooLong: 'Nombre demasiado largo',
        emailInvalid: 'Correo electrónico inválido',
        emailTooLong: 'Correo electrónico demasiado largo',
        phoneRequired: 'El teléfono es obligatorio',
        phoneTooLong: 'Teléfono demasiado largo',
        roleRequired: 'El puesto es obligatorio',
        interestAreaRequired: 'El área de interés es obligatoria',
        messageTooShort: 'El mensaje debe tener al menos 10 caracteres',
        messageTooLong: 'Mensaje demasiado largo'
      },
      whatsapp: {
        title: 'Candidatura - Trabaja con Nosotros',
        name: 'Nombre',
        phone: 'Teléfono',
        email: 'Email',
        role: 'Puesto',
        interestArea: 'Área de Interés',
        message: 'Mensaje'
      }
    },
    auth: {
      adminArea: 'Área Administrativa',
      accessPanel: 'Acceda al panel de gestión del blog',
      login: 'Iniciar sesión',
      signup: 'Registrarse',
      email: 'Correo electrónico',
      emailPlaceholder: 'su@email.com',
      password: 'Contraseña',
      passwordPlaceholder: '••••••••',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Su nombre',
      confirmPassword: 'Confirmar contraseña',
      loggingIn: 'Iniciando sesión...',
      signingUp: 'Registrando...',
      backToSite: '← Volver al sitio',
      loginSuccess: '¡Inicio de sesión exitoso!',
      accountCreated: '¡Cuenta creada con éxito!',
      invalidCredentials: 'Correo o contraseña incorrectos',
      loginError: 'Error al iniciar sesión. Intente de nuevo.',
      emailAlreadyRegistered: 'Este correo ya está registrado',
      signupError: 'Error al crear cuenta. Intente de nuevo.',
      validation: {
        emailInvalid: 'Correo electrónico inválido',
        passwordMin: 'La contraseña debe tener al menos 6 caracteres',
        nameMin: 'El nombre debe tener al menos 2 caracteres',
        passwordsDoNotMatch: 'Las contraseñas no coinciden'
      }
    },
    admin: {
      panel: 'Panel Administrativo',
      blogManagement: 'Gestión del Blog',
      site: 'Sitio',
      logout: 'Cerrar sesión',
      totalPosts: 'Total de Posts',
      published: 'publicados',
      categories: 'Categorías',
      categoriesCreated: 'categorías creadas',
      drafts: 'Borradores',
      awaitingPublication: 'esperando publicación',
      posts: 'Posts',
      blogPosts: 'Posts del Blog',
      manageArticles: 'Gestione los artículos publicados',
      newPost: 'Nuevo Post',
      noPostsFound: 'No se encontraron posts. ¡Cree su primer artículo!',
      title: 'Título',
      category: 'Categoría',
      status: 'Estado',
      date: 'Fecha',
      actions: 'Acciones',
      publishedStatus: 'Publicado',
      draftStatus: 'Borrador',
      deletePost: '¿Eliminar post?',
      deletePostDesc: 'Esta acción no se puede deshacer. El post se eliminará permanentemente.',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      organizeByCategory: 'Organice los posts por categoría',
      newCategory: 'Nueva Categoría',
      noCategoriesFound: 'No se encontraron categorías. ¡Cree su primera categoría!',
      name: 'Nombre',
      slug: 'Slug',
      deleteCategory: '¿Eliminar categoría?',
      deleteCategoryDesc: 'Esta acción no se puede deshacer. Los posts vinculados quedarán sin categoría.',
      accessDenied: 'Acceso Denegado',
      accessDeniedDesc: 'No tiene permiso para acceder a esta página. Contacte al administrador.',
      backToSite: 'Volver al Sitio',
      loadError: 'Error al cargar posts',
      deleteError: 'Error al eliminar post',
      deleteSuccess: 'Post eliminado con éxito',
      deleteCategoryError: 'Error al eliminar categoría',
      deleteCategorySuccess: 'Categoría eliminada con éxito',
      back: 'Volver',
      editPost: 'Editar Post',
      newPostTitle: 'Nuevo Post',
      save: 'Guardar',
      saving: 'Guardando...',
      preview: 'Vista previa',
      importFromUrl: 'Importar desde URL',
      importFromUrlDesc: 'Pegue el enlace de un artículo para completar automáticamente con IA',
      importPlaceholder: 'https://ejemplo.com/articulo',
      importing: 'Importando...',
      import: 'Importar',
      content: 'Contenido',
      titleRequired: 'Título *',
      titlePlaceholder: 'Título del artículo',
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: 'titulo-del-articulo',
      excerpt: 'Resumen',
      excerptPlaceholder: 'Breve resumen del artículo (aparece en el listado)',
      characters: 'caracteres',
      contentRequired: 'Contenido *',
      contentPlaceholder: 'Escriba el contenido del artículo... (soporta HTML)',
      htmlHint: 'Puede usar HTML para formato (h2, h3, p, ul, li, strong, em, a, etc.)',
      featuredImage: 'Imagen Destacada',
      uploadImage: 'Subir imagen',
      orPasteUrl: 'O pegue la URL',
      organization: 'Organización',
      selectCategory: 'Seleccione una categoría',
      tagsLabel: 'Etiquetas',
      tagsPlaceholder: 'derecho, legislación, tribunal',
      tagsSeparator: 'Separe las etiquetas por coma',
      seo: 'SEO',
      metaTitle: 'Meta Título',
      metaTitlePlaceholder: 'Título para motores de búsqueda',
      metaTitleHint: 'Máx. 60 caracteres. Deje en blanco para usar el título.',
      metaDescription: 'Meta Descripción',
      metaDescriptionPlaceholder: 'Descripción para motores de búsqueda',
      metaDescriptionHint: 'Máx. 160 caracteres. Deje en blanco para usar el resumen.',
      editCategory: 'Editar Categoría',
      newCategoryTitle: 'Nueva Categoría',
      categoryDetails: 'Detalles de la Categoría',
      categoryName: 'Nombre *',
      categoryNamePlaceholder: 'Nombre de la categoría',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: 'nombre-de-la-categoria',
      categoryDescription: 'Descripción',
      categoryDescriptionPlaceholder: 'Descripción de la categoría (opcional)',
      postUpdated: 'Post actualizado con éxito',
      postCreated: 'Post creado con éxito',
      postUpdateError: 'Error al actualizar post',
      postCreateError: 'Error al crear post',
      slugExists: 'Ya existe un post con este slug',
      categoryUpdated: 'Categoría actualizada con éxito',
      categoryCreated: 'Categoría creada con éxito',
      categoryUpdateError: 'Error al actualizar categoría',
      categoryCreateError: 'Error al crear categoría',
      categorySlugExists: 'Ya existe una categoría con este nombre o slug',
      importSuccess: '¡Contenido importado con éxito! Revise antes de publicar.',
      importError: 'Error al importar contenido',
      enterUrlToImport: 'Ingrese una URL para importar',
      loadPostError: 'Error al cargar post',
      loadCategoryError: 'Error al cargar categoría',
      imageUploadError: 'Error al subir imagen',
      imageUploadSuccess: 'Imagen subida con éxito',
      generateTranslations: 'Generar Traducciones',
      translating: 'Traduciendo...',
      translationsGenerated: '¡Traducciones generadas con éxito!',
      translationError: 'Error al generar traducciones',
      saveBeforeTranslating: 'Guarde el post antes de generar traducciones',
      validation: {
        titleMin: 'El título debe tener al menos 3 caracteres',
        titleMax: 'Título muy largo',
        slugMin: 'El slug debe tener al menos 3 caracteres',
        slugMax: 'Slug muy largo',
        excerptMax: 'El resumen debe tener máximo 300 caracteres',
        contentMin: 'El contenido debe tener al menos 10 caracteres',
        metaTitleMax: 'El meta título debe tener máximo 60 caracteres',
        metaDescriptionMax: 'La meta descripción debe tener máximo 160 caracteres',
        categoryNameMin: 'El nombre debe tener al menos 2 caracteres',
        categoryNameMax: 'Nombre muy largo',
        categorySlugMin: 'El slug debe tener al menos 2 caracteres',
        categorySlugMax: 'Slug muy largo',
        categoryDescriptionMax: 'La descripción debe tener máximo 200 caracteres'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      areas: 'Practice Areas',
      lawyers: 'Lawyers',
      contact: 'Contact',
      blog: 'Blog',
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
      prev: 'Previous',
      next: 'Next',
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
      intro: 'Meet the partners who lead MOTA & LAWYERS ASSOCIATES with excellence and commitment.',
      swipeHint: '← Swipe to navigate →',
      prev: 'Previous',
      next: 'Next'
    },
    contact: {
      title: 'Location',
      subtitle: 'Visit our office in Porto Alegre.',
      parkingText: 'Parking option to access the office',
      parkingLinkText: 'parking map',
      formTitle: 'Contact',
      formSubtitle: 'Fill out the form below and we will get back to you as soon as possible',
      fields: {
        fullNameLabel: 'Full name',
        fullNamePlaceholder: 'Your full name',
        cpfLabel: 'CPF (Brazilian Tax ID)',
        cpfPlaceholder: '000.000.000-00',
        phoneLabel: 'Phone',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: 'Email',
        emailPlaceholder: 'you@email.com',
        processNumberLabelOptional: 'Case number (optional)',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: 'Message',
        messagePlaceholder: 'Describe how we can help you...'
      },
      submit: 'Send message',
      submitting: 'Sending...',
      toastSuccessTitle: 'Message sent!',
      toastSuccessDescription: 'We will contact you soon.',
      toastValidationErrorTitle: 'Validation error',
      toastGenericErrorTitle: 'Error',
      toastGenericErrorDescription: 'An error occurred while sending your message. Please try again.',
      validation: {
        nameRequired: 'Name is required',
        nameTooLong: 'Name is too long',
        emailInvalid: 'Invalid email',
        emailTooLong: 'Email is too long',
        phoneRequired: 'Phone is required',
        phoneTooLong: 'Phone is too long',
        cpfRequired: 'CPF is required',
        cpfInvalid: 'Invalid CPF',
        processNumberTooLong: 'Case number is too long',
        messageTooShort: 'Message must be at least 10 characters',
        messageTooLong: 'Message is too long'
      }
    },
    processConsultation: {
      title: 'Check Your Case',
      description: 'Enter the case number and receive updates in just a few minutes.',
      processNumberPlaceholder: 'Case number (ex: 0000000-00.0000.0.00.0000)',
      fullNamePlaceholder: 'Full name',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: 'Please fill in all required fields',
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
      rights: 'All rights reserved.',
      socialMedia: 'Social Media',
      workWithUs: 'Work With Us',
      rateUs: 'Rate Us'
    },
    cookies: {
      title: 'Cookie Policy',
      message: 'We use cookies to improve your experience on our website. By continuing to browse, you agree to our privacy policy.',
      accept: 'Accept',
      decline: 'Decline'
    },
    blog: {
      title: 'Legal Blog',
      subtitle: 'Articles, news and analysis on the latest changes in Brazilian legislation and jurisprudence.',
      searchPlaceholder: 'Search articles...',
      all: 'All',
      filterByTag: 'Filter by tag',
      allTags: 'All tags',
      clear: 'Clear',
      noArticles: 'No articles found.',
      readMore: 'Read more',
      backToBlog: 'Back to Blog',
      share: 'Share',
      minRead: 'min read',
      tags: 'Tags',
      articleNotFound: 'Article not found',
      articleNotFoundDesc: 'The article you are looking for does not exist or has been removed.',
      linkCopied: 'Link copied to clipboard!'
    },
    avalie: {
      heroTitle: 'Your opinion matters',
      heroSubtitle: 'Help us continue delivering excellent legal services',
      cardTitle: 'Rate Our Experience',
      cardSubtitle: 'Share your experience with our services on Google',
      note: 'Your review helps us continuously improve our services and reach more clients who need quality legal support.',
      cta: 'Leave a Review',
      disclaimer: 'You will be redirected to Google Business',
      footerLine: 'Excellence in legal services for over 20 years'
    },
    trabalheConosco: {
      heroTitle: 'Work With Us',
      heroSubtitle: 'Join us and help build the future of legal practice with ethics, innovation, and a commitment to results.',
      whyTitle: 'Why work with us?',
      benefits: {
        collaborativeTitle: 'Collaborative Environment',
        collaborativeDesc: 'Work in a team that values collaboration and professional development.',
        challengingTitle: 'Challenging Cases',
        challengingDesc: 'Take part in complex and relevant cases across different areas of law.',
        growthTitle: 'Professional Growth',
        growthDesc: 'Grow your career at a firm with tradition and legal excellence.'
      },
      formTitle: 'Submit Your Application',
      fields: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        phoneLabel: 'Phone',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: 'Role',
        rolePlaceholder: 'Select the desired role',
        interestAreaLabel: 'Area of Interest',
        interestAreaPlaceholder: 'e.g., Civil Law, Labor Law, etc.',
        messageLabel: 'Message / Professional Experience',
        messagePlaceholder: 'Tell us about your experience and why you want to work with us...'
      },
      roles: {
        intern: 'Intern',
        adminAssistant: 'Administrative Assistant',
        lawyer: 'Lawyer',
        correspondentLawyer: 'Correspondent Lawyer',
        partnerLawyer: 'Partner Lawyer'
      },
      resumeBox: {
        title: 'Resume Upload',
        description: 'After submitting this form, you will be redirected to WhatsApp where you can attach your resume.'
      },
      submit: 'Send',
      submitting: 'Sending...',
      backHome: 'Back to Home',
      toastSuccessTitle: 'Application sent!',
      toastSuccessDescription: 'We will contact you soon.',
      toastValidationErrorTitle: 'Validation error',
      toastGenericErrorTitle: 'Error',
      toastGenericErrorDescription: 'An error occurred while sending your application. Please try again.',
      validation: {
        nameRequired: 'Name is required',
        nameTooLong: 'Name is too long',
        emailInvalid: 'Invalid email',
        emailTooLong: 'Email is too long',
        phoneRequired: 'Phone is required',
        phoneTooLong: 'Phone is too long',
        roleRequired: 'Role is required',
        interestAreaRequired: 'Area of interest is required',
        messageTooShort: 'Message must be at least 10 characters',
        messageTooLong: 'Message is too long'
      },
      whatsapp: {
        title: 'Application - Work With Us',
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        role: 'Role',
        interestArea: 'Area of Interest',
        message: 'Message'
      }
    },
    auth: {
      adminArea: 'Admin Area',
      accessPanel: 'Access the blog management panel',
      login: 'Login',
      signup: 'Sign up',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      fullName: 'Full name',
      fullNamePlaceholder: 'Your name',
      confirmPassword: 'Confirm password',
      loggingIn: 'Logging in...',
      signingUp: 'Signing up...',
      backToSite: '← Back to site',
      loginSuccess: 'Login successful!',
      accountCreated: 'Account created successfully!',
      invalidCredentials: 'Invalid email or password',
      loginError: 'Login error. Please try again.',
      emailAlreadyRegistered: 'This email is already registered',
      signupError: 'Error creating account. Please try again.',
      validation: {
        emailInvalid: 'Invalid email',
        passwordMin: 'Password must have at least 6 characters',
        nameMin: 'Name must have at least 2 characters',
        passwordsDoNotMatch: 'Passwords do not match'
      }
    },
    admin: {
      panel: 'Admin Panel',
      blogManagement: 'Blog Management',
      site: 'Site',
      logout: 'Logout',
      totalPosts: 'Total Posts',
      published: 'published',
      categories: 'Categories',
      categoriesCreated: 'categories created',
      drafts: 'Drafts',
      awaitingPublication: 'awaiting publication',
      posts: 'Posts',
      blogPosts: 'Blog Posts',
      manageArticles: 'Manage published articles',
      newPost: 'New Post',
      noPostsFound: 'No posts found. Create your first article!',
      title: 'Title',
      category: 'Category',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      publishedStatus: 'Published',
      draftStatus: 'Draft',
      deletePost: 'Delete post?',
      deletePostDesc: 'This action cannot be undone. The post will be permanently deleted.',
      cancel: 'Cancel',
      delete: 'Delete',
      organizeByCategory: 'Organize posts by category',
      newCategory: 'New Category',
      noCategoriesFound: 'No categories found. Create your first category!',
      name: 'Name',
      slug: 'Slug',
      deleteCategory: 'Delete category?',
      deleteCategoryDesc: 'This action cannot be undone. Linked posts will be left without category.',
      accessDenied: 'Access Denied',
      accessDeniedDesc: 'You do not have permission to access this page. Contact the administrator.',
      backToSite: 'Back to Site',
      loadError: 'Error loading posts',
      deleteError: 'Error deleting post',
      deleteSuccess: 'Post deleted successfully',
      deleteCategoryError: 'Error deleting category',
      deleteCategorySuccess: 'Category deleted successfully',
      back: 'Back',
      editPost: 'Edit Post',
      newPostTitle: 'New Post',
      save: 'Save',
      saving: 'Saving...',
      preview: 'Preview',
      importFromUrl: 'Import from URL',
      importFromUrlDesc: 'Paste an article link to auto-fill with AI',
      importPlaceholder: 'https://example.com/article',
      importing: 'Importing...',
      import: 'Import',
      content: 'Content',
      titleRequired: 'Title *',
      titlePlaceholder: 'Article title',
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: 'article-title',
      excerpt: 'Excerpt',
      excerptPlaceholder: 'Brief article summary (shown in listing)',
      characters: 'characters',
      contentRequired: 'Content *',
      contentPlaceholder: 'Write article content... (supports HTML)',
      htmlHint: 'You can use HTML for formatting (h2, h3, p, ul, li, strong, em, a, etc.)',
      featuredImage: 'Featured Image',
      uploadImage: 'Upload image',
      orPasteUrl: 'Or paste URL',
      organization: 'Organization',
      selectCategory: 'Select a category',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'law, legislation, court',
      tagsSeparator: 'Separate tags with comma',
      seo: 'SEO',
      metaTitle: 'Meta Title',
      metaTitlePlaceholder: 'Title for search engines',
      metaTitleHint: 'Max. 60 characters. Leave blank to use title.',
      metaDescription: 'Meta Description',
      metaDescriptionPlaceholder: 'Description for search engines',
      metaDescriptionHint: 'Max. 160 characters. Leave blank to use excerpt.',
      editCategory: 'Edit Category',
      newCategoryTitle: 'New Category',
      categoryDetails: 'Category Details',
      categoryName: 'Name *',
      categoryNamePlaceholder: 'Category name',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: 'category-name',
      categoryDescription: 'Description',
      categoryDescriptionPlaceholder: 'Category description (optional)',
      postUpdated: 'Post updated successfully',
      postCreated: 'Post created successfully',
      postUpdateError: 'Error updating post',
      postCreateError: 'Error creating post',
      slugExists: 'A post with this slug already exists',
      categoryUpdated: 'Category updated successfully',
      categoryCreated: 'Category created successfully',
      categoryUpdateError: 'Error updating category',
      categoryCreateError: 'Error creating category',
      categorySlugExists: 'A category with this name or slug already exists',
      importSuccess: 'Content imported successfully! Review before publishing.',
      importError: 'Error importing content',
      enterUrlToImport: 'Enter a URL to import',
      loadPostError: 'Error loading post',
      loadCategoryError: 'Error loading category',
      imageUploadError: 'Error uploading image',
      imageUploadSuccess: 'Image uploaded successfully',
      generateTranslations: 'Generate Translations',
      translating: 'Translating...',
      translationsGenerated: 'Translations generated successfully!',
      translationError: 'Error generating translations',
      saveBeforeTranslating: 'Save the post before generating translations',
      validation: {
        titleMin: 'Title must have at least 3 characters',
        titleMax: 'Title too long',
        slugMin: 'Slug must have at least 3 characters',
        slugMax: 'Slug too long',
        excerptMax: 'Excerpt must have max 300 characters',
        contentMin: 'Content must have at least 10 characters',
        metaTitleMax: 'Meta title must have max 60 characters',
        metaDescriptionMax: 'Meta description must have max 160 characters',
        categoryNameMin: 'Name must have at least 2 characters',
        categoryNameMax: 'Name too long',
        categorySlugMin: 'Slug must have at least 2 characters',
        categorySlugMax: 'Slug too long',
        categoryDescriptionMax: 'Description must have max 200 characters'
      }
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      areas: 'Tätigkeitsbereiche',
      lawyers: 'Anwälte',
      contact: 'Kontakt',
      blog: 'Blog',
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
      prev: 'Zurück',
      next: 'Weiter',
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
      intro: 'Lernen Sie die Partner kennen, die MOTA & RECHTSANWÄLTE PARTNER mit Exzellenz und Engagement führen.',
      swipeHint: '← Wischen zum Navigieren →',
      prev: 'Zurück',
      next: 'Weiter'
    },
    contact: {
      title: 'Standort',
      subtitle: 'Besuchen Sie unser Büro in Porto Alegre.',
      parkingText: 'Parkmöglichkeit für den Zugang zur Kanzlei',
      parkingLinkText: 'Parkplan',
      formTitle: 'Kontakt',
      formSubtitle: 'Füllen Sie das Formular aus und wir melden uns so schnell wie möglich',
      fields: {
        fullNameLabel: 'Vollständiger Name',
        fullNamePlaceholder: 'Ihr vollständiger Name',
        cpfLabel: 'CPF (Brasilianische Steuer-ID)',
        cpfPlaceholder: '000.000.000-00',
        phoneLabel: 'Telefon',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: 'E-Mail',
        emailPlaceholder: 'ihre@email.com',
        processNumberLabelOptional: 'Aktenzeichen (optional)',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: 'Nachricht',
        messagePlaceholder: 'Beschreiben Sie, wie wir helfen können...'
      },
      submit: 'Nachricht senden',
      submitting: 'Wird gesendet...',
      toastSuccessTitle: 'Nachricht gesendet!',
      toastSuccessDescription: 'Wir melden uns in Kürze.',
      toastValidationErrorTitle: 'Validierungsfehler',
      toastGenericErrorTitle: 'Fehler',
      toastGenericErrorDescription: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      validation: {
        nameRequired: 'Name ist erforderlich',
        nameTooLong: 'Name ist zu lang',
        emailInvalid: 'Ungültige E-Mail',
        emailTooLong: 'E-Mail ist zu lang',
        phoneRequired: 'Telefon ist erforderlich',
        phoneTooLong: 'Telefon ist zu lang',
        cpfRequired: 'CPF ist erforderlich',
        cpfInvalid: 'Ungültiger CPF',
        processNumberTooLong: 'Aktenzeichen ist zu lang',
        messageTooShort: 'Nachricht muss mindestens 10 Zeichen haben',
        messageTooLong: 'Nachricht ist zu lang'
      }
    },
    processConsultation: {
      title: 'Ihren Fall Prüfen',
      description: 'Geben Sie die Fallnummer ein und erhalten Sie in wenigen Minuten Updates.',
      processNumberPlaceholder: 'Fallnummer (z.B.: 0000000-00.0000.0.00.0000)',
      fullNamePlaceholder: 'Vollständiger Name',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: 'Bitte füllen Sie alle Pflichtfelder aus',
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
      rights: 'Alle Rechte vorbehalten.',
      socialMedia: 'Soziale Medien',
      workWithUs: 'Arbeiten Sie Mit Uns',
      rateUs: 'Bewerten Sie Uns'
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      message: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Durch das Fortsetzen der Navigation stimmen Sie unserer Datenschutzrichtlinie zu.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    },
    blog: {
      title: 'Rechtsblog',
      subtitle: 'Artikel, Nachrichten und Analysen zu den neuesten Änderungen in der brasilianischen Gesetzgebung und Rechtsprechung.',
      searchPlaceholder: 'Artikel suchen...',
      all: 'Alle',
      filterByTag: 'Nach Tag filtern',
      allTags: 'Alle Tags',
      clear: 'Löschen',
      noArticles: 'Keine Artikel gefunden.',
      readMore: 'Mehr lesen',
      backToBlog: 'Zurück zum Blog',
      share: 'Teilen',
      minRead: 'Min. Lesezeit',
      tags: 'Tags',
      articleNotFound: 'Artikel nicht gefunden',
      articleNotFoundDesc: 'Der gesuchte Artikel existiert nicht oder wurde entfernt.',
      linkCopied: 'Link in die Zwischenablage kopiert!'
    },
    avalie: {
      heroTitle: 'Ihre Meinung ist wichtig',
      heroSubtitle: 'Helfen Sie uns, weiterhin exzellente juristische Dienstleistungen anzubieten',
      cardTitle: 'Bewerten Sie unsere Erfahrung',
      cardSubtitle: 'Teilen Sie Ihre Erfahrung mit unseren Dienstleistungen auf Google',
      note: 'Ihre Bewertung hilft uns, unsere Dienstleistungen kontinuierlich zu verbessern und mehr Mandanten zu erreichen, die qualitativ hochwertige Rechtsberatung benötigen.',
      cta: 'Bewertung abgeben',
      disclaimer: 'Sie werden zu Google Business weitergeleitet',
      footerLine: 'Exzellenz in juristischen Dienstleistungen seit über 20 Jahren'
    },
    trabalheConosco: {
      heroTitle: 'Arbeiten Sie mit uns',
      heroSubtitle: 'Schließen Sie sich uns an und gestalten Sie die Zukunft der Anwaltschaft mit Ethik, Innovation und Ergebnisorientierung.',
      whyTitle: 'Warum bei uns arbeiten?',
      benefits: {
        collaborativeTitle: 'Kollaboratives Umfeld',
        collaborativeDesc: 'Arbeiten Sie in einem Team, das Zusammenarbeit und berufliche Entwicklung schätzt.',
        challengingTitle: 'Herausfordernde Fälle',
        challengingDesc: 'Arbeiten Sie an komplexen und relevanten Fällen in verschiedenen Rechtsgebieten mit.',
        growthTitle: 'Berufliches Wachstum',
        growthDesc: 'Entwickeln Sie Ihre Karriere in einer Kanzlei mit Tradition und juristischer Exzellenz.'
      },
      formTitle: 'Bewerbung senden',
      fields: {
        nameLabel: 'Vollständiger Name',
        namePlaceholder: 'Ihr vollständiger Name',
        emailLabel: 'E-Mail',
        emailPlaceholder: 'ihre@email.com',
        phoneLabel: 'Telefon',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: 'Position',
        rolePlaceholder: 'Gewünschte Position auswählen',
        interestAreaLabel: 'Interessensgebiet',
        interestAreaPlaceholder: 'z. B. Zivilrecht, Arbeitsrecht usw.',
        messageLabel: 'Nachricht / Berufserfahrung',
        messagePlaceholder: 'Erzählen Sie uns von Ihrer Erfahrung und warum Sie bei uns arbeiten möchten...'
      },
      roles: {
        intern: 'Praktikant/in',
        adminAssistant: 'Administrative Assistenz',
        lawyer: 'Anwalt/Anwältin',
        correspondentLawyer: 'Korrespondenzanwalt/-anwältin',
        partnerLawyer: 'Partneranwalt/-anwältin'
      },
      resumeBox: {
        title: 'Lebenslauf senden',
        description: 'Nach dem Absenden dieses Formulars werden Sie zu WhatsApp weitergeleitet, wo Sie Ihren Lebenslauf anhängen können.'
      },
      submit: 'Senden',
      submitting: 'Wird gesendet...',
      backHome: 'Zur Startseite',
      toastSuccessTitle: 'Bewerbung gesendet!',
      toastSuccessDescription: 'Wir melden uns in Kürze.',
      toastValidationErrorTitle: 'Validierungsfehler',
      toastGenericErrorTitle: 'Fehler',
      toastGenericErrorDescription: 'Beim Senden Ihrer Bewerbung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      validation: {
        nameRequired: 'Name ist erforderlich',
        nameTooLong: 'Name ist zu lang',
        emailInvalid: 'Ungültige E-Mail',
        emailTooLong: 'E-Mail ist zu lang',
        phoneRequired: 'Telefon ist erforderlich',
        phoneTooLong: 'Telefon ist zu lang',
        roleRequired: 'Position ist erforderlich',
        interestAreaRequired: 'Interessensgebiet ist erforderlich',
        messageTooShort: 'Nachricht muss mindestens 10 Zeichen haben',
        messageTooLong: 'Nachricht ist zu lang'
      },
      whatsapp: {
        title: 'Bewerbung - Arbeiten Sie mit uns',
        name: 'Name',
        phone: 'Telefon',
        email: 'E-Mail',
        role: 'Position',
        interestArea: 'Interessensgebiet',
        message: 'Nachricht'
      }
    },
    auth: {
      adminArea: 'Administrationsbereich',
      accessPanel: 'Zugang zum Blog-Verwaltungspanel',
      login: 'Anmelden',
      signup: 'Registrieren',
      email: 'E-Mail',
      emailPlaceholder: 'ihre@email.com',
      password: 'Passwort',
      passwordPlaceholder: '••••••••',
      fullName: 'Vollständiger Name',
      fullNamePlaceholder: 'Ihr Name',
      confirmPassword: 'Passwort bestätigen',
      loggingIn: 'Anmelden...',
      signingUp: 'Registrieren...',
      backToSite: '← Zurück zur Website',
      loginSuccess: 'Erfolgreich angemeldet!',
      accountCreated: 'Konto erfolgreich erstellt!',
      invalidCredentials: 'Ungültige E-Mail oder Passwort',
      loginError: 'Anmeldefehler. Bitte versuchen Sie es erneut.',
      emailAlreadyRegistered: 'Diese E-Mail ist bereits registriert',
      signupError: 'Fehler beim Erstellen des Kontos. Bitte versuchen Sie es erneut.',
      validation: {
        emailInvalid: 'Ungültige E-Mail',
        passwordMin: 'Das Passwort muss mindestens 6 Zeichen haben',
        nameMin: 'Der Name muss mindestens 2 Zeichen haben',
        passwordsDoNotMatch: 'Passwörter stimmen nicht überein'
      }
    },
    admin: {
      panel: 'Administrationsbereich',
      blogManagement: 'Blog-Verwaltung',
      site: 'Website',
      logout: 'Abmelden',
      totalPosts: 'Gesamte Beiträge',
      published: 'veröffentlicht',
      categories: 'Kategorien',
      categoriesCreated: 'Kategorien erstellt',
      drafts: 'Entwürfe',
      awaitingPublication: 'warten auf Veröffentlichung',
      posts: 'Beiträge',
      blogPosts: 'Blog-Beiträge',
      manageArticles: 'Veröffentlichte Artikel verwalten',
      newPost: 'Neuer Beitrag',
      noPostsFound: 'Keine Beiträge gefunden. Erstellen Sie Ihren ersten Artikel!',
      title: 'Titel',
      category: 'Kategorie',
      status: 'Status',
      date: 'Datum',
      actions: 'Aktionen',
      publishedStatus: 'Veröffentlicht',
      draftStatus: 'Entwurf',
      deletePost: 'Beitrag löschen?',
      deletePostDesc: 'Diese Aktion kann nicht rückgängig gemacht werden. Der Beitrag wird dauerhaft gelöscht.',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      organizeByCategory: 'Beiträge nach Kategorie organisieren',
      newCategory: 'Neue Kategorie',
      noCategoriesFound: 'Keine Kategorien gefunden. Erstellen Sie Ihre erste Kategorie!',
      name: 'Name',
      slug: 'Slug',
      deleteCategory: 'Kategorie löschen?',
      deleteCategoryDesc: 'Diese Aktion kann nicht rückgängig gemacht werden. Verknüpfte Beiträge werden ohne Kategorie bleiben.',
      accessDenied: 'Zugriff verweigert',
      accessDeniedDesc: 'Sie haben keine Berechtigung, auf diese Seite zuzugreifen. Kontaktieren Sie den Administrator.',
      backToSite: 'Zurück zur Website',
      loadError: 'Fehler beim Laden der Beiträge',
      deleteError: 'Fehler beim Löschen des Beitrags',
      deleteSuccess: 'Beitrag erfolgreich gelöscht',
      deleteCategoryError: 'Fehler beim Löschen der Kategorie',
      deleteCategorySuccess: 'Kategorie erfolgreich gelöscht',
      back: 'Zurück',
      editPost: 'Beitrag bearbeiten',
      newPostTitle: 'Neuer Beitrag',
      save: 'Speichern',
      saving: 'Speichern...',
      preview: 'Vorschau',
      importFromUrl: 'Von URL importieren',
      importFromUrlDesc: 'Fügen Sie einen Artikellink ein, um automatisch mit KI auszufüllen',
      importPlaceholder: 'https://beispiel.com/artikel',
      importing: 'Importieren...',
      import: 'Importieren',
      content: 'Inhalt',
      titleRequired: 'Titel *',
      titlePlaceholder: 'Artikeltitel',
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: 'artikel-titel',
      excerpt: 'Auszug',
      excerptPlaceholder: 'Kurze Zusammenfassung des Artikels (erscheint in der Liste)',
      characters: 'Zeichen',
      contentRequired: 'Inhalt *',
      contentPlaceholder: 'Schreiben Sie den Artikelinhalt... (unterstützt HTML)',
      htmlHint: 'Sie können HTML zur Formatierung verwenden (h2, h3, p, ul, li, strong, em, a, etc.)',
      featuredImage: 'Hauptbild',
      uploadImage: 'Bild hochladen',
      orPasteUrl: 'Oder URL einfügen',
      organization: 'Organisation',
      selectCategory: 'Kategorie auswählen',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'Recht, Gesetzgebung, Gericht',
      tagsSeparator: 'Tags mit Komma trennen',
      seo: 'SEO',
      metaTitle: 'Meta-Titel',
      metaTitlePlaceholder: 'Titel für Suchmaschinen',
      metaTitleHint: 'Max. 60 Zeichen. Leer lassen, um den Titel zu verwenden.',
      metaDescription: 'Meta-Beschreibung',
      metaDescriptionPlaceholder: 'Beschreibung für Suchmaschinen',
      metaDescriptionHint: 'Max. 160 Zeichen. Leer lassen, um den Auszug zu verwenden.',
      editCategory: 'Kategorie bearbeiten',
      newCategoryTitle: 'Neue Kategorie',
      categoryDetails: 'Kategoriedetails',
      categoryName: 'Name *',
      categoryNamePlaceholder: 'Kategoriename',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: 'kategorie-name',
      categoryDescription: 'Beschreibung',
      categoryDescriptionPlaceholder: 'Kategoriebeschreibung (optional)',
      postUpdated: 'Beitrag erfolgreich aktualisiert',
      postCreated: 'Beitrag erfolgreich erstellt',
      postUpdateError: 'Fehler beim Aktualisieren des Beitrags',
      postCreateError: 'Fehler beim Erstellen des Beitrags',
      slugExists: 'Ein Beitrag mit diesem Slug existiert bereits',
      categoryUpdated: 'Kategorie erfolgreich aktualisiert',
      categoryCreated: 'Kategorie erfolgreich erstellt',
      categoryUpdateError: 'Fehler beim Aktualisieren der Kategorie',
      categoryCreateError: 'Fehler beim Erstellen der Kategorie',
      categorySlugExists: 'Eine Kategorie mit diesem Namen oder Slug existiert bereits',
      importSuccess: 'Inhalt erfolgreich importiert! Vor der Veröffentlichung überprüfen.',
      importError: 'Fehler beim Importieren des Inhalts',
      enterUrlToImport: 'Geben Sie eine URL zum Importieren ein',
      loadPostError: 'Fehler beim Laden des Beitrags',
      loadCategoryError: 'Fehler beim Laden der Kategorie',
      imageUploadError: 'Fehler beim Hochladen des Bildes',
      imageUploadSuccess: 'Bild erfolgreich hochgeladen',
      generateTranslations: 'Übersetzungen Generieren',
      translating: 'Übersetzen...',
      translationsGenerated: 'Übersetzungen erfolgreich generiert!',
      translationError: 'Fehler beim Generieren der Übersetzungen',
      saveBeforeTranslating: 'Speichern Sie den Beitrag vor dem Übersetzen',
      validation: {
        titleMin: 'Der Titel muss mindestens 3 Zeichen haben',
        titleMax: 'Titel zu lang',
        slugMin: 'Der Slug muss mindestens 3 Zeichen haben',
        slugMax: 'Slug zu lang',
        excerptMax: 'Der Auszug darf maximal 300 Zeichen haben',
        contentMin: 'Der Inhalt muss mindestens 10 Zeichen haben',
        metaTitleMax: 'Der Meta-Titel darf maximal 60 Zeichen haben',
        metaDescriptionMax: 'Die Meta-Beschreibung darf maximal 160 Zeichen haben',
        categoryNameMin: 'Der Name muss mindestens 2 Zeichen haben',
        categoryNameMax: 'Name zu lang',
        categorySlugMin: 'Der Slug muss mindestens 2 Zeichen haben',
        categorySlugMax: 'Slug zu lang',
        categoryDescriptionMax: 'Die Beschreibung darf maximal 200 Zeichen haben'
      }
    }
  },
  it: {
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      areas: 'Aree di Pratica',
      lawyers: 'Avvocati',
      contact: 'Contatto',
      blog: 'Blog',
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
      prev: 'Precedente',
      next: 'Successivo',
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
      intro: 'Conosci i partner che guidano MOTA & AVVOCATI ASSOCIATI con eccellenza e impegno.',
      swipeHint: '← Scorri per navigare →',
      prev: 'Precedente',
      next: 'Successivo'
    },
    contact: {
      title: 'Posizione',
      subtitle: 'Visita il nostro ufficio a Porto Alegre.',
      parkingText: 'Opzione di parcheggio per accedere allo studio',
      parkingLinkText: 'mappa del parcheggio',
      formTitle: 'Contatto',
      formSubtitle: 'Compila il modulo e ti contatteremo al più presto',
      fields: {
        fullNameLabel: 'Nome completo',
        fullNamePlaceholder: 'Il tuo nome completo',
        cpfLabel: 'CPF (Codice Fiscale Brasiliano)',
        cpfPlaceholder: '000.000.000-00',
        phoneLabel: 'Telefono',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: 'Email',
        emailPlaceholder: 'tuo@email.com',
        processNumberLabelOptional: 'Numero pratica (opzionale)',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: 'Messaggio',
        messagePlaceholder: 'Descrivi come possiamo aiutarti...'
      },
      submit: 'Invia messaggio',
      submitting: 'Invio in corso...',
      toastSuccessTitle: 'Messaggio inviato!',
      toastSuccessDescription: 'Ti contatteremo presto.',
      toastValidationErrorTitle: 'Errore di convalida',
      toastGenericErrorTitle: 'Errore',
      toastGenericErrorDescription: 'Si è verificato un errore durante l invio del messaggio. Riprova.',
      validation: {
        nameRequired: 'Il nome è obbligatorio',
        nameTooLong: 'Nome troppo lungo',
        emailInvalid: 'Email non valida',
        emailTooLong: 'Email troppo lunga',
        phoneRequired: 'Il telefono è obbligatorio',
        phoneTooLong: 'Telefono troppo lungo',
        cpfRequired: 'Il CPF è obbligatorio',
        cpfInvalid: 'CPF non valido',
        processNumberTooLong: 'Numero pratica troppo lungo',
        messageTooShort: 'Il messaggio deve avere almeno 10 caratteri',
        messageTooLong: 'Messaggio troppo lungo'
      }
    },
    processConsultation: {
      title: 'Verifica il Tuo Caso',
      description: 'Inserisci il numero del caso e ricevi aggiornamenti in pochi minuti.',
      processNumberPlaceholder: 'Numero del caso (es: 0000000-00.0000.0.00.0000)',
      fullNamePlaceholder: 'Nome completo',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: 'Per favore, compila tutti i campi obbligatori',
      emailPlaceholder: 'La tua email migliore',
      submitButton: 'Ricevi via Email',
      whatsappButton: 'Verifica via WhatsApp',
      sending: 'Invio in corso...',
      success: 'Richiesta Inviata!',
      successMessage: 'Riceverai l aggiornamento del caso via email a breve.',
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
      rights: 'Tutti i diritti riservati.',
      socialMedia: 'Social Media',
      workWithUs: 'Lavora Con Noi',
      rateUs: 'Valutaci'
    },
    cookies: {
      title: 'Politica dei Cookie',
      message: 'Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando a navigare, accetti la nostra politica sulla privacy.',
      accept: 'Accetta',
      decline: 'Rifiuta'
    },
    blog: {
      title: 'Blog Legale',
      subtitle: 'Articoli, notizie e analisi sui cambiamenti più recenti nella legislazione e giurisprudenza brasiliana.',
      searchPlaceholder: 'Cerca articoli...',
      all: 'Tutti',
      filterByTag: 'Filtra per tag',
      allTags: 'Tutti i tag',
      clear: 'Cancella',
      noArticles: 'Nessun articolo trovato.',
      readMore: 'Leggi di più',
      backToBlog: 'Torna al Blog',
      share: 'Condividi',
      minRead: 'min di lettura',
      tags: 'Tag',
      articleNotFound: 'Articolo non trovato',
      articleNotFoundDesc: "L'articolo che stai cercando non esiste o è stato rimosso.",
      linkCopied: 'Link copiato negli appunti!'
    },
    avalie: {
      heroTitle: 'La tua opinione è importante',
      heroSubtitle: 'Aiutaci a continuare a offrire servizi legali di eccellenza',
      cardTitle: 'Valuta la nostra esperienza',
      cardSubtitle: 'Condividi la tua esperienza con i nostri servizi su Google',
      note: 'La tua recensione ci aiuta a migliorare continuamente i nostri servizi e a raggiungere più clienti che hanno bisogno di assistenza legale di qualità.',
      cta: 'Lascia una recensione',
      disclaimer: 'Sarai reindirizzato a Google Business',
      footerLine: 'Eccellenza nei servizi legali da oltre 20 anni'
    },
    trabalheConosco: {
      heroTitle: 'Lavora con noi',
      heroSubtitle: 'Unisciti a noi e costruisci il futuro dell’avvocatura con etica, innovazione e impegno per i risultati.',
      whyTitle: 'Perché lavorare con noi?',
      benefits: {
        collaborativeTitle: 'Ambiente collaborativo',
        collaborativeDesc: 'Lavora in un team che valorizza la collaborazione e lo sviluppo professionale.',
        challengingTitle: 'Casi impegnativi',
        challengingDesc: 'Partecipa a casi complessi e rilevanti in diverse aree del diritto.',
        growthTitle: 'Crescita professionale',
        growthDesc: 'Sviluppa la tua carriera in uno studio con tradizione ed eccellenza giuridica.'
      },
      formTitle: 'Invia la tua candidatura',
      fields: {
        nameLabel: 'Nome completo',
        namePlaceholder: 'Il tuo nome completo',
        emailLabel: 'Email',
        emailPlaceholder: 'tua@email.com',
        phoneLabel: 'Telefono',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: 'Ruolo',
        rolePlaceholder: 'Seleziona il ruolo desiderato',
        interestAreaLabel: 'Area di interesse',
        interestAreaPlaceholder: 'Es: Diritto Civile, Diritto del Lavoro, ecc.',
        messageLabel: 'Messaggio / Esperienza professionale',
        messagePlaceholder: 'Raccontaci la tua esperienza e perché vuoi lavorare con noi...'
      },
      roles: {
        intern: 'Stagista',
        adminAssistant: 'Assistente amministrativo',
        lawyer: 'Avvocato',
        correspondentLawyer: 'Avvocato corrispondente',
        partnerLawyer: 'Avvocato partner'
      },
      resumeBox: {
        title: 'Invio del CV',
        description: 'Dopo aver inviato questo modulo, verrai reindirizzato a WhatsApp dove potrai allegare il tuo CV.'
      },
      submit: 'Invia',
      submitting: 'Invio in corso...',
      backHome: 'Torna alla Home',
      toastSuccessTitle: 'Candidatura inviata!',
      toastSuccessDescription: 'Ti contatteremo a breve.',
      toastValidationErrorTitle: 'Errore di validazione',
      toastGenericErrorTitle: 'Errore',
      toastGenericErrorDescription: 'Si è verificato un errore durante l’invio della candidatura. Riprova.',
      validation: {
        nameRequired: 'Il nome è obbligatorio',
        nameTooLong: 'Nome troppo lungo',
        emailInvalid: 'Email non valida',
        emailTooLong: 'Email troppo lunga',
        phoneRequired: 'Il telefono è obbligatorio',
        phoneTooLong: 'Telefono troppo lungo',
        roleRequired: 'Il ruolo è obbligatorio',
        interestAreaRequired: 'L’area di interesse è obbligatoria',
        messageTooShort: 'Il messaggio deve avere almeno 10 caratteri',
        messageTooLong: 'Messaggio troppo lungo'
      },
      whatsapp: {
        title: 'Candidatura - Lavora con noi',
        name: 'Nome',
        phone: 'Telefono',
        email: 'Email',
        role: 'Ruolo',
        interestArea: 'Area di interesse',
        message: 'Messaggio'
      }
    },
    auth: {
      adminArea: 'Area Amministrativa',
      accessPanel: 'Accedi al pannello di gestione del blog',
      login: 'Accedi',
      signup: 'Registrati',
      email: 'Email',
      emailPlaceholder: 'tua@email.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      fullName: 'Nome completo',
      fullNamePlaceholder: 'Il tuo nome',
      confirmPassword: 'Conferma password',
      loggingIn: 'Accesso in corso...',
      signingUp: 'Registrazione in corso...',
      backToSite: '← Torna al sito',
      loginSuccess: 'Accesso effettuato con successo!',
      accountCreated: 'Account creato con successo!',
      invalidCredentials: 'Email o password non validi',
      loginError: "Errore durante l'accesso. Riprova.",
      emailAlreadyRegistered: 'Questa email è già registrata',
      signupError: "Errore durante la creazione dell'account. Riprova.",
      validation: {
        emailInvalid: 'Email non valida',
        passwordMin: 'La password deve avere almeno 6 caratteri',
        nameMin: 'Il nome deve avere almeno 2 caratteri',
        passwordsDoNotMatch: 'Le password non corrispondono'
      }
    },
    admin: {
      panel: 'Pannello Amministrativo',
      blogManagement: 'Gestione Blog',
      site: 'Sito',
      logout: 'Esci',
      totalPosts: 'Post Totali',
      published: 'pubblicati',
      categories: 'Categorie',
      categoriesCreated: 'categorie create',
      drafts: 'Bozze',
      awaitingPublication: 'in attesa di pubblicazione',
      posts: 'Post',
      blogPosts: 'Post del Blog',
      manageArticles: 'Gestisci gli articoli pubblicati',
      newPost: 'Nuovo Post',
      noPostsFound: 'Nessun post trovato. Crea il tuo primo articolo!',
      title: 'Titolo',
      category: 'Categoria',
      status: 'Stato',
      date: 'Data',
      actions: 'Azioni',
      publishedStatus: 'Pubblicato',
      draftStatus: 'Bozza',
      deletePost: 'Eliminare il post?',
      deletePostDesc: 'Questa azione non può essere annullata. Il post verrà eliminato permanentemente.',
      cancel: 'Annulla',
      delete: 'Elimina',
      organizeByCategory: 'Organizza i post per categoria',
      newCategory: 'Nuova Categoria',
      noCategoriesFound: 'Nessuna categoria trovata. Crea la tua prima categoria!',
      name: 'Nome',
      slug: 'Slug',
      deleteCategory: 'Eliminare la categoria?',
      deleteCategoryDesc: 'Questa azione non può essere annullata. I post collegati rimarranno senza categoria.',
      accessDenied: 'Accesso Negato',
      accessDeniedDesc: "Non hai il permesso di accedere a questa pagina. Contatta l'amministratore.",
      backToSite: 'Torna al Sito',
      loadError: 'Errore nel caricamento dei post',
      deleteError: "Errore nell'eliminazione del post",
      deleteSuccess: 'Post eliminato con successo',
      deleteCategoryError: "Errore nell'eliminazione della categoria",
      deleteCategorySuccess: 'Categoria eliminata con successo',
      back: 'Indietro',
      editPost: 'Modifica Post',
      newPostTitle: 'Nuovo Post',
      save: 'Salva',
      saving: 'Salvataggio...',
      preview: 'Anteprima',
      importFromUrl: 'Importa da URL',
      importFromUrlDesc: "Incolla un link di un articolo per compilare automaticamente con l'IA",
      importPlaceholder: 'https://esempio.com/articolo',
      importing: 'Importazione...',
      import: 'Importa',
      content: 'Contenuto',
      titleRequired: 'Titolo *',
      titlePlaceholder: "Titolo dell'articolo",
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: 'titolo-articolo',
      excerpt: 'Estratto',
      excerptPlaceholder: "Breve riassunto dell'articolo (appare nell'elenco)",
      characters: 'caratteri',
      contentRequired: 'Contenuto *',
      contentPlaceholder: "Scrivi il contenuto dell'articolo... (supporta HTML)",
      htmlHint: 'Puoi usare HTML per la formattazione (h2, h3, p, ul, li, strong, em, a, ecc.)',
      featuredImage: 'Immagine in Evidenza',
      uploadImage: 'Carica immagine',
      orPasteUrl: "Oppure incolla l'URL",
      organization: 'Organizzazione',
      selectCategory: 'Seleziona una categoria',
      tagsLabel: 'Tag',
      tagsPlaceholder: 'diritto, legislazione, tribunale',
      tagsSeparator: 'Separa i tag con virgola',
      seo: 'SEO',
      metaTitle: 'Meta Titolo',
      metaTitlePlaceholder: 'Titolo per i motori di ricerca',
      metaTitleHint: 'Max. 60 caratteri. Lascia vuoto per usare il titolo.',
      metaDescription: 'Meta Descrizione',
      metaDescriptionPlaceholder: 'Descrizione per i motori di ricerca',
      metaDescriptionHint: "Max. 160 caratteri. Lascia vuoto per usare l'estratto.",
      editCategory: 'Modifica Categoria',
      newCategoryTitle: 'Nuova Categoria',
      categoryDetails: 'Dettagli Categoria',
      categoryName: 'Nome *',
      categoryNamePlaceholder: 'Nome della categoria',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: 'nome-categoria',
      categoryDescription: 'Descrizione',
      categoryDescriptionPlaceholder: 'Descrizione della categoria (opzionale)',
      postUpdated: 'Post aggiornato con successo',
      postCreated: 'Post creato con successo',
      postUpdateError: "Errore nell'aggiornamento del post",
      postCreateError: 'Errore nella creazione del post',
      slugExists: 'Esiste già un post con questo slug',
      categoryUpdated: 'Categoria aggiornata con successo',
      categoryCreated: 'Categoria creata con successo',
      categoryUpdateError: "Errore nell'aggiornamento della categoria",
      categoryCreateError: 'Errore nella creazione della categoria',
      categorySlugExists: 'Esiste già una categoria con questo nome o slug',
      importSuccess: 'Contenuto importato con successo! Rivedi prima di pubblicare.',
      importError: "Errore nell'importazione del contenuto",
      enterUrlToImport: 'Inserisci un URL da importare',
      loadPostError: 'Errore nel caricamento del post',
      loadCategoryError: 'Errore nel caricamento della categoria',
      imageUploadError: "Errore nel caricamento dell'immagine",
      imageUploadSuccess: 'Immagine caricata con successo',
      generateTranslations: 'Genera Traduzioni',
      translating: 'Traducendo...',
      translationsGenerated: 'Traduzioni generate con successo!',
      translationError: 'Errore nella generazione delle traduzioni',
      saveBeforeTranslating: 'Salva il post prima di generare le traduzioni',
      validation: {
        titleMin: 'Il titolo deve avere almeno 3 caratteri',
        titleMax: 'Titolo troppo lungo',
        slugMin: 'Lo slug deve avere almeno 3 caratteri',
        slugMax: 'Slug troppo lungo',
        excerptMax: "L'estratto deve avere massimo 300 caratteri",
        contentMin: 'Il contenuto deve avere almeno 10 caratteri',
        metaTitleMax: 'Il meta titolo deve avere massimo 60 caratteri',
        metaDescriptionMax: 'La meta descrizione deve avere massimo 160 caratteri',
        categoryNameMin: 'Il nome deve avere almeno 2 caratteri',
        categoryNameMax: 'Nome troppo lungo',
        categorySlugMin: 'Lo slug deve avere almeno 2 caratteri',
        categorySlugMax: 'Slug troppo lungo',
        categoryDescriptionMax: 'La descrizione deve avere massimo 200 caratteri'
      }
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      areas: 'Domaines de Pratique',
      lawyers: 'Avocats',
      contact: 'Contact',
      blog: 'Blog',
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
      prev: 'Précédent',
      next: 'Suivant',
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
      intro: 'Rencontrez les associés qui dirigent MOTA & AVOCATS ASSOCIÉS avec excellence et engagement.',
      swipeHint: '← Glissez pour naviguer →',
      prev: 'Précédent',
      next: 'Suivant'
    },
    contact: {
      title: 'Emplacement',
      subtitle: 'Visitez notre bureau à Porto Alegre.',
      parkingText: 'Option de parking pour accéder au cabinet',
      parkingLinkText: 'plan du parking',
      formTitle: 'Contact',
      formSubtitle: 'Remplissez le formulaire et nous vous contacterons dès que possible',
      fields: {
        fullNameLabel: 'Nom complet',
        fullNamePlaceholder: 'Votre nom complet',
        cpfLabel: 'CPF (Numéro Fiscal Brésilien)',
        cpfPlaceholder: '000.000.000-00',
        phoneLabel: 'Téléphone',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        processNumberLabelOptional: 'Numéro de dossier (optionnel)',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: 'Message',
        messagePlaceholder: 'Décrivez comment nous pouvons vous aider...'
      },
      submit: 'Envoyer le message',
      submitting: 'Envoi en cours...',
      toastSuccessTitle: 'Message envoyé !',
      toastSuccessDescription: 'Nous vous contacterons bientôt.',
      toastValidationErrorTitle: 'Erreur de validation',
      toastGenericErrorTitle: 'Erreur',
      toastGenericErrorDescription: 'Une erreur est survenue lors de l envoi de votre message. Veuillez réessayer.',
      validation: {
        nameRequired: 'Le nom est obligatoire',
        nameTooLong: 'Nom trop long',
        emailInvalid: 'Email invalide',
        emailTooLong: 'Email trop long',
        phoneRequired: 'Le téléphone est obligatoire',
        phoneTooLong: 'Téléphone trop long',
        cpfRequired: 'Le CPF est obligatoire',
        cpfInvalid: 'CPF invalide',
        processNumberTooLong: 'Numéro de dossier trop long',
        messageTooShort: 'Le message doit contenir au moins 10 caractères',
        messageTooLong: 'Message trop long'
      }
    },
    processConsultation: {
      title: 'Vérifiez Votre Dossier',
      description: 'Entrez le numéro du dossier et recevez des mises à jour en quelques minutes.',
      processNumberPlaceholder: 'Numéro de dossier (ex: 0000000-00.0000.0.00.0000)',
      fullNamePlaceholder: 'Nom complet',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: 'Veuillez remplir tous les champs obligatoires',
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
      rights: 'Tous droits réservés.',
      socialMedia: 'Réseaux Sociaux',
      workWithUs: 'Travaillez Avec Nous',
      rateUs: 'Évaluez-nous'
    },
    cookies: {
      title: 'Politique de Cookies',
      message: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre politique de confidentialité.',
      accept: 'Accepter',
      decline: 'Refuser'
    },
    blog: {
      title: 'Blog Juridique',
      subtitle: 'Articles, actualités et analyses sur les dernières évolutions de la législation et jurisprudence brésilienne.',
      searchPlaceholder: 'Rechercher des articles...',
      all: 'Tous',
      filterByTag: 'Filtrer par tag',
      allTags: 'Tous les tags',
      clear: 'Effacer',
      noArticles: 'Aucun article trouvé.',
      readMore: 'Lire la suite',
      backToBlog: 'Retour au Blog',
      share: 'Partager',
      minRead: 'min de lecture',
      tags: 'Tags',
      articleNotFound: 'Article non trouvé',
      articleNotFoundDesc: "L'article que vous recherchez n'existe pas ou a été supprimé.",
      linkCopied: 'Lien copié dans le presse-papiers !'
    },
    avalie: {
      heroTitle: 'Votre avis compte',
      heroSubtitle: 'Aidez-nous à continuer d’offrir des services juridiques d’excellence',
      cardTitle: 'Évaluez notre expérience',
      cardSubtitle: 'Partagez votre expérience avec nos services sur Google',
      note: 'Votre avis nous aide à améliorer continuellement nos services et à toucher davantage de clients qui ont besoin d’un accompagnement juridique de qualité.',
      cta: 'Laisser un avis',
      disclaimer: 'Vous serez redirigé vers Google Business',
      footerLine: 'Excellence des services juridiques depuis plus de 20 ans'
    },
    trabalheConosco: {
      heroTitle: 'Travailler avec nous',
      heroSubtitle: 'Rejoignez-nous et construisez l’avenir de la profession avec éthique, innovation et engagement pour les résultats.',
      whyTitle: 'Pourquoi travailler avec nous ?',
      benefits: {
        collaborativeTitle: 'Environnement collaboratif',
        collaborativeDesc: 'Travaillez dans une équipe qui valorise la collaboration et le développement professionnel.',
        challengingTitle: 'Dossiers stimulants',
        challengingDesc: 'Participez à des dossiers complexes et pertinents dans diverses branches du droit.',
        growthTitle: 'Évolution professionnelle',
        growthDesc: 'Développez votre carrière dans un cabinet avec tradition et excellence juridique.'
      },
      formTitle: 'Envoyer votre candidature',
      fields: {
        nameLabel: 'Nom complet',
        namePlaceholder: 'Votre nom complet',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        phoneLabel: 'Téléphone',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: 'Poste',
        rolePlaceholder: 'Sélectionnez le poste souhaité',
        interestAreaLabel: 'Domaine d’intérêt',
        interestAreaPlaceholder: 'Ex : Droit civil, Droit du travail, etc.',
        messageLabel: 'Message / Expérience professionnelle',
        messagePlaceholder: 'Parlez-nous de votre expérience et pourquoi vous souhaitez travailler avec nous...'
      },
      roles: {
        intern: 'Stagiaire',
        adminAssistant: 'Assistant administratif',
        lawyer: 'Avocat',
        correspondentLawyer: 'Avocat correspondant',
        partnerLawyer: 'Avocat partenaire'
      },
      resumeBox: {
        title: 'Envoi du CV',
        description: 'Après l’envoi de ce formulaire, vous serez redirigé vers WhatsApp où vous pourrez joindre votre CV.'
      },
      submit: 'Envoyer',
      submitting: 'Envoi...',
      backHome: 'Retour à l’accueil',
      toastSuccessTitle: 'Candidature envoyée !',
      toastSuccessDescription: 'Nous vous contacterons bientôt.',
      toastValidationErrorTitle: 'Erreur de validation',
      toastGenericErrorTitle: 'Erreur',
      toastGenericErrorDescription: 'Une erreur est survenue lors de l’envoi de votre candidature. Veuillez réessayer.',
      validation: {
        nameRequired: 'Le nom est obligatoire',
        nameTooLong: 'Nom trop long',
        emailInvalid: 'Email invalide',
        emailTooLong: 'Email trop long',
        phoneRequired: 'Le téléphone est obligatoire',
        phoneTooLong: 'Téléphone trop long',
        roleRequired: 'Le poste est obligatoire',
        interestAreaRequired: 'Le domaine d’intérêt est obligatoire',
        messageTooShort: 'Le message doit contenir au moins 10 caractères',
        messageTooLong: 'Message trop long'
      },
      whatsapp: {
        title: 'Candidature - Travailler avec nous',
        name: 'Nom',
        phone: 'Téléphone',
        email: 'Email',
        role: 'Poste',
        interestArea: 'Domaine d’intérêt',
        message: 'Message'
      }
    },
    auth: {
      adminArea: 'Zone Administrative',
      accessPanel: 'Accéder au panneau de gestion du blog',
      login: 'Connexion',
      signup: "S'inscrire",
      email: 'Email',
      emailPlaceholder: 'votre@email.com',
      password: 'Mot de passe',
      passwordPlaceholder: '••••••••',
      fullName: 'Nom complet',
      fullNamePlaceholder: 'Votre nom',
      confirmPassword: 'Confirmer le mot de passe',
      loggingIn: 'Connexion en cours...',
      signingUp: 'Inscription en cours...',
      backToSite: '← Retour au site',
      loginSuccess: 'Connexion réussie !',
      accountCreated: 'Compte créé avec succès !',
      invalidCredentials: 'Email ou mot de passe invalide',
      loginError: 'Erreur de connexion. Veuillez réessayer.',
      emailAlreadyRegistered: 'Cet email est déjà enregistré',
      signupError: 'Erreur lors de la création du compte. Veuillez réessayer.',
      validation: {
        emailInvalid: 'Email invalide',
        passwordMin: 'Le mot de passe doit avoir au moins 6 caractères',
        nameMin: 'Le nom doit avoir au moins 2 caractères',
        passwordsDoNotMatch: 'Les mots de passe ne correspondent pas'
      }
    },
    admin: {
      panel: 'Panneau Administratif',
      blogManagement: 'Gestion du Blog',
      site: 'Site',
      logout: 'Déconnexion',
      totalPosts: 'Total des Posts',
      published: 'publiés',
      categories: 'Catégories',
      categoriesCreated: 'catégories créées',
      drafts: 'Brouillons',
      awaitingPublication: 'en attente de publication',
      posts: 'Posts',
      blogPosts: 'Posts du Blog',
      manageArticles: 'Gérer les articles publiés',
      newPost: 'Nouveau Post',
      noPostsFound: 'Aucun post trouvé. Créez votre premier article !',
      title: 'Titre',
      category: 'Catégorie',
      status: 'Statut',
      date: 'Date',
      actions: 'Actions',
      publishedStatus: 'Publié',
      draftStatus: 'Brouillon',
      deletePost: 'Supprimer le post ?',
      deletePostDesc: 'Cette action ne peut pas être annulée. Le post sera définitivement supprimé.',
      cancel: 'Annuler',
      delete: 'Supprimer',
      organizeByCategory: 'Organiser les posts par catégorie',
      newCategory: 'Nouvelle Catégorie',
      noCategoriesFound: 'Aucune catégorie trouvée. Créez votre première catégorie !',
      name: 'Nom',
      slug: 'Slug',
      deleteCategory: 'Supprimer la catégorie ?',
      deleteCategoryDesc: 'Cette action ne peut pas être annulée. Les posts liés resteront sans catégorie.',
      accessDenied: 'Accès Refusé',
      accessDeniedDesc: "Vous n'avez pas la permission d'accéder à cette page. Contactez l'administrateur.",
      backToSite: 'Retour au Site',
      loadError: 'Erreur lors du chargement des posts',
      deleteError: 'Erreur lors de la suppression du post',
      deleteSuccess: 'Post supprimé avec succès',
      deleteCategoryError: 'Erreur lors de la suppression de la catégorie',
      deleteCategorySuccess: 'Catégorie supprimée avec succès',
      back: 'Retour',
      editPost: 'Modifier le Post',
      newPostTitle: 'Nouveau Post',
      save: 'Enregistrer',
      saving: 'Enregistrement...',
      preview: 'Aperçu',
      importFromUrl: "Importer depuis l'URL",
      importFromUrlDesc: "Collez un lien d'article pour remplir automatiquement avec l'IA",
      importPlaceholder: 'https://exemple.com/article',
      importing: 'Importation...',
      import: 'Importer',
      content: 'Contenu',
      titleRequired: 'Titre *',
      titlePlaceholder: "Titre de l'article",
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: 'titre-de-larticle',
      excerpt: 'Extrait',
      excerptPlaceholder: "Bref résumé de l'article (apparaît dans la liste)",
      characters: 'caractères',
      contentRequired: 'Contenu *',
      contentPlaceholder: "Écrivez le contenu de l'article... (supporte HTML)",
      htmlHint: 'Vous pouvez utiliser HTML pour le formatage (h2, h3, p, ul, li, strong, em, a, etc.)',
      featuredImage: 'Image à la Une',
      uploadImage: 'Télécharger une image',
      orPasteUrl: "Ou collez l'URL",
      organization: 'Organisation',
      selectCategory: 'Sélectionner une catégorie',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'droit, législation, tribunal',
      tagsSeparator: 'Séparez les tags par une virgule',
      seo: 'SEO',
      metaTitle: 'Meta Titre',
      metaTitlePlaceholder: 'Titre pour les moteurs de recherche',
      metaTitleHint: 'Max. 60 caractères. Laissez vide pour utiliser le titre.',
      metaDescription: 'Meta Description',
      metaDescriptionPlaceholder: 'Description pour les moteurs de recherche',
      metaDescriptionHint: "Max. 160 caractères. Laissez vide pour utiliser l'extrait.",
      editCategory: 'Modifier la Catégorie',
      newCategoryTitle: 'Nouvelle Catégorie',
      categoryDetails: 'Détails de la Catégorie',
      categoryName: 'Nom *',
      categoryNamePlaceholder: 'Nom de la catégorie',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: 'nom-de-la-categorie',
      categoryDescription: 'Description',
      categoryDescriptionPlaceholder: 'Description de la catégorie (optionnel)',
      postUpdated: 'Post mis à jour avec succès',
      postCreated: 'Post créé avec succès',
      postUpdateError: 'Erreur lors de la mise à jour du post',
      postCreateError: 'Erreur lors de la création du post',
      slugExists: 'Un post avec ce slug existe déjà',
      categoryUpdated: 'Catégorie mise à jour avec succès',
      categoryCreated: 'Catégorie créée avec succès',
      categoryUpdateError: 'Erreur lors de la mise à jour de la catégorie',
      categoryCreateError: 'Erreur lors de la création de la catégorie',
      categorySlugExists: 'Une catégorie avec ce nom ou slug existe déjà',
      importSuccess: 'Contenu importé avec succès ! Vérifiez avant de publier.',
      importError: "Erreur lors de l'importation du contenu",
      enterUrlToImport: 'Entrez une URL à importer',
      loadPostError: 'Erreur lors du chargement du post',
      loadCategoryError: 'Erreur lors du chargement de la catégorie',
      imageUploadError: "Erreur lors du téléchargement de l'image",
      imageUploadSuccess: 'Image téléchargée avec succès',
      generateTranslations: 'Générer les Traductions',
      translating: 'Traduction en cours...',
      translationsGenerated: 'Traductions générées avec succès !',
      translationError: 'Erreur lors de la génération des traductions',
      saveBeforeTranslating: 'Enregistrez le post avant de générer les traductions',
      validation: {
        titleMin: 'Le titre doit avoir au moins 3 caractères',
        titleMax: 'Titre trop long',
        slugMin: 'Le slug doit avoir au moins 3 caractères',
        slugMax: 'Slug trop long',
        excerptMax: "L'extrait doit avoir max 300 caractères",
        contentMin: 'Le contenu doit avoir au moins 10 caractères',
        metaTitleMax: 'Le meta titre doit avoir max 60 caractères',
        metaDescriptionMax: 'La meta description doit avoir max 160 caractères',
        categoryNameMin: 'Le nom doit avoir au moins 2 caractères',
        categoryNameMax: 'Nom trop long',
        categorySlugMin: 'Le slug doit avoir au moins 2 caractères',
        categorySlugMax: 'Slug trop long',
        categoryDescriptionMax: 'La description doit avoir max 200 caractères'
      }
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      areas: '业务领域',
      lawyers: '律师团队',
      contact: '联系我们',
      blog: '博客',
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
      prev: '上一页',
      next: '下一页',
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
      intro: '认识以卓越和承诺领导莫塔律师事务所的合伙人。',
      swipeHint: '← 滑动浏览 →',
      prev: '上一页',
      next: '下一页'
    },
    contact: {
      title: '地址',
      subtitle: '欢迎访问我们位于阿雷格里港的办公室。',
      parkingText: '前往办公室的停车选项',
      parkingLinkText: '停车地图',
      formTitle: '联系',
      formSubtitle: '填写下方表格，我们将尽快与您联系',
      fields: {
        fullNameLabel: '姓名',
        fullNamePlaceholder: '您的姓名',
        cpfLabel: 'CPF（巴西税号）',
        cpfPlaceholder: '000.000.000-00',
        phoneLabel: '电话',
        phonePlaceholder: '(00) 00000-0000',
        emailLabel: '邮箱',
        emailPlaceholder: '您的邮箱地址',
        processNumberLabelOptional: '案件编号（可选）',
        processNumberPlaceholder: '0000000-00.0000.0.00.0000',
        messageLabel: '留言',
        messagePlaceholder: '请描述我们如何帮助您...'
      },
      submit: '发送信息',
      submitting: '发送中...',
      toastSuccessTitle: '发送成功！',
      toastSuccessDescription: '我们会尽快与您联系。',
      toastValidationErrorTitle: '校验错误',
      toastGenericErrorTitle: '错误',
      toastGenericErrorDescription: '发送信息时发生错误，请重试。',
      validation: {
        nameRequired: '姓名为必填项',
        nameTooLong: '姓名过长',
        emailInvalid: '邮箱格式不正确',
        emailTooLong: '邮箱过长',
        phoneRequired: '电话为必填项',
        phoneTooLong: '电话过长',
        cpfRequired: 'CPF 为必填项',
        cpfInvalid: 'CPF 无效',
        processNumberTooLong: '案件编号过长',
        messageTooShort: '留言至少需要 10 个字符',
        messageTooLong: '留言过长'
      }
    },
    processConsultation: {
      title: '查询您的案件',
      description: '输入案件编号，几分钟内即可收到更新。',
      processNumberPlaceholder: '案件编号（例：0000000-00.0000.0.00.0000）',
      fullNamePlaceholder: '姓名',
      cpfPlaceholder: 'CPF (000.000.000-00)',
      requiredFieldsError: '请填写所有必填字段',
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
      rights: '版权所有。',
      socialMedia: '社交媒体',
      workWithUs: '加入我们',
      rateUs: '评价我们'
    },
    cookies: {
      title: 'Cookie政策',
      message: '我们使用Cookie来改善您在我们网站上的体验。继续浏览即表示您同意我们的隐私政策。',
      accept: '接受',
      decline: '拒绝'
    },
    blog: {
      title: '法律博客',
      subtitle: '关于巴西立法和判例最新变化的文章、新闻和分析。',
      searchPlaceholder: '搜索文章...',
      all: '全部',
      filterByTag: '按标签筛选',
      allTags: '所有标签',
      clear: '清除',
      noArticles: '未找到文章。',
      readMore: '阅读更多',
      backToBlog: '返回博客',
      share: '分享',
      minRead: '分钟阅读',
      tags: '标签',
      articleNotFound: '文章未找到',
      articleNotFoundDesc: '您查找的文章不存在或已被删除。',
      linkCopied: '链接已复制到剪贴板！'
    },
    avalie: {
      heroTitle: '您的意见很重要',
      heroSubtitle: '帮助我们持续提供卓越的法律服务',
      cardTitle: '评价我们的服务体验',
      cardSubtitle: '在 Google 上分享您对我们服务的体验',
      note: '您的评价将帮助我们不断改进服务，并让更多需要高质量法律支持的客户找到我们。',
      cta: '留下评价',
      disclaimer: '您将跳转到 Google 商家页面',
      footerLine: '20 多年来坚持卓越法律服务'
    },
    trabalheConosco: {
      heroTitle: '加入我们',
      heroSubtitle: '加入我们，以道德、创新与结果导向共同塑造法律服务的未来。',
      whyTitle: '为什么加入我们？',
      benefits: {
        collaborativeTitle: '协作氛围',
        collaborativeDesc: '与重视协作与职业发展的团队一起工作。',
        challengingTitle: '富有挑战的案件',
        challengingDesc: '参与多领域复杂且重要的案件。',
        growthTitle: '职业成长',
        growthDesc: '在具备传统与卓越法律实力的律所发展你的职业生涯。'
      },
      formTitle: '提交你的申请',
      fields: {
        nameLabel: '姓名',
        namePlaceholder: '您的姓名',
        emailLabel: '邮箱',
        emailPlaceholder: '您的邮箱地址',
        phoneLabel: '电话',
        phonePlaceholder: '(00) 00000-0000',
        roleLabel: '岗位',
        rolePlaceholder: '请选择岗位',
        interestAreaLabel: '感兴趣的领域',
        interestAreaPlaceholder: '例如：民法、劳动法等',
        messageLabel: '留言 / 工作经历',
        messagePlaceholder: '请介绍你的经历，以及为什么想加入我们...'
      },
      roles: {
        intern: '实习生',
        adminAssistant: '行政助理',
        lawyer: '律师',
        correspondentLawyer: '驻地/合作律师',
        partnerLawyer: '合伙律师'
      },
      resumeBox: {
        title: '简历提交',
        description: '提交表单后，你将跳转到 WhatsApp，在那里可以附加你的简历。'
      },
      submit: '发送',
      submitting: '发送中...',
      backHome: '返回首页',
      toastSuccessTitle: '申请已发送！',
      toastSuccessDescription: '我们将尽快与您联系。',
      toastValidationErrorTitle: '校验错误',
      toastGenericErrorTitle: '错误',
      toastGenericErrorDescription: '发送申请时发生错误。请重试。',
      validation: {
        nameRequired: '姓名为必填项',
        nameTooLong: '姓名过长',
        emailInvalid: '邮箱格式无效',
        emailTooLong: '邮箱过长',
        phoneRequired: '电话为必填项',
        phoneTooLong: '电话过长',
        roleRequired: '岗位为必填项',
        interestAreaRequired: '感兴趣的领域为必填项',
        messageTooShort: '留言至少需要 10 个字符',
        messageTooLong: '留言过长'
      },
      whatsapp: {
        title: '应聘 - 加入我们',
        name: '姓名',
        phone: '电话',
        email: '邮箱',
        role: '岗位',
        interestArea: '感兴趣的领域',
        message: '留言'
      }
    },
    auth: {
      adminArea: '管理区域',
      accessPanel: '访问博客管理面板',
      login: '登录',
      signup: '注册',
      email: '邮箱',
      emailPlaceholder: '您的@邮箱.com',
      password: '密码',
      passwordPlaceholder: '••••••••',
      fullName: '全名',
      fullNamePlaceholder: '您的姓名',
      confirmPassword: '确认密码',
      loggingIn: '登录中...',
      signingUp: '注册中...',
      backToSite: '← 返回网站',
      loginSuccess: '登录成功！',
      accountCreated: '账户创建成功！',
      invalidCredentials: '邮箱或密码无效',
      loginError: '登录错误。请重试。',
      emailAlreadyRegistered: '此邮箱已注册',
      signupError: '创建账户时出错。请重试。',
      validation: {
        emailInvalid: '无效邮箱',
        passwordMin: '密码至少需要6个字符',
        nameMin: '姓名至少需要2个字符',
        passwordsDoNotMatch: '密码不匹配'
      }
    },
    admin: {
      panel: '管理面板',
      blogManagement: '博客管理',
      site: '网站',
      logout: '退出',
      totalPosts: '总帖子数',
      published: '已发布',
      categories: '分类',
      categoriesCreated: '分类已创建',
      drafts: '草稿',
      awaitingPublication: '等待发布',
      posts: '帖子',
      blogPosts: '博客帖子',
      manageArticles: '管理已发布的文章',
      newPost: '新帖子',
      noPostsFound: '未找到帖子。创建您的第一篇文章！',
      title: '标题',
      category: '分类',
      status: '状态',
      date: '日期',
      actions: '操作',
      publishedStatus: '已发布',
      draftStatus: '草稿',
      deletePost: '删除帖子？',
      deletePostDesc: '此操作无法撤销。帖子将被永久删除。',
      cancel: '取消',
      delete: '删除',
      organizeByCategory: '按分类组织帖子',
      newCategory: '新分类',
      noCategoriesFound: '未找到分类。创建您的第一个分类！',
      name: '名称',
      slug: 'Slug',
      deleteCategory: '删除分类？',
      deleteCategoryDesc: '此操作无法撤销。关联的帖子将失去分类。',
      accessDenied: '访问被拒绝',
      accessDeniedDesc: '您没有权限访问此页面。请联系管理员。',
      backToSite: '返回网站',
      loadError: '加载帖子时出错',
      deleteError: '删除帖子时出错',
      deleteSuccess: '帖子删除成功',
      deleteCategoryError: '删除分类时出错',
      deleteCategorySuccess: '分类删除成功',
      back: '返回',
      editPost: '编辑帖子',
      newPostTitle: '新帖子',
      save: '保存',
      saving: '保存中...',
      preview: '预览',
      importFromUrl: '从URL导入',
      importFromUrlDesc: '粘贴文章链接以使用AI自动填充',
      importPlaceholder: 'https://示例.com/文章',
      importing: '导入中...',
      import: '导入',
      content: '内容',
      titleRequired: '标题 *',
      titlePlaceholder: '文章标题',
      slugUrl: 'Slug (URL) *',
      slugPlaceholder: '文章标题',
      excerpt: '摘要',
      excerptPlaceholder: '文章简要摘要（显示在列表中）',
      characters: '字符',
      contentRequired: '内容 *',
      contentPlaceholder: '撰写文章内容...（支持HTML）',
      htmlHint: '您可以使用HTML进行格式化（h2, h3, p, ul, li, strong, em, a等）',
      featuredImage: '特色图片',
      uploadImage: '上传图片',
      orPasteUrl: '或粘贴URL',
      organization: '组织',
      selectCategory: '选择分类',
      tagsLabel: '标签',
      tagsPlaceholder: '法律、立法、法院',
      tagsSeparator: '用逗号分隔标签',
      seo: 'SEO',
      metaTitle: 'Meta标题',
      metaTitlePlaceholder: '搜索引擎标题',
      metaTitleHint: '最多60个字符。留空则使用标题。',
      metaDescription: 'Meta描述',
      metaDescriptionPlaceholder: '搜索引擎描述',
      metaDescriptionHint: '最多160个字符。留空则使用摘要。',
      editCategory: '编辑分类',
      newCategoryTitle: '新分类',
      categoryDetails: '分类详情',
      categoryName: '名称 *',
      categoryNamePlaceholder: '分类名称',
      categorySlug: 'Slug (URL) *',
      categorySlugPlaceholder: '分类名称',
      categoryDescription: '描述',
      categoryDescriptionPlaceholder: '分类描述（可选）',
      postUpdated: '帖子更新成功',
      postCreated: '帖子创建成功',
      postUpdateError: '更新帖子时出错',
      postCreateError: '创建帖子时出错',
      slugExists: '已存在具有此slug的帖子',
      categoryUpdated: '分类更新成功',
      categoryCreated: '分类创建成功',
      categoryUpdateError: '更新分类时出错',
      categoryCreateError: '创建分类时出错',
      categorySlugExists: '已存在具有此名称或slug的分类',
      importSuccess: '内容导入成功！发布前请审核。',
      importError: '导入内容时出错',
      enterUrlToImport: '输入要导入的URL',
      loadPostError: '加载帖子时出错',
      loadCategoryError: '加载分类时出错',
      imageUploadError: '上传图片时出错',
      imageUploadSuccess: '图片上传成功',
      generateTranslations: '生成翻译',
      translating: '翻译中...',
      translationsGenerated: '翻译生成成功！',
      translationError: '生成翻译时出错',
      saveBeforeTranslating: '请先保存帖子再生成翻译',
      validation: {
        titleMin: '标题至少需要3个字符',
        titleMax: '标题过长',
        slugMin: 'Slug至少需要3个字符',
        slugMax: 'Slug过长',
        excerptMax: '摘要最多300个字符',
        contentMin: '内容至少需要10个字符',
        metaTitleMax: 'Meta标题最多60个字符',
        metaDescriptionMax: 'Meta描述最多160个字符',
        categoryNameMin: '名称至少需要2个字符',
        categoryNameMax: '名称过长',
        categorySlugMin: 'Slug至少需要2个字符',
        categorySlugMax: 'Slug过长',
        categoryDescriptionMax: '描述最多200个字符'
      }
    }
  }
};
