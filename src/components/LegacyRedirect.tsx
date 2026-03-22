import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Maps old PHP URLs from the previous site to new routes/sections.
 * This ensures search engines (Bing, Google) that indexed old URLs
 * redirect users to the correct content.
 */
const legacyRouteMap: Record<string, { path: string; scrollTo?: string }> = {
  "/contato.php": { path: "/", scrollTo: "contato" },
  "/sobre.php": { path: "/", scrollTo: "about" },
  "/equipe.php": { path: "/", scrollTo: "advogados" },
  "/areas-de-atuacao.php": { path: "/", scrollTo: "areas" },
  "/blog.php": { path: "/blog" },
  "/trabalhe-conosco.php": { path: "/trabalhe-conosco" },
  "/noticias.php": { path: "/blog" },
  "/index.php": { path: "/" },
};

const LegacyRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname.toLowerCase();
    const match = legacyRouteMap[pathname];

    if (match) {
      navigate(match.path, {
        replace: true,
        state: match.scrollTo ? { scrollTo: match.scrollTo } : undefined,
      });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default LegacyRedirect;
