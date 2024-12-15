 
const Server_IP = process.env.REACT_APP_SERVER_IP;
export const SIGNUP = `${API_SERVER_HOST}/api/signUp`;
export const LOGIN = `${API_SERVER_HOST}/api/login`;

// Todo endpoints
export const TODO_SAVE = `${API_SERVER_HOST}/api/todoSave`;
export const TODO_UpdateDeleteYn = `${API_SERVER_HOST}/api/todoDelete`;
export const TODO_UpdateFinishYn = `${API_SERVER_HOST}/api/todoFinish`;
export const TODO_UpdateContent = `${API_SERVER_HOST}/api/todoUpdate`;
export const GETTODOLIST = `${API_SERVER_HOST}/api/todoList`;

// Calendar endpoints
export const CALENDAR_SAVE = `${API_SERVER_HOST}/api/calendarSave`;
export const GETCALENDARLIST = `${API_SERVER_HOST}/api/calendarList`;
export const CALENDAR_UpdateDeleteYn = `${API_SERVER_HOST}/api/calendarDelete`;
export const CALENDAR_UpdateContent = `${API_SERVER_HOST}/api/calendarUpdate`;

// Todo-Calendar Integration endpoints
export const GETTODO_CALENDAR_LIST = `${API_SERVER_HOST}/api/todoCalendarList`;
export const TODO_CALENDAR_SAVE = `${API_SERVER_HOST}/api/todoCalendarSave`;
export const CALENDAR_TODO_SAVE = `${API_SERVER_HOST}/api/calendarTodoSave`;