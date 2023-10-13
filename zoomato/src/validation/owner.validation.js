const joi = require("joi");
const createRestaurant = {
  body: joi.object().keys({
    oname: joi.string().required().trim(),
    ophone: joi.number().integer().required(),
    oemail: joi.string().required().trim(),
    restaurant_name: joi.string().required().trim(),
  }),
};
module.exports = { createRestaurant };

