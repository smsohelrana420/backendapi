const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const randomtext = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileextenstion = file.originalname.split(".");
    let extanstion = fileextenstion[fileextenstion.length - 1];

    cb(null, file.fieldname + "-" + randomtext + "." + extanstion);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|wmv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg,jpg,png,gif,wmv)");
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    // limits:{filesize:2000000}
  },
  // limits:{
  //   fileSize:5*1024*1024,
  //   files:3
  // }
});

module.exports=upload
