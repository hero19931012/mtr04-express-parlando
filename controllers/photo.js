const { render } = require('ejs');
const db = require('../models');
const { Photo } = db;
const { imgurUpload } = require('../WebAPI/api')

const photoController = {
  index: (req, res) => {
    res.render('upload')
  },
  getAll: (req, res) => {

  },
  upload: (req, res) => {
    if (req.fils.length === 0) {
      res.status(400).json({
        message: "upload images error: no images found"
      })
    }

    const encodedFiles = req.files.map((file) => {
      return file.buffer.toString('base64')
    })

    const result = new Promise((resolve, reject) => {
      let result = imgurUpload(encodedFiles)
      try {
        resolve(result)
      }
      catch (err) {
        reject(err)
      }
    })
      // .then(links => {
      //   const photoArray = links.map((link) => {
      //     return {
      //       url: link
      //     }
      //   })
      //   console.log(links);
      //   return Photo.bulkCreate(photoArray)
      // })
      .then((photos) => {
        res.status(200).json({
          photos
        })
      })
      .catch(err => {
        // console.log('err', err);
        res.status(500).json({
          message: 'upload images error2: ' + err.toString()
        })
      })
  }
}

module.exports = photoController;