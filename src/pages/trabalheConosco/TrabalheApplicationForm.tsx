import { useState } from "react";
import { z } from "zod";
import { Briefcase, FileText, Mail, Phone, Upload, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

function encodeForWa(value: string) {
  return encodeURIComponent(value ?? "");
}

export default function TrabalheApplicationForm() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cargo, setCargo] = useState("");

  const jobApplicationSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t("trabalheConosco.validation.nameRequired"))
      .max(100, t("trabalheConosco.validation.nameTooLong")),
    email: z
      .string()
      .trim()
      .email(t("trabalheConosco.validation.emailInvalid"))
      .max(255, t("trabalheConosco.validation.emailTooLong")),
    phone: z
      .string()
      .trim()
      .min(1, t("trabalheConosco.validation.phoneRequired"))
      .max(20, t("trabalheConosco.validation.phoneTooLong")),
    cargo: z.string().min(1, t("trabalheConosco.validation.roleRequired")),
    area: z.string().trim().min(1, t("trabalheConosco.validation.interestAreaRequired")),
    message: z
      .string()
      .trim()
      .min(10, t("trabalheConosco.validation.messageTooShort"))
      .max(1000, t("trabalheConosco.validation.messageTooLong")),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      cargo,
      area: formData.get("area") as string,
      message: formData.get("message") as string,
    };

    try {
      const validatedData = jobApplicationSchema.parse(data);

      const waTitle = t("trabalheConosco.whatsapp.title");
      const waName = t("trabalheConosco.whatsapp.name");
      const waPhone = t("trabalheConosco.whatsapp.phone");
      const waEmail = t("trabalheConosco.whatsapp.email");
      const waRole = t("trabalheConosco.whatsapp.role");
      const waArea = t("trabalheConosco.whatsapp.interestArea");
      const waMessage = t("trabalheConosco.whatsapp.message");

      const whatsappMessage =
        `*${encodeForWa(waTitle)}*%0A%0A` +
        `*${encodeForWa(waName)}:* ${encodeForWa(validatedData.name)}%0A` +
        `*${encodeForWa(waPhone)}:* ${encodeForWa(validatedData.phone)}%0A` +
        `*${encodeForWa(waEmail)}:* ${encodeForWa(validatedData.email)}%0A` +
        `*${encodeForWa(waRole)}:* ${encodeForWa(validatedData.cargo)}%0A` +
        `*${encodeForWa(waArea)}:* ${encodeForWa(validatedData.area)}%0A` +
        `*${encodeForWa(waMessage)}:* ${encodeForWa(validatedData.message)}`;

      window.open(`https://wa.me/5551981981210?text=${whatsappMessage}`, "_blank");

      toast({
        title: t("trabalheConosco.toastSuccessTitle"),
        description: t("trabalheConosco.toastSuccessDescription"),
      });

      e.currentTarget.reset();
      setCargo("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t("trabalheConosco.toastValidationErrorTitle"),
          description: error.issues[0]?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("trabalheConosco.toastGenericErrorTitle"),
          description: t("trabalheConosco.toastGenericErrorDescription"),
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        {t("trabalheConosco.formTitle")}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-accent" />
            {t("trabalheConosco.fields.nameLabel")}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder={t("trabalheConosco.fields.namePlaceholder")}
            required
            maxLength={100}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            {t("trabalheConosco.fields.emailLabel")}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("trabalheConosco.fields.emailPlaceholder")}
            required
            maxLength={255}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent" />
            {t("trabalheConosco.fields.phoneLabel")}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("trabalheConosco.fields.phonePlaceholder")}
            required
            maxLength={20}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo" className="text-sm font-medium flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent" />
            {t("trabalheConosco.fields.roleLabel")}
          </Label>
          <Select value={cargo} onValueChange={setCargo} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("trabalheConosco.fields.rolePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={t("trabalheConosco.roles.intern")}>{t("trabalheConosco.roles.intern")}</SelectItem>
              <SelectItem value={t("trabalheConosco.roles.adminAssistant")}>{t("trabalheConosco.roles.adminAssistant")}</SelectItem>
              <SelectItem value={t("trabalheConosco.roles.lawyer")}>{t("trabalheConosco.roles.lawyer")}</SelectItem>
              <SelectItem value={t("trabalheConosco.roles.correspondentLawyer")}>{t("trabalheConosco.roles.correspondentLawyer")}</SelectItem>
              <SelectItem value={t("trabalheConosco.roles.partnerLawyer")}>{t("trabalheConosco.roles.partnerLawyer")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area" className="text-sm font-medium flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent" />
            {t("trabalheConosco.fields.interestAreaLabel")}
          </Label>
          <Input
            id="area"
            name="area"
            type="text"
            placeholder={t("trabalheConosco.fields.interestAreaPlaceholder")}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            {t("trabalheConosco.fields.messageLabel")}
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t("trabalheConosco.fields.messagePlaceholder")}
            required
            minLength={10}
            maxLength={1000}
            rows={6}
            className="w-full resize-none"
          />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Upload className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                {t("trabalheConosco.resumeBox.title")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("trabalheConosco.resumeBox.description")}
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          {isSubmitting ? t("trabalheConosco.submitting") : t("trabalheConosco.submit")}
        </Button>
      </form>
    </div>
  );
}
