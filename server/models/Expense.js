import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category.js";
import User from "./User.js";

const Expense = sequelize.define("Expense", {
  expenseId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Categories",
      key: "categoryId",
    },
    onDelete: "CASCADE",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
    onDelete: "CASCADE",
  },
});

export default Expense;
