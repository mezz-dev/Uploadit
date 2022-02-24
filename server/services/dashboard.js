const asyncWrapper = require("../middleware/async-wrapper")
const renderEJS = require('../ejs/render')

// showing user information
const dashboardPage = asyncWrapper(async (req, res, next) => {
    renderEJS(req, res, "dashboard/index", {user: req.user})  
})


const addImage = asyncWrapper((req, res, next) => {
    renderEJS(req, res, "dashboard/add-image")
})

module.exports = {
    dashboardPage,
    addImage
}