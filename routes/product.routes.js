var express = require('express');
var productController = require('../controller/product.controller');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/uploads/");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({storage: storage});

router.get("/", productController.index);
router.get("/:productId", productController.deatailProdct);
router.post("/create", upload.single("image"), productController.create);
router.post("/update/:productId", productController.update);
router.post("/uploadImage/:productId", upload.single("image"), productController.uploadImage);
router.delete("/delete/:productId", productController.delete);

module.exports = router;