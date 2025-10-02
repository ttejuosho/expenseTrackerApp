import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  Home,
  Moon,
  Percent,
  PieChart,
  Settings,
  ShoppingBag,
  Sun,
  TrendingUp,
  CreditCard,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [3200, 3000, 3500, 3400, 3600, 3800],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Expenses",
        data: [1800, 2000, 1875, 2100, 1950, 2200],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: {
      y: { beginAtZero: true, grid: { drawBorder: false } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } h-screen fixed bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <DollarSign className="text-primary w-6 h-6" />
            {!sidebarCollapsed && (
              <span className="font-bold text-lg">PennyPincher</span>
            )}
          </div>
          <button onClick={toggleSidebar} aria-label="Toggle sidebar">
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { icon: Home, label: "Dashboard" },
            { icon: DollarSign, label: "Transactions" },
            { icon: PieChart, label: "Analytics" },
            { icon: CreditCard, label: "Budgets" },
            { icon: FileText, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon className="w-5 h-5" />
              {!sidebarCollapsed && <span>{label}</span>}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              JP
            </div>
            {!sidebarCollapsed && (
              <div>
                <p className="font-medium text-sm">John Penny</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  View Profile
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all p-8 ml-${
          sidebarCollapsed ? "20" : "64"
        }`}
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <button className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              <Bell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Balance",
              value: "$5,245.80",
              change: "+12.5% from last month",
              icon: TrendingUp,
              color: "green",
            },
            {
              title: "Monthly Income",
              value: "$3,500.00",
              change: "+$500 from last month",
              icon: DollarSign,
              color: "blue",
            },
            {
              title: "Monthly Expenses",
              value: "$1,875.30",
              change: "+8.2% from last month",
              icon: ShoppingBag,
              color: "red",
            },
            {
              title: "Savings Rate",
              value: "46.4%",
              change: "+5.3% from last month",
              icon: Percent,
              color: "purple",
            },
          ].map(({ title, value, change, icon: Icon, color }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:translate-y-[-5px] hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {title}
                  </p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
                <div
                  className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-300`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p
                className={`text-sm text-${color}-600 dark:text-${color}-400 mt-2`}
              >
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* Spending Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Spending Trends</h2>
              <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option selected>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-[300px]">
              <Line data={trendData} options={trendOptions} />
            </div>
          </div>

          {/* Budget Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Budget Progress</h2>
            {[
              { name: "Food & Dining", spent: 450, total: 600, color: "green" },
              { name: "Transportation", spent: 120, total: 200, color: "blue" },
              { name: "Entertainment", spent: 90, total: 150, color: "yellow" },
              { name: "Shopping", spent: 240, total: 300, color: "purple" },
              { name: "Utilities", spent: 180, total: 250, color: "red" },
            ].map(({ name, spent, total, color }) => (
              <div key={name} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{name}</span>
                  <span>
                    ${spent}/${total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-${color}-500 h-2 rounded-full`}
                    style={{ width: `${(spent / total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <button className="w-full mt-6 bg-primary hover:bg-indigo-600 text-white py-2 rounded-lg">
              View All Budgets
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <button className="text-primary hover:text-indigo-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  {
                    date: "Mar 20",
                    desc: "Grocery Store",
                    cat: "Food",
                    amt: "-$85.60",
                    color: "green",
                  },
                  {
                    date: "Mar 19",
                    desc: "Gas Station",
                    cat: "Transport",
                    amt: "-$45.20",
                    color: "blue",
                  },
                  {
                    date: "Mar 18",
                    desc: "Monthly Salary",
                    cat: "Income",
                    amt: "+$3,500.00",
                    color: "indigo",
                    positive: true,
                  },
                  {
                    date: "Mar 17",
                    desc: "Restaurant",
                    cat: "Food",
                    amt: "-$62.40",
                    color: "green",
                  },
                  {
                    date: "Mar 16",
                    desc: "Electric Bill",
                    cat: "Utilities",
                    amt: "-$120.50",
                    color: "red",
                  },
                ].map(({ date, desc, cat, amt, color, positive }) => (
                  <tr key={date}>
                    <td className="py-3 text-sm">{date}</td>
                    <td className="py-3 font-medium">{desc}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 bg-${color}-100 dark:bg-${color}-900 text-${color}-800 dark:text-${color}-200 rounded-full text-xs`}
                      >
                        {cat}
                      </span>
                    </td>
                    <td
                      className={`py-3 text-right font-medium ${
                        positive ? "text-green-600 dark:text-green-400" : ""
                      }`}
                    >
                      {amt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
