import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { ApiError } from "~/services/http";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from?.pathname ?? "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Déjà connecté, ou connexion qui vient de réussir → redirection
  if (isAuthenticated) return <Navigate to={from} replace />;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <h1>Transformez vos stats en résultats</h1>
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Adresse email</label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />

          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />

          {error && <p role="alert">{error}</p>}

          <button type="submit" disabled={loading || !username || !password}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </section>
    </div>
  );
}