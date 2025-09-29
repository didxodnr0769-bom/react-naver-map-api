import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MENU_GROUPS } from "@/constants/routes.jsx";
import "@/components/SideBar.css";

const SideBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(
    new Set(MENU_GROUPS.map((group) => group.id)),
  );

  const handleMenuClick = (path) => {
    navigate(path);
    // 모바일에서는 아이템 선택 시 사이드바 닫기
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* 사이드바 */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Naver Maps React</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="사이드바 닫기"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {MENU_GROUPS.map((group) => (
              <li key={group.id} className="menu-group">
                <button
                  className="group-header"
                  onClick={() => toggleGroup(group.id)}
                >
                  <span className="group-title">{group.title}</span>
                  <span
                    className={`group-arrow ${
                      openGroups.has(group.id) ? "open" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <ul
                  className={`group-items ${
                    openGroups.has(group.id) ? "open" : ""
                  }`}
                >
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <button
                        className={`nav-item ${
                          location.pathname === item.path ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick(item.path)}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
