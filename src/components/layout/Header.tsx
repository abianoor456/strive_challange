import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // Menu icon

interface HeaderProps {
  userName: string;
  onLogout: () => void;
  onMenuToggle: () => void; // Menu toggle
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout, onMenuToggle }) => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-20">
      {/* Menu Icon with Logo */}
      <div className="flex items-center space-x-4">
        <button onClick={onMenuToggle} className="text-white hover:text-gray-200">
          <HiOutlineMenuAlt3 className="w-8 h-8" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Strive Logo"
            className="w-20 h-15 object-contain"
          />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Connect to Startups
          </h1>
        </div>
      </div>

      {/* User Info and Logout */}
      <div className="flex items-center space-x-6">
        <span className="text-white font-medium text-lg">
          Welcome, <span className="font-semibold">{userName}</span>
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
