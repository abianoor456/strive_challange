import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  userName: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ userName, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    alert("You have been logged out!");
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header
          userName={userName}
          onLogout={handleLogout}
          onMenuToggle={toggleSidebar}
        />

        {/* Content Area */}
        <main className="p-6 bg-gray-50 min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
