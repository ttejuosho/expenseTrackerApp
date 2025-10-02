import { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Sun, Moon, DollarSign, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default function Home() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const doughnutData = {
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
      },
    ],
  };

  <Doughnut
    data={doughnutData}
    options={{ plugins: { legend: { position: "right" } } }}
  />;

  useEffect(() => {
    const vantaEffect = GLOBE({
      el: vantaRef.current!,
      THREE,
      color: 0x6366f1,
      backgroundColor: 0x000000,
    });
    return () => vantaEffect.destroy();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div
        ref={vantaRef}
        className="absolute top-0 left-0 w-full h-full opacity-30 -z-10"
      />
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <DollarSign className="text-primary w-8 h-8" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PennyPincher Pro
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="theme-toggle p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <Moon className="dark:hidden" />
            <Sun className="hidden dark:block" />
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <User /> <span>Login</span>
          </button>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Budget Used</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full progress-bar"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Budget
                    </p>
                    <p className="text-2xl font-bold">$2,500</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Spent
                    </p>
                    <p className="text-2xl font-bold">$1,875</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Remaining
                    </p>
                    <p className="text-2xl font-bold">$625</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Daily Avg.
                    </p>
                    <p className="text-2xl font-bold">$62.5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4">Quick Add Expense</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select className="w-full py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Food</option>
                    <option>Transportation</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                    <option>Shopping</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes
                  </label>
                  <textarea
                    rows="2"
                    className="w-full py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Optional"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                >
                  <i data-feather="plus"></i>
                  <span>Add Expense</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg">
                    <i data-feather="filter"></i>
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg">
                    <i data-feather="calendar"></i>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Description</th>
                      <th className="pb-2 text-right">Amount</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-3">Today</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                          Food
                        </span>
                      </td>
                      <td className="py-3">Lunch with friends</td>
                      <td className="py-3 text-right">-$24.50</td>
                      <td className="py-3 text-right">
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i
                            data-feather="more-vertical"
                            className="w-4 h-4"
                          ></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Yesterday</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                          Transport
                        </span>
                      </td>
                      <td className="py-3">Uber ride</td>
                      <td className="py-3 text-right">-$12.75</td>
                      <td className="py-3 text-right">
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i
                            data-feather="more-vertical"
                            className="w-4 h-4"
                          ></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Mar 15</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                          Shopping
                        </span>
                      </td>
                      <td className="py-3">New shoes</td>
                      <td className="py-3 text-right">-$89.99</td>
                      <td className="py-3 text-right">
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i
                            data-feather="more-vertical"
                            className="w-4 h-4"
                          ></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Mar 14</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">
                          Entertainment
                        </span>
                      </td>
                      <td className="py-3">Movie tickets</td>
                      <td className="py-3 text-right">-$34.00</td>
                      <td className="py-3 text-right">
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i
                            data-feather="more-vertical"
                            className="w-4 h-4"
                          ></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Mar 12</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs">
                          Utilities
                        </span>
                      </td>
                      <td className="py-3">Electric bill</td>
                      <td className="py-3 text-right">-$120.50</td>
                      <td className="py-3 text-right">
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i
                            data-feather="more-vertical"
                            className="w-4 h-4"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover transition-all duration-300">
              <h2 className="text-xl font-semibold mb-6">Spending Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <canvas id="categoryChart" height="250"></canvas>
                </div>
                <div>
                  <canvas id="monthlyTrendChart" height="250"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
        <p>© 2023 PennyPincher Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}
