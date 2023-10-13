const joi = require("joi");
const createCity = {
  body: joi.object().keys({
    cname: joi.string().required().trim(),
    state: joi.string().required().trim(),
  }),
};
module.exports = { createCity };
