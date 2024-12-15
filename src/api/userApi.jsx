import {LOGIN,SIGNUP} from "./config.jsx";
import axios from 'axios';

export const login = async (member) => {
    return (await axios.post(LOGIN ,member,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }))
  }
  
  export const signUp = async (member) => {
    return (await axios.post(SIGNUP,member,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }))
  }