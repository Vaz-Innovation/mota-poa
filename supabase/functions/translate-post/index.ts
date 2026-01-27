import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANGUAGES = [
  { code: 'pt', name: 'Portuguese' },
  { code: 'es', name: 'Spanish' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'fr', name: 'French' },
  { code: 'zh', name: 'Chinese (Simplified)' },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postId } = await req.json();
    
    if (!postId) {
      return new Response(
        JSON.stringify({ error: "Post ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the original post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id, title, excerpt, content, meta_title, meta_description')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      return new Response(
        JSON.stringify({ error: "Post not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: { language: string; success: boolean; error?: string }[] = [];

    for (const lang of LANGUAGES) {
      try {
        const prompt = `You are a professional translator. Translate the following blog post content from its original language to ${lang.name}.

IMPORTANT RULES:
1. Maintain the exact HTML structure and formatting
2. Only translate the text content, keep HTML tags intact
3. Preserve technical terms, proper nouns, and legal terminology appropriately
4. Ensure the translation sounds natural in ${lang.name}
5. Return ONLY a valid JSON object, no markdown, no code blocks

Content to translate:
- Title: ${post.title}
- Excerpt: ${post.excerpt || ''}
- Content (HTML): ${post.content}
- Meta Title: ${post.meta_title || post.title}
- Meta Description: ${post.meta_description || post.excerpt || ''}

Return a JSON object with these exact keys:
{
  "title": "translated title",
  "excerpt": "translated excerpt",
  "content": "translated HTML content",
  "meta_title": "translated meta title",
  "meta_description": "translated meta description"
}`;

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "user", content: prompt }
            ],
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            results.push({ language: lang.code, success: false, error: "Rate limit exceeded" });
            continue;
          }
          if (response.status === 402) {
            results.push({ language: lang.code, success: false, error: "Payment required" });
            continue;
          }
          results.push({ language: lang.code, success: false, error: `API error: ${response.status}` });
          continue;
        }

        const aiResponse = await response.json();
        const content = aiResponse.choices?.[0]?.message?.content;

        if (!content) {
          results.push({ language: lang.code, success: false, error: "No content returned" });
          continue;
        }

        // Parse the JSON response - handle potential markdown code blocks
        let translated;
        try {
          // Remove potential markdown code blocks
          let cleanContent = content.trim();
          if (cleanContent.startsWith('```json')) {
            cleanContent = cleanContent.slice(7);
          } else if (cleanContent.startsWith('```')) {
            cleanContent = cleanContent.slice(3);
          }
          if (cleanContent.endsWith('```')) {
            cleanContent = cleanContent.slice(0, -3);
          }
          translated = JSON.parse(cleanContent.trim());
        } catch (parseError) {
          console.error(`Parse error for ${lang.code}:`, parseError, content);
          results.push({ language: lang.code, success: false, error: "Failed to parse translation" });
          continue;
        }

        // Upsert the translation
        const { error: upsertError } = await supabase
          .from('blog_post_translations')
          .upsert({
            post_id: postId,
            language: lang.code,
            title: translated.title || post.title,
            excerpt: translated.excerpt || post.excerpt,
            content: translated.content || post.content,
            meta_title: translated.meta_title || translated.title || post.meta_title,
            meta_description: translated.meta_description || translated.excerpt || post.meta_description,
          }, {
            onConflict: 'post_id,language'
          });

        if (upsertError) {
          console.error(`Upsert error for ${lang.code}:`, upsertError);
          results.push({ language: lang.code, success: false, error: upsertError.message });
        } else {
          results.push({ language: lang.code, success: true });
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (langError) {
        console.error(`Error translating to ${lang.code}:`, langError);
        results.push({ language: lang.code, success: false, error: String(langError) });
      }
    }

    const successCount = results.filter(r => r.success).length;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Translated to ${successCount}/${LANGUAGES.length} languages`,
        results 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
