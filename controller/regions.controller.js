const { Region } = require("../models/regions.model");

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
