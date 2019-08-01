process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Imap = require('imap');
const { inspect } = require('util');
const { simpleParser } = require('mailparser');
const logger = require('../utils/logger');
// const models = require('../models');

const imap = new Imap({
  user: 'myprojectemail11@gmail.com',
  password: 'myProjectEmail11',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', () => {
  openInbox((error, box) => {
    if (error) throw error;
    logger.info(`${box.messages.total} message(s) found!`);
    // 1:* - Retrieve all messages
    // 3:5 - Retrieve messages #3,4,5
    const f = imap.seq.fetch('1:*', {
      bodies: '',
    });
    f.on('message', (msg, seqno) => {
      logger.info('Message #%d', seqno);
      const prefix = `(#${seqno}) `;

      msg.on('body', (stream) => {
        simpleParser(stream, (err, mail) => {
          logger.info(prefix + mail.headers.get('subject'));
          logger.info(prefix + mail.text);
        });
      });
      msg.once('attributes', (attrs) => {
        logger.info(`${prefix}Attributes: %s`, inspect(attrs, false, 8));
      });
      msg.once('end', () => {
        logger.info(`${prefix}Finished`);
      });
    });
    f.once('error', (err) => {
      logger.info(`Fetch error: ${err}`);
    });
    f.once('end', () => {
      logger.info('Done fetching all messages!');
      imap.end();
    });

    // search example
    //    imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
    //      if (err) throw err;
    //      var f = imap.fetch(results, { bodies: '' });
    //      ...
    //    }
  });
});
imap.once('error', (err) => {
  logger.info(err);
});
imap.once('end', () => {
  logger.info('Connection ended');
});
imap.connect();
