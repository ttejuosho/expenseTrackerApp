import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import SpendingTrends from "../components/SpendingTrends";
import BudgetProgressCard from "../components/BudgetProgressCard";
import RecentTransactions from "../components/RecentTransactions";

function Dashboard() {
  const { darkMode, toggleDarkMode, user } = useOutletContext();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const summaryData = [
    {
      title: "Total Balance",
      value: "$5,245.80",
      change: "+12.5% from last month",
      icon: "trending-up",
      changeColor: {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-600 dark:text-green-300",
      },
    },
    {
      title: "Monthly Income",
      value: "$3,500.00",
      change: "+$500 from last month",
      icon: "dollar-sign",
      changeColor: {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-600 dark:text-blue-300",
      },
    },
    {
      title: "Monthly Expenses",
      value: "$1,875.30",
      change: "+8.2% from last month",
      icon: "shopping-bag",
      changeColor: {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-600 dark:text-red-300",
      },
    },
    {
      title: "Savings Rate",
      value: "46.4%",
      change: "+5.3% from last month",
      icon: "percent",
      changeColor: {
        bg: "bg-purple-100 dark:bg-purple-900",
        text: "text-purple-600 dark:text-purple-300",
      },
    },
  ];

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const datasets = [
    {
      label: "Income",
      data: [3200, 3000, 3500, 3400, 3600, 3800],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderWidth: 2,
      tension: 0.3,
      fill: true,
    },
    {
      label: "Expenses",
      data: [1800, 2000, 1875, 2100, 1950, 2200],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderWidth: 2,
      tension: 0.3,
      fill: true,
    },
  ];

  const transactionsData = [
    {
      date: "Mar 20",
      description: "Grocery Store",
      category: "Food",
      categoryColor:
        "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      amount: "-$85.60",
    },
    {
      date: "Mar 19",
      description: "Gas Station",
      category: "Transport",
      categoryColor:
        "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      amount: "-$45.20",
    },
    {
      date: "Mar 18",
      description: "Monthly Salary",
      category: "Income",
      categoryColor:
        "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200",
      amount: "+$3,500.00",
    },
    {
      date: "Mar 17",
      description: "Restaurant",
      category: "Food",
      categoryColor:
        "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      amount: "-$62.40",
    },
    {
      date: "Mar 16",
      description: "Electric Bill",
      category: "Utilities",
      categoryColor:
        "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      amount: "-$120.50",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } flex`}
    >
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        } p-8`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <SummaryCard
              key={index}
              title={item.title}
              value={item.value}
              change={item.change}
              icon={item.icon}
              changeColor={item.changeColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SpendingTrends
            title="Spending Trends"
            labels={labels}
            datasets={datasets}
          />
          <BudgetProgressCard />
        </div>

        <RecentTransactions transactions={transactionsData} />
      </div>
    </div>
  );
}

export default Dashboard;
