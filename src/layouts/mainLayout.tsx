import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ErrorBoundry from "@/errorBoundry";
import UseScrollToTop from "@/hooks/useScrollToTop";
import { Footer, Navbar } from "@/components/organisms";

export default function MainLayout() {
  return (
    <>
      <UseScrollToTop />
      <Navbar />
      <ToastContainer hideProgressBar={false} theme="dark" />

      <main>
        <ErrorBoundry>
          <Outlet />
        </ErrorBoundry>
      </main>

      <Footer />
    </>
  );
}
