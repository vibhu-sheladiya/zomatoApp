const joi = require("joi");
const createType = {
  body: joi.object().keys({
    type_name: joi.string().required().trim(),
    start_date: joi.string().required().trim(),
    end_date: joi.string().required().trim(),
    rest_name: joi.string().required().trim(),
  }),
};
module.exports = { createType };
// const arr=[2,4,6,8];
// const result=arr.some((x)=>x%2!==0);
// console.log(result);

// const arr=[3,8,12,6,15];
// const result=arr.find((x)=>x>10);
// console.log(result);
