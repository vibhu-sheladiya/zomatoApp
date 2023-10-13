const joi = require("joi");
const createRestaurant = {
  body: joi.object().keys({
    quantity: joi.number().integer().required(),
    subtotal_price: joi.number().integer().required(),
    order: joi.string().required().trim(),
  }),
};
module.exports = { createRestaurant };
