// models/Budget.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Budget = sequelize.define(
  "Budget",
  {
    budgetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    month: {
      type: DataTypes.INTEGER, // "YYYY-MM"
      allowNull: false,
      unique: true, // one budget per month
    },
    year: {
      type: DataTypes.INTEGER, // 2025, 2026
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "Budgets",
    timestamps: true,
  }
);

export default Budget;
