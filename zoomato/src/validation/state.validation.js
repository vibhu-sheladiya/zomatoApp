const joi = require("joi");
const createState = {
  body: joi.object().keys({
    user_country: joi.string().required().trim(),
    state_name: joi.string().required().trim(),
  }),
};
module.exports = { createState };
