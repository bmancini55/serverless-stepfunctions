'use strict';

let AWS = require('aws-sdk');
let http = require('http');
let docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function(event, context, callback) {

  // create http request options
  let feedOptions = {
    host: 'api.coindesk.com',
    path: '/v1/bpi/currentprice.json'
  };

  // initiate the http request
  let req = http.get(feedOptions, (res) => {

    // handle the response
    let buffers = [];
    res.on('data', (buffer) => buffers.push(buffer));
    res.on('end', () => {

       // convert all the buffers into the output
       let rawData = Buffer.concat(buffers).toString();

       // do some parsing
       let json  = JSON.parse(rawData);
       let date  = new Date(json.time.updatedISO).getTime();
       let price = json.bpi.USD.rate;
       let item = {
         date,
         price
       };

       // then do a database insertion
       docClient.put({
         TableName: 'PriceIndex',
         Item: item
       }, (err) => {

         // execute callback with or item
         if(err) callback(err);
         else    callback(null, item);

       });
    });
  });
  req.on('error', callback);
  req.end();
};
