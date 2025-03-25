const express = require("express");
const { body, query, param } = require("express-validator");
const { 
    getRegions, 
    createRegion, 
    updateRegion, 
    deleteRegion 
} = require("../controller/regions.controller");

const router = express.Router();

const regionValidation = [
    body("name").notEmpty().withMessage("Name is required")
];

const idValidation = [
    param("id").isInt().withMessage("Invalid ID format")
];

router.get(
    "/",
    [query("page").optional().isInt(), query("limit").optional().isInt()],
    getRegions
);

router.post("/", regionValidation, createRegion);

router.patch("/:id", idValidation.concat(regionValidation), updateRegion);

router.delete("/:id", idValidation, deleteRegion);

module.exports = router;
