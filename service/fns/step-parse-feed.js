'use strict';

module.exports.handler = function(event, context, callback) {
  let json  = JSON.parse(event);
  let date  = new Date(json.time.updatedISO).getTime();
  let price = json.bpi.USD.rate;
  let item = {
    date,
    price
  };
  callback(null, item);
};