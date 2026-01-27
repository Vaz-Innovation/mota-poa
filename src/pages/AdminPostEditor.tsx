import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, Eye, Image, Link2, Loader2, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  name: string;
}

const AdminPostEditor = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin, loading } = useAuth();
  const isEditing = id && id !== 'new';
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);
  
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [published, setPublished] = useState(false);
  
  // Import URL state
  const [importUrl, setImportUrl] = useState('');
  const [importing, setImporting] = useState(false);
  
  // Translation state
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost(id);
    }
  }, [id, isEditing]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('blog_categories')
      .select('id, name')
      .order('name');
    
    setCategories(data || []);
  };

  const fetchPost = async (postId: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
      toast.error(t('admin.loadPostError'));
      navigate('/admin');
      return;
    }

    if (data) {
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || '');
      setContent(data.content);
      setFeaturedImage(data.featured_image || '');
      setCategoryId(data.category_id || '');
      setTags(data.tags?.join(', ') || '');
      setMetaTitle(data.meta_title || '');
      setMetaDescription(data.meta_description || '');
      setPublished(data.published);
    }
    setLoadingPost(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      toast.error(t('admin.imageUploadError'));
      return;
    }

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    setFeaturedImage(data.publicUrl);
    toast.success(t('admin.imageUploadSuccess'));
  };

  const handleImportFromUrl = async () => {
    if (!importUrl.trim()) {
      toast.error(t('admin.enterUrlToImport'));
      return;
    }

    setImporting(true);

    try {
      const { data, error } = await supabase.functions.invoke('extract-article', {
        body: { url: importUrl },
      });

      if (error) {
        console.error('Error importing:', error);
        toast.error(t('admin.importError'));
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      if (data?.success && data?.data) {
        const extracted = data.data;
        
        if (extracted.title) {
          setTitle(extracted.title);
          setSlug(generateSlug(extracted.title));
        }
        if (extracted.excerpt) setExcerpt(extracted.excerpt.substring(0, 300));
        if (extracted.content) setContent(extracted.content);
        if (extracted.featuredImage) setFeaturedImage(extracted.featuredImage);
        if (extracted.tags && Array.isArray(extracted.tags)) setTags(extracted.tags.join(', '));
        if (extracted.metaDescription) setMetaDescription(extracted.metaDescription.substring(0, 160));
        if (extracted.title) setMetaTitle(extracted.title.substring(0, 60));
        
        setImportUrl('');
        toast.success(t('admin.importSuccess'));
      }
    } catch (err) {
      console.error('Import error:', err);
      toast.error(t('admin.importError'));
    } finally {
      setImporting(false);
    }
  };

  const handleTranslate = async () => {
    if (!isEditing || !id) {
      toast.error(t('admin.saveBeforeTranslating'));
      return;
    }

    setTranslating(true);

    try {
      const { data, error } = await supabase.functions.invoke('translate-post', {
        body: { postId: id },
      });

      if (error) {
        console.error('Translation error:', error);
        toast.error(t('admin.translationError'));
        return;
      }

      if (data?.success) {
        toast.success(data.message || t('admin.translationsGenerated'));
      } else {
        toast.error(data?.error || t('admin.translationError'));
      }
    } catch (err) {
      console.error('Translation error:', err);
      toast.error(t('admin.translationError'));
    } finally {
      setTranslating(false);
    }
  };

  const handleSave = async () => {
    if (title.length < 3) {
      toast.error(t('admin.validation.titleMin'));
      return;
    }
    if (title.length > 200) {
      toast.error(t('admin.validation.titleMax'));
      return;
    }
    if (slug.length < 3) {
      toast.error(t('admin.validation.slugMin'));
      return;
    }
    if (slug.length > 200) {
      toast.error(t('admin.validation.slugMax'));
      return;
    }
    if (excerpt.length > 300) {
      toast.error(t('admin.validation.excerptMax'));
      return;
    }
    if (content.length < 10) {
      toast.error(t('admin.validation.contentMin'));
      return;
    }
    if (metaTitle.length > 60) {
      toast.error(t('admin.validation.metaTitleMax'));
      return;
    }
    if (metaDescription.length > 160) {
      toast.error(t('admin.validation.metaDescriptionMax'));
      return;
    }

    setSaving(true);

    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image: featuredImage || null,
      category_id: categoryId || null,
      author_id: user?.id,
      tags: tagsArray,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      published,
      published_at: published ? new Date().toISOString() : null,
    };

    if (isEditing) {
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id);

      if (error) {
        console.error('Error updating post:', error);
        toast.error(t('admin.postUpdateError'));
      } else {
        toast.success(t('admin.postUpdated'));
        navigate('/admin');
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) {
        console.error('Error creating post:', error);
        if (error.code === '23505') {
          toast.error(t('admin.slugExists'));
        } else {
          toast.error(t('admin.postCreateError'));
        }
      } else {
        toast.success(t('admin.postCreated'));
        navigate('/admin');
      }
    }

    setSaving(false);
  };

  if (loading || loadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="text-primary-foreground">
                <Link to="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('admin.back')}
                </Link>
              </Button>
              <h1 className="text-xl font-bold">
                {isEditing ? t('admin.editPost') : t('admin.newPostTitle')}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published" className="text-primary-foreground">
                  {published ? t('admin.publishedStatus') : t('admin.draftStatus')}
                </Label>
              </div>
              
              {isEditing && (
                <Button 
                  variant="ghost" 
                  className="text-primary-foreground"
                  onClick={handleTranslate}
                  disabled={translating}
                >
                  {translating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('admin.translating')}
                    </>
                  ) : (
                    <>
                      <Languages className="mr-2 h-4 w-4" />
                      {t('admin.generateTranslations')}
                    </>
                  )}
                </Button>
              )}
              
              {published && slug && (
                <Button variant="ghost" asChild className="text-primary-foreground">
                  <Link to={`/blog/${slug}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    {t('admin.preview')}
                  </Link>
                </Button>
              )}
              
              <Button onClick={handleSave} disabled={saving} variant="secondary">
                <Save className="mr-2 h-4 w-4" />
                {saving ? t('admin.saving') : t('admin.save')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Import from URL */}
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Link2 className="h-5 w-5 text-accent" />
                  {t('admin.importFromUrl')}
                </CardTitle>
                <CardDescription>
                  {t('admin.importFromUrlDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder={t('admin.importPlaceholder')}
                    disabled={importing}
                  />
                  <Button 
                    onClick={handleImportFromUrl} 
                    disabled={importing || !importUrl.trim()}
                    className="shrink-0"
                  >
                    {importing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('admin.importing')}
                      </>
                    ) : (
                      t('admin.import')
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('admin.content')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('admin.titleRequired')}</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder={t('admin.titlePlaceholder')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">{t('admin.slugUrl')}</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder={t('admin.slugPlaceholder')}
                  />
                  <p className="text-xs text-muted-foreground">
                    URL: /blog/{slug || t('admin.slugPlaceholder')}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">{t('admin.excerpt')}</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder={t('admin.excerptPlaceholder')}
                    rows={3}
                    maxLength={300}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {excerpt.length}/300 {t('admin.characters')}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">{t('admin.contentRequired')}</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t('admin.contentPlaceholder')}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('admin.htmlHint')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.featuredImage')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                <div className="space-y-2">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      <Image className="h-5 w-5" />
                      <span>{t('admin.uploadImage')}</span>
                    </div>
                  </Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured-image-url">{t('admin.orPasteUrl')}</Label>
                  <Input
                    id="featured-image-url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.organization')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">{t('admin.category')}</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">{t('admin.tagsLabel')}</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder={t('admin.tagsPlaceholder')}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('admin.tagsSeparator')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.seo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">{t('admin.metaTitle')}</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || t('admin.metaTitlePlaceholder')}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {metaTitle.length}/60 {t('admin.characters')}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">{t('admin.metaDescription')}</Label>
                  <Textarea
                    id="meta-description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={excerpt || t('admin.metaDescriptionPlaceholder')}
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {metaDescription.length}/160 {t('admin.characters')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPostEditor;