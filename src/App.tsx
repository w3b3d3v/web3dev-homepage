import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { LanguageProvider, LANG_URL_MAP, useLanguage } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component that reads the :locale param and sets the language, then renders the page
const LocaleWrapper = ({ page }: { page: "index" | "about" }) => {
  const { locale } = useParams<{ locale: string }>();
  const { setLang } = useLanguage();
  const location = useLocation();

  const lang = locale ? LANG_URL_MAP[locale] : undefined;

  if (!lang) {
    // Unknown locale — redirect to pt-BR equivalent
    const rest = location.pathname.replace(`/${locale}`, "");
    return <Navigate to={`/pt-BR${rest}`} replace />;
  }

  // Set the language based on the URL
  // Using a side-effect via render (safe here, it's synchronous state update with same value guard)
  setLang(lang);

  if (page === "about") return <About />;
  return <Index />;
};

const AppRoutes = () => (
  <Routes>
    {/* Root redirect to pt-BR */}
    <Route path="/" element={<Navigate to="/pt-BR" replace />} />

    {/* Language-prefixed home routes */}
    <Route path="/:locale" element={<LocaleWrapper page="index" />} />
    <Route path="/:locale/about" element={<LocaleWrapper page="about" />} />

    {/* Legacy /about without locale → redirect */}
    <Route path="/about" element={<Navigate to="/pt-BR/about" replace />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
