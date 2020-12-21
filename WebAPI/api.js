const axios = require('axios');

function imgurUpload(file) {
  // const { name, }
  // axios({
  //   method: "POST",
  //   url: "https://api.imgur.com/3/upload",

  //   headers: {
  //     "Authorization": "Bearer 50009aa80018ae5f012dff96e8556a086949b4a2",
  //   },
  //   data: {
  //     image,
  //     type: "base64",
  //     album: albumHash,
  //     name,
  //     description: name
  //   },

  // })
  //   .then(res => {
  //     // console.log(res.config);
  //     console.log("res.data", res.data)
  //     console.log(res.data.data.link);
  //     res.status(200).json({})
  //   })
  //   .catch((err) => {
  //     console.log(err.response.config);
  //     console.log("err.response.data", err.response.data);
  //     res.status(err.response.status).end()
  //   })
}

module.exports = { imgurUpload }