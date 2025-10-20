import User from "./User.js";
import Expense from "./Expense.js";
import Category from "./Category.js";
import Budget from "./Budget.js";

// User ↔ Expense
User.hasMany(Expense, { foreignKey: "userId", as: "expenses" });
Expense.belongsTo(User, { foreignKey: "userId", as: "user" });

// Category ↔ Expense
Category.hasMany(Expense, { foreignKey: "categoryId", as: "expenses" });
Expense.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// User ↔ Budget
User.hasMany(Budget, { foreignKey: "userId", as: "budgets" });
Budget.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Expense, Category, Budget };
