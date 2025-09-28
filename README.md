# React 테스트 프로젝트 템플릿

## 개요

이 프로젝트는 테스트용 프로젝트를 생성하기 위한 템플릿입니다.  
문서 중심의 UI와 마크다운 기반 콘텐츠 표출을 지원합니다.

## 주요 기능

- **문서형태 UI**: 마크다운 파일을 기반으로 한 문서 중심 인터페이스
- **반응형 사이드바**: 모바일/데스크톱 대응하는 접을 수 있는 네비게이션
- **그룹 기반 메뉴**: 자동 생성되는 메뉴 구조
- **라우트 자동화**: 설정 기반 라우트 자동 생성

## 기술 스택

- **React 19**: 최신 React 버전
- **Vite 7.1.2**: 빠른 빌드 도구
- **React Router DOM**: 클라이언트 사이드 라우팅
- **React Markdown**: 마크다운 렌더링
- **Tailwind CSS**: 유틸리티 기반 스타일링

## 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── Header.jsx       # 상단 헤더 (햄버거 메뉴, 제목)
│   ├── SideBar.jsx      # 사이드바 네비게이션
│   ├── Markdown.jsx     # 마크다운 렌더링 컴포넌트
├── pages/               # 페이지 컴포넌트
│   ├── OverviewPage.jsx # 개요 페이지
│   ├── IntegrationPage.jsx # 연동 방법 페이지
│   └── group1/          # 그룹별 테스트 페이지들
├── contexts/            # React Context
│   └── PageContext.jsx  # 현재 페이지 정보 관리
├── constants/           # 상수 정의
│   └── routes.jsx       # 라우트 설정 및 메뉴 구조
├── styles/              # 스타일 파일
│   └── reset.css        # CSS 리셋
├── App.jsx              # 메인 앱 컴포넌트
└── main.jsx             # 앱 진입점

public/
└── docs/                # 마크다운 문서들
    ├── 개요/
    ├── 그룹1/
    └── 그룹2/
```

## 구동 방식

### 1. 애플리케이션 초기화

- `main.jsx`에서 React 앱을 DOM에 마운트
- CSS 리셋과 글로벌 스타일 로드
- `App.jsx`가 최상위 컴포넌트로 렌더링

### 2. 라우팅 시스템

```javascript
// routes.jsx에서 정의된 ROUTE_CONFIG를 기반으로 자동 라우팅
ROUTE_CONFIG = [
  { path: "/", element: <OverviewPage />, title: "개요", group: "overview" },
  // ... 더 많은 라우트
];
```

### 3. 메뉴 구조 자동 생성

```javascript
// ROUTE_CONFIG의 group 속성을 기반으로 MENU_GROUPS 자동 생성
MENU_GROUPS = ROUTE_CONFIG.filter((route) => route.group === "overview").map(
  (route) => ({ path: route.path, title: route.title }),
);
```

### 4. 상태 관리

- **PageContext**: 현재 페이지 정보 (제목, 그룹) 관리
- **App 컴포넌트**: 사이드바 열림/닫힘 상태 관리
- **SideBar**: 메뉴 그룹 접기/펼치기 상태 관리

### 5. 반응형 동작

- **데스크톱 (768px 이상)**: 사이드바 기본 열림
- **모바일 (768px 이하)**: 사이드바 기본 닫힘, 메뉴 선택 시 자동 닫힘

## 사용 방법

### 1. 새로운 그룹 추가

1. `src/constants/routes.jsx`의 `ROUTE_CONFIG`에 새 라우트 추가
2. `group` 속성을 새 그룹명으로 설정
3. 해당 페이지 컴포넌트 생성
4. `public/docs/` 하위에 마크다운 문서 생성

### 2. 새로운 테스트 페이지 추가

```javascript
// routes.jsx 예시
{
  path: "/group3/test1",
  element: <Group3Test1 />,
  title: "그룹3-테스트1",
  group: "group3",
}
```

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 실행
```

## 특징

- **설정 기반 구조**: 라우트와 메뉴가 설정 파일에서 자동 생성
- **문서 중심**: 마크다운 파일을 통한 콘텐츠 관리
- **반응형 디자인**: 모바일/데스크톱 최적화
- **확장성**: 새로운 그룹과 페이지를 쉽게 추가 가능
