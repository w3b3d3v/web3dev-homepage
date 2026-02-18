import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Calendar, FileText, BookOpen, BookMarked, Compass } from "lucide-react";
import { useLanguage, LANG_TO_URL } from "@/contexts/LanguageContext";
import web3devLogo from "@/assets/web3dev-logo.svg";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const { locale } = useParams<{ locale?: string }>();

  const currentLocale = locale || "pt-BR";

  const navLinks = [
    { label: t("nav.about"), href: `/${currentLocale}/about`, isRoute: true },
    { label: t("nav.bootcamp"), href: "https://build.w3d.community/courses" },
  ];

  const resources = [
    { label: t("nav.calendar"), href: "https://lu.ma/web3calendar", icon: Calendar },
    { label: t("nav.articles"), href: "https://pt.w3d.community/", icon: FileText },
    { label: t("nav.solidityGuide"), href: "https://solidity.w3d.community/", icon: BookOpen },
    { label: t("nav.glossary"), href: "https://pt.glossario.w3d.community/", icon: BookMarked },
    { label: t("nav.blockchainStudy"), href: "https://roadmap.sh/r/blockchain-br", icon: Compass },
    { label: "Newsletter", href: "https://en.w3d.community/", icon: FileText },
  ];

  const langOptions = [
    { code: "pt" as const, label: "🇧🇷 PT-BR", urlSegment: "pt" },
    { code: "en" as const, label: "🇺🇸 EN-US", urlSegment: "en" },
    { code: "es" as const, label: "🇪🇸 ES", urlSegment: "es" },
  ];

  const currentLang = langOptions.find((l) => l.code === lang)!;

  const handleLangChange = (option: typeof langOptions[0]) => {
    setLang(option.code);
    // Navigate to the same page but with the new locale
    const isAbout = window.location.pathname.includes("/about");
    navigate(`/${option.urlSegment}${isAbout ? "/about" : ""}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={`/${currentLocale}`} className="flex items-center gap-2">
          <img src={web3devLogo} alt="WEB3DEV" className="h-8 md:h-10" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className="font-body text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}

          <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button className="flex items-center gap-1 font-body text-base text-muted-foreground transition-colors hover:text-foreground">
              {t("nav.resources")}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white p-4 shadow-2xl z-50"
                >
                  <span className="text-sm font-semibold text-blue-500 mb-3 block">{t("nav.learn")}</span>
                  <div className="flex flex-col gap-1">
                    {resources.map((r) => {
                      const Icon = r.icon;
                      return (
                        <a
                          key={r.label}
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-800 transition-colors hover:bg-gray-100"
                        >
                          <Icon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                          {r.label}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector */}
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button className="flex items-center gap-1 font-body text-base text-muted-foreground transition-colors hover:text-foreground">
              {currentLang.label}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-border bg-card/95 p-2 shadow-xl backdrop-blur-xl"
                >
                  {langOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => { handleLangChange(option); setLangOpen(false); }}
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary hover:text-foreground ${
                        lang === option.code ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <button
                    key={link.label}
                    onClick={() => { navigate(link.href); setMobileOpen(false); }}
                    className="font-body text-muted-foreground hover:text-foreground text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="border-t border-border/30 pt-2">
                <span className="text-xs font-semibold text-primary mb-2 block">{t("nav.learn")}</span>
                {resources.map((r) => {
                  const Icon = r.icon;
                  return (
                    <a
                      key={r.label}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-2 font-body text-muted-foreground hover:text-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                      {r.label}
                    </a>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-2 border-t border-border/30">
                {langOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => { handleLangChange(option); setMobileOpen(false); }}
                    className={`text-sm font-body ${lang === option.code ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
