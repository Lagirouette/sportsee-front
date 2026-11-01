import { apiService } from "./apiService";
import { mockService } from "./mockService";
import type { DataService } from "./types";

export const dataService: DataService =
  import.meta.env.VITE_USE_MOCK === "true" ? mockService : apiService;