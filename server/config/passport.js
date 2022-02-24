const LocalStrategy = require("passport-local").Strategy
const {BadRequestError} = require("../errors/index")
const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = async (passport) => {

    try {
        // Configure Local Strategy
        passport.use(new LocalStrategy({usernameField: "emailAddress"}, async (emailAddress, password, done) => {
    

            // -------- get and return the user ------------
            const user = await User.findOne({emailAddress})
            if(!user) return done (new BadRequestError("Email or Password is not correct"))

            const match = await bcrypt.compare(password, user.password)
            if(!match) return done (new BadRequestError("Email or Password is not correct"))

            done(null, user)
        }))

        
        // -------- serialize and de serialize user for session ------------
        passport.serializeUser((user, done) => {
            return done(null ,user._id) 
        })
        passport.deserializeUser(async (id, done) => {
            const user = await User.findById(id)
            return done(null, user)
        })


    } catch (error) {
        console.log(error)
    }

}
