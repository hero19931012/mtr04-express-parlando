const { render } = require("ejs");

const { CLIENT_ID } = require('../.env/env');

const imageController = {
  upload: (req, res) => {
    res.render('upload');
  },

  handleUpload: (req, res) => {
    const file = req.file.Buffer.toString('base64')
    // if ((!file)) {
    //   res.status(400).json({
    //     ok: 0,
    //     message: "no file"
    //   })
    // }
    // console.log(file);
    // res.status(200).json({
    //   ok: 1,
    //   message: "got file"
    // })
  }
}

module.exports = imageController;