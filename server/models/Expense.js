import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category.js";

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  notes: { type: DataTypes.STRING, allowNull: true },
});

// Associations
Expense.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Expense, { foreignKey: "categoryId" });

export default Expense;
