import React from 'react';
import { CircleSlash, CheckCircle2, Clock } from 'lucide-react';

const TodoProgress = ({ todos }) => {
  // 완료율 계산
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.finishYn).length;
  const completionRate = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="mb-8 p-4 bg-green-50 rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{totalTodos}</div>
          <div className="text-sm text-gray-600">전체</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{completedTodos}</div>
          <div className="text-sm text-gray-600">완료</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CircleSlash className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{totalTodos - completedTodos}</div>
          <div className="text-sm text-gray-600">미완료</div>
        </div>
      </div>
      
      <div className="relative pt-4">
        <div className="text-right mb-2">
          <span className="text-2xl font-bold text-green-600">{completionRate}%</span>
          <span className="text-sm text-gray-600 ml-1">완료</span>
        </div>
        <div className="overflow-hidden h-3 rounded-full bg-gray-200">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoProgress;