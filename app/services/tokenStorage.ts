import Cookies from "js-cookie";

const KEY = "sportsee_token";

export const tokenStorage = {
  get: () => Cookies.get(KEY),
  set: (token: string) =>
    Cookies.set(KEY, token, {
      expires: 1, // 1 jour
      sameSite: "strict",
      secure: import.meta.env.PROD,
    }),
  remove: () => Cookies.remove(KEY),
};