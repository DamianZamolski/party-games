import type { TransportMultiOptions, TransportSingleOptions } from 'pino';
import { productionLoggerConfig } from './productionLoggerConfig.js';
import { developmentLoggerConfig } from './developmentLoggerConfig.js';
import { isProduction } from '../utils/isProduction.js';

export const loggerConfig: TransportSingleOptions | TransportMultiOptions =
  isProduction ? productionLoggerConfig : developmentLoggerConfig;
