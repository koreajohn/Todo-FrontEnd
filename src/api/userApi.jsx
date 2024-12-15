import {LOGIN,SIGNUP} from "./config.jsx";
import axios from 'axios';

export const login = async (member) => {
  try {
      console.log('Trying to login with:', member);
      console.log('API endpoint:', LOGIN);
      
      const response = await axios.post(LOGIN, member, {
          headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true
      });
      
      console.log('Login successful:', response);
      return response;
  } catch (error) {
      console.error("Login error details:", {
          message: error.message,
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
          headers: error.config?.headers,
          status: error.response?.status,
          responseData: error.response?.data
      });
      throw error;
  }
};
  export const signUp = async (member) => {
    return (await axios.post(SIGNUP,member,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }))
  }