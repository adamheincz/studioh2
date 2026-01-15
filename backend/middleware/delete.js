const { bucket, CLOUD_BUCKET } = require('../storage/gcs');

const deleteFilesFromGcs = (req, res, next) => {

    const imagesToBeDeleted = req.body.imagesToBeDeleted;

    if (!imagesToBeDeleted) {
        return next()
    }

    let promises = [];

    imagesToBeDeleted.forEach((image, index) => {

        console.log(image);

        const filename = image.split(`https://storage.googleapis.com/${CLOUD_BUCKET}/`)[1];

        const promise = new Promise((resolve, reject) => {
            try {
                console.log("more: " + filename);
                bucket.file(filename).delete();
                resolve();
            } catch (error) {
                reject(error)
            }
        })

        promises.push(promise);
    });

    Promise.all(promises)
        .then(_ => {
            promises = [];
            next();
        })
        .catch(next);
}

const deleteFile = (imagePath) => {
    const filename = imagePath.split(`https://storage.googleapis.com/${CLOUD_BUCKET}/`)[1];

    bucket.file(filename).delete();
}

module.exports = { deleteFilesFromGcs, deleteFile };