const { Storage } = require('@google-cloud/storage');

const credentials = JSON.parse(Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString('utf8'))


const CLOUD_BUCKET = process.env.CLOUD_BUCKET;
const storage = new Storage({
    credentials: credentials
})

const bucket = storage.bucket(CLOUD_BUCKET);

module.exports = { storage, bucket, CLOUD_BUCKET };