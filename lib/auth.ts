export const TOKEN_KEY = "token";
export const USER_KEY = "user";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const setUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const logout = () => {
  removeToken();
  removeUser();
  localStorage.removeItem("civicai-copilot-messages");
};

export const isLoggedIn = () => {
  return !!getToken();
};