// const { State } = require("../model");
// let Country = require("country-state-city").Country;
// let State = require("country-state-city").State;
// console.log(Country.getAllCountries());
// console.log(State.getAllStates());
const { State } = require("../model");

/**create State */
const createState = async (reqBody) => {
  return State.create(reqBody);
};

/**get State list */
const getStateList = async (req, res) => {
  return State.find();
};

/**get State details by id */
const getStateById = async (stateId) => {
  return State.findById(stateId);
};

/**update State */
const updateState = async (stateId, updateBody) => {
  return State.findByIdAndUpdate(stateId, { $set: updateBody });
};

/**delete State */
const deleteState = async (stateId) => {
  return State.findByIdAndDelete(stateId);
};

module.exports = {
  createState,
  getStateList,
  getStateById,
  updateState,
  deleteState,
};
