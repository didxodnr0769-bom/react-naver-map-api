import { useState, useEffect } from "react";
import MarkdownComponent from "@/components/Markdown";

const Group1Test2 = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/docs/그룹1/그룹1테스트2.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="map-page">
      <div>그룹1 테스트2에 대한 코드 및 설명</div>
      <div className="markdown-section">
        <MarkdownComponent content={markdown} />
      </div>
    </div>
  );
};

export default Group1Test2;
