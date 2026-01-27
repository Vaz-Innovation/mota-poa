import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, LogOut, FileText, FolderOpen, Home } from 'lucide-react';
import { format, Locale } from 'date-fns';
import { ptBR, es, enUS, de, it, fr, zhCN } from 'date-fns/locale';
import motaLogo from '@/assets/logo-mota-new.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  category: {
    name: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Admin = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'categories'>('posts');

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
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchPosts();
      fetchCategories();
    }
  }, [user, isAdmin]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        published,
        published_at,
        created_at,
        category:blog_categories(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      toast.error(t('admin.loadError'));
    } else {
      setPosts(data || []);
    }
    setLoadingData(false);
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

  const handleDeletePost = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error(t('admin.deleteError'));
    } else {
      toast.success(t('admin.deleteSuccess'));
      fetchPosts();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error(t('admin.deleteCategoryError'));
    } else {
      toast.success(t('admin.deleteCategorySuccess'));
      fetchCategories();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">{t('admin.accessDenied')}</CardTitle>
            <CardDescription>
              {t('admin.accessDeniedDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/">{t('admin.backToSite')}</Link>
            </Button>
            <Button onClick={handleSignOut}>{t('admin.logout')}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={motaLogo} alt="Mota Advogados" className="h-10" />
              <div>
                <h1 className="text-xl font-bold">{t('admin.panel')}</h1>
                <p className="text-sm opacity-80">{t('admin.blogManagement')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground/80">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  {t('admin.site')}
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground/80">
                <Link to="/blog">
                  <Eye className="mr-2 h-4 w-4" />
                  Blog
                </Link>
              </Button>
              <Button variant="secondary" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                {t('admin.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.totalPosts')}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground">
                {posts.filter(p => p.published).length} {t('admin.published')}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.categories')}</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">{t('admin.categoriesCreated')}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.drafts')}</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.filter(p => !p.published).length}</div>
              <p className="text-xs text-muted-foreground">{t('admin.awaitingPublication')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'posts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('posts')}
          >
            <FileText className="mr-2 h-4 w-4" />
            {t('admin.posts')}
          </Button>
          <Button
            variant={activeTab === 'categories' ? 'default' : 'outline'}
            onClick={() => setActiveTab('categories')}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            {t('admin.categories')}
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'posts' ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('admin.blogPosts')}</CardTitle>
                <CardDescription>{t('admin.manageArticles')}</CardDescription>
              </div>
              <Button asChild>
                <Link to="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('admin.newPost')}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t('admin.noPostsFound')}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.title')}</TableHead>
                      <TableHead>{t('admin.category')}</TableHead>
                      <TableHead>{t('admin.status')}</TableHead>
                      <TableHead>{t('admin.date')}</TableHead>
                      <TableHead className="text-right">{t('admin.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category?.name || '-'}</TableCell>
                        <TableCell>
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published ? t('admin.publishedStatus') : t('admin.draftStatus')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(post.created_at), "dd/MM/yyyy", { locale: dateLocales[language] || ptBR })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {post.published && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/blog/${post.slug}`} target="_blank">
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/admin/posts/${post.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{t('admin.deletePost')}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {t('admin.deletePostDesc')}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>{t('admin.cancel')}</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeletePost(post.id)}>
                                    {t('admin.delete')}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('admin.categories')}</CardTitle>
                <CardDescription>{t('admin.organizeByCategory')}</CardDescription>
              </div>
              <Button asChild>
                <Link to="/admin/categories/new">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('admin.newCategory')}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t('admin.noCategoriesFound')}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.name')}</TableHead>
                      <TableHead>{t('admin.slug')}</TableHead>
                      <TableHead className="text-right">{t('admin.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/admin/categories/${category.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{t('admin.deleteCategory')}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {t('admin.deleteCategoryDesc')}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>{t('admin.cancel')}</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                                    {t('admin.delete')}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;