import React from "react";

const MonthlySummary = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Budget Used</span>
            <span className="text-sm font-medium">75%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: "75%" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
            <p className="text-2xl font-bold">$2,500</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
            <p className="text-2xl font-bold">$1,875</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Remaining
            </p>
            <p className="text-2xl font-bold">$625</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Daily Avg.
            </p>
            <p className="text-2xl font-bold">$62.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
