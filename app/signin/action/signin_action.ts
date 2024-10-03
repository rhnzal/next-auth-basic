'use server';

import unexpectedError from '@/app/error/unexpected-error';
import axios from 'axios';

export async function signin(email: string, password: string) {
  console.log('signin in...');


  return axios.post(
    'http://192.168.1.10:8090/api/collections/users/auth-with-password',
    {
      identity: email,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(function (response) {
    console.log('success');
    console.log(response.data);
    return response.data;

  }).catch(function (error) {
    console.log('error' + error)
    if (error.response) {
      console.log(error.request);
      console.log(error.response.data);
      return error.response.data;

    } else if (error.request) {
      console.log(error.request);
      return unexpectedError;

    } else {
      console.log('Error', error.message);
      return unexpectedError;
    }
  })
}