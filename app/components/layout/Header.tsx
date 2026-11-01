import { NavLink } from "react-router";
import { useAuth } from "~/context/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  return (
    <header>
      <img src="/logo.svg" alt="SportSee" />
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Mon profil</NavLink>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </nav>
    </header>
  );
}