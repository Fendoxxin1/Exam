const Region = require("../models/regions.model");

exports.getRegions = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const { count, rows } = await Region.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRegion = async (req, res) => {
  try {
    const region = await Region.create(req.body);
    res.status(201).json(region);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRegion = async (req, res) => {
  try {
      const { id } = req.params;
      const [updated] = await Region.update(req.body, { where: { id } });

      if (updated) {
          const updatedRegion = await Region.findByPk(id);
          res.json(updatedRegion);
      } else {
          res.status(404).json({ error: "Region not found" });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


exports.deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Region.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Region not found" });
    }

    res.json({ message: "Region deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
