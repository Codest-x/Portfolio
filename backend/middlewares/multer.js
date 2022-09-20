const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Images = require("../models/images");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const filename = file.originalname.replace(/\s+/g, "");
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: filename,
        bucketName: "assets",
      };

      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

exports.upload = upload.single("image");
