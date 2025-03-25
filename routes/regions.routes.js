const express = require("express");
const { body, query } = require("express-validator");
const { getRegions, createRegion } = require("../controller/regions.controller");

const router = express.Router();

const regionValidation = [body("name").notEmpty().withMessage("Name is required")];

router.get(
  "/",
  [query("page").optional().isInt(), query("limit").optional().isInt()],
  getRegions
);

router.post("/", regionValidation, createRegion);

module.exports = router;
