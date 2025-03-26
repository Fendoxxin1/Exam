const db = require("../config/db");
const { validationResult } = require("express-validator");

exports.getEducationCenters = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let { sort = "id", order = "asc", region, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM education_center WHERE 1=1";
    let params = [];

    if (region) {
      sql += " AND region = ?";
      params.push(region);
    }

    sql += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [centers] = await db.execute(sql, params);
    res.json(centers);
  } catch (err) {
    console.error(" Xatolik:", err.message);
    res.status(500).json({ error: "Serverda xatolik", details: err.message });
  }
};

exports.getEducationCenterById = async (req, res) => {
  try {
    const [center] = await db.execute("SELECT * FROM education_center WHERE id = ?", [req.params.id]);
    if (center.length === 0) return res.status(404).json({ error: "Markaz topilmadi" });
    res.json(center[0]);
  } catch (err) {
    console.error(" Xatolik:", err.message);
    res.status(500).json({ error: "Serverda xatolik", details: err.message });
  }
};

exports.createEducationCenter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, region, phoneNumber, address } = req.body;
    await db.execute(
      "INSERT INTO education_center (name, region, phoneNumber, address) VALUES (?, ?, ?, ?)",
      [name, region, phoneNumber || null, address || null]
    );

    res.status(201).json({ message: "Ta’lim markazi yaratildi" });
  } catch (err) {
    console.error(" Xatolik:", err.message);
    res.status(500).json({ error: "Serverda xatolik", details: err.message });
  }
};

exports.updateEducationCenter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, region, phoneNumber, address } = req.body;
    const sql = `
      UPDATE education_center SET 
      name = COALESCE(?, name), 
      region = COALESCE(?, region),
      phoneNumber = COALESCE(?, phoneNumber),
      address = COALESCE(?, address)
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [name, region, phoneNumber, address, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Markaz topilmadi" });

    res.json({ message: "Ta'lim markazi yangilandi" });
  } catch (err) {
    console.error(" Xatolik:", err.message);
    res.status(500).json({ error: "Serverda xatolik", details: err.message });
  }
};

exports.deleteEducationCenter = async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM education_center WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Markaz topilmadi" });

    res.json({ message: "Ta'lim markazi o'chirildi" });
  } catch (err) {
    console.error(" Xatolik:", err.message);
    res.status(500).json({ error: "Serverda xatolik", details: err.message });
  }
};
