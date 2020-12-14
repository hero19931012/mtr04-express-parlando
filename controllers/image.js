const { render } = require("ejs");
const axios = require('axios')
const { CLIENT_ID } = require('../.env/env');
const FormData = require('form-data');
const AccessToken = "4547bcf72bd154f6cb79c1209d2bb164ecaaa945"


const imageController = {
  upload: (req, res) => {
    res.render('upload');
  },

  handleUpload: (req, res) => {
    const name = req.body.name
    const image = req.file.buffer.toString("base64")

    // 測試用 formdata => 400 bad request
    const formData = new FormData()
    formData.append("image", image)
    formData.append("name", "some image")

    // formData.append("album", "mzjS4yw")


    axios({
      method: "POST",
      // 用 upload 可以匿名上傳，但 data 只接受 2 個參數：image & type
      // 用 image 可以接受 album 參數，但目前卡在認證


      // formdata => upload => 400 bad request, 改用 image => you are not the owner
      url: "https://api.imgur.com/3/image",
      headers: {
        // 其他方法設定正確的話用 clietnId 或 Berear token 都可以
        "Authorization": `Client-ID 6f3c155594f8a5b`,

        // 測試 content type = json
        "Content-Type": "application/json;charset=utf-8",


        // 依據文件添加


        // formdata 測試改用 berear => malformed auth header => 改回 client id


        // content-type json 測試改用 berear => Malformed auth header
        // "Authorization": `Berear ${AccessToken}`,
        ...formData.getHeaders()
      },

      // postman 實測只要帶 clientId and album hash 就可以上傳
      data: formData
      // {





      // image,
      // 沒指定 base64 => We don't support that file type
      // type: "base64",
      // album: "mzjS4yw",




      // },
      // 不給 mimeType 也可以
      // mimeType: 'multipart/form-data',
    })
      .then(res => {
        console.log(res.data)
        // console.log(res.data.data.link);
      })
      .catch((err) => {
        // console.log(err);
        console.log("err.response.data", err.response.data);
        res.status(err.response.status).end()
      })
  }
}

module.exports = imageController;