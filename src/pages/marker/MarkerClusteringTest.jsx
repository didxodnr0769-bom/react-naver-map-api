// src/pages/marker/MarkerClustering.jsx
import MarkdownComponent from "@/components/Markdown";
import { useEffect, useRef, useState } from "react";
import "./MarkerClustering.js";

/**
 * 마커 클러스터링을 표시하는 예제입니다.
 */
const MarkerClusteringTest = () => {
  const mapElement = useRef(null);
  const [markdown, setMarkdown] = useState("");

  // markdown 파일을 fetch로 가져옵니다.
  useEffect(() => {
    fetch(`/docs/marker/마커_클러스터링.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  // 지도 초기화
  useEffect(() => {
    const { naver } = window;
    // 지도를 표시할 DOM 요소가 없거나 naver 객체가 없다면 지도를 생성하지 않습니다.
    if (!mapElement.current || !naver) return;

    // 지도의 초기 위치와 줌 레벨을 설정합니다.
    const location = new naver.maps.LatLng(37.5665, 126.978); // 서울 시청

    const mapOptions = {
      center: location,
      zoom: 10, // 클러스터링 확인을 위해 줌 아웃
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
      mapTypeId: naver.maps.MapTypeId.NORMAL,
    };

    // 지도를 생성합니다.
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 샘플 마커 데이터 생성 (서울 주요 지역)
    const locations = [
      { lat: 37.5665, lng: 126.978, title: "시청" },
      { lat: 37.5502, lng: 126.9909, title: "동대문" },
      { lat: 37.5797, lng: 126.977, title: "경복궁" },
      { lat: 37.5448, lng: 127.0557, title: "잠실" },
      { lat: 37.5173, lng: 127.0473, title: "강남" },
      { lat: 37.4979, lng: 127.0276, title: "서초" },
      { lat: 37.4843, lng: 127.0323, title: "사당" },
      { lat: 37.5014, lng: 126.9267, title: "여의도" },
      { lat: 37.5219, lng: 126.9244, title: "영등포" },
      { lat: 37.5518, lng: 126.9102, title: "마포" },
      { lat: 37.5636, lng: 126.9748, title: "명동" },
      { lat: 37.5547, lng: 126.9707, title: "을지로" },
      { lat: 37.5394, lng: 126.956, title: "용산" },
      { lat: 37.5814, lng: 127.0097, title: "동대문구청" },
      { lat: 37.6284, lng: 127.0847, title: "중랑구" },
      { lat: 37.6541, lng: 127.0764, title: "도봉구" },
      { lat: 37.6688, lng: 127.0471, title: "성북구" },
      { lat: 37.6061, lng: 127.1092, title: "노원구" },
      { lat: 37.6398, lng: 127.0253, title: "강북구" },
      { lat: 37.5735, lng: 127.0776, title: "성동구" },
      { lat: 37.5311, lng: 127.1003, title: "광진구" },
      { lat: 37.4642, lng: 127.0286, title: "관악구" },
      { lat: 37.4563, lng: 126.9513, title: "금천구" },
      { lat: 37.4265, lng: 126.8962, title: "부천" },
      { lat: 37.3896, lng: 127.1226, title: "성남" },
      { lat: 37.3134, lng: 127.1088, title: "용인" },
      { lat: 37.2636, lng: 127.0286, title: "수원" },
      { lat: 37.6176, lng: 126.8663, title: "고양" },
      { lat: 37.7519, lng: 128.8761, title: "춘천" },
      { lat: 35.8722, lng: 128.6025, title: "대구" },
    ];

    // 마커 배열 생성
    const markers = locations.map((loc) => {
      return new naver.maps.Marker({
        position: new naver.maps.LatLng(loc.lat, loc.lng),
        title: loc.title,
      });
    });

    // 마커 클러스터링 적용
    const markerClustering = new naver.maps.MarkerClustering({
      minClusterSize: 2, // 최소 클러스터 크기
      maxZoom: 13, // 클러스터링할 최대 줌 레벨
      map: map,
      markers: markers,
      disableClickZoom: false, // 클러스터 클릭시 줌 허용
      gridSize: 120, // 클러스터를 형성할 그리드 크기
      icons: [
        {
          // 마커 2-10개
          content:
            '<div style="background: rgba(255, 0, 0, 0.8); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;"></div>',
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(20, 20),
        },
        {
          // 마커 10-100개
          content:
            '<div style="background: rgba(255, 165, 0, 0.8); color: white; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;"></div>',
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 25),
        },
        {
          // 마커 100개 이상
          content:
            '<div style="background: rgba(1, 51, 215, 0.8); color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px;"></div>',
          size: new naver.maps.Size(60, 60),
          anchor: new naver.maps.Point(30, 30),
        },
      ],
      stylingFunction: (clusterMarker, count) => {
        // 클러스터 내 마커 개수에 따라 텍스트 설정
        clusterMarker.getElement().querySelector("div").innerHTML = count;
      },
    });

    // 정리 함수
    return () => {
      if (markerClustering) {
        markerClustering.setMap(null);
      }
    };
  }, []);

  return (
    <div className="map-page">
      {/* 지도 영역 */}
      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default MarkerClusteringTest;
