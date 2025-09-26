import type { TransportMultiOptions, TransportSingleOptions } from 'pino';
import { isProduction } from '../utils/isProduction.js';
import { developmentLoggerConfig } from './developmentLoggerConfig.js';
import { productionLoggerConfig } from './productionLoggerConfig.js';

export const loggerConfig: TransportSingleOptions | TransportMultiOptions =
  isProduction ? productionLoggerConfig : developmentLoggerConfig;
