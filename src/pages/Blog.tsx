import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, User, Search, Tag, ArrowRight, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, Locale } from 'date-fns';
import { ptBR, es, enUS, de, it, fr, zhCN } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateTag } from '@/lib/tagTranslations';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  author: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface BlogPostTranslation {
  post_id: string;
  language: string;
  title: string;
  excerpt: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Blog = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
    fetchPosts(language);
    fetchCategories();
  }, [language]);

  // Support deep-linking like /blog?tag=CNH
  useEffect(() => {
    const tag = searchParams.get('tag');
    setSelectedTag(tag || null);
  }, [searchParams]);

  const fetchPosts = async (lang: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        featured_image,
        tags,
        published_at,
        created_at,
        category:blog_categories(id, name, slug),
        author:profiles(full_name, avatar_url)
      `)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
      return;
    }

    const basePosts = (data || []) as BlogPost[];

    // Apply per-language title/excerpt on the listing (the detail page already handles translations)
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

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('id, name, slug')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesCategory = !selectedCategory || post.category?.id === selectedCategory;
    
    const postTags = post.tags ?? [];
    const matchesTag = !selectedTag || postTags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  const handleTagChange = (value: string) => {
    const next = value === 'all' ? null : value;
    setSelectedTag(next);

    // Keep URL in sync so clicking a tag on the post page works and is shareable
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (!next) nextParams.delete('tag');
      else nextParams.set('tag', next);
      return nextParams;
    }, { replace: true });
  };

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Mota Advogados",
    "description": t('blog.subtitle'),
    "url": window.location.href,
    "publisher": {
      "@type": "Organization",
      "name": "Mota & Advogados Associados",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "blogPost": filteredPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.published_at || post.created_at,
      "url": `${window.location.origin}/blog/${post.slug}`
    }))
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Meta Tags */}
      <title>{t('blog.title')} | Mota & Advogados Associados</title>
      <meta name="description" content={t('blog.subtitle')} />
      <meta name="keywords" content="blog jurídico, direito, legislação, jurisprudência, advocacia, Mota Advogados" />
      <link rel="canonical" href={window.location.href} />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${t('blog.title')} | Mota & Advogados Associados`} />
      <meta property="og:description" content={t('blog.subtitle')} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </section>
          
          {/* Search and Filters */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('blog.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t('blog.all')}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {allTags.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={selectedTag || "all"}
                      onValueChange={handleTagChange}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={t('blog.filterByTag')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('blog.allTags')}</SelectItem>
                      {allTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {translateTag(tag, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedTag && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                    className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    {t('blog.clear')}
                  </Button>
                )}
              </div>
            )}
          </section>
          
          {/* Blog Posts Grid */}
          <section>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {t('blog.noArticles')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id}>
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                        {post.featured_image && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            {post.category && (
                              <Badge className="absolute top-4 left-4 bg-accent">
                                {post.category.name}
                              </Badge>
                            )}
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(post.published_at || post.created_at), "d 'de' MMMM, yyyy", { locale: dateLocales[language] || ptBR })}
                            </span>
                            {post.author?.full_name && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author.full_name}
                              </span>
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
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;