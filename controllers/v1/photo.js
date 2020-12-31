const { render } = require('ejs');
const db = require('../../models');
const { Photo } = db;
const { ALBUM_HASH_PRODUCT } = process.env;
const { imgurUpload } = require('../../WebAPI/api')

const photoController = {
  getAll: (req, res) => {
    const { unlinked } = req.query

    Photo.findAll({
      where: unlinked !== undefined ? {
        productId: null
      } : null
    })
      .then(photos => {
        res.status(200).json({
          photos
        })
      })
      .catch(err => {
        console.log(`get photos error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
  upload: (req, res) => {
    if (req.files === undefined || req.files.length === 0) {
      console.log("upload images error1: no images found");
      return res.status(400).json({
        message: "no images found"
      })
    }

    const encodedFiles = req.files.map((file) => {
      return file.buffer.toString('base64')
    })

    const imageUpload = new Promise((resolve, reject) => {
      let result = imgurUpload(encodedFiles, ALBUM_HASH_PRODUCT)
      try {
        resolve(result)
      }
      catch (err) {
        reject(err)
      }
    })
      .then(links => {
        const photoArray = links.map((link) => {
          return {
            url: link
          }
        })
        // console.log(links);
        return Photo.bulkCreate(photoArray)
      })
      .then((photos) => {
        // console.log("bulkCreate result: ", photos);
        res.status(200).json({
          photos
        })
      })
      .catch(err => {
        console.log(`upload images error2: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
  update: (req, res) => {
    const { productId, photos } = req.body;
    if (!productId || !photos || photos.length === 0) {
      console.log("update photos error: data incomplete");
      return res.status(400).json({
        message: "data incomplete"
      })
    }

    Photo.update(
      { productId },
      { where: { id: photos } }
    )
      .then(photos => {
        res.status(204).end()
      })
      .catch(err => {
        console.log(`link product and photos error: ${err.toString()}`)
        res.status(500).json({
          message: err.toString()
        })
      })
  }
}
module.exports = photoController;