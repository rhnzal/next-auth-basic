'use client';

import { Button, Form, FormProps, Input, message } from "antd";
import * as SigninAction from './action/signin_action';
import { useContext, useState } from "react";
import Cookie from 'js-cookie';
import Profile from "../types/profile";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/auth-context";

type SigninType = {
  email : string;
  password : string;
}

export default function Page() {
  const [signinLoading, setSigninLoading] = useState<boolean>(false);
  const {setProfile} = useContext(AuthContext);

  const router = useRouter();

  const handleSignin: FormProps<SigninType>['onFinish'] = async (values) => {
    setSigninLoading(true);
    const response = await SigninAction.signin(values.email, values.password);
    setSigninLoading(false);

    if (response.record) {
      const resProfile = new Profile(response.record);
      console.log(resProfile);

      saveToken(response.token);

      // * set profile
      saveProfile(resProfile);
      setProfile(resProfile);

      message.success({content: 'Signin Success', duration: 10});
      router.push('/');
    } else {
      message.error({content: 'Signin Failed', duration: 10});
    }
  }

  function saveToken(token : string) {
    Cookie.set('token', token, { expires: 1 });
  }

  function saveProfile(profile : Profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  return (
    <div className="max-w-2xl align-middle m-auto mt-6">
      <h1>Sign in</h1>
      <Form
        name="signin"
        onFinish={handleSignin}
      >
        <Form.Item<SigninType>
          label='username/email'
          name='email'  
        >
          <Input />
        </Form.Item>

        <Form.Item<SigninType>
          label='password'
          name='password'  
        >
          <Input.Password />
        </Form.Item>

        <Button htmlType="submit" loading={signinLoading}>Sign in</Button>
      </Form>
    </div>
  )
}