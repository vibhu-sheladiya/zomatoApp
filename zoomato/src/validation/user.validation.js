const joi = require("joi");
const createUser = {
  body: joi.object().keys({
    user_name: joi.string().required().trim(),
    email: joi.string().required().trim(),
    phone: joi.number().required().integer(),
    password: joi.number().integer().required(),
    address: joi.string().required().trim(),
    role: joi.string().required().trim(),
  }),
};
module.exports = { createUser };
