import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Phone, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-primary/5">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-8">
          <Scale className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando pode ter sido movida ou não existe mais.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Página Inicial
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/" state={{ scrollTo: "contato" }}>
              <Phone className="mr-2 h-4 w-4" />
              Fale Conosco
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-12">
          Mota & Advogados Associados
        </p>
      </div>
    </div>
  );
};

export default NotFound;
