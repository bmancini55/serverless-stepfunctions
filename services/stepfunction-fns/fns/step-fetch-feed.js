'use strict';
let http = require('http');

module.exports.handler = function(event, context, callback) {

  // create http request options
  let feedOptions = {
    host: 'api.coindesk.com',
    path: '/v1/bpi/currentprice.json'
  };

  // initiate the http request
  let req = http.get(feedOptions, (res) => {
    let buffers = [];
    res.on('data', (buffer) => buffers.push(buffer));
    res.on('end', () => {
      let rawData = Buffer.concat(buffers).toString();
      callback(null, rawData);
    });
  });
  req.on('error', callback);
  req.end();
};