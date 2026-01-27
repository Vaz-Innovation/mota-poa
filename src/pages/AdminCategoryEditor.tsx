import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminCategoryEditor = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin, loading } = useAuth();
  const isEditing = id && id !== 'new';
  
  const [saving, setSaving] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(isEditing);
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isEditing) {
      fetchCategory(id);
    }
  }, [id, isEditing]);

  const fetchCategory = async (categoryId: string) => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (error) {
      toast.error(t('admin.loadCategoryError'));
      navigate('/admin');
      return;
    }

    if (data) {
      setName(data.name);
      setSlug(data.slug);
      setDescription(data.description || '');
    }
    setLoadingCategory(false);
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

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (name.length < 2) {
      toast.error(t('admin.validation.categoryNameMin'));
      return;
    }
    if (name.length > 50) {
      toast.error(t('admin.validation.categoryNameMax'));
      return;
    }
    if (slug.length < 2) {
      toast.error(t('admin.validation.categorySlugMin'));
      return;
    }
    if (slug.length > 50) {
      toast.error(t('admin.validation.categorySlugMax'));
      return;
    }
    if (description.length > 200) {
      toast.error(t('admin.validation.categoryDescriptionMax'));
      return;
    }

    setSaving(true);

    const categoryData = {
      name,
      slug,
      description: description || null,
    };

    if (isEditing) {
      const { error } = await supabase
        .from('blog_categories')
        .update(categoryData)
        .eq('id', id);

      if (error) {
        console.error('Error updating category:', error);
        toast.error(t('admin.categoryUpdateError'));
      } else {
        toast.success(t('admin.categoryUpdated'));
        navigate('/admin');
      }
    } else {
      const { error } = await supabase
        .from('blog_categories')
        .insert([categoryData]);

      if (error) {
        console.error('Error creating category:', error);
        if (error.code === '23505') {
          toast.error(t('admin.categorySlugExists'));
        } else {
          toast.error(t('admin.categoryCreateError'));
        }
      } else {
        toast.success(t('admin.categoryCreated'));
        navigate('/admin');
      }
    }

    setSaving(false);
  };

  if (loading || loadingCategory) {
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
                {isEditing ? t('admin.editCategory') : t('admin.newCategoryTitle')}
              </h1>
            </div>
            
            <Button onClick={handleSave} disabled={saving} variant="secondary">
              <Save className="mr-2 h-4 w-4" />
              {saving ? t('admin.saving') : t('admin.save')}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.categoryDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('admin.categoryName')}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder={t('admin.categoryNamePlaceholder')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">{t('admin.categorySlug')}</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={t('admin.categorySlugPlaceholder')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">{t('admin.categoryDescription')}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('admin.categoryDescriptionPlaceholder')}
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/200 {t('admin.characters')}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminCategoryEditor;