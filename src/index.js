/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  if (process.connected) {
    process.send('ready');
  }
  logger.info(`Feathers application started on ${app.get('host')}:${port}`);
});

process.on('message', msg => {
  if (msg === 'shutdown') {
    process.exit();
  }
});