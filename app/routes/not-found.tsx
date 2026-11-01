import { Link } from "react-router";
export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/dashboard">Retour au tableau de bord</Link>
    </div>
  );
}