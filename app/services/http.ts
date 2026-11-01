import { tokenStorage } from "./tokenStorage";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const MESSAGES: Record<number, string> = {
  400: "Requête invalide.",
  401: "Identifiants incorrects ou session expirée.",
  403: "Accès refusé.",
  404: "Ressource introuvable.",
  500: "Erreur serveur, réessayez plus tard.",
};

let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
  { auth = true }: { auth?: boolean } = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const token = auth ? tokenStorage.get() : undefined;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "Impossible de joindre le serveur.");
  }

  if (!res.ok) {
    if (token && (res.status === 401 || res.status === 403)) onUnauthorized?.();
    throw new ApiError(res.status, MESSAGES[res.status] ?? "Erreur inattendue.");
  }

  return res.json() as Promise<T>;
}