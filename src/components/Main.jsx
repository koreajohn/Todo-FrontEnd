import React, { useState, useEffect } from 'react';
import { Calendar, List, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTodoList } from '../api/todoApi';

const Main = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([
    { id: 1, title: "업무 할일 (Todo)", count: 0, type: "work" },
    { id: 2, title: "개인 일정 (Calendar)", count: 0, type: "personal" }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        setUsername(payload.username);
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await getTodoList();
        if (response.data) {
          const formattedTodos = response.data.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt).toLocaleString('ko-KR')
          }));
          setTodos(formattedTodos);
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          navigate('/');
        }
      }
    };
    
    if (isLoggedIn) {
      loadTodos();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // todos의 전체 개수로 count 업데이트
    const totalCount = todos.length;
    
    setLists(prevLists => prevLists.map(list => ({
      ...list,
      count: totalCount
    })));
  }, [todos]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setTodos([]);
    navigate('/');
  };

  const getIcon = (type) => {
    return type === 'work' 
      ? <List className="w-6 h-6 text-blue-500" />
      : <Calendar className="w-6 h-6 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">TODO & CALENDAR</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">{username}님</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    로그인
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">나의 일정 관리</h1>
          <p className="text-gray-600 mt-2">원하는 일정 리스트를 선택하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lists.map((list) => (
            <div 
              key={list.id}
              className={`
                cursor-pointer transform transition-all duration-200 hover:scale-105
                bg-white rounded-lg shadow-md p-6
                ${selectedList === list.id ? 'ring-2 ring-green-500' : ''}
              `}
              onClick={() => setSelectedList(list.id)}
            >
              <div className="flex items-center justify-between mb-4">
                {getIcon(list.type)}
                <span className="bg-blue-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {list.count}개
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{list.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                진행중인 일정: {list.count}개
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-green-600 
                      transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 
                      focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (selectedList === 1) navigate('/todo');
              if (selectedList === 2) navigate('/calendar');
            }}
            disabled={!selectedList}
          >
            선택한 리스트 열기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;