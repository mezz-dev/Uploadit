const renderEJS = require('../ejs/render')
const asyncWrapper = require("../middleware/async-wrapper")


// showing user information
const indexPage = asyncWrapper((req, res, next) => {
    renderEJS(req, res, "index")
})

module.exports = indexPage
