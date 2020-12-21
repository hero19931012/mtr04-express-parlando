const { render } = require("ejs");
const axios = require('axios')


const { imgurUpload } = require('../WebAPI/api')

const imageController = {
  upload: (req, res) => {
    res.render('upload');
  },

  handleUpload: (req, res) => {
    // 接收 files 陣列
    // call api => return links 陣列
    // 寫入 Photos，關聯 ProductId

    const files = req.file.buffer.toString("base64")

    try {
      imgurUpload(files)
    } catch (error) {

    }
  }
}

module.exports = imageController;