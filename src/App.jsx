import { useState } from "react";
import "@/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTE_CONFIG } from "@/constants/routes.jsx";
import { PageProvider } from "@/contexts/PageContext";
import Header from "@/components/Header";

function App() {
  // 모바일에서는 기본적으로 사이드바 닫힘, 데스크톱에서는 열림
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth > 768; // 768px 이상에서는 열림, 이하는 닫힘
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <PageProvider>
        <div className="app">
          <Header isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
          <main
            className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}
          >
            <Routes>
              {ROUTE_CONFIG.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </main>
        </div>
      </PageProvider>
    </Router>
  );
}

export default App;
