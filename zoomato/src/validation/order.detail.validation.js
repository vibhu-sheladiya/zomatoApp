const joi = require("joi");
const createOrder = {
  body: joi.object().keys({
    o_date: joi.string().required().trim(),
    o_status: joi.string().required().trim(),
    total_price: joi.number().required().integer(),
    user:  joi.string().required().trim(),
    res_type: joi.string().required().trim(),
  }),
};
module.exports = { createOrder };
