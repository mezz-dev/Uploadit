const CustomError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

module.exports = class UnauthorizedError extends CustomError {
    constructor(message){
        super(message, StatusCodes.UNAUTHORIZED)
    }
}