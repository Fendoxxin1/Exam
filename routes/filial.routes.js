const express = require("express");
const { body, query } = require("express-validator");
const {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../controller/filial.controller"); // 🔥 Fayl yo‘li to‘g‘rilandi

const router = express.Router();

router.get(
  "/",
  [
    query("sort").optional().isString(),
    query("order").optional().isIn(["asc", "desc"]),
    query("region").optional().isInt(),
    query("learningcenterid").optional().isInt(), // 🔥 Nom bir xil qilindi
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1 }),
  ],
  getBranches
);

router.get("/:id", getBranchById);

router.post(
  "/",
  [
    body("name").notEmpty().isString(),
    body("region").isInt(),
    body("learningcenterid").isInt(), // 🔥 Nom bir xil qilindi
    body("phoneNumber").optional().isString(),
    body("address").optional().isString(),
  ],
  createBranch
);

router.patch(
  "/:id",
  [
    body("name").optional().isString(),
    body("region").optional().isInt(),
    body("learningcenterid").optional().isInt(), // 🔥 Nom bir xil qilindi
    body("phoneNumber").optional().isString(),
    body("address").optional().isString(),
  ],
  updateBranch
);

router.delete("/:id", deleteBranch);

module.exports = router;
