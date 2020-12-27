const { rawProductList, modelList } = require('./product');
const { userList } = require('./user');
const { getRandomDate } = require('./product');
const productList = [...rawProductList]

function getRamdomNum(max) {
  return Math.ceil(Math.random() * max)
}

function getRandomUserId() {
  return getRamdomNum(userList.length - 1) // id: 1-20
}

function getRandomModelId() {
  return getRamdomNum(modelList.length - 1) // id: 1-20
}

// 產生 10 筆訂單 request data
// 1. 隨機 userId
// 2. 下訂 1-3 件商品，隨機 modelId
// 3. count: 1-3

function getRandomOrderRequestData() {
  let userId = getRandomUserId()
  let products = []

  for (let i = 0; i < getRamdomNum(3); i++) {
    const modelId = getRandomModelId()
    const count = getRamdomNum(3)
    products.push({
      modelId,
      count
    })
  }

  return {
    userId,
    products
  }
}

function getOrderContent(orderRequestData, orderId) {
  let totalPrice = 0
  const userId = orderRequestData.userId

  const orderProductContent = []

  const createdAt = new getRandomDate(new Date(2020, 0, 1), new Date(), 0, 24)
  const updatedAt = new Date()

  orderRequestData.products.forEach((product, index) => {
    let productId = modelList[product.modelId].productId
    let price = productList[productId - 1].price

    totalPrice += (price * product.count)

    orderProductContent.push({
      orderId: orderId + 1,
      modelId: product.modelId,
      count: product.count,
      unitPrice: price,
      createdAt,
      updatedAt
    })
  })

  const orderContent = {
    userId,
    totalPrice,
    createdAt,
    updatedAt
  }

  return {
    orderContent,
    orderProductContent
  }
}

const orderRequestDataList = []

for (let i = 0; i < 10; i++) {
  orderRequestDataList.push(getRandomOrderRequestData())
}

// 產生訂單
const orderList = []
const orderProductList = []

for (let i = 0; i < orderRequestDataList.length; i++) {
  const result = getOrderContent(orderRequestDataList[i], i)
  orderList.push(result.orderContent)
  orderProductList.push(...result.orderProductContent)
}

// console.log(orderList);
// console.log(orderProductList);

module.exports = { orderList, orderProductList };