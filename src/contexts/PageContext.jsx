import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE_CONFIG } from "@/constants/routes.jsx";

const PageContext = createContext();

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};

export const PageProvider = ({ children }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState({
    title: "Google Maps React",
    group: null,
  });

  useEffect(() => {
    const route = ROUTE_CONFIG.find(
      (route) => route.path === location.pathname,
    );
    if (route) {
      setCurrentPage({
        title: route.title,
        group: route.group,
      });
    } else {
      setCurrentPage({
        title: "Google Maps React",
        group: null,
      });
    }
  }, [location.pathname]);

  const value = {
    currentPage,
    setCurrentPage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
