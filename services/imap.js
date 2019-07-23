const Imap = require('imap');
const { MailParser } = require('mailparser');
const Promise = require('bluebird');

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


imap.once('ready', execute);
imap.once('error', (err) => {
  log.error(`Connection error: ${err.stack}`);
});
imap.connect();
function execute() {
  imap.openBox('INBOX', false, (err, mailBox) => {
    if (err) {
      console.error('Inbox error:', err);
      return;
    }
    imap.search(['unseen'], (err, results) => {
      if (!results || !results.length) {
        console.log('No unread mails');
        imap.end();
        return;
      }
      const f = imap.fetch(results, { bodies: '' });
      f.on('message', processMessage);
      f.once('error', err => Promise.reject(err));
      f.once('end', () => {
        console.log('Done fetching all messages.');
        imap.end();
      });
    });
    imap.search(['all'], (err, results) => {
      if (!results || !results.length) {
        console.log('No unread mails');
        imap.end();
        return;
      }
      const f = imap.fetch(results, { bodies: '' });
      f.on('message', processMessage);
      f.once('error', err => Promise.reject(err));
      f.once('end', () => {
        console.log('Done fetching all unseen messages.');
        imap.end();
      });
    });
  });
}
function processMessage(msg, seqno) {
  console.log(`Processing msg #${seqno}`);
  // console.log(msg);
  const parser = new MailParser();
  parser.on('headers', (headers) => {
    console.log(`Header: ${JSON.stringify(headers)}`);
  });
  parser.on('data', (data) => {
    if (data.type === 'text') {
      console.log(seqno);
      console.log(data.text);
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
