import { Button } from "@/components/ui/button";
import { Menu, Search, Lock } from "lucide-react";
import { useState } from "react";
import motaLogo from "@/assets/mota-logo.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={motaLogo} 
              alt="MOTA & ADVOGADOS ASSOCIADOS" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#inicio" className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.home')}
            </a>
            <a href="#sobre" className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.about')}
            </a>
            <a href="#areas" className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.areas')}
            </a>
            <a href="#advogados" className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.lawyers')}
            </a>
            <a href="#contato" className="text-white hover:text-accent transition-colors text-sm font-medium">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-white hover:text-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Lock className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">{t('nav.access')}</span>
            </div>
            
            <LanguageSelector />
            
            <Button 
              asChild 
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-6"
            >
              <a
                href="https://api.whatsapp.com/send/?phone=%2B5561995362668&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
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
            <a
              href="#inicio"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
            <a
              href="#sobre"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
            <a
              href="#areas"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.areas')}
            </a>
            <a
              href="#advogados"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.lawyers')}
            </a>
            <a
              href="#contato"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <div className="flex flex-col gap-3 pt-2">
              <LanguageSelector />
              <Button asChild variant="bronze" size="lg" className="w-full">
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B5561995362668&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
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
