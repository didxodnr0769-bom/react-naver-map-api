// src/pages/map/MapControl.jsx
import MarkdownComponent from "@/components/Markdown";
import { useEffect, useRef, useState } from "react";

/**
 * 여러가지 지도 컨트롤 예제입니다.
 *  - 지도 이동
 *  - Zoom Level 변경
 *  - 지도 유형 변경
 */
const MapControl = () => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const [markdown, setMarkdown] = useState("");
  const [currentZoom, setCurrentZoom] = useState(17);
  const [mapType, setMapType] = useState("normal");

  // 지도 초기화
  useEffect(() => {
    const { naver } = window;
    // 지도를 표시할 DOM 요소가 없거나 naver 객체가 없다면 지도를 생성하지 않습니다.
    if (!mapElement.current || !naver) return;

    // 지도의 초기 위치와 줌 레벨을 설정합니다.
    const location = new naver.maps.LatLng(37.5665, 126.978); // 서울 시청

    const mapOptions = {
      center: location,
      zoom: currentZoom,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
      mapTypeId: naver.maps.MapTypeId.NORMAL,
    };

    // 지도를 생성합니다.
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;

    // 지도에 마커를 추가합니다.
    new naver.maps.Marker({
      position: location,
      map,
    });

    // 줌 변경 이벤트 리스너
    naver.maps.Event.addListener(map, "zoom_changed", () => {
      setCurrentZoom(map.getZoom());
    });
  }, []);

  // 줌 레벨 변경 함수들
  const zoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 1);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom - 1);
    }
  };

  const setZoomLevel = (level) => {
    if (mapRef.current) {
      mapRef.current.setZoom(level);
    }
  };

  // 특정 위치로 이동 함수들
  const moveToSeoul = () => {
    if (mapRef.current) {
      const seoul = new window.naver.maps.LatLng(37.5665, 126.978);
      mapRef.current.setCenter(seoul);
      mapRef.current.setZoom(15);
    }
  };

  const moveToBusan = () => {
    if (mapRef.current) {
      const busan = new window.naver.maps.LatLng(35.1796, 129.0756);
      mapRef.current.setCenter(busan);
      mapRef.current.setZoom(15);
    }
  };

  const moveToJeju = () => {
    if (mapRef.current) {
      const jeju = new window.naver.maps.LatLng(33.4996, 126.5312);
      mapRef.current.setCenter(jeju);
      mapRef.current.setZoom(15);
    }
  };

  // 지도 유형 변경 함수들
  const changeMapType = (type) => {
    if (mapRef.current) {
      const { naver } = window;
      let mapTypeId;

      switch (type) {
        case "normal":
          mapTypeId = naver.maps.MapTypeId.NORMAL;
          break;
        case "satellite":
          mapTypeId = naver.maps.MapTypeId.SATELLITE;
          break;
        case "hybrid":
          mapTypeId = naver.maps.MapTypeId.HYBRID;
          break;
        case "terrain":
          mapTypeId = naver.maps.MapTypeId.TERRAIN;
          break;
        default:
          mapTypeId = naver.maps.MapTypeId.NORMAL;
      }

      mapRef.current.setMapTypeId(mapTypeId);
      setMapType(type);
    }
  };

  // markdown 파일을 fetch로 가져옵니다.
  useEffect(() => {
    fetch(`/docs/map/맵_컨트롤.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      {/* 지도 컨트롤 버튼들 */}
      <div className="map-controls mb-4 p-4 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 줌 레벨 변경 테스트 */}
          <div className="control-section">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              줌 레벨 변경 테스트
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={zoomIn}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                줌 인
              </button>
              <button
                onClick={zoomOut}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                줌 아웃
              </button>
              <button
                onClick={() => setZoomLevel(10)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                줌 10
              </button>
              <button
                onClick={() => setZoomLevel(15)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                줌 15
              </button>
              <button
                onClick={() => setZoomLevel(20)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                줌 20
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              현재 줌 레벨: {currentZoom}
            </p>
          </div>

          {/* 특정 위치로 이동 테스트 */}
          <div className="control-section">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              위치 이동 테스트
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={moveToSeoul}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
              >
                서울로 이동
              </button>
              <button
                onClick={moveToBusan}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
              >
                부산으로 이동
              </button>
              <button
                onClick={moveToJeju}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
              >
                제주로 이동
              </button>
            </div>
          </div>

          {/* 지도 유형 변경 테스트 */}
          <div className="control-section">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              지도 유형 변경
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => changeMapType("normal")}
                className={`px-3 py-1 rounded text-sm ${
                  mapType === "normal"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                일반
              </button>
              <button
                onClick={() => changeMapType("satellite")}
                className={`px-3 py-1 rounded text-sm ${
                  mapType === "satellite"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                위성
              </button>
              <button
                onClick={() => changeMapType("hybrid")}
                className={`px-3 py-1 rounded text-sm ${
                  mapType === "hybrid"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                하이브리드
              </button>
              <button
                onClick={() => changeMapType("terrain")}
                className={`px-3 py-1 rounded text-sm ${
                  mapType === "terrain"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                지형
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              현재 지도 유형: {mapType}
            </p>
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default MapControl;
