var express = require("express");
var loginController = require('../controller/login.controller');
var router = express.Router();

router.post('/login', loginController.postLogin);

module.exports = router;