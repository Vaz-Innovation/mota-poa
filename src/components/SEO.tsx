import Head from 'next/head';
import { useRouter } from 'next/router';

interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  article?: boolean;
  articleMeta?: ArticleMeta;
  keywords?: string[];
  noindex?: boolean;
  author?: string;
  localePathOverrides?: Record<string, string>;
}

const localeMapping: Record<string, string> = {
  'pt-BR': 'pt_BR',
  'en-US': 'en_US',
  'es-ES': 'es_ES',
  'de-DE': 'de_DE',
  'it-IT': 'it_IT',
  'fr-FR': 'fr_FR',
  'zh-CN': 'zh_CN',
};

const SEO = ({ 
  title, 
  description, 
  image, 
  imageAlt,
  article, 
  articleMeta,
  keywords,
  noindex = false,
  author,
  localePathOverrides 
}: SEOProps) => {

  const router = useRouter();
  const siteName = "Mota & Advogados Associados";
  const defaultDescription = "Escritório de advocacia especializado em Direito Administrativo, Trabalhista, Previdenciário e muito mais. Atuação em todo o Brasil.";
  const defaultImage = "https://mota.adv.br/og-image.jpg";
  const siteUrl = "https://mota.adv.br";
  const twitterHandle = "@motaadvogados";

  // Limpar URL de parâmetros para canonical
  const cleanPath = router.asPath.split('?')[0].split('#')[0];
  
  // Usar imagem do post se disponível, senão usar default
  const ogImage = image && image.trim() !== "" ? image : defaultImage;
  
  const seo = {
    title: title ? `${title} | ${siteName}` : siteName,
    rawTitle: title || siteName,
    description: description || defaultDescription,
    image: ogImage,
    imageAlt: imageAlt || title || siteName,
    url: `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`,
    author: author || articleMeta?.author || siteName,
  };

  // Determinar o locale OG
  const ogLocale = localeMapping[router.locale || 'pt-BR'] || 'pt_BR';
  
  // Gerar locales alternativos para og:locale:alternate
  const alternateLocales = Object.keys(localePathOverrides || {})
    .filter(locale => locale !== router.locale)
    .map(locale => localeMapping[locale])
    .filter(Boolean);

  return (
    <Head>
      {/* Meta tags básicos */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
      />
      <meta 
        name="googlebot" 
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
      />
      
      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical */}
      <link rel="canonical" href={seo.url} />

      {/* Hreflang alternates */}
      {localePathOverrides && 
        Object.entries(localePathOverrides).map(([locale, path]) => (
          <link 
            key={locale}
            rel="alternate" 
            hrefLang={locale} 
            href={`${siteUrl}${path.startsWith('/') ? path : '/' + path}`} 
          />
        ))
      }
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${siteUrl}${cleanPath}`} 
      />

      {/* Open Graph - Básico */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.rawTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:locale" content={ogLocale} />
      
      {/* Author meta para artigos */}
      {article && seo.author && (
        <meta property="og:article:author" content={seo.author} />
      )}
      
      {/* OG Locales alternativos */}
      {alternateLocales.map(locale => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      
      {/* Open Graph - Imagem */}
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:secure_url" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Open Graph - Article específico */}
      {article && articleMeta && (
        <>
          {articleMeta.publishedTime && (
            <meta property="article:published_time" content={articleMeta.publishedTime} />
          )}
          {articleMeta.modifiedTime && (
            <meta property="article:modified_time" content={articleMeta.modifiedTime} />
          )}
          {articleMeta.author && (
            <meta property="article:author" content={articleMeta.author} />
          )}
          {articleMeta.section && (
            <meta property="article:section" content={articleMeta.section} />
          )}
          {articleMeta.tags && articleMeta.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.imageAlt} />
      
      {/* Viewport e charset */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Adicional SEO */}
      <meta name="theme-color" content="#1a365d" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
};

export default SEO;
