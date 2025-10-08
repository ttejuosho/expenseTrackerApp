import { Expense, Category } from "../models/index.js";

const flattenExpense = (expense) => {
  const { Category: categoryData, ...expenseData } = expense.toJSON();
  return {
    ...expenseData,
    categoryId: categoryData.categoryId,
    categoryName: categoryData.name,
    categoryColor: categoryData.color,
  };
};

// Get a single expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const expense = await Expense.findOne({
      where: { expenseId: req.params.expenseId, userId },
      include: [
        { model: Category, attributes: ["categoryId", "name", "color"] },
      ],
    });

    if (!expense) return res.status(404).json({ error: "Expense not found" });

    res.json(flattenExpense(expense));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};

// GET all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const expenses = await Expense.findAll({
      where: { userId },
      include: [
        { model: Category, attributes: ["categoryId", "name", "color"] },
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
    const userId = req.user?.id;
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
        { model: Category, attributes: ["categoryId", "name", "color"] },
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
    const userId = req.user?.id; // consistent with other controllers
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
        { model: Category, attributes: ["categoryId", "name", "color"] },
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
    const userId = req.user?.id;
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
