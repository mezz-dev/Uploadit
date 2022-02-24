const authService = require("../../services/authentication")
const {checkNotAuthenticated} = require("../../middleware/authentication")
const router = require("express").Router()

/**
 * @description render register page
 * @method GET /register
 */
router.get(
    "/register",
    checkNotAuthenticated,
    authService.registerPage
)


/**
 * @description render login page
 * @method GET /login
 */
router.get(
    "/login",
    checkNotAuthenticated,
    authService.loginPage
)

module.exports = router