export interface LoginResponse {
  token: string;
  userId: string;
}

export interface DataService {
  login(username: string, password: string): Promise<LoginResponse>;
  // getUserInfo() et getUserActivity() arrivent à l'étape 2
}