"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { NextIntlClientProvider } from "next-intl";

export type Locale = "en" | "ru";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  initialLocale = "en",
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Record<
    string,
    Record<string, string>
  > | null>(null);

  // Load saved locale from localStorage on initialization
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "ru")) {
      setLocaleState(savedLocale);
    }
  }, []);

  // Load messages for the current locale
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`@/services/i18n/locales/${locale}.json`);
        setMessages(messages.default);
      } catch (error) {
        console.error("Failed to load messages for locale:", locale, error);
        // Fallback to English
        const fallbackMessages = await import(
          `@/services/i18n/locales/en.json`
        );
        setMessages(fallbackMessages.default);
      }
    };

    loadMessages();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Update the lang attribute in HTML
    document.documentElement.lang = newLocale;
  };

  // Show loading while messages are not loaded
  if (!messages) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
};
