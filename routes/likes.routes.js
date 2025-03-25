const express = require("express");
const { body, query } = require("express-validator");
const { getLikes, createLike, deleteLike } = require("../controller/like.controller");

const router = express.Router();

likeValidation = [
  body("userId").isInt().withMessage("userId must be an integer"),
  body("learningcId").isInt().withMessage("learningcId must be an integer"),
];

router.get(
  "/",
  [query("page").optional().isInt(), query("limit").optional().isInt()],
  getLikes
);


router.post("/", likeValidation, createLike);

router.delete("/:id", deleteLike);

module.exports = router;
