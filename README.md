### ⚽ 목표: [react-diary-proto 프로젝트](https://github.com/DINGUNOTE/react-diary-proto)를 응용해서 실제 서비스 구현<br><br>

🎯 <b>페이지 라우팅</b>
- 기본 페이지 라우팅 설정(Home: 일기 리스트, New: 일기 생성 페이지, Edit: 일기 수정 페이지, Diary: 일기 상세 페이지)

🎯 <b>공통 컴포넌트 생성 및 스타일링</b>
- 헤더 : AppHeader.js
- 공통 버튼 : AppButton.js

🎯 <b>상태 관리</b>
- useReducer Hook을 사용해서 일기 데이터 State 관리 로직 생성
- React Context Provider를 사용해서 각 컴포넌트에 State 공급
- React Context PRovider를 중첩으로 사용해서 Dispatch 함수들을 공급
