// 引入multer
const multer = require("multer");
// 引入path
const path = require("path");
// 引入silly-datetime
const sd = require("silly-datetime");
// 引入mkdirp 用于创建目录
const mkdirp = require("mkdirp");
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let d = sd.format(new Date(), "YYYY-MM-DD");
    await mkdirp("public/images/" + d);
    cb(null, "public/images/" + d);
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload