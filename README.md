📅 Todo List & Calendar App

💫 소개

Todo List와 Calendar에서 일정을 등록하고 양방향으로 확인할 수 있는 통합 일정 관리 애플리케이션입니다.

🚀 실행 방법

1️⃣ 프로젝트 클론

원하는 경로에 폴더 생성 후 Git Bash Here 클릭 

git init 

git clone -b master https://github.com/koreajohn/Todo-FrontEnd.git

2️⃣ 프로젝트 설정

VS Code나 IntelliJ 등 선호하는 IDE에서 프로젝트 오픈

필요한 모듈 설치

새로운 터미널 생성 후

npm install react-scripts

3️⃣ 서버 실행
npm start
<br/>

업무할일(Todo): 

1. 일정 등록(등록시 개인일정과 동기화)
   
2. 할일 완료된 글은 체크눌러서 완료처리(실시간 완료율 통계 제공)
 
3. 일정 수정
 
4. 일정 삭제

개인 일정(Calendar): 

1. 일정 등록(등록시 업무할일 과 개인일정에 동기화)

2. 해당 월에 일정 검색 가능

3. 일정 수정 

4. 일정 삭제


🛠️ 기술 스택

<div align="center">
🌟 Tech Stack 🌟
🎨 Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/Tailwind CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=react-router&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Lucide React-808080?style=flat-square&logo=lucide&logoColor=white"/>
🛠️ Tools
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/VS%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white"/>
</div>
</br>

 주요 기능

⚡ 상태 관리
<details>
<summary><b>상세 보기</b></summary>
기능
useState

Todo 목록, 캘린더 이벤트, 입력값 관리
실시간 데이터 상태 업데이트

useEffect

데이터 로딩 및 JWT 토큰 검증
API 통신 처리

사용 이유

컴포넌트 내의 동적 데이터 효율적 관리
상태 변화에 따른 자동 리렌더링
비동기 작업의 부작용 관리
컴포넌트 생명주기 이벤트 처리

</details>
🎯 사용자 입력 처리
</br>
<details>
<summary><b>상세 보기</b></summary>
기능
useRef

입력 필드 포커스 최적화
DOM 요소 직접 접근 관리

사용 이유

불필요한 리렌더링 방지
DOM 요소의 직접적인 조작 가능
포커스 관리를 통한 UX 향상
컴포넌트 생명주기 간 값 유지

</details>
🔄 라우팅
</br>
<details>
<summary><b>상세 보기</b></summary>
기능
useNavigate

페이지 간 이동 처리
인증 실패 시 리다이렉션

사용 이유

SPA 내 페이지 전환의 부드러운 처리
프로그래매틱 네비게이션 구현
보안 관련 리다이렉션 처리
사용자 경험 최적화

</details>
💅 UI/UX
</br>
<details>
<summary><b>상세 보기</b></summary>
기능
Lucide React

모던한 아이콘 시스템
직관적인 사용자 인터페이스

사용 이유

일관된 디자인 언어 제공
SVG 기반의 고품질 아이콘
커스터마이징 용이성
번들 사이즈 최적화

</details>
📊 커스텀 컴포넌트
</br>
<details>
<summary><b>상세 보기</b></summary>
기능
TodoProgress

진행 상황 시각화
재사용 가능한 모듈식 설계

사용 이유

코드 재사용성 극대화
UI 일관성 유지
유지보수 용이성
컴포넌트 기반 개발 지원

</details>
<div align="center">
© 2024 Todo List & Calendar App - Developed with ❤️ by koreajohn
</div>
