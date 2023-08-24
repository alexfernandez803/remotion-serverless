import {
  S3Client,
  PutBucketLifecycleConfigurationCommandInput,
  PutBucketLifecycleConfigurationCommand,
  DeleteBucketLifecycleCommand,
  DeleteBucketLifecycleCommandInput,
  LifecycleRule,
} from "@aws-sdk/client-s3";
import { getLifeCycleRules } from "./lifecycle";
import dotenv from "dotenv";
dotenv.config();

const deleteLifeCycleInput = ({
  bucketName,
  lcRules,
}: {
  bucketName: string;
  lcRules: LifecycleRule[];
}): DeleteBucketLifecycleCommandInput => {
  return {
    Bucket: bucketName,
    LifecycleConfiguration: {
      Rules: lcRules,
    },
  } as DeleteBucketLifecycleCommandInput;
};

const createLifeCycleInput = ({
  bucketName,
  lcRules,
}: {
  bucketName: string;
  lcRules: LifecycleRule[];
}): PutBucketLifecycleConfigurationCommandInput => {
  return {
    Bucket: bucketName,
    LifecycleConfiguration: {
      Rules: lcRules,
    },
  } as PutBucketLifecycleConfigurationCommandInput;
};

const putCommandExample = async () => {
  //add option if auto expring
  const lcRules = getLifeCycleRules();
  const client = new S3Client({});
  const bucketName = process.env.REMOTION_APP_BUCKET ?? "";
  console.log(`${bucketName} `);
  const deleteCommandInput = deleteLifeCycleInput({ bucketName, lcRules });

  // response is 204
  const deleteCommand = new DeleteBucketLifecycleCommand(deleteCommandInput);
  const deleteCommandResponse = await client.send(deleteCommand);
  console.log(deleteCommandResponse);

  const createCommandInput = createLifeCycleInput({ bucketName, lcRules });
  const createCommand = new PutBucketLifecycleConfigurationCommand(
    createCommandInput
  );
  const createCommandResponse = await client.send(createCommand);
  console.log(createCommandResponse);
};

putCommandExample()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
