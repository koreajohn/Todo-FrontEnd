import { useState ,useEffect ,useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userApi'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const emailRef = useRef(null); // 이메일 입력 필드를 위한 ref 생성

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus(); // 이메일 input에 포커스
    }
  }, []); // 빈 배열로 전달하면 컴포넌트 최초 렌더링 시 한 번만 실행

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
        try {
            console.log('Submitting form data:', formData);
            const response = await login(formData);
            
            console.log('Login response:', response);
           // const token = response.headers['authorization'];
           const token = response.data.token;
            console.log(token);
            if (token) {
                localStorage.setItem('token', token);
                setSubmitStatus('success');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                console.error('No token in response');
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Login error:', {
                message: error.message,
                response: error.response?.data
            });
            alert('비밀번호 또는 아이디를 확인해주세요.');
            setSubmitStatus('error');
        }
    }
};

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            ref={emailRef} // 이메일 input에 ref 추가
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="이메일을 입력하세요"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          로그인
        </button>
      </form>

      <button
        type="button"
        className="w-full mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={handleSignUpClick}
      >
        회원가입
      </button>

      {submitStatus === 'success' &&  (
        <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md">
          로그인 되었습니다!
        </div>
        
      )}
    </div>
  );
};

export default Login;