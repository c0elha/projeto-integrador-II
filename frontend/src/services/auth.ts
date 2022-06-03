import {  destroyCookie } from 'nookies'
import { api } from './api';
const prefix = 'user';

type SignInRequestData = {
  username: string;
  password: string;
};

type SignUpRequestData = {
  name: string;
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

export async function signUpRequest(data: SignUpRequestData) {
  console.log('signUpRequest data', data);
  // let token = null;
  // let refresh = null;

  // await api.post(`${prefix}/token/`, data).then(({ data }) => {
  //   token = data.access;
  //   refresh = data.refresh;
  // });

  // return {
  //   token,
  //   refresh,
  // };
}

export async function recoverUserInformation() {
  let user = null;
  
  await api
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
