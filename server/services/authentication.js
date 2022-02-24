const renderEJS = require('../ejs/render')

const registerPage = (req, res) => {
    renderEJS(req, res, "authentication/register")
}

const loginPage = (req, res) => {
    renderEJS(req, res, "authentication/login")
}

module.exports = {
    loginPage,
    registerPage
}