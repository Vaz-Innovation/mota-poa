-- Create table for translated blog post content
CREATE TABLE public.blog_post_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, language)
);

-- Enable RLS
ALTER TABLE public.blog_post_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Translations are viewable by everyone"
ON public.blog_post_translations
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage translations"
ON public.blog_post_translations
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_post_translations_updated_at
BEFORE UPDATE ON public.blog_post_translations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();