const { Resource } = require("../models/resource.model");

exports.getResources = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const { count, rows } = await Resource.findAndCountAll({
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

exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Resource.update(req.body, { where: { id }, individualHooks: true });

    if (!updated) return res.status(404).json({ message: "Resource not found" });

    const updatedResource = await Resource.findByPk(id);
    res.json({ message: "Resource updated", data: updatedResource });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Resource.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
