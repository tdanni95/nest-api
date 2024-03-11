import { API_URL } from '../constants/urls';

const register = (username: string, password: string) => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

const login = (username: string, password: string) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json())
  .then((res) => {
    if(res.token){

    }
  })
};


