const { bucket, CLOUD_BUCKET } = require('../storage/gcs');

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGcs = (req, res, next) => {

  if (!req.files) {
    return next()
  }

  let promises = [];
  req.files.forEach((image, index) => {
    const gcsname = image.originalname
    const file = bucket.file(gcsname)

    const promise = new Promise((resolve, reject) => {
      const stream = file.createWriteStream({
        resumable: false,
        metadata: {
          contentType: image.mimetype
        }
      });

      stream.on('finish', async () => {
        try {
          req.files[index].cloudStorageObject = gcsname
          req.files[index].cloudStoragePublicUrl = getPublicUrl(gcsname)
          resolve();
        } catch (error) {
          reject(error)
        }
      });

      stream.on('error', (err) => {
        req.files[index].cloudStorageError = err
        reject(err)
      });

      stream.end(image.buffer);
    })

    promises.push(promise)
  });

  Promise.all(promises)
    .then(_ => {
      promises = [];
      next();
    })
    .catch(next);
}

module.exports = sendUploadToGcs;

