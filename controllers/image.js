const { render } = require("ejs");

const { CLIENT_ID } = require('../.env/env');

const imageController = {
  upload: (req, res) => {
    res.render('upload');
  },

  handleUpload: (req, res) => {
    console.log("name", req.body.name);
    console.log(req.file.buffer.toString("base64"));
    res.send("file saved on server");
  }
}

module.exports = imageController;