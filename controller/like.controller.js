const { Like } = require("../models/like.model");

exports.getLikes = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

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
    res.status(500).json({ error: err.message });
  }
};

exports.createLike = async (req, res) => {
  try {
    const like = await Like.create(req.body);
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Like.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Like not found" });

    res.json({ message: "Like removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
