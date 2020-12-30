const axios = require('axios');
const { ACCESS_TOKEN } = process.env

async function imgurUpload(encodedFiles, albumHash) {

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
        console.log(result.data.data.link);
        links.push(result.data.data.link)
        if (index === encodedFiles.length - 1) {
          finished = true;
        }
        index++
      })
      .catch((err) => {
        finished = true
        console.log(`upload iamges error (WebAPI): ${err.toString()}`);
        throw new Error(err.toString)
      })
  }
  return links
}

module.exports = { imgurUpload }