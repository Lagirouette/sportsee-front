import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { ApiError } from "~/services/http";

export function meta() {
  return [{ title: "Connexion – SportSee" }];
}

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

  const inputClass =
  "h-11 rounded-lg border border-neutral-300 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

return (
  <div className="grid min-h-screen grid-cols-[minmax(420px,44%)_1fr]">
    <div className="flex flex-col bg-surface px-16 py-12">
      <img src="/logo.svg" alt="SportSee" className="h-6 w-auto self-start" />

      <section className="my-auto w-full max-w-[320px] rounded-2xl bg-white px-8 py-10">
        <h1 className="text-2xl font-semibold leading-tight text-primary">
          Transformez
          <br />
          vos stats en résultats
        </h1>
        <h2 className="mt-8 text-lg">Se connecter</h2>

        <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col">
          <label htmlFor="username" className="mb-1.5 text-xs text-muted">Adresse email</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className={inputClass}
          />

          <label htmlFor="password" className="mb-1.5 mt-5 text-xs text-muted">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={inputClass}
          />

          {error && (
            <p role="alert" className="mt-4 text-sm text-accent">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="mt-8 h-11 cursor-pointer rounded-lg bg-primary text-sm text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-xs">Mot de passe oublié ?</p>
      </section>
    </div>

    <div className="relative">
      <img src="app/utils/images/login-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <p className="absolute bottom-6 right-6 max-w-[240px] rounded-full bg-white px-5 py-3 text-center text-[10px] leading-snug text-primary">
        Analysez vos performances en un clin d'œil, suivez vos progrès et atteignez vos objectifs.
      </p>
    </div>
  </div>
);
}