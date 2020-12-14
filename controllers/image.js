const { render } = require("ejs");
const axios = require('axios')
const { CLIENT_ID } = require('../.env/env');

const imageController = {
  upload: (req, res) => {
    res.render('upload');
  },

  handleUpload: (req, res) => {
    // console.log("name", req.body.name);
    const image = req.file.buffer.toString("base64")
    // console.log(image);

    axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/upload',
      data: {
        image,
        // tyep: "base64"
      },
      headers: {
        Authorization: `Berear ae034ab18cfcd92d1085f4a55429c228e24bb169`
      },
      // mimeType: 'multipart/form-data',
    })
      .then(res => { res.data })
      .catch(err => { res.status(500).json({
        ok: 0,
        message: err.toString()
      }) })
  }
}

module.exports = imageController;