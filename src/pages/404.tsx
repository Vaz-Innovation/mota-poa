import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Custom404 = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('blog.articleNotFound') || 'Página não encontrada'} 
        description="A página que você procura não foi encontrada. Retorne à página inicial do Mota Advogados."
        noindex={true}
      />
      <Header />

      <main className="flex-grow flex items-center justify-center py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-8">
            {t('blog.articleNotFound') || 'Page Not Found'}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
            {t('blog.articleNotFoundDesc') || "The page you are looking for doesn't exist or has been moved."}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('blog.backToBlog') || 'Return Home'}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Custom404;
