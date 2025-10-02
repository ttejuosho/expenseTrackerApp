import React, { useEffect } from "react";
import feather from "feather-icons";

const RecentTransactions = ({ transactions = [] }) => {
  useEffect(() => {
    feather.replace();
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <button className="text-primary hover:text-primary-600 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 text-center">Date</th>
              <th className="pb-3 text-center">Description</th>
              <th className="pb-3 text-center">Category</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td className="py-3 text-sm">{tx.date}</td>
                <td className="py-3 font-medium">{tx.description}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tx.categoryColor ||
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {tx.category}
                  </span>
                </td>
                <td
                  className={`py-3 text-right font-medium ${
                    tx.amount.startsWith("+")
                      ? "text-green-600 dark:text-green-400"
                      : ""
                  }`}
                >
                  {tx.amount}
                </td>
                <td className="py-3 text-right">
                  <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <i data-feather="more-vertical" className="w-4 h-4"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
