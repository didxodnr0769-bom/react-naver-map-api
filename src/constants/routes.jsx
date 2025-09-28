import OverviewPage from "@/pages/OverviewPage";
import IntegrationPage from "@/pages/IntegrationPage";

import MapBasic from "@/pages/map/MapBasic";
import MapControl from "@/pages/map/MapControl";
import CustomMarker from "@/pages/marker/CustomMarker";
// URL 라우트 상수 정의
export const ROUTES = {
  // 개요
  HOME: "/",
  INTEGRATION: "/integration",
  // map
  MAP_BASIC: "/map/basic",
  MAP_CONTROL: "/map/control",
  // 그룹2
  GROUP2_TEST1: "/group2/test1",
  GROUP2_TEST2: "/group2/test2",
  // marker
  CUSTOM_MARKER: "/marker/custom",
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
  {
    path: ROUTES.MAP_CONTROL,
    element: <MapControl />,
    title: "지도-컨트롤",
    group: "map",
  },
  {
    path: ROUTES.CUSTOM_MARKER,
    element: <CustomMarker />,
    title: "마커-커스텀",
    group: "marker",
  },
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
  // 마커
  {
    id: "marker",
    title: "마커",
    items: ROUTE_CONFIG.filter((route) => route.group === "marker").map(
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
