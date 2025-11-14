import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Mota & Advogados</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-accent transition-colors">
              Início
            </a>
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors">
              Sobre
            </a>
            <a href="#areas" className="text-foreground hover:text-accent transition-colors">
              Áreas de Atuação
            </a>
            <a href="#contato" className="text-foreground hover:text-accent transition-colors">
              Contato
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="bronze" size="lg">
              Fale Conosco
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
              Início
            </a>
            <a
              href="#sobre"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#areas"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Áreas de Atuação
            </a>
            <a
              href="#contato"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </a>
            <Button variant="bronze" size="lg" className="w-full">
              Fale Conosco
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
