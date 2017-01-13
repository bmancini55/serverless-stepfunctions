'use strict';

let AWS = require('aws-sdk');
let stepfunctions = new AWS.StepFunctions();

module.exports.invoke = function(event, context, callback) {
  let accountId = context.invokedFunctionArn.split(':')[4];
  let params = {
    stateMachineArn: `arn:aws:states:us-east-1:${accountId}:stateMachine:update-feed`,
    input: JSON.stringify({ }),
  };
  stepfunctions.startExecution(params, callback);
};