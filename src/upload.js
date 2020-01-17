const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

require("dotenv").config();

const BYTES = 16;

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename: (req, file, next) => {
      crypto.randomBytes(BYTES, (err, hash) => {
        if (err) next(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;
        next(null, file.key);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, next) => {
      crypto.randomBytes(BYTES, (err, hash) => {
        if (err) next(err);

        fileName = `${hash.toString("hex")}-${file.originalname}`;
        next(null, fileName);
      });
    }
  })
};

module.exports = {
  dest: path.resolve(__dirname, "..", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, next) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      next(null, true);
    } else {
      next(new Error("Invalid file type"), false);
    }
  }
};
