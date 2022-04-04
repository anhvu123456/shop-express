var mongoose = require('mongoose');
var md5 =require("md5");
var User = require('../model/user');


module.exports.index = function(req, res){
    User.find().select()
    .then((uses) => {
        return res.status(200).json({
            success: true,
            message: "A list of all user",
            User: uses,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    })
}

module.exports.singleUser = function(req, res){
    const id = req.params.userId;
    User.findById({ _id: id })
    .then(( singleUser) => {
        res.status(200).json({
            success: true,
            message:'User: ' + singleUser.name,
            singleUser: singleUser
        })
    }).catch((err) => {
        res.status(500).json({
            success:false,
            message: "This user does not exist",
            error: err.message
        })
    })
}


module.exports.create = function(req, res, next){
    const file =req.file;
    if(!file){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: md5(req.body.password),
        name: req.body.name,
        avatar: file.path,
        phone: req.body.phone,
    });

    User.create(user, function(err, u){
        if(err){
            res.json({
                error: err,
            })
        }
        res.json({
            message: "user created successfully",
        })
    })
}

module.exports.uploadImage = function(req, res, next){
    const file =req.file;
    if(!file){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }
    var id = req.params.userId;
    var image = file.path;
    User.findByIdAndUpdate({ _id: id}, {avatar: image})
    .exec()
    .then( () => {
        res.status(200).json(
            {
                success: true,
                message: "User upload image",
                avatar: image
            }
        )
    }).catch( (err) => {
        res.status(500).json({
            success: false,
            message: "Server error. please try again"
        });
    });
}

module.exports.update = function(req, res){
    var id = req.params.userId;
    var updateObject = req.body;
    User.updateOne({ _id: id }, {$set: updateObject})
    .exec()
    .then( () => {
        res.status(200).json(
            {
                success: true,
                message: "User is update",
                updateObject: updateObject
            }
        )
    }).catch( (err) => {
        res.status(500).json({
            success: false,
            message: "Server error. please try again"
        });
    });
}

module.exports.delete = function(req, res){
    const id = req.params.userId;
    User.findByIdAndRemove({ _id: id})
    .exec()
    .then(() =>{
        res.status(204).json({
            success: true
        })
    }).catch((err) => {
        res.status(500).json({
            success: false
        })
    })
}