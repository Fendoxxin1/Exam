const { Resource } = require("../models/association.model");

exports.getResources = async (req, res) => {
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

    const { count, rows } = await Resource.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createResource = async (req, res) => {
  try {

    const { name, media, description, createdBy, categoryId } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Valid resource name is required" });
    }

    const resource = await Resource.create({ name, media, description,  createdBy, categoryId });
    res.status(201).json(resource);
  } catch (err) {
    console.error("Error creating resource:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid resource ID" });
    }

    const [updated] = await Resource.update(req.body, {
      where: { id },
      individualHooks: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const updatedResource = await Resource.findByPk(id);
    res.json({ message: "Resource updated", data: updatedResource });
  } catch (err) {
    console.error("Error updating resource:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid resource ID" });
    }

    const deleted = await Resource.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("Error deleting resource:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
