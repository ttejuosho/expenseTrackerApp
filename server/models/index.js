import User from "./User.js";
import Expense from "./Expense.js";
import Category from "./Category.js";

// Define associations here
User.hasMany(Expense, { foreignKey: "userId", as: "expenses" });
Expense.belongsTo(User, { foreignKey: "userId", as: "user" });

Category.hasMany(Expense, { foreignKey: "categoryId", as: "expenses" });
Expense.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export { User, Expense, Category };
