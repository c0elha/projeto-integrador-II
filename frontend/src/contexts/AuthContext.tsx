import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useContext } from 'react';
import Router from 'next/router'

import { recoverUserInformation, signInRequest, registerRequest } from "../services/auth";
import { api } from "../services/api";
import axios from "axios";

type User = {
  name: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

type SignInData = {
  username: string;
  password: string;
}

type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  recoverUser: any
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user;

  useEffect(() => {
    recoverUser();
  }, [])

  async function recoverUser() {

    const { 'nextauth.token': token } = parseCookies()

    setLoading(true);

    if (token) {
      await recoverUserInformation()
        .then(response => {
          setUser(response.user)
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  async function signIn({ username, password }: SignInData) {

    const { token, refresh } = await signInRequest({
      username,
      password,
    });

    if (token && refresh) {
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 48, // 2 dias
        path: '/',
      })

      setCookie(undefined, 'nextauth.token-refresh', refresh, {
        maxAge: 60 * 60 * 48, // 2 dias
        path: '/',
      })
    }

    setTimeout(() => 200);

    await recoverUser();

    Router.push('/');
  }

  async function register({ first_name, last_name, username, email, password, password_confirmation }: RegisterData) {

    const data = await registerRequest({ first_name, last_name, username, email, password, password_confirmation });

    const { token, refresh } = await signInRequest({
      username,
      password,
    });

    if (token && refresh) {
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 48, // 2 dias
        path: '/',
      })

      setCookie(undefined, 'nextauth.token-refresh', refresh, {
        maxAge: 60 * 60 * 48, // 2 dias
        path: '/',
      })
    }

    let configs = {
      baseURL: process.env.NEXT_PUBLIC_URL_API
    };

    if (token && axios.defaults.headers != null) {
      configs = {
        ...configs, ...{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      }
    }

    const api = axios.create(configs);

    api
      .get(`user/me/`).then(({ data }) => {
        setUser(data);
        window.location.href = '/'  
      })
      .catch(() => {
        destroyCookie(null, 'nextauth.token');
      })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn, register, recoverUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}