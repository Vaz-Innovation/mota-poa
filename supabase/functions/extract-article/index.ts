import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Fetching content from URL:", url);

    // Fetch the webpage content
    const pageResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });

    if (!pageResponse.ok) {
      console.error("Failed to fetch URL:", pageResponse.status);
      return new Response(
        JSON.stringify({ error: `Failed to fetch URL: ${pageResponse.status}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = await pageResponse.text();
    console.log("HTML fetched, length:", html.length);

    // Use Lovable AI to extract content
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Você é um redator jurídico especializado em criar conteúdo completo e detalhado para blogs de escritórios de advocacia. Sua tarefa é extrair e REESCREVER o conteúdo do artigo fornecido, tornando-o mais completo, detalhado e informativo, SEM mudar o sentido original.

INSTRUÇÕES IMPORTANTES:
1. NÃO resuma o conteúdo - EXPANDA e ENRIQUEÇA com mais detalhes
2. Mantenha todas as informações originais, mas adicione contexto e explicações
3. Use linguagem acessível para leigos, explicando termos jurídicos quando necessário
4. Estruture o texto com subtítulos (h2, h3) para melhor organização
5. Adicione parágrafos introdutórios e conclusivos quando apropriado
6. Mantenha dados, valores, datas e informações factuais exatamente como no original
7. Use listas (ul, li) para enumerar pontos importantes
8. Destaque informações cruciais com <strong>
9. O conteúdo final deve ter pelo menos 800-1200 palavras quando possível

Retorne em formato JSON com a seguinte estrutura:
{
  "title": "título do artigo (pode melhorar para SEO mantendo o sentido)",
  "excerpt": "resumo atrativo do artigo em até 300 caracteres que desperte interesse",
  "content": "conteúdo COMPLETO e EXPANDIDO do artigo formatado em HTML semântico (use h2, h3, p, ul, li, strong, em). Remova propagandas, menus, rodapés e elementos não relacionados ao conteúdo principal.",
  "featuredImage": "URL da imagem principal do artigo, se existir",
  "tags": ["array", "de", "tags", "relevantes", "para", "SEO"],
  "metaDescription": "meta descrição otimizada para SEO em até 160 caracteres"
}

Retorne APENAS o JSON válido, sem markdown ou explicações.`
          },
          {
            role: "user",
            content: `Extraia e REESCREVA de forma mais completa e detalhada o conteúdo principal deste HTML, mantendo o sentido original mas expandindo com mais informações e contexto:\n\n${html.substring(0, 50000)}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao seu workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Erro ao processar com IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const extractedContent = aiData.choices?.[0]?.message?.content;
    
    console.log("AI response received");

    if (!extractedContent) {
      return new Response(
        JSON.stringify({ error: "Não foi possível extrair o conteúdo" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON response from AI
    let parsedContent;
    try {
      // Remove markdown code blocks if present
      const cleanedContent = extractedContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsedContent = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw AI response:", extractedContent);
      return new Response(
        JSON.stringify({ error: "Erro ao processar resposta da IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: parsedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in extract-article function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
