const Joi = require("joi");

const createStudyProgramSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 255 characters",
    "any.required": "Name is required",
  }),
  image: Joi.string().uri().required().messages({
    "string.uri": "Image must be a valid URL",
    "any.required": "Image is required",
  }),
  professionId: Joi.number().integer().required().messages({
    "number.base": "Profession ID must be a number",
    "any.required": "Profession ID is required",
  }),
  subjectId: Joi.number().integer().required().messages({
    "number.base": "Subject ID must be a number",
    "any.required": "Subject ID is required",
  }),
});


const updateStudyProgramSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 255 characters",
    "any.required": "Name is required",
  }),
  image: Joi.string().uri().required().messages({
    "string.uri": "Image must be a valid URL",
    "any.required": "Image is required",
  }),
  professionId: Joi.number().integer().required().messages({
    "number.base": "Profession ID must be a number",
    "any.required": "Profession ID is required",
  }),
  subjectId: Joi.number().integer().required().messages({
    "number.base": "Subject ID must be a number",
    "any.required": "Subject ID is required",
  }),
});

module.exports = { updateStudyProgramSchema, createStudyProgramSchema };
