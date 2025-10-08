import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MonthlySummary from "../components/MonthlySummary";
import QuickAddExpense from "../components/QuickAddExpense";
import RecentTransactions from "../components/RecentTransactions";
import SpendingAnalytics from "../components/SpendingAnalytics";
// Vanta.js import commented
// import { VantaGlobe } from "../utils/vanta";

function Home() {
  const { darkMode } = useOutletContext(); // Get theme from MainLayout

  useEffect(() => {
    // Initialize Vanta.js if needed
    // const vantaEffect = VantaGlobe({
    //   el: "#vanta-bg",
    //   color: 0x6366f1,
    // });
    // return () => {
    //   if (vantaEffect) vantaEffect.destroy();
    // };
  }, []);

  const recentTransactionsData = [
    {
      date: "Today",
      category: "Food",
      categoryColor:
        "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      description: "Lunch with friends",
      amount: "-$24.50",
    },
    {
      date: "Yesterday",
      category: "Transport",
      categoryColor:
        "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      description: "Uber ride",
      amount: "-$12.75",
    },
    {
      date: "Mar 15",
      category: "Shopping",
      categoryColor:
        "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
      description: "New shoes",
      amount: "-$89.99",
    },
    {
      date: "Mar 14",
      category: "Entertainment",
      categoryColor:
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
      description: "Movie tickets",
      amount: "-$34.00",
    },
    {
      date: "Mar 12",
      category: "Utilities",
      categoryColor:
        "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      description: "Electric bill",
      amount: "-$120.50",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        id="vanta-bg"
        className="fixed top-0 left-0 w-full h-full z-0 opacity-30"
      ></div>

      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <MonthlySummary />
              <QuickAddExpense />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <RecentTransactions transactions={recentTransactionsData} />
              <SpendingAnalytics />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
