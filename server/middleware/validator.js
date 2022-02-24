const {BadRequestError} = require('../errors/index')

module.exports = (req, res, next) => { 

    const obj = req.body    
    const objValues = Object.values(obj)
    
    objValues.forEach(objValue => {
        if(objValue === "") throw new BadRequestError("Fields cannot be empty")
    });
    
    next()
}