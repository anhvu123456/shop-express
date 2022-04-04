var md5 = require("md5");
var User = require('../model/user');

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = md5(password);
    User.findOne({ email: email})
    .then((user) => {
        if(user.password !== hashedPassword){
            res.status(500).json({
                success:false,
                message: "Wrong password.",
            })
        }
        res.status(200).json({
            success: true,
            message: "Login is successfully",
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "User is null",
            error: err.message
        })
    });

    

    
    

};