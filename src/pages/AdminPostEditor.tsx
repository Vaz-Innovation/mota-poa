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
import { ArrowLeft, Save, Eye, Image, Link2, Loader2 } from 'lucide-react';
import { z } from 'zod';

interface Category {
  id: string;
  name: string;
}

const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(200, 'Título muito longo'),
  slug: z.string().min(3, 'Slug deve ter no mínimo 3 caracteres').max(200, 'Slug muito longo'),
  excerpt: z.string().max(300, 'Resumo deve ter no máximo 300 caracteres').optional(),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  meta_title: z.string().max(60, 'Meta título deve ter no máximo 60 caracteres').optional(),
  meta_description: z.string().max(160, 'Meta descrição deve ter no máximo 160 caracteres').optional(),
});

const AdminPostEditor = () => {
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
      toast.error('Erro ao carregar post');
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
      toast.error('Erro ao fazer upload da imagem');
      return;
    }

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    setFeaturedImage(data.publicUrl);
    toast.success('Imagem enviada com sucesso');
  };

  const handleImportFromUrl = async () => {
    if (!importUrl.trim()) {
      toast.error('Digite uma URL para importar');
      return;
    }

    setImporting(true);

    try {
      const { data, error } = await supabase.functions.invoke('extract-article', {
        body: { url: importUrl },
      });

      if (error) {
        console.error('Error importing:', error);
        toast.error('Erro ao importar conteúdo');
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
        toast.success('Conteúdo importado com sucesso! Revise antes de publicar.');
      }
    } catch (err) {
      console.error('Import error:', err);
      toast.error('Erro ao importar conteúdo');
    } finally {
      setImporting(false);
    }
  };

  const handleSave = async () => {
    const result = postSchema.safeParse({
      title,
      slug,
      excerpt,
      content,
      meta_title: metaTitle,
      meta_description: metaDescription,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
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
        toast.error('Erro ao atualizar post');
      } else {
        toast.success('Post atualizado com sucesso');
        navigate('/admin');
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) {
        console.error('Error creating post:', error);
        if (error.code === '23505') {
          toast.error('Já existe um post com este slug');
        } else {
          toast.error('Erro ao criar post');
        }
      } else {
        toast.success('Post criado com sucesso');
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
                  Voltar
                </Link>
              </Button>
              <h1 className="text-xl font-bold">
                {isEditing ? 'Editar Post' : 'Novo Post'}
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
                  {published ? 'Publicado' : 'Rascunho'}
                </Label>
              </div>
              
              {published && slug && (
                <Button variant="ghost" asChild className="text-primary-foreground">
                  <Link to={`/blog/${slug}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Link>
                </Button>
              )}
              
              <Button onClick={handleSave} disabled={saving} variant="secondary">
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Salvando...' : 'Salvar'}
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
                  Importar de URL
                </CardTitle>
                <CardDescription>
                  Cole o link de um artigo para preencher automaticamente com IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://exemplo.com/artigo"
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
                        Importando...
                      </>
                    ) : (
                      'Importar'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Título do artigo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="titulo-do-artigo"
                  />
                  <p className="text-xs text-muted-foreground">
                    URL: /blog/{slug || 'titulo-do-artigo'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Breve resumo do artigo (aparece na listagem)"
                    rows={3}
                    maxLength={300}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {excerpt.length}/300 caracteres
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo *</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva o conteúdo do artigo... (suporta HTML)"
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Você pode usar HTML para formatação (h2, h3, p, ul, li, strong, em, a, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Imagem Destacada</CardTitle>
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
                      <span>Carregar imagem</span>
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
                  <Label htmlFor="featured-image-url">Ou cole a URL</Label>
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
                <CardTitle>Organização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
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
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="direito, legislação, STF"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separe as tags por vírgula
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>Otimização para mecanismos de busca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Título</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || 'Título para SEO'}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {metaTitle.length}/60 caracteres
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Descrição</Label>
                  <Textarea
                    id="meta-description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={excerpt || 'Descrição para SEO'}
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {metaDescription.length}/160 caracteres
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
