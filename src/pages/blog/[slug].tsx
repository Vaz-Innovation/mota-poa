import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { gqlQueryOptions } from "@/graphql/gqlpc";
import { BlogPostBySlugQuery, BlogPostSlugsQuery } from "@/graphql/pages/blog";
import { execute } from "@/graphql/execute";
import { resolveWpLanguage } from "@/graphql/locale-to-wp-language";

export default function BlogPostPage({ slug }: { slug: string }) {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    gqlQueryOptions(BlogPostBySlugQuery, { input: { slug } }),
  );

  const post = data?.post;

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-lg text-muted-foreground">Carregando artigo...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6">
        <p className="text-2xl">Artigo não encontrado</p>
        <Link href="/blog" className="text-primary hover:underline">
          Voltar ao blog
        </Link>
      </div>
    );
  }

  const localePathOverrides = post.translations?.reduce(
    (acc, translation) => {
      if (translation?.language?.locale && translation?.slug) {
        acc[translation.language.locale] = `/blog/${translation.slug}`;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  // Limpar HTML do excerpt para meta description
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, "").trim() || "";
  const metaDescription = cleanExcerpt.length > 160 
    ? cleanExcerpt.substring(0, 157) + "..." 
    : cleanExcerpt;

  // Extrair keywords das tags e categorias
  const keywords = [
    ...(post.categories?.nodes?.map(cat => cat.name) || []),
    ...(post.tags?.nodes?.map(tag => tag.name) || []),
    "advocacia",
    "direito",
    "Mota Advogados",
  ].filter(Boolean) as string[];

  // Metadados do artigo para Open Graph
  const articleMeta = {
    publishedTime: post.date || undefined,
    modifiedTime: post.modified || post.date || undefined,
    author: post.author?.node?.name || "Mota & Advogados Associados",
    section: post.categories?.nodes?.[0]?.name || "Blog",
    tags: post.tags?.nodes?.map(tag => tag.name).filter(Boolean) as string[] || [],
  };

  // Schema.org estruturado completo
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://mota.adv.br/blog/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mota.adv.br/blog/${post.slug}`,
    },
    headline: post.title,
    name: post.title,
    description: metaDescription,
    image: {
      "@type": "ImageObject",
      url: post.featuredImage?.node?.sourceUrl || "https://mota.adv.br/og-image.jpg",
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post.author?.node?.name || "Mota & Advogados Associados",
      url: "https://mota.adv.br/sobre",
    },
    publisher: {
      "@type": "Organization",
      name: "Mota & Advogados Associados",
      url: "https://mota.adv.br",
      logo: {
        "@type": "ImageObject",
        url: "https://mota.adv.br/logo.png",
        width: 250,
        height: 60,
      },
    },
    keywords: keywords.join(", "),
    articleSection: post.categories?.nodes?.[0]?.name || "Blog",
    inLanguage: post.language?.code || "pt-BR",
    isAccessibleForFree: true,
    ...(post.content && {
      wordCount: post.content.replace(/<[^>]*>/g, "").split(/\s+/).length,
    }),
  };

  // BreadcrumbList para navegação estruturada
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mota.adv.br",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://mota.adv.br/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://mota.adv.br/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={post.title || ""}
        description={metaDescription}
        image={post.featuredImage?.node?.sourceUrl || ""}
        imageAlt={post.featuredImage?.node?.altText || post.title || ""}
        article
        articleMeta={articleMeta}
        keywords={keywords}
        localePathOverrides={localePathOverrides}
      />
      <Head>
        {/* Schema.org JSON-LD para artigo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Schema.org JSON-LD para breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      </Head>

      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Blog
          </Link>

          <article>
            {/* Post Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories?.nodes?.map(cat => (
                  <Badge
                    key={cat.id}
                    variant="secondary"
                    className="bg-accent/10 text-accent hover:bg-accent/20"
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date &&
                    format(new Date(post.date), "d 'de' MMMM, yyyy", {
                      locale: ptBR,
                    })}
                </div>
                {post.author?.node?.name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author.node.name}
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative aspect-video mb-12 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title || ""}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Post Content */}
            <div
              className="blog-content prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{
                __html: post.content
                  ? post.content.replace("Reading Time: ", "Tempo de Leitura: ")
                  : "",
              }}
            />

            {/* Post Footer */}
            <Separator className="my-12" />

            {post.tags?.nodes && post.tags.nodes.length > 0 && (
              <div className="flex items-center gap-3 mb-12">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.nodes.map(tag => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className="font-normal"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];
  const activeLocales = locales || ["pt-BR"];

  for (const locale of activeLocales) {
    try {
      const data = await execute(BlogPostSlugsQuery, {
        language: resolveWpLanguage(locale),
        first: 100,
      });

      const localePaths = (data.posts?.nodes || [])
        .map(node => node?.slug)
        .filter(Boolean)
        .map(slug => ({ params: { slug }, locale }));

      paths.push(...localePaths);
    } catch (error) {
      console.error(`Error fetching slugs for locale ${locale}:`, error);
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  const queryClient = new QueryClient();
  const language = resolveWpLanguage(locale);

  try {
    await queryClient.prefetchQuery(
      gqlQueryOptions(BlogPostBySlugQuery as any, { input: { slug } }),
    );
  } catch (error) {
    console.error(`Error prefetching post ${slug}:`, error);
  }

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};
