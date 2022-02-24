const router = require("express").Router()
const homeService = require("../services/home")
const authenticationMiddleware = require("../middleware/authentication")


// API ROUTERS -----
router.use("/api/v1/images", require("./image/api-router"))              // Image
router.use("/api/v1/auth", require("./authentication/api-router"))      // Authentication
router.use("/api/v1/users", require("./user/api-router"))               // User








// CLIENT ROUTERS -----

// home || index
router.get("/", homeService)

// authentication
router.use("/auth", require("./authentication/router"))   

// dashboard
router.use(
    "/dashboard",
    authenticationMiddleware.checkAuthenticated,
    require("./dashboard/router")
)





module.exports = router