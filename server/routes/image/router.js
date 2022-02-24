const router = require("express").Router()
const imageService = require("../../services/image")
const {checkAuthenticated} = require("../../middleware/authentication")


router.get("/", checkAuthenticated ,imageService.addImage)

module.exports = router