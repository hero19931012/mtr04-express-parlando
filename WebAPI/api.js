const axios = require('axios');
const { ACCESS_TOKEN, albumHash } = require('../env/env')

async function imgurUpload(encodedFiles) {

  const links = []
  let finished = false
  let index = 0

  while (finished === false) {
    await axios({
      method: "POST",
      url: "https://api.imgur.com/3/upload",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      },
      data: {
        image: encodedFiles[index],
        type: "base64",
        album: albumHash,
      },
    })
      .then(result => {
        // console.log(result.data.data.link);
        links.push(result.data.data.link)
        if (index === encodedFiles.length - 1) {
          finished = true;
        }
        index++
      })
      .catch((err) => {
        finished = true
        // console.log(err.response.config);
        // console.log("err.response.data", err.response.data);
        throw new Error("Too Many Requests")
      })
  }
  return links
}

module.exports = { imgurUpload }