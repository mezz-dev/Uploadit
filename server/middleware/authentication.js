const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect("/auth/login")
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.query.action && req.query.action === "logout"){
        req.logout()
        return next()
    }
    if(!req.isAuthenticated()) return next()
    res.redirect("/dashboard")
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
}