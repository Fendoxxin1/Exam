
const Joi = require("joi");

const createEducationalCenterSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is required",
  }),
  image: Joi.string().optional().messages({
    "string.base": "Image must be a string",
  }),
  regionId: Joi.number().integer().required().messages({
    "number.base": "RegionId must be an integer",
    "any.required": "RegionId is required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Address is required",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
  }),
});

const updateEducationalCenterSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "Name must be a string",
  }),
  image: Joi.string().optional().messages({
    "string.base": "Image must be a string",
  }),
  region: Joi.number().integer().optional().messages({
    "number.base": "Region must be an integer",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string",
  }),
  phoneNumber: Joi.string().optional().messages({
    "string.base": "Phone number must be a string",
  }),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

module.exports = {
  createEducationalCenterSchema,
  updateEducationalCenterSchema,
};