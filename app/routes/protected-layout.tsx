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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1120px] flex-1 px-8 pb-16 pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}