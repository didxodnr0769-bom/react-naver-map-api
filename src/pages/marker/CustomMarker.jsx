// src/pages/marker/CustomMarker.jsx
import MarkdownComponent from "@/components/Markdown";
import { useEffect, useRef, useState } from "react";

/**
 * 여러가지 마커를 표시하는 예제입니다.
 */
const CustomMarker = () => {
  const mapElement = useRef(null);
  const [markdown, setMarkdown] = useState("");

  // markdown 파일을 fetch로 가져옵니다.
  useEffect(() => {
    fetch(`/docs/marker/마커_커스텀.md`)
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
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
      mapTypeId: naver.maps.MapTypeId.NORMAL,
    };

    // 지도를 생성합니다.
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 지도에 마커를 추가합니다.
    // 1. 기본 마커
    new naver.maps.Marker({
      position: location,
      map,
    });

    // 2. 원형 그라데이션 마커
    const gradientMarker = new naver.maps.LatLng(37.5665, 126.9781);
    new naver.maps.Marker({
      map,
      position: gradientMarker,
      icon: {
        content: `
          <div style="
            width: 30px; 
            height: 30px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%; 
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 60px;
          ">📍</div>
        `,
        size: new naver.maps.Size(30, 30),
        anchor: new naver.maps.Point(15, 15),
      },
    });

    // 3.현대적인 카드 스타일 마커
    const cardMarker = new naver.maps.LatLng(37.5669, 126.9785);
    new naver.maps.Marker({
      map,
      position: cardMarker,
      icon: {
        content: `
          <div style="
            background: white;
            border-radius: 8px;
            padding: 8px 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 1px solid #e1e5e9;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            white-space: nowrap;
            position: relative;
          ">
            🏢 서울시청
            <div style="
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid white;
            "></div>
          </div>
        `,
        size: new naver.maps.Size(120, 40),
        anchor: new naver.maps.Point(60, 40),
      },
    });
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

export default CustomMarker;
