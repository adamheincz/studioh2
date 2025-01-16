const express = require("express");
const multer = require("multer");
const fs = require("fs");

const Album = require("../models/album");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).array("imageFiles"),
  (req, res, next) => {
    const url = "https://" + req.get("host");
    //const url = req.protocol + "://" + req.get("host");
    const images = req.files;
    let photos = JSON.parse(req.body.photos);

    for (const [index, photo] of photos.entries()) {
      photo.imagePath = url + "/images/" + images[index].filename;
    }

    const album = new Album({
      title: req.body.title,
      order: parseInt(req.body.order),
      photos: photos,
    });
    console.log(album);
    album.save().then((createdAlbum) => {
      res.status(201).json({
        message: "Album added successfully",
        album: {
          id: createdAlbum._id,
          title: createdAlbum.title,
          order: createdAlbum.order,
          photos: createdAlbum.photos.map((photo) => {
            return {
              id: photo._id,
              title: photo.title,
              imagePath: photo.imagePath,
            };
          }),
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  Album.find().then((documents) => {
    res.status(200).json({
      message: "Albums fetched successfully!",
      albums: documents.sort((a,b) => a.order - b.order),
    });
  });
});

router.get("/:id", (req, res, next) => {
  Album.findById(req.params.id).then((album) => {
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({
        message: "Album not found!",
      });
    }
  });
});

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).array("imageFiles"),
  (req, res, next) => {
    //const url = req.protocol + "://" + req.get("host");
    const url = "https://" + req.get("host");
    const images = req.files;
    let photos = JSON.parse(req.body.photos);
    const imagesToBeDeleted = req.body.imagesToBeDeleted;

    console.log("imagesToBeDeleted:");
    console.log(req.body.imagesToBeDeleted);

    if (imagesToBeDeleted) {
      if (Array.isArray(imagesToBeDeleted)) {
        for (const imagePath of imagesToBeDeleted) {
          const filename = "backend/images/" + imagePath.split("/").pop();
          fs.unlink(filename, (err) => {
            if (err) {
              console.log("File delete failed!");
            } else {
              console.log("File deleted!");
            }
          });
        }
      } else {
        const filename = "backend/images/" + imagesToBeDeleted.split("/").pop();
        fs.unlink(filename, (err) => {
          if (err) {
            console.log("File delete failed!");
          } else {
            console.log("File deleted!");
          }
        });
      }
    }

    let counter = 0;
    for (const [index, photo] of photos.entries()) {
      console.log(photo.imagePath);
      if (photo.imagePath == "") {
        photo.imagePath = url + "/images/" + images[counter].filename;
        counter++;
      }
    }

    const album = new Album({
      title: req.body.title,
      photos: photos,
    });

    console.log(album);

    Album.findOneAndUpdate(
      { _id: req.params.id },
      { title: album.title, photos: album.photos }
    ).then((updatedAlbum) => {
      res.status(200).json({
        message: "Album updated!",
        album: {
          id: updatedAlbum._id,
          title: updatedAlbum.title,
          order: updatedAlbum.order,
          photos: updatedAlbum.photos.map((photo) => {
            return {
              id: photo._id,
              title: photo.title,
              imagePath: photo.imagePath,
            };
          }),
        },
      });
    });
  }
);

router.delete("/:id", checkAuth, (req, res, next) => {
  Album.findOneAndDelete({ _id: req.params.id }).then((album) => {
    if(album) {
      for (const photo of album.photos) {
        const filename = "backend/images/" + photo.imagePath.split("/").pop();
        fs.unlink(filename, (err) => {
          if (err) {
            console.log("File delete failed!");
          } else {
            console.log("File deleted!");
          }
        });
        Album.find({order:{$gte:album.order}}).then((albums) => {
          for(const al of albums) {
            console.log(al);
            al.order -= 1;
          }
        })
      }
  
      res.status(200).json({
        message: "Album deleted!",
      });
    } else {
      res.status(404).json({
        message: "Album not found!",
      });
    }
  });
});

router.put("", checkAuth, multer({ storage: storage }).none(), (req, res, next) => {
  console.log("server reorder");
  let albumsNewOrder = JSON.parse(req.body.albums);
  albumsNewOrder.forEach(album => {
    Album.findOneAndUpdate({_id: album.id}, {order: album.order}).then((updatedAlbum) => {
      console.log(updatedAlbum);
    });
  });

  albumsNewOrder.sort((a,b) => a.order - b.order);

  res.status(200).json({
    message: "Albums reordered!",
    reorderedAlbums: albumsNewOrder
  });
});

module.exports = router;
