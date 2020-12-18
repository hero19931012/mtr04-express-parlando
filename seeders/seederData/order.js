const { rawProductList, modelList } = require('./product');
const { userList } = require('./user')

const productList = [...rawProductList]


function getRamdomNum(max) {
  return Math.ceil(Math.random() * max)
}

function getRandomUserId() {
  return getRamdomNum(userList.length - 1) // id: 1-20
}

function getRandomProductId() {
  return getRamdomNum(rawProductList.length - 1) // id: 1-20
}


// const orderRequestData = {
//   userId,
//   products: [
//     {
//       productId,
//       modelId
//     },
//     {
//       productId,
//       modelId
//     }
//   ],
//   totalPrice
// }


























// 產生訂單
// 1. 隨機挑 1-3 件產品，訂購 1-3 件
// 2. 產生 10 筆訂單
// function getRandomOrderContent() {
//   let type = getRamdomNum(3) // 隨機產生要買幾種商品
//   let temp = [] // 用於記錄已經買的商品，如同一訂單已經有同樣商品就跳過
//   const orderContent = [] // 記錄訂單內容

//   for (let i = 0; i < type; i++) {
//     let productId = getRandomProductId() // 隨機取用商品
//     if (temp.indexOf(productId) >= 0) { // 檢查是曾已存在
//       i--
//       continue;
//     }
//     temp.push(productId)
//     let count = getRamdomNum(3) // 隨機產生購買數量
//     orderContent.push({ // 加入訂單
//       productId,
//       count
//     })
//   }
//   return orderContent
// }

// function getTotalPrice(orderContent) { // 計算總價
//   let totalPrice = 0;
//   orderContent.forEach((product) => {
//     let unitPrice = rawProductList[product.productId - 1].price
//     totalPrice += (unitPrice * product.count)
//   })
//   return totalPrice;
// }

// // 產生前端發送的 req 格式
// function genarateOrderRequestData() { 
//   const orderContent = getRandomOrderContent()

//   return {
//     userId: getRandomUserId(),
//     orderContent,
//     totalPrice: getTotalPrice(orderContent)
//   }
// }

// // 根據 orderRequests 更新 product 的資料
// function updateProductList(requestData) { 
//   let { orderContent } = requestData
//   orderContent.forEach((item) => {
//     let { productId, count } = item
//     productList.forEach((product, index) => {
//       if (productId === product.id) {
//         productList[index] = {
//           ...product,
//           storage: product.storage - count,
//           sell: product.sell + count
//         }
//       }
//     })
//   })
// }

// // 產生一串訂單的 req
// const orderRequests = []
// for (let i = 0; i < 10; i++) {
//   let requestData = genarateOrderRequestData()
//   updateProductList(requestData)
//   orderRequests.push(requestData)
// }

// // 產生 訂單 的資料
// const orderList = []
// orderRequests.forEach((order) => {
//   let { userId, totalPrice } = order
//   orderList.push({
//     userId,
//     totalPrice,
//     status: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   })
// })

// // 產生 訂單X商品 的 table
// const orderProductList = []
// orderRequests.forEach((order, index) => {
//   const orderId = index + 1;
//   order.orderContent.forEach((item) => {
//     const { productId, count } = item
//     orderProductList.push({
//       orderId,
//       productId,
//       count,
//       unitPrice: rawProductList[productId - 1].price,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     })
//   })
// })

// console.log("orderRequests", orderRequests);
// console.log("orderList", orderList);
// console.log("orderProductList", orderProductList);
// console.log("productList", productList);

module.exports = { orderList, orderProductList, productList };