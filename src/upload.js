const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const BYTES = 16;

module.exports = {
  dest: path.resolve(__dirname, "..", "uploads"),
  storage: multer.diskStorage({
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
