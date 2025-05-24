import React from 'react';

const DashBox = ({ title, total_number }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-semibold text-gray-800">{total_number}</h4>
          </div>
          {/* <User className="w-6 h-6 text-blue-500" /> */}
        </div>
        <div className="text-sm text-gray-400">↑ than last week</div>
      </div>
    </div>
  );
};

export default DashBox;
