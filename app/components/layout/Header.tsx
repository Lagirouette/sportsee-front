import { Link, NavLink } from "react-router";
import { useAuth } from "~/context/AuthContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-primary ${isActive ? "font-medium text-primary" : ""}`;

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-8 py-6">
      <Link to="/dashboard" aria-label="Accueil SportSee">
        <img src="/logo.svg" alt="SportSee" className="h-6 w-auto" />
      </Link>

      <nav className="flex items-center gap-8 rounded-full bg-white px-8 py-3 text-sm shadow-card">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/profile" className={linkClass}>Mon profil</NavLink>
        <span className="h-4 w-px bg-primary" aria-hidden="true" />
        <button type="button" onClick={logout} className="cursor-pointer text-primary hover:underline">
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}