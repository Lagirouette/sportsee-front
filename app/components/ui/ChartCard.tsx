import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  accent?: "blue" | "red";
  nav?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, accent = "blue", nav, children }: Props) {
  return (
    <article className="min-w-0 rounded-2xl bg-white p-6 shadow-card">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className={`text-xl font-semibold ${accent === "red" ? "text-accent" : "text-primary"}`}>{title}</h3>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>
        </div>
        {nav}
      </header>
      {children}
    </article>
  );
}