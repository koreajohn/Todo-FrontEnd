import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2 } from 'lucide-react';
import { calendarSave, getCalendarList, deleteCalendar, updateCalendar, todoCalendarList,calendarTodoSave } from '../api/calendarApi';
import { todoCalendarSave } from '../api/todoApi';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ content: '', date: '' });
  const [calendarEvents, setCalendarEvents] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 // 상세보기/수정 모달을 위한 상태 추가
 const [showEventDetail, setShowEventDetail] = useState(false);
 const [selectedEvent, setSelectedEvent] = useState(null);
 const [isEditing, setIsEditing] = useState(false);
  // JWT 토큰에서 사용자 정보 가져오기
    // 컴포넌트 마운트 시 로그인 체크

 // 인증 체크 - 한 번만 실행
 // 첫 번째 useEffect - 인증 체크
useEffect(() => {
  const token = localStorage.getItem('token');
  
  if (!token || token === 'undefined') {
    localStorage.removeItem('token'); // 잘못된 토큰 제거
    alert('로그인이 필요합니다.');
    window.location.href = '/'; // navigate 대신 window.location.href 사용
    return;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payload = JSON.parse(jsonPayload);
    setUsername(payload.username);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Token decode error:', error);
    localStorage.removeItem('token');
    window.location.href = '/'; // navigate 대신 window.location.href 사용
  }
}, []); // 의존성 배열 비움
 

 // 두 번째 useEffect - 데이터 fetching
useEffect(() => {
  if (!isAuthenticated) return;

  const fetchEvents = async () => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yearMonth = `${currentDate.getFullYear()}-${month}`;
    
    try {
      const response = await getCalendarList(yearMonth);
      console.log(response);
      setCalendarEvents(response.data);
    } catch (error) {
      console.error('Calendar fetch error:', error);
    }
  };
  
  fetchEvents();
}, [currentDate, isAuthenticated]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
      
      
  //     try {
  //         const response = await todoCalendarList();
  //         console.log(response);
  //         console.log('Data:', response.data);
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // };
  
  //   fetchEvents();
  // }, []); // currentDate가 변경될 때만 실행

 




// 이벤트 수정 처리
const handleEventUpdate = async () => {
  if (!selectedEvent.content || !selectedEvent.date) {
    alert('제목과 날짜를 모두 입력해주세요');
    return;
  }

  try {
    await updateCalendar(selectedEvent.id, {
      content: selectedEvent.content,
      date: selectedEvent.date
    });

    // 데이터 갱신
    const date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1);
    const refreshResponse = await getCalendarList(date);
    
    // 모든 상태 업데이트를 Promise.all로 한번에 처리
    await Promise.all([
      setCalendarEvents(refreshResponse.data),
      setShowEventDetail(false),
      setSelectedEvent(null),
      setIsEditing(false)
    ]);

    alert('일정이 수정되었습니다.');
  } catch (error) {
    console.error('일정 수정 실패:', error);
    alert('일정 수정에 실패했습니다');
  }
};



const handleEventDelete = async () => {
  if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
    try {
      const todoId = selectedEvent.id;
      await deleteCalendar(todoId);
      
      // id로 필터링하도록 수정
      setCalendarEvents(calendarEvents.filter(event => event.id !== todoId));
      setShowEventDetail(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제에 실패했습니다');
    }
  }
};

  

  // 달력 관련 함수들
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.content || !newEvent.date) {
        alert('제목과 날짜를 모두 입력해주세요');
        return;
    }
    
    // 선택된 날짜 확인을 위한 로그
    console.log('Selected date:', newEvent.date);
    
    try {
        const response = await calendarTodoSave({
            content: newEvent.content,
            date: newEvent.date  // 날짜가 정확히 전달되는지 확인
        });

        if (response.data) {
            console.log('Server response:', response.data);
            // 새 이벤트를 목록에 추가할 때 서버에서 받은 날짜 사용
            setCalendarEvents([...calendarEvents, response.data]); 
            setNewEvent({ content: '', date: '' });
            setShowEventForm(false);
        }
    } catch (error) {
        console.error('일정 저장 실패:', error);
        alert('일정 저장에 실패했습니다');
    }
};

  // 달력 데이터 생성
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  // 달력 날짜 배열 생성
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }


  // 이벤트 상세보기 처리
const handleEventClick = (event) => {
  setSelectedEvent(event);
  setShowEventDetail(true);
  setIsEditing(false);
};

// 검색 처리 함수
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

// 검색어에 따른 필터링된 이벤트 목록을 얻는 함수
const getFilteredEvents = (events) => {
  return events.filter(event => 
    event.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
};



  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">일정 캘린더</h1>
          {username && (
            <div className="text-right text-green-600">
              <span className="font-medium">{username}</span>님
            </div>
          )}
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setShowEventForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            일정 추가
          </button>
        </div>

 {/* 검색창 */}
 <div className="flex justify-center mb-4">
    <div className="relative w-96">
      <input
        type="text"
        placeholder="일정 검색..."
        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
  </div>




        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} className="text-center font-semibold py-2 border-b">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`
                min-h-[100px] p-2 border rounded-lg
                ${day ? 'hover:bg-gray-50' : ''}
                ${new Date().getDate() === day && 
                  new Date().getMonth() === currentDate.getMonth() && 
                  new Date().getFullYear() === currentDate.getFullYear()
                  ? 'bg-blue-50 border-blue-200'
                  : 'border-gray-200'}
              `}
            >
            {day && (
  <>
    <div className="font-semibold mb-1">{day}</div>
    {calendarEvents
  // 먼저 검색어로 필터링
  .filter(event => 
    event.content.toLowerCase().includes(searchTerm.toLowerCase())
  )
  // 그 다음 날짜로 필터링
  .filter(event => {
    if (!event || !event.date) return false;
    
    const eventDate = new Date(event.date + 'T00:00:00');
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.getMonth();
    const eventYear = eventDate.getFullYear();
    
    return (
      eventDay === day &&
      eventMonth === currentDate.getMonth() &&
      eventYear === currentDate.getFullYear()
    );
  })
  .map((event, i) => (
    <div
      key={i}
      className="text-sm p-1 mb-1 bg-green-100 text-green-800 rounded truncate cursor-pointer hover:bg-green-200"
      onClick={() => handleEventClick(event)}
    >
      {event.content}
    </div>
  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Event Form Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">새 일정 추가</h3>
              <form onSubmit={handleAddEvent}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      일정 제목
                    </label>
                    <input
                      type="text"
                      value={newEvent.content}
                      onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      날짜
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => {
                          console.log('Date selected:', e.target.value);  // 선택된 날짜 확인
                          setNewEvent({ ...newEvent, date: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                  />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Event Detail/Edit Modal */}
        {showEventDetail && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {isEditing ? '일정 수정' : '일정 상세'}
                </h3>
                <div className="flex gap-2">
                  {!isEditing && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleEventDelete}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    일정 제목
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={selectedEvent.content}
                      onChange={(e) => setSelectedEvent({
                        ...selectedEvent,
                        content: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
                      {selectedEvent.content}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    날짜
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={selectedEvent.date}
                      onChange={(e) => setSelectedEvent({
                        ...selectedEvent,
                        date: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowEventDetail(false);
                    setSelectedEvent(null);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {isEditing ? '취소' : '닫기'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleEventUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    수정 완료
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;