import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Linkedin, Facebook, Lock } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          <div>
            <h4 className="font-semibold text-bronze mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#inicio" className="text-white/80 hover:text-bronze transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="text-white/80 hover:text-bronze transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/#areas" className="text-white/80 hover:text-bronze transition-colors">
                  {t('nav.areas')}
                </Link>
              </li>
              <li>
                <Link href="/#advogados" className="text-white/80 hover:text-bronze transition-colors">
                  {t('nav.lawyers')}
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-white/80 hover:text-bronze transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/trabalhe-conosco" className="text-white/80 hover:text-bronze transition-colors">
                  {t('footer.workWithUs')}
                </Link>
              </li>
              <li>
                <Link href="/avalie" className="text-white/80 hover:text-bronze transition-colors">
                  {t('footer.rateUs')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-bronze transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-bronze mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-white/80">
              <li>Rua Siqueira Campos, nº 1.171, 9º andar</li>
              <li>Ed. Marquês do Herval - Centro</li>
              <li>Porto Alegre - RS - CEP: 90010-001</li>
              <li>(51) 3286.6586</li>
              <li>
                <a href="mailto:faleconosco@motaeadvogados.com.br" className="hover:text-bronze transition-colors">
                  faleconosco@motaeadvogados.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-bronze mb-4">{t('footer.socialMedia')}</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/mota-&-advogados-associados/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-bronze transition-colors hover-scale"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://web.facebook.com/Mota.Advogados.Poa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-bronze transition-colors hover-scale"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 pb-6 flex justify-center">
          <a 
            href="https://stg.motaeadvogados.com.br/sign-in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-bronze transition-colors"
          >
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Intranet</span>
          </a>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Mota & Advogados Associados. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

