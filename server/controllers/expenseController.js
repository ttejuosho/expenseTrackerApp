import { Budget, Expense, Category } from "../models/index.js";
import { Op } from "sequelize";

const flattenExpense = (expense) => {
  const { category: category, ...expenseData } = expense.toJSON();
  return {
    ...expenseData,
    categoryId: category.categoryId,
    categoryName: category.name,
    categoryColor: category.color,
  };
};

// Get a single expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const expense = await Expense.findOne({
      where: { expenseId: req.params.expenseId, userId },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["categoryId", "name", "color"],
        },
      ],
    });

    if (!expense) return res.status(404).json({ error: "Expense not found" });

    res.json(flattenExpense(expense));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};

// GET all expenses No Auth
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["categoryId", "name", "color"],
        },
      ],
      order: [["date", "DESC"]],
    });

    const flattened = expenses.map(flattenExpense);
    res.json(flattened);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { categoryId, startDate, endDate } = req.query;

    // Build dynamic where clause
    const where = { userId };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    const expenses = await Expense.findAll({
      where,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["categoryId", "name", "color"],
        },
      ],
      order: [["date", "DESC"]],
    });

    res.json(expenses.map(flattenExpense));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to filter expenses" });
  }
};

// POST create new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, categoryId, date, notes } = req.body;
    const userId = req.user?.userId; // consistent with other controllers
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    if (!amount || !date || !categoryId)
      return res
        .status(400)
        .json({ error: "Amount, date, and categoryId are required" });

    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const expense = await Expense.create({
      amount,
      categoryId,
      userId,
      date,
      notes: notes?.trim() || null,
    });

    // Refetch to include category data
    const fullExpense = await Expense.findByPk(expense.expenseId, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["categoryId", "name", "color"],
        },
      ],
    });

    res.status(201).json(flattenExpense(fullExpense));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { expenseId } = req.params;

    const deleted = await Expense.destroy({
      where: { expenseId, userId },
    });

    if (!deleted) return res.status(404).json({ error: "Expense not found" });

    // 204 = success, no content
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const now = new Date();
    const month = parseInt(req.query.month) || now.getMonth() + 1; // 1-12
    const year = parseInt(req.query.year) || now.getFullYear();

    // 1. Get budget for the month
    const budget = await Budget.findOne({
      where: { userId: userId, month: month, year: year },
    });

    if (!budget) {
      return res.status(404).json({ error: "Budget not found for this month" });
    }

    // 2. Get all expenses for the month
    // Fetch expenses for this user/month/year
    const expenses = await Expense.findAll({
      where: {
        userId: userId,
        date: {
          [Op.gte]: new Date(year, month - 1, 1),
          [Op.lt]: new Date(year, month, 1),
        },
      },
    });

    const totalSpent = expenses.reduce(
      (sum, exp) => sum + parseFloat(exp.amount),
      0
    );

    const remaining = parseFloat(budget.amount) - totalSpent;
    const today = new Date();

    // Calculate daily average spent so far
    const daysPassed =
      month === today.getMonth() + 1 && year === today.getFullYear()
        ? today.getDate()
        : new Date(year, month, 0).getDate(); // for past months, use total days in month

    const dailyAverage = totalSpent / daysPassed;

    res.json({
      budgetId: budget.budgetId,
      month,
      year,
      amount: parseFloat(budget.amount),
      totalSpent,
      remaining,
      dailyAverage: parseFloat(dailyAverage.toFixed(2)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch monthly summary" });
  }
};

export const getSummaryByCategory0 = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Accept optional month and year query params
    const now = new Date();
    const month = parseInt(req.query.month) || now.getMonth() + 1; // 1-12
    const year = parseInt(req.query.year) || now.getFullYear();

    // Compute start and end dates for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // last day of month

    // Fetch expenses for the month, grouped by category
    const expenses = await Expense.findAll({
      where: {
        userId: userId,
        date: { [Op.between]: [startDate, endDate] },
      },
      include: [
        { model: Category, as: "category", attributes: ["name", "color"] },
      ],
    });

    // Aggregate total per category
    const summary = {};
    expenses.forEach((exp) => {
      const categoryName = exp.category?.name || "Uncategorized";
      if (!summary[categoryName]) {
        summary[categoryName] = {
          categoryName: categoryName,
          categoryColor:
            exp.category?.color ||
            "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
          totalSpent: 0,
        };
      }
      summary[categoryName].totalSpent += parseFloat(exp.amount);
    });

    res.json(Object.values(summary));
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch monthly summary by category" });
  }
};

export const getSummaryByCategory = async (req, res) => {
  try {
    const { range = "thisMonth", startDate, endDate } = req.query;
    const userId = req.user.userId;

    const now = new Date();
    let fromDate,
      toDate = new Date();

    switch (range) {
      case "3m":
        fromDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        break;
      case "6m":
        fromDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        break;
      case "1y":
        fromDate = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
        break;
      case "custom":
        fromDate = new Date(startDate);
        toDate = new Date(endDate);
        break;
      default:
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const expenses = await Expense.findAll({
      where: {
        userId,
        date: { [Op.between]: [fromDate, toDate] },
      },
      include: [{ model: Category, as: "category" }],
    });

    const summary = expenses.reduce((acc, exp) => {
      const catName = exp.category?.name || "Uncategorized";
      const catColor = exp.category?.color || "bg-gray-100 text-gray-800";
      acc[catName] = acc[catName] || {
        categoryName: catName,
        categoryColor: catColor,
        totalSpent: 0,
      };
      acc[catName].totalSpent += parseFloat(exp.amount || 0);
      return acc;
    }, {});

    res.json(Object.values(summary));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch spending summary" });
  }
};
