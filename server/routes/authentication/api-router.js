const router = require("express").Router()
const controller = require("../../controller/authentication")
const validator = require("../../middleware/validator")


router.post("/register", validator, controller.register)
router.post("/login", validator, controller.login)

module.exports = router