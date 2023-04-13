const User = require("../model/userModel");


const bcrypt = require('bcryptjs');

module.exports.register = async (req, res, next) => {
    try {
        // console.log(req.body)
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if ( usernameCheck )
            return res.json({status:false, msg: "Username already used", code: 422});
        const emailCheck = await User.findOne({email});
        if (emailCheck)
            return res.json({status:false, msg: "Email already used", code: 422})
        const hashedPassword = await bcrypt.hash(password,10);
        // console.log(hashedPassword)
        const user = await User.create({
            email,
            username, 
            password
        });
        // delete user.password;
        return res.json({status:true, msg: "Registered Successfully",data: user, code: 200})
    } catch (error) {
        next(error)
    }
};


// const whiteHouse = (data, msg, err) => {
//     return {
//         "data": data,
//         "message": msg,
//         "errors": err,
//         "code": 200
//     }
// }