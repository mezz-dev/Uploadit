const axios = require("axios")
const User = require("../models/User")
const asyncWrapper = require("../middleware/async-wrapper")


// showing user information
const indexPage = asyncWrapper((req, res, next) => {

    const {userId} = req.params

})