const { rawProductList } = require('./product');
const { userList } = require('./user')

const productList = [...rawProductList]

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
  return getRamdomNum(userList.length - 1) // id: 1-20
}

function getRandomProductId() {
  return getRamdomNum(rawProductList.length - 1) // id: 1-20
}

function getRandomOrderContent() {
  let type = getRamdomNum(3)
  // console.log('買幾樣', type);

  const orderContent = []

  let temp = []
  for (let i = 0; i < type; i++) {
    let productId = getRandomProductId()
    // console.log("productId", productId, "indexOf", temp.indexOf(productId));
    if (temp.indexOf(productId) >= 0) {
      // console.log("商品已存在");
      i--
      continue;
    }
    temp.push(productId)
    let count = getRamdomNum(3)
    orderContent.push({
      productId,
      count
    })
  }
  // console.log("temp", temp);
  return orderContent
}

function getTotalPrice(orderContent) {
  let totalPrice = 0;
  orderContent.forEach((product) => {
    let unitPrice = rawProductList[product.productId - 1].price
    totalPrice += (unitPrice * product.count)
  })
  return totalPrice;
}

function genarateOrderRequestData() {
  const orderContent = getRandomOrderContent()

  return {
    userId: getRandomUserId(),
    orderContent,
    totalPrice: getTotalPrice(orderContent)
  }
}

function updateProductList(orderRequestData) {
  let { orderContent } = orderRequestData

  orderContent.forEach((item) => {
    let { productId, count } = item
    // console.log(productId, count);
    productList.forEach((product, index) => {
      if (productId - 1 === index) {
        // console.log(index);
        productList[index] = {
          ...product,
          storage: product.storage - count,
          sell: product.sell + count
        }
      }
    })
  })
}


const orderList = []

for (let i = 0; i < 10; i++) {
  let requestData = genarateOrderRequestData()
  // console.log(requestData);
  updateProductList(requestData)
  // console.log(requestData);
  orderList.push(requestData)
}

const orderProductList = []
function generateOrderProductList(orderList) {
  orderList.forEach((order, index) => {
    let orderId = index + 1;

    order.orderContent.forEach((item) => {
      let { productId, count } = item
      orderProductList.push({
        orderId,
        productId,
        count,
        unitPrice: rawProductList[productId - 1].price,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
  })
}

generateOrderProductList(orderList)

const orderStatusList = []
orderList.forEach((order) => {
  let { userId, totalPrice } = order
  orderStatusList.push({
    userId,
    totalPrice,
    status: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  })
})

// console.log(orderStatusList);
// console.log(orderList);
// console.log(orderProductList);
// console.log(productList);

module.exports = { orderStatusList, orderProductList, productList };