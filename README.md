프로젝트 명
Todo list & Calendar 앱
소개
이 앱은 Todo List와 Calendar 에서 일정을 등록하고 양방향으로 확인 가능한 Application 입니다.
실행 방법
1. 폴더생성 후 Git Gash Here 클릭 
2. git clone -b master https://github.com/koreajohn/Todo-FrontEnd.git 
3. VsCoke 또는 Intellij 등 작업가능한 툴에서 오픈
4. 작업툴 안에서 터미널 생성 후 해당 모듈 설치 npm install react-scripts
5. 터미널에서 npm start
6. 
주력으로 사용한 컴포넌트 및 사용 이유 
1. 상태 관리 컴포넌트
useState: Todo 목록, 캘린더 이벤트, 입력값 등의 데이터 상태를 관리
useEffect: 초기 데이터 로딩, JWT 토큰 검증, API 호출 등을 처리
2. 사용자 입력 처리 컴포넌트
useRef: 입력 필드 포커스 관리와 DOM 접근
3. 라우팅 컴포넌트
useNavigate: 페이지 이동 처리 (인증 실패 시 리다이렉트)
4. UI 컴포넌트 (Lucide React)
직관적인 아이콘 사용으로 UX 향상
모던한 디자인 시스템 구축
5. 커스텀 컴포넌트
진행상황을 시각화하는 재사용 가능한 컴포넌트
관심사 분리와 코드 재사용성 향상
선택 이유:
1. 상태 관리의 효율성
React의 Hook 시스템을 활용한 효율적인 상태 관리
비동기 작업의 깔끔한 처리
2.사용자 경험 최적화
자동 포커스
즉각적인 UI 업데이트
직관적인 아이콘 사용
3.코드 구조화
관심사 분리
재사용 가능한 컴포넌트
유지보수 용이성
4. 보안성
JWT 토큰 기반 인증
라우팅 보호
API 에러 처리
5. 성능 최적화
컴포넌트 단위 렌더링
필요한 경우에만 상태 업데이트
