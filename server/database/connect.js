const mongoose = require("mongoose")
const connectDb = async () => {
    // connect to database
    const con = await mongoose.connect(process.env.MONGO_URI)
    console.log(`successfully connected to database ${con.connection.host}`)
}


module.exports = connectDb