<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS with Typescript'
description: 'This template demonstrates how to make a simple REST API with Node.js and Typescript running on AWS Lambda and API Gateway using the Serverless Framework v1.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
priority: 10
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node with Typescript REST API on AWS

This template demonstrates how to make a simple REST API with Node.js and Typescript running on AWS Lambda and API Gateway using the Serverless Framework v1.

This template does not include any kind of persistence (database). For a more advanced example check out the [aws-node-rest-api-typescript example](https://github.com/serverless/examples/tree/master/aws-node-rest-api-typescript) which has must RESTful resources and persistence using MongoDB.

## Setup

Run this command to initialize ths project

`serverless`

This will associate your project to the serverless dashboard.

## Usage

**Deploy**

This example is made to work with the Serverless Framework dashboard which includes advanced features like CI/CD, monitoring, metrics, etc.

```
$ serverless login
$ serverless deploy
```

To deploy without the dashboard you will need to remove `org` and `app` fields from the `serverless.yml`, and you won’t have to run `sls login` before deploying.

**Invoke the function locally.**

```
serverless invoke local --function render
```

*** Setup your user as the application requires authentication and authorization.

1. Create a user 

```bash

aws cognito-idp sign-up \
  --client-id YOUR_USER_POOL_CLIENT_ID \
  --username "sample@test.com" \
  --password "compLicat3d123"

```

2. Confirm the user so they can sign in

```bash
    aws cognito-idp admin-confirm-sign-up \
  --user-pool-id YOUR_USER_POOL_ID \
  --username "sample@test.com"
```

3. Log the user to retrieve an identity JWT token

```bash

aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH \
  --auth-parameters \
  USERNAME="sample@test.com",PASSWORD="compLicat3d123" \
  --client-id YOUR_USER_POOL_CLIENT_ID

```

**Invoke the function**

```
curl --location --request POST 'https://xxxxxxx.execute-api.ap-southeast-2.amazonaws.com/dev/render' \
--header 'Authorization: Bearer eyJraWQiOiJMVVVVZGtIQ1JX***********************R1t5S-oA'
```

*** Response ***
```bash
{
    "message": "Video sent for rendering.",
    "renderId": "q4hawg1c6u",
    "bucketName": "remotionlambda-apsoutheast2-5essis84y1"
}
```


*** Get Progress ***


```bash
curl --location --request GET 'https://xxxxxxx.execute-api.ap-southeast-2.amazonaws.com/dev/render/q4hawg1c6u?bucketName=remotionlambda-apsoutheast2-5essis84y1' \
--header 'Authorization: Bearer eyJraWQiOiJMVVVVZGtIQ1JXWEEyWEE***********FRjTjMKR1t5S-oA'

```

*** Response ***
```bash
{
    "message": "Video sent for rendering.",
    "renderId": "q4hawg1c6u",
    "bucketName": "remotionlambda-apsoutheast2-5essis84y1"
}
```