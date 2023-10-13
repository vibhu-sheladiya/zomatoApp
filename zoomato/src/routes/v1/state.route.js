const express = require("express");
const {stateController} = require("../../controller");
// const { userValidation } = require("../../validations");
const router = express.Router();
// create user
router.post(
  "/create-state",stateController.createState
  // validate(userValidation.createUser),
);

router.get("/list",stateController.getStateList);

router.get("/id/:stateId",stateController.getStateDetails);

router.put("/update/:stateId",stateController.updateState);

router.delete("/delete/:stateId",stateController.deleteState);
module.exports = router;
