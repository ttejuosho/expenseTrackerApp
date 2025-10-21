import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import API from "../api/axios";
import toast from "react-hot-toast";

const QuickAddExpense = ({ onAdd }) => {
  const [expense, setExpense] = useState({
    amount: "",
    categoryId: "",
    date: "",
    notes: "",
  });
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data); // assuming API returns an array of categories
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/expenses", expense);
    if (onAdd) onAdd();
    toast.success("Expense added successfully!");
    setExpense({
      amount: "",
      categoryId: "",
      date: "",
      notes: "",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Quick Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              className="w-full pl-8 pr-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={expense.category}
            onChange={handleChange}
            className="w-full py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className="w-full py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            rows="2"
            name="notes"
            value={expense.notes}
            onChange={handleChange}
            className="w-full py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Optional"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </form>
    </div>
  );
};

export default QuickAddExpense;
