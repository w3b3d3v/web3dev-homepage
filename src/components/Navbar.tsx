import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav.about"), href: "#features" },
    { label: t("nav.bootcamp"), href: "https://build.w3d.community/courses" },
  ];

  const resources = [
    { label: t("nav.articles"), href: "https://pt.w3d.community/" },
    { label: t("nav.youtube"), href: "https://www.youtube.com/@web3dev" },
    { label: t("nav.web3nars"), href: "https://www.youtube.com/playlist?list=PLVX4xVoD65UNdy8m0IOj-KJQrVMdi9AE2" },
  ];

  const langOptions = [
    { code: "pt" as const, label: "🇧🇷 PT-BR" },
    { code: "en" as const, label: "🇺🇸 EN-US" },
  ];

  const currentLang = langOptions.find((l) => l.code === lang)!;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold text-foreground tracking-tight">
              <span className="text-gradient-green">WEB3</span>DEV
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button className="flex items-center gap-1 font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t("nav.resources")}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card/95 p-2 shadow-xl backdrop-blur-xl"
                >
                  {resources.map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {r.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector */}
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button className="flex items-center gap-1 font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
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
                      onClick={() => { setLang(option.code); setLangOpen(false); }}
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
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {resources.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {r.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2 border-t border-border/30">
                {langOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => { setLang(option.code); setMobileOpen(false); }}
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
