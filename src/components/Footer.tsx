const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mota & Advogados</h3>
            <p className="text-white/80 leading-relaxed">
              Excelência em advocacia com ética, transparência e comprometimento.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-bronze mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-white/80 hover:text-bronze transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-white/80 hover:text-bronze transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#areas" className="text-white/80 hover:text-bronze transition-colors">
                  Áreas de Atuação
                </a>
              </li>
              <li>
                <a href="#contato" className="text-white/80 hover:text-bronze transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-bronze mb-4">Contato</h4>
            <ul className="space-y-2 text-white/80">
              <li>Rua Siqueira Campos, nº 1.171, 9º andar</li>
              <li>Ed. Marquês do Herval - Centro</li>
              <li>Porto Alegre - RS - CEP: 90010-001</li>
              <li>(51) 3286.6586</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Mota & Advogados. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
