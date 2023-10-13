const joi = require("joi");
const createRestaurant = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    start_date: joi.string().required().trim(),
    opening_hour: joi.string().required().trim(),
    closing_hour: joi.string().required().trim(),
  }),
};
module.exports = { createRestaurant };
