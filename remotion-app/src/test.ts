const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const BUCKET_NAME = 'codedev-motionfit-infra-renderbucketbucket52721e-dkxx5tw6necs'

const execute = async () => {
    try {
        const data = await s3.headBucket({ Bucket: BUCKET_NAME }).promise()

        console.log(`Bucket "${BUCKET_NAME}" exists`)
        return `Bucket "${BUCKET_NAME}" exists`
    } catch (err) {
        console.log(err)
        throw err
    }
}

execute()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
