import { Button } from "@/components/ui/button";
import { Menu, Search, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import motaLogo from "@/assets/logo-mota-header.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary/95 backdrop-blur-md shadow-lg' 
        : 'bg-primary/80 backdrop-blur-sm shadow-md'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src={motaLogo} 
              alt="MOTA & ADVOGADOS ASSOCIADOS" 
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button onClick={() => handleNavClick('inicio')} className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.home')}
            </button>
            <button onClick={() => handleNavClick('sobre')} className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.about')}
            </button>
            <button onClick={() => handleNavClick('areas')} className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.areas')}
            </button>
            <button onClick={() => handleNavClick('advogados')} className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.lawyers')}
            </button>
            <button onClick={() => handleNavClick('contato')} className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.contact')}
            </button>
            <Link to="/blog" className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.blog')}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-white hover:text-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            
            <LanguageSelector />
            
            <Button 
              asChild 
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-6"
            >
              <a
                href="https://wa.me/5551981981210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('header_desktop')}
              >
                {t('nav.callUs')}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-4 border-t border-white/10">
            <button
              className="block text-white hover:text-accent transition-colors w-full text-left"
              onClick={() => handleNavClick('inicio')}
            >
              {t('nav.home')}
            </button>
            <button
              className="block text-white hover:text-accent transition-colors w-full text-left"
              onClick={() => handleNavClick('sobre')}
            >
              {t('nav.about')}
            </button>
            <button
              className="block text-white hover:text-accent transition-colors w-full text-left"
              onClick={() => handleNavClick('areas')}
            >
              {t('nav.areas')}
            </button>
            <button
              className="block text-white hover:text-accent transition-colors w-full text-left"
              onClick={() => handleNavClick('advogados')}
            >
              {t('nav.lawyers')}
            </button>
            <button
              className="block text-white hover:text-accent transition-colors w-full text-left"
              onClick={() => handleNavClick('contato')}
            >
              {t('nav.contact')}
            </button>
            <Link
              to="/blog"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <div className="flex flex-col gap-3 pt-2">
              <LanguageSelector />
              <Button asChild variant="bronze" size="lg" className="w-full">
                <a
                  href="https://wa.me/5551981981210"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('header_mobile')}
                >
                  {t('nav.callUs')}
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
