const winston = require('winston')
const { NODE_ENV } = require('./config')

//setup winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    //info => will log everything w. a severity of info & greater (warn & error)
    //info.log => logs will be stored in a file name info.log in JSON format
    transports: [
        new winston.transports.File({ filename: 'info.log' })
    ]
})

if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

module.exports = logger