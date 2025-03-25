const express = require("express");
const { body, query } = require("express-validator");
const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controller/resource.controller");

const router = express.Router();

const resourceValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("media").notEmpty().withMessage("Media is required"),
  body("description").optional(),
  body("createdBy").isInt().withMessage("createdBy must be an integer"),
  body("categoryid").isInt().withMessage("categoryid must be an integer"),
];

router.get(
  "/",
  [query("page").optional().isInt(), query("limit").optional().isInt()],
  getResources
);

router.post("/", resourceValidation, createResource);

router.put("/:id", resourceValidation, updateResource);

router.delete("/:id", deleteResource);

module.exports = router;
