"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, Translations, translations } from "../i18n/translations";

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLangState] = useState<Lang>("pt-BR");

  // Restore from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("mf-theme") as "light" | "dark" | null;
    const savedLang = localStorage.getItem("mf-lang") as Lang | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLangState(savedLang);
  }, []);

  // Apply data-theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("mf-theme", next);
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("mf-lang", l);
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, t: translations[lang] }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
