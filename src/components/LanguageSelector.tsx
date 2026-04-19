import { Globe } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  pathOverrides?: Record<string, string>;
}

const LanguageSelector = ({ pathOverrides = {} }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const languages = [
    { code: 'pt', label: 'Português', abbr: 'PT', locale: 'pt-BR' },
    { code: 'es', label: 'Español', abbr: 'ES', locale: 'es-ES' },
    { code: 'en', label: 'English', abbr: 'EN', locale: 'en-US' },
    { code: 'de', label: 'Deutsch', abbr: 'DE', locale: 'de-DE' },
    { code: 'it', label: 'Italiano', abbr: 'IT', locale: 'it-IT' },
    { code: 'fr', label: 'Français', abbr: 'FR', locale: 'fr-FR' },
    { code: 'zh', label: '中文', abbr: 'ZH', locale: 'zh-CN' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: string, locale: string) => {
    const path = pathOverrides[locale] || router.asPath;
    router.push(path, path, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 focus-visible:ring-0">
          <Globe className="h-4 w-4 text-white" />
          <span className="hidden md:inline text-white">{currentLanguage?.abbr}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code, lang.locale)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2 font-medium">{lang.abbr}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

