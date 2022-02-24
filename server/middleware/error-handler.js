const {CustomError} = require('../errors/index')
const {StatusCodes} = require('http-status-codes')

module.exports = (err, req, res, next) => {
    if(err instanceof CustomError) {
        return res
         .status(err.statusCode)
         .json({errMessage: err.message})
    }

    console.log(err)
    res
     .status(StatusCodes.INTERNAL_SERVER_ERROR)
     .json({errMessage: "Something went wrong, Please try again"})
}