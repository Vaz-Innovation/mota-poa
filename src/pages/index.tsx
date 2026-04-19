import { useEffect } from "react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps } from "next";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Lawyers from "@/components/Lawyers";
import LatestNews from "@/components/LatestNews";
import Contact from "@/components/Contact";
import ProcessConsultation from "@/components/ProcessConsultation";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import SEO from "@/components/SEO";
import { gqlQueryOptions } from "@/graphql/gqlpc";
import { HomeQuery } from "@/graphql/pages/home";
import { resolveWpLanguage } from "@/graphql/locale-to-wp-language";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(router.query.scrollTo as string);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      // Remove the query param without refreshing
      const { scrollTo, ...restQuery } = router.query;
      router.replace({ pathname: router.pathname, query: restQuery }, undefined, { shallow: true });
    }
  }, [router.query.scrollTo]);

  return (
    <div className="min-h-screen">
      <SEO />
      <Header />
      <main>
        <Hero />
        <Stats />
        <ProcessConsultation />
        <About />
        <PracticeAreas />
        <Lawyers />
        <LatestNews />
        <Contact />
      </main>
      <Newsletter />
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
};


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  const language = resolveWpLanguage(locale);

  await queryClient.prefetchQuery(
    gqlQueryOptions(HomeQuery, {
      input: { language },
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default Index;

