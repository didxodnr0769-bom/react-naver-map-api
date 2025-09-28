import OverviewPage from "@/pages/OverviewPage";
import IntegrationPage from "@/pages/IntegrationPage";

// import Group1Test1 from "@/pages/group1/Group1Test1";
//   import Group1Test2 from "@/pages/group1/Group1Test2";
//   import Group2Test1 from "@/pages/group2/Group2Test1";
//   import Group2Test2 from "@/pages/group2/Group2Test2";
import MapBasic from "@/pages/map/MapBasic";
// URL 라우트 상수 정의
export const ROUTES = {
  // 개요
  HOME: "/",
  INTEGRATION: "/integration",
  // map
  MAP_BASIC: "/map/basic",
  // 그룹2
  GROUP2_TEST1: "/group2/test1",
  GROUP2_TEST2: "/group2/test2",
};

// 라우트 설정 (path와 element를 모두 포함)
export const ROUTE_CONFIG = [
  {
    path: ROUTES.HOME,
    element: <OverviewPage />,
    title: "개요",
    group: "overview",
  },
  {
    path: ROUTES.INTEGRATION,
    element: <IntegrationPage />,
    title: "연동 방법",
    group: "overview",
  },
  {
    path: ROUTES.MAP_BASIC,
    element: <MapBasic />,
    title: "지도-기본",
    group: "map",
  },
  // {
  //   path: ROUTES.GROUP1_TEST2,
  //   element: <Group1Test2 />,
  //   title: "그룹1-테스트2",
  //   group: "group1",
  // },
  // {
  //   path: ROUTES.GROUP2_TEST1,
  //   element: <Group2Test1 />,
  //   title: "그룹2-테스트1",
  //   group: "group2",
  // },
  // {
  //   path: ROUTES.GROUP2_TEST2,
  //   element: <Group2Test2 />,
  //   title: "그룹2-테스트2",
  //   group: "group2",
  // },
];

// 메뉴 그룹 구조 정의
export const MENU_GROUPS = [
  // 개요
  {
    id: "overview",
    title: "개요",
    items: ROUTE_CONFIG.filter((route) => route.group === "overview").map(
      (route) => ({ path: route.path, title: route.title }),
    ),
  },
  // 지도
  {
    id: "map",
    title: "지도",
    items: ROUTE_CONFIG.filter((route) => route.group === "map").map(
      (route) => ({ path: route.path, title: route.title }),
    ),
  },
  // // 그룹2
  // {
  //   id: "group2",
  //   title: "그룹2",
  //   items: ROUTE_CONFIG.filter((route) => route.group === "group2").map(
  //     (route) => ({ path: route.path, title: route.title }),
  //   ),
  // },
];
