const express = require("express");

const {auth, ctrlWrapper} = require("../../middlewares");
const {usersInfo: ctrl} = require("../../controllers");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;