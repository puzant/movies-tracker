import { Outlet, Navigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useUserStore();

  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
};
