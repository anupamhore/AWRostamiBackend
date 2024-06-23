import { createLogger, transports, format } from "winston";

// Create a logger instance
const Logger = createLogger({
    transports:[ new transports.File({filename:'Tracker.log'})],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, message})=>{
            return `${timestamp} ${message}`;
        })
    )
});

export default Logger;