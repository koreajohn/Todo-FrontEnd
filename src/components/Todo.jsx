import React, { useState ,useEffect,useRef} from 'react';
import { Trash2, Check, Plus, X } from 'lucide-react';
import axios from 'axios';
import { todoSave,updateDeleteYn ,updateFinishYn,getTodoList,updateContent} from '../api/todoApi'
import { calendarTodoSave} from '../api/calendarApi'

import { useNavigate } from 'react-router-dom';
import TodoProgress from './TodoProgress';  // 경로는 실제 파일 위치에 맞게 조정


const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [username, setUsername] = useState('');  // username 상태 추가
    const navigate = useNavigate();
    const todoRef = useRef(null); // 이메일 입력 필드를 위한 ref 생성
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 todo의 id
    const [editText, setEditText] = useState(''); // 수정 중인 텍스트
    const editInputRef = useRef(null); // 수정 input을 위한 ref

    useEffect(() => {
        if (todoRef.current) {
            todoRef.current.focus(); // 이메일 input에 포커스
        }
      }, []); // 빈 배열로 전달하면 컴포넌트 최초 렌더링 시 한 번만 실행

    // 컴포넌트 마운트 시 사용자 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // 토큰 확인
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const payload = JSON.parse(jsonPayload);
                console.log('Decoded payload:', payload); // 디코딩된 페이로드 확인
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
                        createdAt: new Date(todo.createdAt).toLocaleString('ko-KR')  // 한국 시간으로 변환
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
    
        loadTodos();
    }, []); // 컴포넌트 마운트 시 한 번만 실행
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        
        const newTodo = {
            content: inputText,
            date: new Date(),
            //date: new Date(new Date().setDate(new Date().getDate() + 1)),
            completed: false
        };
        
        try {
            const response = await calendarTodoSave(newTodo);
            console.log('서버 응답 전체:', response);
            console.log('Todo 데이터:', response.data);
            
            const savedTodo = {
                ...response.data,
                // id 필드명이 다를 경우를 대비해 로그 추가
                id: response.data.id || response.data.todoId || response.data.todo_id,
                createdAt: new Date(response.data.createdAt).toLocaleString('ko-KR')
            };
            
            console.log('저장된 Todo:', savedTodo);
            setTodos([...todos, savedTodo]);
            setInputText('');
            
        } catch (error) {
            console.error('에러:', error);
            if (error.response?.status === 401) {
                alert('로그인이 필요합니다.');
            }
        }
    };

    const toggleTodo = async (id) => {
        try {
            await updateFinishYn(id);
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, finishYn: !todo.finishYn } : todo
            ));
        } catch (error) {
            console.error('Toggle error:', error);
            if (error.response?.status === 401) {
                alert('로그인이 필요합니다.');
            }
        }
    };

    const deleteTodo = async (id) => {
        try {
            await updateDeleteYn(id);  // id를 전달하도록 수정
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
            if (error.response?.status === 401) {
                alert('로그인이 필요합니다.');
            }
        }
    };


     // 수정 모드 시작
const startEditing = (todo) => {
    if (!todo.finishYn) { // 완료되지 않은 항목만 수정 가능
        setEditingId(todo.id);
        setEditText(todo.content);
    }
};

// 수정 취소
const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
};

// 수정 완료
const handleUpdate = async (id) => {
    if (!editText.trim()) {
        cancelEditing();
        return;
    }
console.log(editText);
console.log(id);
    try {
        await updateContent(id, editText);
        
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, content: editText } : todo
        ));
        setEditingId(null);
        setEditText('');
    } catch (error) {
        console.error('Update error:', error);
        if (error.response?.status === 401) {
            alert('로그인이 필요합니다.');
        }
    }
};

// Enter 키로 수정 완료, Esc 키로 수정 취소
const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
        handleUpdate(id);
    } else if (e.key === 'Escape') {
        cancelEditing();
    }
};
    return (
        <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">할 일 목록</h1>
                {username && (
                <div className="text-right text-green-600 mb-4">
                    <span className="font-medium">{username}</span>님
                </div>
                 )}
            </div>

            {/* 여기에 TodoProgress 추가 */}
            <TodoProgress todos={todos} />



        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={todoRef} // 할일 input에 ref 추가
            placeholder="할 일을 입력하세요"
            className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
            <Plus className="w-6 h-6"></Plus>
            </button>
        </form>

        {/* 할 일 목록 */}
        <div className="space-y-3">
            {todos.map(todo => (
                <div 
                    key={todo.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border border-green-300 ${
                        todo.finishYn ? 'bg-gray-50' : 'bg-white'
                    }`}
                >
                    <button 
                        onClick={() => toggleTodo(todo.id)}
                        className={`p-2 rounded-full transition-colors ${
                            todo.finishYn 
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                    >
                        <Check className="w-5 h-5" />
                    </button>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-blue-500">#{todo.id}</span>
                            {editingId === todo.id ? (
                                <div className="flex-1 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
                                        ref={editInputRef}
                                        className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => handleUpdate(todo.id)}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className="p-1 text-gray-400 hover:bg-gray-50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <p
                                    className={`flex-1 cursor-pointer hover:text-green-600 ${
                                        todo.finishYn ? 'line-through text-gray-400' : ''
                                    }`}
                                    onClick={() => startEditing(todo)}
                                >
                                    {todo.content}
                                </p>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{todo.createdAt}</p>
                    </div>

                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            ))}

            {todos.length === 0 && (
            <div className="text-center py-6 text-gray-500">
                할 일이 없습니다. 새로운 할 일을 추가해보세요!
            </div>
            )}
        </div>
        </div>
    </div>
    );
};

export default TodoApp;