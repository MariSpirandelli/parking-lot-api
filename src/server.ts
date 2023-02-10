import createServer from './express/index';
import bunyan from 'bunyan';
import config from './config';

const logger = bunyan.createLogger({ name: 'server' });

process.on('uncaughtException', (err) => {
  logger.error('[UncaughtException] SERVER ERROR:', err);

  // prevent undefined state of the application
  process.exit(-500);
});

process.on('unhandledRejection', (err: any, promise) =>
  logger.error('[UnhandledRejection]', err.message, '\n', err, promise)
);

const exitSignalHandler = (arg) => {
  logger.info('Exit code received', arg);
  server.close(() => {
    logger.error('HTTP server closed');
  });
};
process.on('SIGINT', exitSignalHandler);
process.on('SIGUSR1', exitSignalHandler);
process.on('SIGUSR2', exitSignalHandler);

logger.info('[STARTING] Server process at UTC:', new Date());

const app = createServer();

const server = app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port}/`);
});
