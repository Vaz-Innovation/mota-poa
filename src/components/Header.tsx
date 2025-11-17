import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import motaLogo from "@/assets/mota-logo.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={motaLogo} 
              alt="MOTA & ADVOGADOS ASSOCIADOS" 
              className="h-20 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-accent transition-colors">
              {t('nav.home')}
            </a>
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors">
              {t('nav.about')}
            </a>
            <a href="#areas" className="text-foreground hover:text-accent transition-colors">
              {t('nav.areas')}
            </a>
            <a href="#advogados" className="text-foreground hover:text-accent transition-colors">
              {t('nav.lawyers')}
            </a>
            <a href="#contato" className="text-foreground hover:text-accent transition-colors">
              {t('nav.contact')}
            </a>
            <LanguageSelector />
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="bronze" size="lg">
              <a
                href="https://wa.me/5561995362668"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('nav.callUs')}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <a
              href="#inicio"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
            <a
              href="#sobre"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
            <a
              href="#areas"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.areas')}
            </a>
            <a
              href="#advogados"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.lawyers')}
            </a>
            <a
              href="#contato"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <div className="flex items-center justify-between">
              <Button asChild variant="bronze" size="lg" className="flex-1 mr-2">
                <a
                  href="https://wa.me/5561995362668"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('nav.callUs')}
                </a>
              </Button>
              <LanguageSelector />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
