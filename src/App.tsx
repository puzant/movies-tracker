import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageDetector from "i18next-browser-languagedetector";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import AppRoutes from "@/appRoutes";
import { Navbar } from "@/components/organisms";

import en from "@/locale/en.json";
import fr from "@/locale/fr.json";
import ar from "@/locale/ar.json";

function App() {
  const queryClient = new QueryClient();

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
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
    });

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
