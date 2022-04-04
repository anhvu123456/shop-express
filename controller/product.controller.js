var mongoose = require('mongoose');
var Product = require('../model/product');

module.exports.index = function(req, res){
    Product.find().select()
    .then( (product) => {
        res.status(200).json({
            success: true,
            message: "all List of product",
            product: product
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            err: err.message
        })
    })

};

module.exports.deatailProdct = function(req, res){
    const id = req.params.productId;
    Product.findById({ _id: id})
    .then((product) => {
        res.status(200).json({
            success: true,
            message:"Product: " + product.name,
            product: product
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            err: err.message
        })
    })

};

module.exports.create = function(req, res, next){
    var file = req.file;
    if(!file){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        image: file.path,
        description: req.body.description
    });

    Product.create(product, function(err, p){
        if(err){
            res.json({
                err: err.message
            })
        }
        res.json({
            message: "Product create successfully",
        });
    })

};

module.exports.update = function(req, res){
    var id = req.params.productId;
    var updateObject = req.body;
    console.log(updateObject);
    Product.updateOne({ _id: id}, {$set: updateObject}).
    exec()
    .then(() => {
        res.status(200).json({
            success: true,
            message: "Product is update",
            product: updateObject
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    });

};

module.exports.uploadImage = function(req, res, next){
    var file = req.file
    if(!file){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    var id = req.params.productId;
    var image = file.path;

    Product.updateOne({ _id: id}, { image: image})
    .exec()
    .then((product) => {
        res.status(200).json({
            success: true,
            message: "Product is upload image",
            image: file.path
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })

};

module.exports.delete = function(req, res){
    var id = req.params.productId;
    Product.findByIdAndRemove({ _id: id})
    .exec
    .then(() => {
        res.status(204).json({
            success: true
        })
    }).catch((err) => {
        res.status(500).json({
            success: false
        })
    });

};