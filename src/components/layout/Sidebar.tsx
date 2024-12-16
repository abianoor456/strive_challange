import React from "react";
import { HiX } from "react-icons/hi"; // Close icon
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "My Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Applications", path: "/applications" },
    { name: "Matches", path: "/matches" },
    { name: "Apply to Startups", path: "apply-to-startups" },
    { name: "Network", path: "#" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-30`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-gray-700 hover:text-red-600">
          <HiX className="w-6 h-6" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="block text-gray-700 font-medium hover:text-blue-600 hover:translate-x-1 transform transition-transform duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
