const asyncWrapper = require("../middleware/async-wrapper")
const {BadRequestError} = require("../errors/index")
const User = require("../models/User")
const Image = require("../models/Image")

const {StatusCodes} = require("http-status-codes")


const getUser = asyncWrapper(async (req, res, next) => {

    // get user id
    const {userId} = req.params

    // find user by id
    const user = await User.findById(userId)
    if(!user) throw new BadRequestError(`User not found, ID:[${userId}]`)

    
    // send user as a json
    res
     .json({success: true, user})
     .status(StatusCodes.OK)
    

})

const getUsers = asyncWrapper(async (req, res, next) => {

    let filter = {}

    if(req.query.username){
        filter["username"] = req.query.username
    }
    if(req.query.emailAddress){
        filter["emailAddress"] = req.query.emailAddress
    }

    console.log(filter)

    const users = await User.find(filter)
    res.json({users, success: true,})

})



const deleteUser = asyncWrapper(async (req, res, next) => {

    const {userId} = req.params

    // delete the user
    const deletedUser = await User.findOneAndDelete({userId})
    if(!deletedUser) throw new BadRequestError(`User not found, ID:[${userId}]`)

    res.json({success: true, message:"User deleted successfully"})
})



module.exports = {
    deleteUser,
    getUser,
    getUsers,
}
