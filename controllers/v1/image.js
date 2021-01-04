const { ALBUM_HASH_ARTICLE } = process.env;
const { imgurUpload } = require('../../webAPI')

const imageController = {
  upload: async (req, res) => {
    if (req.files === undefined || req.files.length === 0) {
      console.log("upload images error1: no images found");
      return res.status(400).json({
        success: false,
        message: "no images found"
      })
    }

    const encodedFiles = req.files.map((file) => {
      return file.buffer.toString('base64')
    })

    const imageUpload = new Promise((resolve, reject) => {
      let result = imgurUpload(encodedFiles, ALBUM_HASH_ARTICLE)
      try {
        resolve(result)
      }
      catch (err) {
        reject(err)
      }
    })

    imageUpload
      .then(url => {
        res.status(200).json({
          success: true,
          url: url[0]
        })
      })
      .catch(err => {
        console.log(`upload images error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  },
}

module.exports = imageController;