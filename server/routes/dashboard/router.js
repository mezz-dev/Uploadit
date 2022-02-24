const dashboardService = require("../../services/dashboard")
const router = require("express").Router()


router.get("/", dashboardService.dashboardPage)
router.get("/add-image", dashboardService.addImage)

module.exports = router