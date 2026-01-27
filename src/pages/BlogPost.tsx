import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react';
import { format, Locale } from 'date-fns';
import { ptBR, es, enUS, de, it, fr, zhCN } from 'date-fns/locale';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
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

interface Translation {
  title: string;
  excerpt: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);

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
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (post && language !== 'pt') {
      fetchTranslation(post.id, language);
    } else {
      setTranslation(null);
    }
  }, [post?.id, language]);

  const fetchPost = async (postSlug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        tags,
        meta_title,
        meta_description,
        published_at,
        created_at,
        category:blog_categories(id, name, slug),
        author:profiles(full_name, avatar_url)
      `)
      .eq('slug', postSlug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else if (data) {
      setPost(data);
      // Calculate reading time (average 200 words per minute)
      const wordCount = data.content.split(/\s+/).length;
      setReadingTime(Math.ceil(wordCount / 200));
    }
    setLoading(false);
  };

  const fetchTranslation = async (postId: string, lang: string) => {
    const { data, error } = await supabase
      .from('blog_post_translations')
      .select('title, excerpt, content, meta_title, meta_description')
      .eq('post_id', postId)
      .eq('language', lang)
      .maybeSingle();

    if (error) {
      console.error('Error fetching translation:', error);
      setTranslation(null);
    } else if (data) {
      setTranslation(data);
      // Recalculate reading time with translated content
      const wordCount = data.content.split(/\s+/).length;
      setReadingTime(Math.ceil(wordCount / 200));
    } else {
      setTranslation(null);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayTitle,
          text: displayExcerpt || '',
          url,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(t('blog.linkCopied'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/4 mb-8" />
              <div className="h-64 bg-muted rounded mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">{t('blog.articleNotFound')}</h1>
            <p className="text-muted-foreground mb-8">{t('blog.articleNotFoundDesc')}</p>
            <Button asChild>
              <Link to="/blog">{t('blog.backToBlog')}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Use translated content if available, otherwise use original
  const displayTitle = translation?.title || post.title;
  const displayExcerpt = translation?.excerpt || post.excerpt;
  const displayContent = translation?.content || post.content;
  const displayMetaTitle = translation?.meta_title || post.meta_title || displayTitle;
  const displayMetaDescription = translation?.meta_description || post.meta_description || displayExcerpt || '';

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": displayTitle,
    "description": displayExcerpt,
    "image": post.featured_image,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.published_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": post.author?.full_name || "Mota Advogados"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mota & Advogados Associados",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Meta Tags */}
      <title>{displayMetaTitle} | Blog Mota Advogados</title>
      <meta name="description" content={displayMetaDescription} />
      <meta name="keywords" content={post.tags.join(', ')} />
      <link rel="canonical" href={window.location.href} />
      
      {/* Open Graph */}
      <meta property="og:title" content={displayMetaTitle} />
      <meta property="og:description" content={displayMetaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
      {post.featured_image && <meta property="og:image" content={post.featured_image} />}
      
      {/* Article specific */}
      <meta property="article:published_time" content={post.published_at || post.created_at} />
      {post.author?.full_name && <meta property="article:author" content={post.author.full_name} />}
      {post.tags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <article className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Link>
            
            {/* Header */}
            <header className="mb-8">
              {post.category && (
                <Badge className="mb-4 bg-accent">{post.category.name}</Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
                {displayTitle}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.published_at || post.created_at), "d 'de' MMMM 'de' yyyy", { locale: dateLocales[language] || ptBR })}
                </span>
                
                {post.author?.full_name && (
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author.full_name}
                  </span>
                )}
                
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readingTime} {t('blog.minRead')}
                </span>
                
                <Button variant="ghost" size="sm" onClick={handleShare} className="ml-auto">
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('blog.share')}
                </Button>
              </div>
            </header>
            
            {/* Featured Image */}
            {post.featured_image && (
              <figure className="mb-8">
                <img
                  src={post.featured_image}
                  alt={displayTitle}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </figure>
            )}
            
            {/* Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />
            
            {/* Tags */}
            {post.tags.length > 0 && (
              <footer className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-muted-foreground">{t('blog.tags')}:</span>
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="inline-flex">
                      <Badge variant="secondary">{tag}</Badge>
                    </Link>
                  ))}
                </div>
              </footer>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
