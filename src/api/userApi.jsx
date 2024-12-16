import { LOGIN, SIGNUP } from "./config.jsx";
import axios from 'axios';

// 로그인 함수
export const login = async (member) => {
  try {
    console.log('로그인 시도:', member);
    console.log('API 엔드포인트:', LOGIN);
    
    const response = await axios.post(LOGIN, member, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      withCredentials: true,
      credentials: 'include'
    });
    
    console.log('로그인 성공:', response);
    return response;
  } catch (error) {
    console.error("로그인 에러:", {
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

// 회원가입 함수
export const signUp = async (member) => {
  try {
    console.log('회원가입 시도:', member);
    console.log('API 엔드포인트:', SIGNUP);
    
    const response = await axios.post(SIGNUP, member, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      withCredentials: true,
      credentials: 'include'
    });
    
    console.log('회원가입 성공:', response);
    return response;
  } catch (error) {
    console.error("회원가입 에러:", {
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