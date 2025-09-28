import MarkdownComponent from "@/components/Markdown";
import { useEffect, useRef, useState } from "react";

const MapBasic = () => {
  // useRef를 사용하여 지도를 담을 DOM 요소를 참조합니다.
  const mapElement = useRef(null);
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    // markdown 파일을 fetch로 가져옵니다.
    fetch(`/docs/map/맵_기본.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));

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
    };

    // 지도를 생성합니다.
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 지도에 마커를 추가합니다.
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []); // 의존성 배열을 비워두어 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

  return (
    <div className="map-page">
      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default MapBasic;
