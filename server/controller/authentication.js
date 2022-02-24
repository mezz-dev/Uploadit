const asyncWrapper = require("../middleware/async-wrapper")
const {BadRequestError} = require("../errors/index")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require("passport")

const register = asyncWrapper(async (req, res, next) => {

    const userObj = req.body

    // check that the email address is in use or not
    const user = await User.findOne({emailAddress: userObj.emailAddress})
    if(user) throw new BadRequestError("email address is already in use")


    // hash the password
    const salt = 10
    const hashedPassword = await bcrypt.hash(userObj.password, salt)
    userObj.password = hashedPassword


    // create and save user in database
    await User.create(userObj)

    res.json({message: "You successfully registered", User, success:true})
})


const login = asyncWrapper(async (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if(err) return next(err)


        req.login(user, function(err) {
            if (err) { return next(err) }
            res.json({success: true, message:"successfully logged in the user"})
        });


    })(req, res, next);
})


module.exports = {
    register,
    login,
}