import React from "react";

const Filters: React.FC = () => {
  return (
    <aside className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 font-medium mb-2">Working Schedule</p>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Full time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Part time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Internship</span>
            </label>
          </div>
        </div>
        <div>
          <p className="text-gray-600 font-medium mb-2">Employment Type</p>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Full day</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Flexible schedule</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
