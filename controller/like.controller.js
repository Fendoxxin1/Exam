const { Like } = require("../models/association.model");

exports.getLikes = async (req, res) => {
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

    const { count, rows } = await Like.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });

    res.json({
      total: count,
      page,
      limit,
      data: rows,
    });
  } catch (err) {
    console.error("Error fetching likes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createLike = async (req, res) => {
  try {
    if (!req.body.userId || isNaN(req.body.userId)) {
      return res.status(400).json({ error: "Valid userId is required" });
    }
    if (!req.body.educationalCenterId || isNaN(req.body.educationalCenterId)) {
      return res
        .status(400)
        .json({ error: "Valid educationalCenterId is required" });
    }

    const like = await Like.create(req.body);
    res.status(201).json(like);
  } catch (err) {
    console.error("Error creating like:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid like ID" });
    }

    const deleted = await Like.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json({ message: "Like removed successfully" });
  } catch (err) {
    console.error("Error deleting like:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
