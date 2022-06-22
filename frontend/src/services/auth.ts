import {  destroyCookie } from 'nookies'
import { api } from './api';
import { getAPIClient } from './axios';
const prefix = 'user';

type SignInRequestData = {
  username: string;
  password: string;
};

type RegisterRequestData = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password_confirmation: string;
};

export async function signInRequest(data: SignInRequestData) {
  let token = null;
  let refresh = null;

  await api.post(`${prefix}/token/`, data).then(({ data }) => {
    token = data.access;
    refresh = data.refresh;
  });

  return {
    token,
    refresh,
  };
}

export async function registerRequest(data: RegisterRequestData) {
  
  let user = null;

  await api.post(`${prefix}/register/`, data)
    .then(({ data }) => {
      user = data
    });

  return {
    user : user
  }
}

export async function recoverUserInformation() {
  let user = null;

  await getAPIClient()
    .get(`${prefix}/me/`).then(({ data }) => {
      user = data;
    })
    .catch(() => {
      destroyCookie(null, 'nextauth.token');
    })

  return {
    user: user,
  };
}
