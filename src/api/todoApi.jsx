import {TODO_SAVE ,TODO_UpdateDeleteYn ,TODO_UpdateFinishYn,GETTODOLIST,TODO_UpdateContent,TODO_CALENDAR_SAVE} from "./config.jsx";
import axios from 'axios';

export const todoSave = async (todo) => {

  const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
    return (await axios.post(TODO_SAVE ,todo,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token  // 토큰을 헤더에 추가
        },
        withCredentials: true
      }))
  }

  export const updateDeleteYn = async (todoId) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);  // 토큰 확인용

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        withCredentials: true
    };
    // delete 요청에서는 config를 세 번째가 아닌 두 번째 파라미터로 전달
    return await axios.delete(`${TODO_UpdateDeleteYn}/${todoId}`, config);
};

export const updateFinishYn = async (todoId) => {
  const token = localStorage.getItem('token');
  console.log('Sending todoId:', todoId); // todoId 값 확인
  console.log('Full URL:', `${TODO_UpdateFinishYn}/${todoId}`); // 전체 URL 확인
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    withCredentials: true
  };

  try {
    const response = await axios.patch(`${TODO_UpdateFinishYn}/${todoId}`, {}, config);
    return response;
  } catch (error) {
    console.error('Error details:', error.response); // 자세한 에러 정보 확인
    throw error;
  }
};

export const getTodoList = async () => {
  const token = localStorage.getItem('token');
  
  try {
      const response = await axios.get(`${GETTODOLIST}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          withCredentials: true
      });
      return response;
  } catch (error) {
      console.error('Error details:', error.response);
      throw error;
  }
};

export const updateContent = async (todoId, content) => {
  const token = localStorage.getItem('token');
  
  try {
      const response = await axios.patch(`${TODO_UpdateContent}/${todoId}`, 
          content,  // content 직접 전송
          {
              headers: {
                  'Content-Type': 'text/plain',  // 문자열을 보내므로 text/plain
                  'Authorization': token
              },
              withCredentials: true
          }
      );
      return response;
  } catch (error) {
      console.error('Error details:', error.response);
      throw error;
  }
};

export const todoCalendarSave = async (todo) => {

  const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
    return (await axios.post(TODO_CALENDAR_SAVE ,todo,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token  // 토큰을 헤더에 추가
        },
        withCredentials: true
      }))
  }