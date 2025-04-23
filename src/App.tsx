import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageDetector from "i18next-browser-languagedetector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import AppRoutes from "@/appRoutes";
import { Navbar } from "@/components/organisms";
import ErrorBoundry from "./errorBoundry";
import UseScrollToTop from "./hooks/useScrollToTop";

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

  React.useEffect(() => {
    const handleDir = () => {
      const direction = i18n.dir(i18n.language);
      document.documentElement.dir = direction;
    };

    handleDir();
    i18n.on("languageChanged", handleDir);

    return () => {
      i18n.off("languageChanged", handleDir);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
        <BrowserRouter>
          <UseScrollToTop />
          <Navbar />
          <ToastContainer hideProgressBar={false} theme="dark" />
          <ErrorBoundry>
            <AppRoutes />
          </ErrorBoundry>
        </BrowserRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
