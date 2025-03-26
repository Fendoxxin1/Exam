const db = require("../models");
const { validationResult } = require("express-validator");

// Get all LC Majors with filter, sorting, and pagination
exports.getLcMajors = async (req, res) => {
  try {
    let { page = 1, limit = 10, sort = "id", order = "asc", majorId } = req.query;
    
    page = parseInt(page);
    limit = parseInt(limit);
    order = order.toLowerCase() === "desc" ? "DESC" : "ASC";

    const whereClause = {};
    if (majorId) {
      whereClause.majorId = majorId;
    }

    const lcMajors = await db.LcMajors.findAndCountAll({
      where: whereClause,
      order: [[sort, order]],
      limit,
      offset: (page - 1) * limit,
    });

    res.json({
      total: lcMajors.count,
      page,
      limit,
      data: lcMajors.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
