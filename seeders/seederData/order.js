const { rawProductList } = require('./product');
const { userList } = require('./user')


// 1. 隨機挑 1-3 件產品，訂購 1-3 件
// 2. 產生 20 筆訂單

// 1. 購物車撈出 product，計算 price
// 2. user 結帳 => 傳入 userId, productId, count, cityId, districtId, address, totalPrice
// 3. 寫入 address: cityId, districtId, address, 取得 addressId
// 4. 寫入 order: userId, addressId, totalPrice, status, 取得 orderId
// 5. 寫入 order_product: orderId, productId, count, unitPrice



function getRamdomNum(max) {
  return Math.ceil(Math.random() * max)
}

function getRandomUserId() {
  return getRamdomNum(userList.length - 1) // id: 0-19
}



function orderRequestData() {


  return {

  }
}
module.exports = { orderList };