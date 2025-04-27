import "@/i18n";
import i18n from "i18next";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import AppRoutes from "@/appRoutes";
import { Navbar } from "@/components/organisms";
import useUserStore from "@/store/useUserStore";
import ErrorBoundry from "./errorBoundry";
import UseScrollToTop from "./hooks/useScrollToTop";

function App() {
  const queryClient = new QueryClient();
  const { fontStyle } = useUserStore();

  React.useEffect(() => {
    if (fontStyle === "italic") {
      document.body.style.fontStyle = "italic";
    } else if (fontStyle === "normal") {
      document.body.style.fontStyle = "normal";
    }

    const handleDir = () => {
      const direction = i18n.dir(i18n.language);
      document.documentElement.dir = direction;
    };

    handleDir();
    i18n.on("languageChanged", handleDir);

    return () => {
      i18n.off("languageChanged", handleDir);
    };
  }, [fontStyle]);

  return (
    <Suspense fallback={<div>Loading page...</div>}>
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
    </Suspense>
  );
}

export default App;
