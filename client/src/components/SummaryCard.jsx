import React, { useEffect } from "react";
import feather from "feather-icons";

const SummaryCard = ({ title, value, change, icon, changeColor }) => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${changeColor.bg} ${changeColor.text}`}
        >
          <i data-feather={icon} className="w-5 h-5"></i>
        </div>
      </div>
      <p className={`text-sm mt-2 ${changeColor.text}`}>{change}</p>
    </div>
  );
};

export default SummaryCard;
