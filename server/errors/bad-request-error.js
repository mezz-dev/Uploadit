const CustomError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

module.exports = class BadRequestError extends CustomError {
    constructor(message){
        super(message, StatusCodes.BAD_REQUEST)
    }
}