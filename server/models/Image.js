const mongoose = require("mongoose")
const User = require("./User")

// create Image schema
const schema = mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
}, {timeStamp: true})



schema.pre("save", async function(next){

    // find image owner
    const user = await User.findById(this.ownerId)
    
    // push image data to user
    user.imageId.push(this._id)

    // save the user
    await user.save()
    next()
})
schema.pre("deleteOne", { document: true } , async function(next){

    // find image owner
    const user = await User.findById(this.ownerId)
    
    // push image data to user
    const index = user.imageId.indexOf(this._id)

    user.imageId.splice(index, 1)

    // save the user
    await user.save()
    next()

})

module.exports = mongoose.model("Image", schema)