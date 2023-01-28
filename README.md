# Serverless Framework Node using Remotion in AWS


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


*** Response ***

```
    {
    "message": "Render found.",
    "renderId": "i9xnfrg8bk",
    "bucketName": "********-apsoutheast2-5essis84y1",
    "finality": {
        "type": "success",
        "url": "https://s3.ap-southeast-2.amazonaws.com/**********/renders/XXXXXXX/out.mp4"
    },
    "mediaUrl": "https://s3.ap-southeast-2.amazonaws.com/**********/renders/XXXXXXX/out.mp4?X-Amz-Algorithm=AWS4-HMAC-XXXX&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XXXXXXXXXX%2F20230128%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230128T073123Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIgePGKy%2Fwz7at897vdWldlRQvg%2FbtOOvr8GRR%2FEqgFtQXXXj&X-Amz-Signature=0881241614cd6c778b149b2076b337c7XXXXX&X-Amz-SignedHeaders=host&x-id=GetObject"
}
```

## License
This package and its source code is available under the MIT license. [Read the full license terms here.](https://github.com/alexfernandez803/remotion-serverless/blob/main/LICENSE.md). Notice that [Remotion](https://remotion.dev) requires a licence for most use cases, read the [terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).