import { API_URL } from "../constants/urls";
import { AuthenticationResult } from "../models/authModel";

const endpoint = 'auth'

const register = (username: string, password: string) => {
  return fetch(`${API_URL}/${endpoint}/register`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password }),
  });
};

const login = (username: string, password: string) => {
  return fetch(`${API_URL}/${endpoint}/login`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((res: AuthenticationResult) => {
      if (res.token) {
        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      return res;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userString = localStorage.getItem("user");
  if (userString) return JSON.parse(userString);
  return null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
