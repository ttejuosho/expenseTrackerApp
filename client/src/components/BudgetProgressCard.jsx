import React from "react";

const budgetData = [
  { name: "Food & Dining", current: 450, total: 600, color: "bg-green-500" },
  { name: "Transportation", current: 120, total: 200, color: "bg-blue-500" },
  { name: "Entertainment", current: 90, total: 150, color: "bg-yellow-500" },
  { name: "Shopping", current: 240, total: 300, color: "bg-purple-500" },
  { name: "Utilities", current: 180, total: 250, color: "bg-red-500" },
];

const BudgetProgressCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
      <h2 className="text-xl font-semibold mb-6">Budget Progress</h2>

      <div className="space-y-4">
        {budgetData.map((item, index) => {
          const percentage = Math.min((item.current / item.total) * 100, 100);
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span>
                  ${item.current}/${item.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 bg-primary hover:bg-primary-600 text-white py-2 rounded-lg">
        View All Budgets
      </button>
    </div>
  );
};

export default BudgetProgressCard;
