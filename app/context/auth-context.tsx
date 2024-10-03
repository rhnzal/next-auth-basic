'use client';

import { createContext, useEffect, useState } from "react";
import Profile from "../types/profile";

export const AuthContext = createContext<any>(null);

export default function AuthProvider( {children} : {children : any}) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedProfile =localStorage.getItem('profile');

    if (storedProfile) {
      const profile = new Profile(JSON.parse(storedProfile));

      setProfile(profile);
    }
  }, [])

  return (
    <AuthContext.Provider value={{profile, setProfile}}>
      {children}
    </AuthContext.Provider>
  )
}