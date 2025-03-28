const express = require("express");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const authenticate=require("../middleware/auth")
const {authorize} = require("../middleware/role")
const { User } = require("../models/association.model");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Excel
 *   description: Excel export APIs
 */

/**
 * @swagger
 * /excel/export-users:
 *   get:
 *     summary: Export users to Excel
 *     description: Fetches all users and exports them as an Excel file.
 *     tags: [Excel]
 *     responses:
 *       200:
 *         description: Excel file generated successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
router.get("/export-users",authenticate,authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const exportDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow(user);
    });

    const filePath = path.join(exportDir, "users.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "users.xlsx");
  } catch (err) {
    console.error("Error exporting users:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
