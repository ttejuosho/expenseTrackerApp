import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import feather from "feather-icons";

// Register Chart.js components
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const SpendingTrends = ({
  title = "Spending Trends",
  labels = [],
  datasets = [],
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    feather.replace();

    const ctx = chartRef.current.getContext("2d");
    const trendChart = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false, // important!
        plugins: { legend: { position: "top" } },
        scales: {
          y: { beginAtZero: true, grid: { drawBorder: false } },
          x: { grid: { display: false } },
        },
      },
    });

    return () => trendChart.destroy();
  }, [labels, datasets]);

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option selected>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>
      {/* Fixed height container */}
      <div className="relative w-full h-64">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default SpendingTrends;
