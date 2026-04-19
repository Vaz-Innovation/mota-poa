import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import { gqlQueryOptions } from '@/graphql/gqlpc';
import { HomeQuery } from '@/graphql/pages/home';
import { resolveWpLanguage } from '@/graphql/locale-to-wp-language';

const LatestNews = () => {
  const { t } = useLanguage();
  const { locale } = useRouter();
  const language = resolveWpLanguage(locale);

  const { data, isLoading } = useQuery(
    gqlQueryOptions(HomeQuery, {
      input: { language },
    }),
  );

  const posts = data?.posts?.nodes || [];

  // Don't render section if no posts and not loading
  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section id="ultimas-noticias" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Newspaper className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium uppercase tracking-wider text-sm">
              {t('latestNews.label')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('latestNews.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('latestNews.subtitle')}
          </p>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group bg-card">
                    {post.featuredImage?.node?.sourceUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {post.categories?.nodes?.[0] && (
                          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                            {post.categories.nodes[0].name}
                          </Badge>
                        )}
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3" />
                        {post.date && format(
                          new Date(post.date),
                          "d 'de' MMMM, yyyy",
                          { locale: ptBR }
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <div 
                          className="text-muted-foreground text-sm line-clamp-3 mb-4"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                      )}
                      <div className="flex items-center text-accent text-sm font-medium">
                        {t('blog.readMore')} <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog" className="flex items-center gap-2">
              {t('latestNews.viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;

