const {Region} = require("../models/association.model");

exports.getRegions = async (req, res) => {
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

    const { count, rows } = await Region.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    console.error("Error fetching regions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createRegion = async (req, res) => {
  try {
    if (!req.body.name || typeof req.body.name !== "string") {
      return res.status(400).json({ error: "Valid region name is required" });
    }

    const region = await Region.create(req.body);
    res.status(201).json(region);
  } catch (err) {
    console.error("Error creating region:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid region ID" });
    }

    const [updated] = await Region.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ error: "Region not found" });
    }

    const updatedRegion = await Region.findByPk(id);
    res.json(updatedRegion);
  } catch (err) {
    console.error("Error updating region:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid region ID" });
    }

    const deleted = await Region.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Region not found" });
    }

    res.json({ message: "Region deleted successfully" });
  } catch (err) {
    console.error("Error deleting region:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
