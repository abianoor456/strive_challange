import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">Student Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
