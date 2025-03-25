const db = require("../config/db");
const { validationResult } = require("express-validator");

exports.getBranches = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let { sort = "id", order = "asc", region, learningcid, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM branch WHERE 1=1";
    if (region) sql += ` AND region = ${region}`;
    if (learningcid) sql += ` AND learningcid = ${learningcid}`;
    sql += ` ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`;

    const [branches] = await db.execute(sql);
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

exports.getBranchById = async (req, res) => {
  try {
    const [branch] = await db.execute("SELECT * FROM branch WHERE id = ?", [req.params.id]);
    if (branch.length === 0) return res.status(404).json({ error: "Filial topilmadi" });
    res.json(branch[0]);
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, region, learningcid, phoneNumber, address } = req.body;
    await db.execute("INSERT INTO branch (name, region, learningcid, phoneNumber, address) VALUES (?, ?, ?, ?, ?)", [
      name,
      region,
      learningcid,
      phoneNumber || null,
      address || null,
    ]);

    res.status(201).json({ message: "Filial yaratildi" });
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, region, learningcid, phoneNumber, address } = req.body;
    const sql = `
      UPDATE branch SET 
      name = COALESCE(?, name), 
      region = COALESCE(?, region),
      learningcid = COALESCE(?, learningcid),
      phoneNumber = COALESCE(?, phoneNumber),
      address = COALESCE(?, address)
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [name, region, learningcid, phoneNumber, address, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Filial topilmadi" });

    res.json({ message: "Filial yangilandi" });
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM branch WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Filial topilmadi" });

    res.json({ message: "Filial o'chirildi" });
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik" });
  }
};
