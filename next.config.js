/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    domains: ['secure.gravatar.com'],
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
  i18n: {
    locales: ['pt-BR', 'es-ES', 'en-US', 'de-DE', 'it-IT', 'fr-FR', 'zh-CN'],
    defaultLocale: 'pt-BR',
  },

  async redirects() {

    return [
      { source: '/contato.php', destination: '/#contato', permanent: true },
      { source: '/sobre.php', destination: '/#sobre', permanent: true },
      { source: '/equipe.php', destination: '/#advogados', permanent: true },
      { source: '/areas-de-atuacao.php', destination: '/#areas', permanent: true },
      { source: '/blog.php', destination: '/blog', permanent: true },
      { source: '/trabalhe-conosco.php', destination: '/trabalhe-conosco', permanent: true },
      { source: '/noticias.php', destination: '/blog', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

