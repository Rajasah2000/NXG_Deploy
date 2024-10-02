import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextProvider } from "../../service/ContextProvider";

const Sidebar = () => {
  // State to manage sidebar visibility
  const { isSidebarOpen, setIsSidebarOpen } = useContextProvider();
  const [isDesktopMode, setIsDesktopMode] = useState(window.innerWidth >= 1024);
  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle window resize to toggle desktop/mobile mode
  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMode(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Icon to toggle sidebar */}
      {/* <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          cursor: "pointer",
          fontSize: "24px",
          background: "none",
          border: "none",
        }}
      >
        <i class="xbi bi-list toggle-sidebar-btn"></i>
      </button> */}

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside
          id="sidebar"
          className={isDesktopMode ? "sidebar" : "sidebars"}
          style={{ marginTop: isDesktopMode ? "" : "65px" }}
        >
          <ul className="sidebar-nav" id="sidebar-nav">
            <li
              className="nav-item"
              onClick={!isDesktopMode ? toggleSidebar : undefined}
            >
              <Link className="nav-link" to="/">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={!isDesktopMode ? toggleSidebar : undefined}
            >
              <Link className="nav-link" to="/manage/booking">
                <i className="bi bi-grid"></i>
                <span>Booking</span>
              </Link>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
