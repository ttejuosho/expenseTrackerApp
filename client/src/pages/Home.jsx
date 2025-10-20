import { useEffect } from "react";
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
              <RecentTransactions />
            </div>
          </div>
          <SpendingAnalytics />
        </main>
      </div>
    </div>
  );
}

export default Home;
