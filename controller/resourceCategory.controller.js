const { ResourceCategory } = require("../models/association.model");

exports.getCategories = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) {
      return res.status(400).json({ error: "Invalid page number" });
    }
    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({ error: "Invalid limit value" });
    }

    const { count, rows } = await ResourceCategory.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const category = await ResourceCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name || typeof req.body.name !== "string") {
      return res.status(400).json({ error: "Valid category name is required" });
    }

    const category = await ResourceCategory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const deleted = await ResourceCategory.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
