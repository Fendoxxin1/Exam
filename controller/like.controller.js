const { Like } = require("../models/association.model");
const { User } = require("../models/user.model");
const { EducationalCenter } = require("../models/educationalcenter.model");

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

    let { userId, educationalCenterId } = req.body;

    userId = parseInt(userId);
    educationalCenterId = parseInt(educationalCenterId);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Valid userId is required" });
    }
    if (!educationalCenterId || isNaN(educationalCenterId)) {
      return res.status(400).json({ error: "Valid educationalCenterId is required" });
    }

    const like = await Like.create({
      userId,
      educationalCenterId,
    });

    res.status(201).json({ message: "Like added successfully", like });
  } catch (err) {
    console.error("Error creating like:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const likeId = parseInt(id);

    if (!likeId || isNaN(likeId)) {
      return res.status(400).json({ error: "Invalid like ID" });
    }

    const like = await Like.findByPk(likeId);
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await like.destroy();
    res.json({ message: "Like removed successfully" });
  } catch (err) {
    console.error("Error deleting like:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
