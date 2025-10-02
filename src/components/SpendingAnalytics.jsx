import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SpendingAnalytics = () => {
  const categoryChartRef = useRef(null);
  const trendChartRef = useRef(null);

  useEffect(() => {
    // Category Chart
    const categoryCtx = categoryChartRef.current.getContext("2d");
    const categoryChart = new Chart(categoryCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Food",
          "Transport",
          "Shopping",
          "Entertainment",
          "Utilities",
          "Other",
        ],
        datasets: [
          {
            data: [300, 120, 240, 150, 180, 90],
            backgroundColor: [
              "#10b981",
              "#3b82f6",
              "#8b5cf6",
              "#f59e0b",
              "#ef4444",
              "#64748b",
            ],
            borderWidth: 0,
          },
        ],
      },
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

    // Trend Chart
    const trendCtx = trendChartRef.current.getContext("2d");
    const trendChart = new Chart(trendCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Spending",
            data: [1200, 1900, 1500, 2100, 1800, 1700],
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderColor: "#6366f1",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "#6366f1",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      categoryChart.destroy();
      trendChart.destroy();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-6">Spending Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <canvas ref={categoryChartRef} height="250"></canvas>
        </div>
        <div>
          <canvas ref={trendChartRef} height="250"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalytics;
