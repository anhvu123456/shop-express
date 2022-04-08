var express = require("express");
var loginController = require('../controller/login.controller');
var resetPassword = require('../controller/resetPassword');
var router = express.Router();

router.post('/login', loginController.postLogin);
router.post('/forgotPassword',resetPassword.forgotPassword);
router.post('/:userId/:token', resetPassword.resetPassword);

module.exports = router;