import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Newsletter = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   // Load Beehiiv embed script
  //   const script = document.createElement("script");
  //   script.src = "https://subscribe-forms.beehiiv.com/embed.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   // Load Beehiiv attribution script
  //   const attributionScript = document.createElement("script");
  //   attributionScript.src =
  //     "https://subscribe-forms.beehiiv.com/attribution.js";
  //   attributionScript.type = "text/javascript";
  //   attributionScript.async = true;
  //   document.body.appendChild(attributionScript);

  //   return () => {
  //     // Cleanup scripts on unmount
  //     document.body.removeChild(script);
  //     document.body.removeChild(attributionScript);
  //   };
  // }, []);

  const newsLetterSchema = z.object({
    email: z.string().trim().email(t("newsletter.errorMessage")),
    source: z.string(),
  });

  type NewsletterFormData = z.infer<typeof newsLetterSchema>;

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      email: "",
      source: "porto-alegre",
    },
  });

  const handleSubmit = async (payload: NewsletterFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/wordpress/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }

      toast({
        title: t("newsletter.successMessage"),
      });
      form.reset();
      router.push("/blog");
    } catch (err: any) {
      toast({
        title: t("newsletter.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-navy">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bronze/20 mb-6">
            <Mail className="w-8 h-8 text-bronze" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("newsletter.title")}
          </h2>
          <p className="text-lg text-white/80 mb-8">
            {t("newsletter.description")}
          </p>

          <div className="flex justify-center p-12">
            {/* <iframe 
              src="https://subscribe-forms.beehiiv.com/092332b5-4048-4b0f-9719-736bac706b1b" 
              className="beehiiv-embed" 
              data-test-id="beehiiv-embed" 
              frameBorder="0" 
              scrolling="no" 
              style={{
                width: "560px",
                height: "207px",
                margin: 0,
                borderRadius: "0px",
                backgroundColor: "transparent",
                boxShadow: "none",
                maxWidth: "100%"
              }}
            /> */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit, () => {
                  const message = form.formState.errors.email?.message;
                  toast({
                    title: t("newsletter.error"),
                    description: message
                      ? String(message)
                      : t("newsletter.errorMessage"),
                    variant: "destructive",
                  });
                })}
                className="flex border rounded-md border-accent max-w-md w-full"
              >
                <Input
                  className="rounded-md rounded-tr-none rounded-br-none p-3 h-auto"
                  placeholder={t("newsletter.placeholder")}
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...form.register("email")}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md rounded-tl-none bg-black hover:bg-black p-3 size-auto"
                >
                  {isSubmitting
                    ? t("newsletter.sending")
                    : t("newsletter.button")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
