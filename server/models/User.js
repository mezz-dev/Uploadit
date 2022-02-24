const mongoose = require("mongoose")

// create User schema
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    imageId: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Image",
        required: true,
        default: []
    },
    password: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model("User", schema)