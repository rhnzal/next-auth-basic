"use client";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, message, Space } from "antd";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Profile from "../types/profile";
import Cookie from 'js-cookie';

export default function Navbar() {
  const {profile, setProfile} = useContext(AuthContext);

  function handleSignout() {
    localStorage.clear();
    Cookie.remove('token');
    setProfile(null);

    message.info("You have been signed out");
  }

  return (
    <div className="container max-w-none h-14 bg-white shadow-sm flex items-strech justify-between px-32 sticky top-0 z-50">
      <Link className="" href={"/"}>
        <div className="font-medium container px-3 h-full place-content-center">
          Logo
        </div>
      </Link>

      <div className="flex items-stretch">
        <Link className="text-sm" href={"/"}>
          <div className="font-medium px-3 h-full w-27 place-content-center hover:bg-accent-color hover:text-primary-color">
            Order PCB
          </div>
        </Link>

        <Link href={"/cart"}>
          <div className="container px-4 h-full place-content-center hover:bg-accent-color hover:text-primary-color">
            <ShoppingCartOutlined className="text-xl" />
          </div>
        </Link>

        {profile != null ? <UserNavbarMenu handleSignout={handleSignout} profile={profile}/> : <GuestNavbarMenu/>}

        {/* <Link className="text-base" href={'/signin'}>
          <div className="font-medium container px-3 w-20 h-full place-content-center hover:bg-accent-color hover:text-primary-color">
            Sign in
          </div>
        </Link>

        <div className="container pl-3 place-content-center">
          <Button className="font-medium ml-1 text-lg py-5" onClick={goToRegister}>Register</Button>
        </div> */}
      </div>
    </div>
  );
}

function UserNavbarMenu({handleSignout, profile} : {handleSignout: any, profile : Profile}) {
  const items: MenuProps['items'] = [
    {
      label: <Link href={"/"}>Order History</Link>,
      key: '0'
    },
    {
      label: <a onClick={handleSignout} className="text-red-600">Sign out</a>,
      key: '1'
    },
  ]

  return (
    <div className=" flex items-center px-3">
      <Avatar 
        className="mr-3"
      />

      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space className="text-sm">
            {profile.name}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

function GuestNavbarMenu() {
  const router = useRouter();

  function goToRegister() {
    // router.push("/register");
  }
  
  return (
    <div className="flex">
      <Link className="text-base" href={'/signin'}>
        <div className="font-medium container px-3 w-20 h-full place-content-center hover:bg-accent-color hover:text-primary-color">
          Sign in
        </div>
      </Link>

      <div className="container pl-3 place-content-center">
        <Button className="font-medium ml-1 text-base py-4" onClick={goToRegister}>Register</Button>
      </div>
    </div>
  )
}