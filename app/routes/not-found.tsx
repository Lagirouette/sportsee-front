import { Link } from "react-router";

export function meta() {
  return [{ title: "Page introuvable – SportSee" }];
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <img src="/logo.svg" alt="SportSee" className="h-6 w-auto" />
      <h1 className="text-8xl font-semibold text-primary">404</h1>
      <p className="text-muted">Oups, cette page n'existe pas.</p>
      <Link
        to="/dashboard"
        className="rounded-lg bg-primary px-6 py-3 text-sm text-white transition hover:bg-primary/90"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}