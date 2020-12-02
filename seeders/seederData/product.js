const productList = []

for (let i = 0; i < 100; i++) {
  let charCodeA = Math.floor(Math.random()*26) + 65
  let charCodeB = Math.floor(Math.random()*26) + 65

  let num = Math.ceil(Math.random()*1000)

  console.log(String.fromCharCode(charCodeA, charCodeB) + '-' + num.toString());
}

module.exports = { productList };