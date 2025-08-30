import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse below 992px on mount + resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) setCollapsed(true);
      else setCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen flex bg-baseBg overflow-auto">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen transition-all duration-300 min-w-0">
        <Header toggleSidebar={() => setCollapsed(!collapsed)} />

        <div className="flex-1 mt-3 min-w-0">
          <div className="h-full bg-baseBg rounded-md p-7 pt-0 min-w-0">
            {/* Outlet for other dynamic pages */}
            <div className="mt-6 h-full overflow-auto min-w-0">
              {/* ✅ This ensures tables or wide content scroll */}
              <div className="overflow-x-auto overflow-y-auto h-full min-w-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
