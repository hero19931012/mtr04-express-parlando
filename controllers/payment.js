const ecpay_payment = require('ecpay-payment');
const db = require('../models');

<<<<<<< HEAD
const { ECpay_result, Order, Product_model } = db;
=======
const { ECpay_result, Order } = db;
>>>>>>> 58f9d55e0be90f591730b6252bc9eff2f1713f42

const getRandomMerchantTradeNo = () => {
  let result = '';
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      result += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      result += String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
  }
  return result;
};

function getDate() {
  const date = new Date().toLocaleString()
  let [Day, Time] = date.split(', ')
  let [month, day, year] = Day.split('/')
  let [time, noon] = Time.split(' ')
  let [hr, min, sec] = time.split(':')
  if (noon === 'PM') { hr = Number(hr) + 12 }

  return `${year}/${month}/${day} ${hr}:${min}:${sec}`
}

const paymentController = {
  handlePayment: async (req, res) => {
    const UUID = req.params.id;

    // 透過 uuid 取出 order
    const order = await Order.findOne({ where: { UUID }, include: [Product_model] });
    if (order === null) {
      return res.status(400).json({
        message: "invalid id"
      })
    }

    // 產生 20 uid 寫入 order
    const MerchantTradeNo = getRandomMerchantTradeNo()
    try {
      order.update({ MerchantTradeNo })
    } catch (err) {
      console.log(`payment error1: ${err.toString()}`);
      return res.status(500).json({
        message: err.toString()
      })
    }

    const { totalPrice, Product_models } = order
    let productList = ''
    Product_models.forEach((product, index) => {
      const { modelName } = product
      const { count } = product.Order_product
      productList += `${index !== 0 ? " " : ""}${modelName}*${count}`
    })

    // 結帳資訊
    const base_param = {
      MerchantTradeNo: getRandomMerchantTradeNo(), // 不重複的 20 碼 uid
      MerchantTradeDate: getDate(), // 格式：2017/02/13 15:45:30
      TotalAmount: totalPrice,
      TradeDesc: 'test',
      ItemName: productList,
      ReturnURL: 'https://parlando.tw/payment-result',
    };

    const inv_params = {};

    const create = new ecpay_payment();
    const htm = create.payment_client.aio_check_out_all(
      (parameters = base_param),
      (invoice = inv_params)
    );
    res.send(htm);
  },
  renderAdminPage: (req, res) => {
    Payment_result.findAll().then((payments) => {
      res.render('admin', { payments });
    });
  },
  handlePaymentResult: (req, res) => {
    const {
      MerchantID,
      MerchantTradeNo,
      StoreID,
      RtnCode,
      RtnMsg,
      TradeNo,
      TradeAmt,
      PaymentDate,
      PaymentType,
      PaymentTypeChargeFee,
      TradeDate,
      SimulatePaid,
    } = req.body;

    ECpay_result.create({
      MerchantID,
      MerchantTradeNo,
      StoreID,
      RtnCode,
      RtnMsg,
      TradeNo,
      // TradeAmt,
      PaymentDate,
      PaymentType,
      // PaymentTypeChargeFee,
      TradeDate,
      // SimulatePaid,
    });
  },
};

module.exports = paymentController;
