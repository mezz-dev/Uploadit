const renderEJS = (req, res, path, params={}) => {

    params.isAuthenticated = false

    if(req.isAuthenticated()){
        params.isAuthenticated = true
        if(!params.user) params.username = req.user.username

        return res.render(path, params)
    }
    
    res.render(path, params)
}

module.exports = renderEJS