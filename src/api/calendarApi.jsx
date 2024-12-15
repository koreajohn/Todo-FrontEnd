import {CALENDAR_SAVE,GETCALENDARLIST,CALENDAR_UpdateDeleteYn,CALENDAR_UpdateContent,GETTODO_CALENDAR_LIST,CALENDAR_TODO_SAVE} from "./config.jsx";

import axios from 'axios';

export const calendarSave = async (calendar) => {

    const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
      return (await axios.post(CALENDAR_SAVE ,calendar,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token  // 토큰을 헤더에 추가
          },
          withCredentials: true
        }))
    }

    export const getCalendarList = async (date) => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await axios.post(`${GETCALENDARLIST}`, date,{
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

      // 새로 추가할 함수들
      export const updateCalendar = async (calendarId, content) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.patch(
                `${CALENDAR_UpdateContent}/${calendarId}`, 
                content,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    withCredentials: true
                }
            );
            return response;
        } catch (error) {
            throw error; 
        }
     };

     export const deleteCalendar = async (calenderId) => {
        const token = localStorage.getItem('token');
        try {
            console.log(calenderId);
            console.log(calenderId);
            const response = await axios.delete(
                `${CALENDAR_UpdateDeleteYn}/${calenderId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    withCredentials: true
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
     };

     export const todoCalendarList = async () => {

        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
          return (await axios.get(GETTODO_CALENDAR_LIST ,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token  // 토큰을 헤더에 추가
              },
              withCredentials: true
            }))
        }

        export const calendarTodoSave = async (todo) => {

            const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
              return (await axios.post(CALENDAR_TODO_SAVE ,todo,{
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token  // 토큰을 헤더에 추가
                  },
                  withCredentials: true
                }))
            }

        