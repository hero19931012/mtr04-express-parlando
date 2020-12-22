const { render } = require('ejs');
const db = require('../models');
const { Photo } = db;

const photoController = {
  index: (req, res) => {
    res.render('upload')
  },
  getAll: (req, res) => {

  },
  upload: (req, res) => {
    // 接收 files 陣列
    // call api => return links 陣列
    // 寫入 Photos，關聯 ProductId

    const files = req.file.buffer.toString("base64")
    console.log(files);
  }
}

module.exports = photoController;