import { Briefcase, FileText, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrabalheBenefits() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Briefcase,
      title: t("trabalheConosco.benefits.collaborativeTitle"),
      desc: t("trabalheConosco.benefits.collaborativeDesc"),
    },
    {
      icon: FileText,
      title: t("trabalheConosco.benefits.challengingTitle"),
      desc: t("trabalheConosco.benefits.challengingDesc"),
    },
    {
      icon: User,
      title: t("trabalheConosco.benefits.growthTitle"),
      desc: t("trabalheConosco.benefits.growthDesc"),
    },
  ] as const;

  return (
    <div className="mb-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        {t("trabalheConosco.whyTitle")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
