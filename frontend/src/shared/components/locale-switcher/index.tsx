"use client";

import { useLocale } from "@/shared/providers/locale-provider";

export const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("ru")}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === "ru"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        RU
      </button>
    </div>
  );
};
