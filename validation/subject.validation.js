const Joi = require("joi");

const subjectSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 255 characters",
    "any.required": "Name is required",
  }),
  image: Joi.string().uri().optional().required().messages({
    "string.uri": "Image must be a valid URL",
  }),
});

const updateSubjectSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 255 characters",
  }),
  image: Joi.string().uri().optional().required().messages({
    "string.uri": "Image must be a valid URL",
  }),
});

module.exports = { subjectSchema, updateSubjectSchema };
