const db = require("../models");
const { validationResult } = require("express-validator");

// Get all user enrollments with filter, sorting, and pagination
exports.getUserEnrollments = async (req, res) => {
  try {
    let { page = 1, limit = 10, sort = "id", order = "asc", userId } = req.query;
    
    page = parseInt(page);
    limit = parseInt(limit);
    order = order.toLowerCase() === "desc" ? "DESC" : "ASC";

    const whereClause = {};
    if (userId) {
      whereClause.userId = userId;
    }

    const userEnrollments = await db.UserEnrolment.findAndCountAll({
      where: whereClause,
      order: [[sort, order]],
      limit,
      offset: (page - 1) * limit,
    });

    res.json({
      total: userEnrollments.count,
      page,
      limit,
      data: userEnrollments.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
