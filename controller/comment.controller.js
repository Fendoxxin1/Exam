const { Comment } = require("../models/association.model");

exports.getComments = async (req, res) => {
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

    const { count, rows } = await Comment.findAndCountAll({
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
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    console.error("Error fetching comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createComment = async (req, res) => {
  try {

    const { comment, star, userId, educationalcenterId } = req.body;

    if (!comment || typeof comment !== "string") {
      return res.status(400).json({ error: "Comment text is required" });
    }
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Valid userId is required" });
    }
    if (!educationalcenterId || isNaN(educationalcenterId)) {
      return res
        .status(400)
        .json({ error: "Valid educationalcenterId is required" });
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
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }

    const deleted = await Comment.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
