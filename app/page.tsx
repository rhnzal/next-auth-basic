'use client';

import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";

export default function Home() {
  const { profile, setProfile} = useContext(AuthContext);

  return (
    <div>
      <h1>profile: </h1>
      <p>username: {profile?.username ?? '-'}</p>
      <p>email: {profile?.email ?? '-'}</p>
    </div>
  );
}
