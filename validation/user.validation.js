const Joi = require("joi");

const registerUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must be less than 50 characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must be less than 50 characters",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be in +998XXXXXXXXX format",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be less than 100 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  image: Joi.string().uri().optional().messages({
    "string.uri": "Image must be a valid URL",
  }),
  role: Joi.string().required().messages({
    "string.base": "Role must be a string",
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+998\d{9}$/),
  password: Joi.string().min(6).max(100),
  image: Joi.string().uri().required(),
}).or("firstName", "lastName", "email", "phone", "password", "image");

module.exports = { registerUserSchema, updateUserSchema };
