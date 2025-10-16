import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ENV_VARIABLE } from '../configs/env';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enumerateErrorFormat = winston.format((info: any) => {
    if (info.message instanceof Error) {
        info.message = {
            message: info.message.message,
            stack: info.message.stack,
            ...info.message,
        };
    }

    if (info instanceof Error) {
        return {
            // message: info.message,
            stack: info.stack,
            ...info,
        };
    }

    return info;
});
const transport = new DailyRotateFile({
    filename: ENV_VARIABLE.LOG_FOLDER + ENV_VARIABLE.LOG_FILE,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3',
    // prepend: true,
});

export const logger = winston.createLogger({
    format: winston.format.combine(enumerateErrorFormat(), winston.format.json()),
    transports: [
        transport,
        new winston.transports.Console({
            level: 'info',
        }),
    ],
});
