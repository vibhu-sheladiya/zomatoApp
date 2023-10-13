const joi = require("joi");
const createToken = {
  body: joi.object().keys({
    token: joi.string().required().trim(),
    user: joi.string().required().trim(),
  }),
};
module.exports = { createToken };
