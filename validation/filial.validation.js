// validations/filial.validation.js
const Joi = require("joi");

const createFilialSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is required",
  }),
  region: Joi.number().integer().required().messages({
    "number.base": "Region must be an integer",
    "any.required": "Region is required",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Address is required",
  }),
  educationalcenterId: Joi.number().integer().required().messages({
    "number.base": "Educational Center ID must be an integer",
    "any.required": "Educational Center ID is required",
  }),
});

const updateFilialSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "Name must be a string",
  }),
  region: Joi.number().integer().optional().messages({
    "number.base": "Region must be an integer",
  }),
  phoneNumber: Joi.string().optional().messages({
    "string.base": "Phone number must be a string",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string",
  }),
  educationalcenterId: Joi.number().integer().optional().messages({
    "number.base": "Educational Center ID must be an integer",
  }),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

module.exports = {
  createFilialSchema,
  updateFilialSchema,
};