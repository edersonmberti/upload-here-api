const express = require("express");
const multer = require("multer");
const router = express.Router();

const uploadConfig = require("./upload");
const upload = multer(uploadConfig);

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(404).send({ error: "Image not found" });

  const { key: photo_key, location: image_url } = req.file;

  if (!photo_key) {
    image_url = `${process.env.APP_URL}/files/${this.photo_key}`;
  }

  return res.status(201).send({ image_url });
});

router.get("/", (req, res) =>
  res.status(200).send({
    message: "UHUL! The API is UP && RUNNING!!!"
  })
);

module.exports = router;
