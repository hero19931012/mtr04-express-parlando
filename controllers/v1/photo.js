const { render } = require('ejs');
const db = require('../../models');
const { Photo } = db;
const { ALBUM_HASH_PRODUCT } = process.env;
const { imgurUpload } = require('../../webAPI')

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
          success: true,
          data: { photos }
        })
      })
      .catch(err => {
        console.log(`get photos error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  },
  upload: (req, res) => {
    if (req.files === undefined || req.files.length === 0) {
      console.log("upload images error: no images found");
      return res.status(400).json({
        success: false,
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
          success: true,
          data: { photos }
        })
      })
      .catch(err => {
        console.log(`upload images error: ${err.toString()}`);
        res.status(500).json({
          success: true,
          message: err.toString()
        })
      })
  },
  update: async (req, res) => {
    const { productId, photos: photoIdList } = req.body;

    if (!productId || !photoIdList || photoIdList.length === 0) {
      console.log("update photos error: data incomplete");
      return res.status(400).json({
        success: false,
        message: "data incomplete"
      })
    }

    try {
      db.sequelize.transaction(async () => {
        for (let i = 0; i < photoIdList.length; i++) {
          const photo = await Photo.findOne({
            where: { id: photoIdList[i] }
          })

          if (photo === null) {
            throw new Error("invalid photo id")
          }

          await photo.update({ productId })
        }
      })
        .then(() => {
          res.status(200).json({
            success: true
          })
        })
        .catch(err => {
          console.log(`link product and photos error: ${err.toString()}`);
          res.status(403).json({
            success: false,
            message: err.toString()
          })
        })
    } catch (err) {
      console.log(`link product and photos error: ${err.toString()}`);
      res.status(403).json({
        success: false,
        message: err.toString()
      })
    }
  }
}
module.exports = photoController;