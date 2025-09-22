import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { loggerConfig } from './loggerConfig.js';
import { isProduction } from '../utils/isProduction.js';

export const LoggerModule = PinoLoggerModule.forRoot({
  pinoHttp: {
    level: isProduction ? 'info' : 'debug',
    transport: loggerConfig,
    formatters: {
      level: (label: string) => ({ level: label }),
    },
    customSuccessMessage: () => `request success`,
  },
});
