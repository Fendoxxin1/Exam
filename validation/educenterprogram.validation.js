const Joi = require("joi");

const createEducenterProgramSchema = Joi.object({
  programId: Joi.number().integer().required().messages({
    "number.base": "Program ID must be an integer",
    "any.required": "Program ID is required",
  }),
  educationalcenterId: Joi.number().integer().required().messages({
    "number.base": "Educational Center ID must be an integer",
    "any.required": "Educational Center ID is required",
  }),
});

module.exports = { createEducenterProgramSchema };