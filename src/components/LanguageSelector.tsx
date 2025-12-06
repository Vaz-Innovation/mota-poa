import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'pt', label: 'Português', abbr: 'PT' },
    { code: 'es', label: 'Español', abbr: 'ES' },
    { code: 'en', label: 'English', abbr: 'EN' },
    { code: 'de', label: 'Deutsch', abbr: 'DE' },
    { code: 'it', label: 'Italiano', abbr: 'IT' },
    { code: 'fr', label: 'Français', abbr: 'FR' },
    { code: 'zh', label: '中文', abbr: 'ZH' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4 text-white" />
          <span className="hidden md:inline text-white">{currentLanguage?.abbr}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'pt' | 'es' | 'en' | 'de' | 'it' | 'fr' | 'zh')}
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
