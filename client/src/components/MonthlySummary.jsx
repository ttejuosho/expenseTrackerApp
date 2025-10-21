import { useEffect, useState } from "react";
import API from "../api/axios";
import ProgressBar from "./ProgressBar";

const MonthlySummary = ({ reload }) => {
  const [summary, setSummary] = useState({
    amount: 0,
    totalSpent: 0,
    remaining: 0,
    dailyAverage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("expenses/monthlySummary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch monthly summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [reload]);

  if (loading) return <p>Loading monthly summary...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Budget Used</span>
          <span className="text-sm font-medium">
            {summary.amount > 0
              ? ((summary.totalSpent / summary.amount) * 100).toFixed(0)
              : 0}
            %
          </span>
        </div>
        <ProgressBar current={summary.totalSpent} total={summary.amount} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
          <p className="text-2xl font-bold">${summary.amount.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
          <p className="text-2xl font-bold">${summary.totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
          <p className="text-2xl font-bold">${summary.remaining.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Daily Avg.</p>
          <p className="text-2xl font-bold">
            ${summary.dailyAverage.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
