const ecpay_payment = require('ecpay-payment');
const db = require('../models');
const { ECpay_result, Order, Product_model } = db;

const getRandomMerchantTradeNo = () => {
  let result = '';
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      result += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      result += String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
  }
  console.log("MerchantTradeNo", result);
  return result;
};

function getDate() {
  const date = new Date().toLocaleString()
  let [Day, Time] = date.split(', ')
  let [month, day, year] = Day.split('/')
  let [time, noon] = Time.split(' ')
  let [hr, min, sec] = time.split(':')
  if (noon === 'PM') { hr = Number(hr) + 12 }

  month = Number(month) > 10 ? month : "0" + month
  day = Number(day) > 10 ? day : "0" + day
  hr = Number(hr) > 10 ? hr : "0" + hr

  const dateString = `${year}/${month}/${day} ${hr}:${min}:${sec}`
  console.log(dateString);
  return dateString
}

const paymentController = {
  handlePayment: async (req, res) => {
    // 用 {uuid, MerchantTradeNo} create 一筆付款資訊, uuid 是 ecpay_result 對 order 的 foreignKey，MerchantTradeNo 在之後付款結果回傳時用來查詢要寫入的資料

    const UUID = req.params.uuid;

    // 透過 uuid 取出 order
    const order = await Order.findOne({
      where: { UUID, status: 0 },
      include: [Product_model]
    });
    if (order === null) {
      return res.status(400).json({
        message: "invalid order id or already paid"
      })
    }

    // 寫入 orderId & MerchantTradeNo 進 ECpay_result
    const { id, totalPrice, Product_models } = order
    const MerchantTradeNo = getRandomMerchantTradeNo(); // 長度 20 的隨機字串
    try {
      const payment = await ECpay_result.findOne({ where: { orderId: id } })
      if (payment !== null) {
        await payment.update({
          MerchantTradeNo
        })
      } else {
        await ECpay_result.create({
          orderId: id,
          MerchantTradeNo
        })
      }
    } catch (err) {
      console.log(`payment error1: ${err.toString()}`);
      return res.status(500).json({
        message: err.toString()
      })
    }

    // 產生購買商品的字串
    let productsString = ''
    Product_models.forEach((product, index) => {
      const { modelName } = product
      const { count } = product.Order_product
      productsString += `${index !== 0 ? " " : ""}${modelName}*${count}`
    })

    // 設定結帳資訊
    const base_param = {
      MerchantTradeNo, // 不重複的 20 碼 uid
      MerchantTradeDate: getDate(), // 格式：YYYY/MM/DD 15:45:30
      TotalAmount: totalPrice.toString(), // 必須是字串
      TradeDesc: 'test',
      ItemName: productsString,
      ReturnURL: "https://huiming.tw/payment",
      OrderResultURL: "https://huiming.tw/payment_result"
    };

    console.log(base_param);

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
  handlePaymentResult: async (req, res) => {
    const {
      MerchantID,
      MerchantTradeNo,
      StoreID,
      RtnCode,
      RtnMsg,
      TradeNo,
      PaymentDate,
      PaymentType,
      TradeDate
    } = req.body;

    // console.log(
    //   "MerchantID", MerchantID, '\n',
    //   "MerchantTradeNo", MerchantTradeNo, '\n',
    //   "StoreID", StoreID, '\n',
    //   "RtnCode", RtnCode, '\n',
    //   "RtnMsg", RtnMsg, '\n',
    //   "TradeNo", TradeNo, '\n',
    //   "PaymentDate", PaymentDate, '\n',
    //   "PaymentType", PaymentType, '\n',
    //   "TradeDate", TradeDate, '\n',
    // );

    try {
      db.sequelize.transaction(async () => {
        const payment = await ECpay_result.findOne({ where: { MerchantTradeNo } })
        if (payment === null) {
          console.log("payment error3: payment data not exist");
          return res.status(500).json({
            message: "payment data not exist"
          })
        }

        await payment.update({
          MerchantID: Number(MerchantID),
          StoreID: Number(StoreID),
          RtnCode: Number(RtnCode),
          RtnMsg,
          TradeNo,
          PaymentDate,
          PaymentType,
          TradeDate,
        })

        const { orderId } = payment;

        console.log("orderId", orderId);

        await Order.update(
          { status: 1 },
          { where: { id: orderId } }
        )
      })
        .then(() => {
          return res.status(200).json({
            ok: 1
          })
        })
        .catch(err => {
          console.log(`payment error5: ${err.toString()}`);
          return res.status(500).json({
            ok: 0
          })
        })
    } catch (err) {
      console.log(`payment error5: ${err.toString()}`);
      return res.status(500).json({
        message: err.toString()
      })
    }
  },
};

module.exports = paymentController;
