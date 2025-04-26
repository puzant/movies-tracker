import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locale/en.json";
import fr from "@/locale/fr.json";
import ar from "@/locale/ar.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: "en",
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
    },
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      ar: {
        translation: ar,
      },
    },
    debug: false,
    react: {
      useSuspense: true,
    },
  });

export default i18n;
