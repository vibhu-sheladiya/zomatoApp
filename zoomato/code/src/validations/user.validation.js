const joi = require("joi");
const createUser = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    email: joi.string().required().trim(),
    password: joi.string().required().trim(),
    img: joi.string().required().trim(),
  }),
};
module.exports = { createUser };
