import type { TransportSingleOptions } from 'pino';

export const developmentLoggerConfig: TransportSingleOptions = {
  target: 'pino-pretty',
  options: {
    colorize: true,
  },
};
