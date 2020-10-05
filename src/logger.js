import {createLogger, transports, format} from "winston";
const {combine, timestamp, printf} = format;

const myFormat = printf(({ level, message,  timestamp }) => {
    return `[${timestamp}][${level}]: ${message}`;
});

const sequelizeFormat = printf(({ level, message,  timestamp }) => {
    return `[${timestamp}][ORM][${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: combine(
                timestamp(),
                myFormat
            )}),
        new transports.File({
            filename: 'combined.log',
            format: combine(
                timestamp(),
                myFormat
            ),
        }),
        new transports.Console({
            format: combine(
                timestamp(),
                myFormat
            ),
        })
    ],
});

const sequelizeLogger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: 'orm.log',
            format: combine(
                timestamp(),
                sequelizeFormat
            ),
        }),
        new transports.Console({
            format: combine(
                timestamp(),
                sequelizeFormat
            )
        })
    ]
});

export default logger;
export {sequelizeLogger};