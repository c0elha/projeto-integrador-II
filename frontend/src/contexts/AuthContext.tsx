import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import { useContext } from 'react';
import Router from 'next/router'

import { recoverUserInformation, signInRequest, signUpRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name: string;
  username: string;
}

type SignInData = {
  username: string;
  password: string;
}

type SignUpData = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password_confirmation: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  recoverUser: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;
  
  useEffect(() => {
    recoverUser();
  }, [])

  async function recoverUser() {
    
    const { 'nextauth.token': token } = parseCookies()
 
    if (token) {
      recoverUserInformation()
      .then(response => {
        setUser(response.user)
      })
    }
  }

  async function signIn({ username, password }: SignInData) {
    
    const {token, refresh} = await signInRequest({
      username,
      password,
    });

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
      path: '/',
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    await recoverUser();

    Router.push('/');
  }

  async function signUp({name, username, password, password_confirmation}: SignInData) {
    // console.log('signUp', signUp);
    const data = await signUpRequest({name, username, password, password_confirmation});
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
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}