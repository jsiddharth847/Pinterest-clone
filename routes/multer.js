const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const parentDirectory = path.dirname(__dirname);
const filesDirectory = path.join(parentDirectory, "public/images/uploads");

const storage = multer.diskStorage({
  destination: filesDirectory,
  filename: function (req, file, cb) {
    const uniquefilename = uuidv4(); // generating a unique filename using uuid
    cb(null, uniquefilename + path.extname(file.originalname)); // use the unique filename for uploaded file
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
