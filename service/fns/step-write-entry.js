'use strict';

let AWS = require('aws-sdk');
let docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function(event, context, callback) {
  docClient.put({
    TableName: 'PriceIndex',
    Item: event
  }, (err) => {
    if(err) callback(err);
    else    callback(null, event);
  });
};