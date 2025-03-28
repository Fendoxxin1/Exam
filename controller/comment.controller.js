const { Comment, User } = require("../models/association.model");
const EducationalCenter = require("../models/educationalcenter.model");

exports.getComments = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({ error: "Invalid page number" });
    }
    if (!Number.isInteger(limit) || limit < 1) {
      return res.status(400).json({ error: "Invalid limit value" });
    }

    const { count, rows } = await Comment.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      include: [
        { model: User, as: "User" },
        { model: EducationalCenter, as: "EducationalCenter" },
      ],
    });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }

    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, as: "User" },
        { model: EducationalCenter, as: "EducationalCenter" },
      ],
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    console.error("Error fetching comment:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { comment, star, userId, educationalcenterId } = req.body;

    if (!comment || typeof comment !== "string") {
      return res.status(400).json({ error: "Comment text is required" });
    }
    if (!Number.isInteger(Number(userId)) || userId < 1) {
      return res.status(400).json({ error: "Valid userId is required" });
    }
    if (!Number.isInteger(Number(educationalcenterId)) || educationalcenterId < 1) {
      return res.status(400).json({ error: "Valid educationalcenterId is required" });
    }
    if (star !== undefined && (!Number.isInteger(Number(star)) || star < 0 || star > 5)) {
      return res.status(400).json({ error: "Star rating must be an integer between 0 and 5" });
    }

    const newComment = await Comment.create({
      comment,
      star: star || 0,
      userId,
      educationalcenterId,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
