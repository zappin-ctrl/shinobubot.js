import {createLogger, transports, format} from "winston";
const {combine, timestamp, printf} = format;

const myFormat = printf(({ level, message,  timestamp }) => {
    return `[${timestamp}][${level}]: ${message}`;
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

export default logger;