const User = require("../model/user");
const Token = require("../model/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

module.exports.forgotPassword = async (req, res)=>{
  try{
    const user = await User.findOne({ email: req.body.email});
    if(!user){
        return res.status(400).send("user with given email doesn't exist");
    }
    let token = await Token.findOne({ userId: user._id });
    console.log(token);
    if(!token){
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        console.log("ok");
    }
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
}catch(error){
    res.send("An error occured");
    console.log(error);
}
};

module.exports.resetPassword = async (req, res) =>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(400).send("invalid link or expired");
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if(!token){
            return res.status(400).send("invalid link or expired");
        }
        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}