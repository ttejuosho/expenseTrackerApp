import { useState, useEffect } from "react";
import feather from "feather-icons";
import API from "../api/axios";
import toast from "react-hot-toast";

const RecentTransactions = ({ reload }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await API.get("/expenses", { withCredentials: true });
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to load expenses.");
      }
    };
    fetchExpenses();
  }, [reload]);

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
              <th className="pb-3 text-center">Notes</th>
              <th className="pb-3 text-center">Category</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.expenseId}>
                  <td className="py-3 text-sm text-center">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 font-medium text-center">
                    {tx.notes || "—"}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.categoryColor ||
                        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {tx.categoryName}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium text-gray-800 dark:text-gray-200">
                    ${parseFloat(tx.amount).toFixed(2)}
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <i data-feather="more-vertical" className="w-4 h-4"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No recent transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
