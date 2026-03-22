import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import LegacyRedirect from "@/components/LegacyRedirect";
import Index from "./pages/Index";
import TrabalheConosco from "./pages/TrabalheConosco";
import Avalie from "./pages/Avalie";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminPostEditor from "./pages/AdminPostEditor";
import AdminCategoryEditor from "./pages/AdminCategoryEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LegacyRedirect />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="/avalie" element={<Avalie />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/posts/:id" element={<AdminPostEditor />} />
            <Route path="/admin/categories/:id" element={<AdminCategoryEditor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
