import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "~/context/AuthContext";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}