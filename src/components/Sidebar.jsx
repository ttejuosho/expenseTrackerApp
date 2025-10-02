import { useEffect, useState } from "react";
import feather from "feather-icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    feather.replace();
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`sidebar ${
        collapsed ? "sidebar-collapsed w-20" : "sidebar-expanded w-64"
      } bg-white dark:bg-gray-800 h-screen fixed shadow-lg flex flex-col transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <i data-feather="dollar-sign" className="text-primary w-6 h-6"></i>
          {!collapsed && (
            <span className="font-bold text-lg whitespace-nowrap">
              PennyPincher
            </span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <i
            data-feather={collapsed ? "chevron-right" : "chevron-left"}
            className="w-5 h-5"
          ></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { icon: "home", label: "Dashboard" },
          { icon: "dollar-sign", label: "Transactions" },
          { icon: "pie-chart", label: "Analytics" },
          { icon: "credit-card", label: "Budgets" },
          { icon: "file-text", label: "Reports" },
          { icon: "settings", label: "Settings" },
        ].map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
              idx === 0
                ? "bg-primary bg-opacity-10 dark:bg-opacity-20 text-primary"
                : ""
            }`}
          >
            <i data-feather={item.icon} className="w-5 h-5"></i>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span>JP</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium text-sm">John Penny</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View Profile
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
