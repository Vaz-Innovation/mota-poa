import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { format, Locale } from 'date-fns';
import { ptBR, es, enUS, de, it, fr, zhCN } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface BlogPostTranslation {
  post_id: string;
  language: string;
  title: string;
  excerpt: string | null;
}

const LatestNews = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const dateLocales: Record<string, Locale> = {
    pt: ptBR,
    es: es,
    en: enUS,
    de: de,
    it: it,
    fr: fr,
    zh: zhCN
  };

  useEffect(() => {
    fetchLatestPosts(language);
  }, [language]);

  const fetchLatestPosts = async (lang: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        featured_image,
        published_at,
        created_at,
        category:blog_categories(id, name, slug)
      `)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching latest posts:', error);
      setLoading(false);
      return;
    }

    const basePosts = (data || []) as BlogPost[];

    // Apply translations if not Portuguese
    if (lang && lang !== 'pt' && basePosts.length > 0) {
      const postIds = basePosts.map((p) => p.id);
      const { data: translations, error: translationsError } = await supabase
        .from('blog_post_translations')
        .select('post_id, language, title, excerpt')
        .in('post_id', postIds)
        .eq('language', lang);

      if (translationsError) {
        console.error('Error fetching translations:', translationsError);
        setPosts(basePosts);
        setLoading(false);
        return;
      }

      const tMap = new Map<string, BlogPostTranslation>();
      (translations as BlogPostTranslation[] | null)?.forEach((tr) => {
        tMap.set(tr.post_id, tr);
      });

      const translatedPosts = basePosts.map((p) => {
        const tr = tMap.get(p.id);
        if (!tr) return p;
        return {
          ...p,
          title: tr.title || p.title,
          excerpt: tr.excerpt ?? p.excerpt,
        };
      });

      setPosts(translatedPosts);
    } else {
      setPosts(basePosts);
    }
    setLoading(false);
  };

  // Don't render section if no posts
  if (!loading && posts.length === 0) {
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
        {loading ? (
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
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group bg-card">
                    {post.featured_image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {post.category && (
                          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                            {post.category.name}
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
                        {format(
                          new Date(post.published_at || post.created_at),
                          "d 'de' MMMM, yyyy",
                          { locale: dateLocales[language] || ptBR }
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
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
            <Link to="/blog" className="flex items-center gap-2">
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
