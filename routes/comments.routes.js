const express = require("express");
const { body, query } = require("express-validator");
const { getComments, createComment, deleteComment } = require("../controller/comment.controller");

const router = express.Router();

const commentValidation = [
  body("comment").notEmpty().withMessage("Comment is required"),
  body("star").isFloat().withMessage("Star rating must be a number"),
  body("userId").isInt().withMessage("userId must be an integer"),
  body("learningcId").isInt().withMessage("learningcId must be an integer"),
];

router.get(
  "/",
  [query("page").optional().isInt(), query("limit").optional().isInt()],
  getComments
);

router.post("/", commentValidation, createComment);

router.delete("/:id", deleteComment);

module.exports = router;
