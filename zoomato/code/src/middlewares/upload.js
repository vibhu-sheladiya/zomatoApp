const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log('hi'+'+++++')
    if (file.fieldname == "product_image") {
      fs.mkdirSync(path.join(__dirname, "../public/item_images"), {
        recursive: true, //to create folder recursively
      });
      // console.log(req.file)
      cb(null, path.join(__dirname, "../public/item_images"));
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      cb("Only images are allowed");
    }
    cb(null, new Date().getTime() + ext);
  },
});
// console.log(__dirname, "__dirname+++++");

const upload = multer({
  storage: storage,
});
console.log(upload);

module.exports = { upload };
