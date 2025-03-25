const { Comment } = require("../models/comment.model");

exports.getComments = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

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
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Comment not found" });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
