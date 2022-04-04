var express = require('express');
var userController = require('../controller/user.controller')
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

router.get("/", userController.index);
router.get("/:userId", userController.singleUser);
router.post("/create", upload.single('avatar'), userController.create);
router.post("/uploadImage/:userId", upload.single('avatar'),userController.uploadImage);
router.post("/update/:userId", userController.update);
router.delete("/delete/:userId", userController.delete);
module.exports = router;