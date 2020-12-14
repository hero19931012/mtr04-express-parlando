const { render } = require("ejs");
const axios = require('axios')
const { CLIENT_ID } = require('../.env/env');
const FormData = require('form-data');

const imageController = {
  upload: (req, res) => {
    res.render('upload');
  },

  handleUpload: (req, res) => {
    const name = req.body.name
    const image = req.file.buffer.toString("base64")
    console.log("name", name);
    console.log("image", image);

    const formData = new FormData()
    formData.append("name", name)
    formData.append("image", image)

    axios({
      method: "POST",
      url: "https://api.imgur.com/3/upload",
      headers: {
        // Authorization: `Client-ID ${CLIENT_ID}`
        AuthorizationL: `Berear 96dab5a4ae9edfbc27aaee9fda914ce953c3bcce`
      },
      data: formData,


      // {
      //   image,
      //   // name,
      //   // album: "mzjS4yw",
      //   type: "base64"
      // },
      mimeType: 'multipart/form-data',
    })
      .then(res => { res.status(201).send(res.json) })
      .catch((err) => {
        console.log(err);
        res.status(err.response.status).end()
      })
  }
}

module.exports = imageController;