const productList = []

function getRandomCharCode() {
  return Math.floor(Math.random() * 26) + 65
}

for (let i = 0; i < 20; i++) {
  let name = String.fromCharCode(
    getRandomCharCode(),
    getRandomCharCode(),
    getRandomCharCode(),
    getRandomCharCode(),
    getRandomCharCode(),
  )
  let model = String.fromCharCode(getRandomCharCode(), getRandomCharCode()) + '-' + Math.ceil(Math.random() * 1000).toString();
  let price = Math.ceil(Math.random() * 100) * 100
  let total = 100
  let sell = Math.floor(Math.random() * 10) * 10
  let storage = total - sell;

  productList.push({
    name,
    model,
    price,
    storage,
    sell,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// console.log(productList);

module.exports = { productList };

