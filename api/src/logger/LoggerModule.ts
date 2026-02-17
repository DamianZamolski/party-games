import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { isProduction } from '../utils/isProduction.js';

export const LoggerModule = PinoLoggerModule.forRoot({
  pinoHttp: {
    level: isProduction ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
    formatters: {
      level: (label: string) => ({ level: label }),
    },
    customSuccessMessage: () => 'http request success',
    customErrorMessage: () => 'http request error',
  },
});
