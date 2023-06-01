import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import

// Configure the AWS SDK
const putCommandExample = async () => {
  const client = new S3Client({
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
      sessionToken: "",
    },
  });
  const input = {
    // PutObjectRequest
    ACL: "private",
    Body: "STREAMING_BLOB_VALUE",
    Bucket: "XX-XXXX-app-XXXXX-zi1b9kytom4y", // required
    Key: "testing", // required
  };
  const command = new PutObjectCommand(input);
  const response = await client.send(command);
  console.log(response);
};

putCommandExample()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
