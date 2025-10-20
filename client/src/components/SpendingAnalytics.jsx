import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import API from "../api/axios";

const SpendingAnalytics = () => {
  const categoryChartRef = useRef(null);
  const trendChartRef = useRef(null);
  const [range, setRange] = useState("thisMonth");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });

  // Render Category Doughnut Chart
  const renderCategoryChart = (labels, data, backgroundColor) => {
    if (!categoryChartRef.current) return;

    const ctx = categoryChartRef.current.getContext("2d");

    // Destroy existing chart if present
    if (categoryChartRef.current._chart)
      categoryChartRef.current._chart.destroy();

    const chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: { labels, datasets: [{ data, backgroundColor, borderWidth: 0 }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
        },
      },
    });

    categoryChartRef.current._chart = chartInstance;
  };

  // Render Trend Stacked Bar Chart
  const renderTrendChart = (labels, categories) => {
    if (!trendChartRef.current) return;

    const ctx = trendChartRef.current.getContext("2d");

    if (trendChartRef.current._chart) trendChartRef.current._chart.destroy();

    const tailwindToHex = (twClass) => {
      if (!twClass) return "#64748b";
      if (twClass.includes("green")) return "#10b981";
      if (twClass.includes("blue")) return "#3b82f6";
      if (twClass.includes("purple")) return "#8b5cf6";
      if (twClass.includes("yellow")) return "#f59e0b";
      if (twClass.includes("red")) return "#ef4444";
      return "#64748b";
    };

    // Build datasets for stacked bar chart
    const chartData = {
      labels,
      datasets: categories.map((c) => ({
        label: c.categoryName,
        data: Array(labels.length).fill(c.totalSpent), // Example: same value for all labels
        backgroundColor: tailwindToHex(c.categoryColor),
      })),
    };

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          title: { display: true, text: "Category Spending Trend" },
          legend: { position: "top" },
        },
        responsive: true,
        scales: { x: { stacked: true }, y: { stacked: true } },
      },
    });

    trendChartRef.current._chart = chartInstance;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params =
          range === "custom"
            ? { range, startDate: customDates.start, endDate: customDates.end }
            : { range };

        const res = await API.get("/expenses/monthlySummaryByCategory", {
          params,
        });
        const categories = res.data;

        const labels = categories.map((c) => c.categoryName);
        const data = categories.map((c) => c.totalSpent);

        const backgroundColor = categories.map((c) => {
          if (c.categoryColor.includes("green")) return "#10b981";
          if (c.categoryColor.includes("blue")) return "#3b82f6";
          if (c.categoryColor.includes("purple")) return "#8b5cf6";
          if (c.categoryColor.includes("yellow")) return "#f59e0b";
          if (c.categoryColor.includes("red")) return "#ef4444";
          return "#64748b";
        });

        renderCategoryChart(labels, data, backgroundColor);
        renderTrendChart(labels, categories);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [range, customDates]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Spending Analytics</h2>

        <div className="flex items-center gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none"
          >
            <option value="thisMonth">This Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>

          {range === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customDates.start}
                onChange={(e) =>
                  setCustomDates((p) => ({ ...p, start: e.target.value }))
                }
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <input
                type="date"
                value={customDates.end}
                onChange={(e) =>
                  setCustomDates((p) => ({ ...p, end: e.target.value }))
                }
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <canvas ref={categoryChartRef} height="250" />
        </div>
        <div>
          <canvas ref={trendChartRef} height="250" />
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalytics;
