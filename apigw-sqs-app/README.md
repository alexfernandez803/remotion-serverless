# apigw-sqs-app for rendering video from lambda function

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Create the CDK stack

```bash
npx aws-cdk deploy \
  --outputs-file ./cdk-outputs.json
```

4. Open the AWS Console and find the lambda 
  
5. Cleanup

```bash
npx aws-cdk destroy
```


## License
This package and its source code is available under the MIT license. [Read the full license terms here.](https://github.com/alexfernandez803/apigw-sqs-app/blob/main/LICENSE.md). Notice that [Remotion](https://remotion.dev) requires a licence for most use cases, read the [terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).