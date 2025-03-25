const express = require("express");
const { body, query } = require("express-validator");
const { getCategories, createCategory, deleteCategory } = require("../controller/resourceCategory.controller");

const router = express.Router();

const categoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("img").optional(),
];

router.get(
  "/",
  [query("page").optional().isInt(), query("limit").optional().isInt()],
  getCategories
);

router.post("/", categoryValidation, createCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
