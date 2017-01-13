# serverless-stepfunctions
Example of using AWS Step Functions with Serverless.  
Refer to http://derpturkey.com/aws-step-functions-with-serverless/ for more information.

To use this repository.

1. Deploy the `stepfunction-fns` service
2. Deploy the `stepfunction-invoke` function
3. Create a IAM Role capable of invoking lambda functions
4. Create your Step Function using the defintiion in `/resources/stepfunction.json` and your IAM role.
