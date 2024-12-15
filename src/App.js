import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Todo from './components/Todo';
import Calendar from './components/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;