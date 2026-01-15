const express = require("express");
const multer = require("multer");
const fs = require("fs");

const Album = require("../models/album");
const checkAuth = require("../middleware/check-auth");

const sendUploadToGcs = require('../middleware/upload.js');
const { deleteFilesFromGcs, deleteFile } = require('../middleware/delete.js');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 5 * 1024 * 1024
});

router.post(
  "",
  checkAuth,
  Multer.array("imageFiles"), sendUploadToGcs,
  (req, res, next) => {

    console.log("body: ");
    console.log(req.body);

    const images = req.files;

    console.log("reg.files: ");
    console.log(req.files);

    let photos = JSON.parse(req.body.photos);

    for (const [index, photo] of photos.entries()) {
      photo.imagePath = images[index].cloudStoragePublicUrl;
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
   Multer.array("imageFiles"),
   deleteFilesFromGcs,
   sendUploadToGcs,
   (req, res, next) => {
     //const url = req.protocol + "://" + req.get("host");
     const url = "https://" + req.get("host");
     const images = req.files;
     let photos = JSON.parse(req.body.photos);
     
     let counter = 0;
     for (const [index, photo] of photos.entries()) {
       console.log(photo.imagePath);
       if (photo.imagePath == "") {
         photo.imagePath = images[index].cloudStoragePublicUrl;
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
        try {
          deleteFile(photo.imagePath)
        } catch (error) {
          
        }
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

router.put("", checkAuth, Multer.none(), (req, res, next) => {
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
