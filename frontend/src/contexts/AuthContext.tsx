import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import { useContext } from 'react';
import Router from 'next/router'

import { recoverUserInformation, signInRequest, registerRequest } from "../services/auth";
import { api } from "../services/api";

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
  user: User;
  signIn: (data: SignInData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  recoverUser: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
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
      recoverUserInformation()
      .then(response => {
        setUser(response.user)
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }

  async function signIn({ username, password }: SignInData) {
    
    const {token, refresh} = await signInRequest({
      username,
      password,
    });
    
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 48, // 2 dias
      path: '/',
    })

    setCookie(undefined, 'nextauth.token-refresh', refresh, {
      maxAge: 60 * 60 * 48, // 2 dias
      path: '/',
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    await recoverUser();

    Router.push('/');
  }

  async function register({first_name, last_name, username, email, password, password_confirmation}: SignInData) {
    
    const data = await registerRequest({first_name, last_name, username,email, password, password_confirmation});
    console.log('data', data);
    // setCookie(undefined, 'nextauth.token', token, {
    //   maxAge: 60 * 60 * 1, // 1 hour
    //   path: '/',
    // })

    // api.defaults.headers['Authorization'] = `Bearer ${token}`;

    // await recoverUser();

    // Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}