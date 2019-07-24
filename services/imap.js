const Imap = require('imap');
const { MailParser } = require('mailparser');
const Promise = require('bluebird');
const logger = require('../utils/logger');

Promise.longStackTraces();
const imapConfig = {
  user: 'myprojectemail11@gmail.com',
  password: 'myProjectEmail11',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
};
const imap = new Imap(imapConfig);
Promise.promisifyAll(imap);
function execute() {
  imap.openBox('INBOX', false, (error) => {
    if (error) {
      logger.info('Inbox error:', error);
      return;
    }
    imap.search(['all'], (err, results) => {
      if (!results || !results.length) {
        logger.info('No unread mails');
        imap.end();
        return;
      }
      function processMessage(msg, seqno) {
        logger.info(`Processing msg #${seqno}`);
        const parser = new MailParser();
        parser.on('headers', (headers) => {
          logger.info(`Header: ${JSON.stringify(headers)}`);
        });
        parser.on('headers', (headers) => {
          logger.info(`Header: ${JSON.stringify(headers)}`);
        });
        parser.on('data', (data) => {
          if (data.type === 'text') {
            logger.info(seqno);
            logger.info(data.text);
          }
        });
        msg.on('body', (stream) => {
          stream.on('data', (chunk) => {
            parser.write(chunk.toString('utf8'));
          });
        });
        msg.once('end', () => {
          parser.end();
        });
      }
      const f = imap.fetch(results, { bodies: '' });     
      f.on('message', processMessage);
      f.once('error', errors => Promise.reject(errors));
      f.once('end', () => {
        logger.info('Done fetching all messages.');
        imap.end();
      });
    });
  });
}

imap.once('ready', execute);

imap.once('error', (err) => {
  logger.info(`Connection error: ${err.stack}`);
});
imap.connect();
