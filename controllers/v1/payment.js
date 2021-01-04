const ecpay_payment = require('ecpay-payment');
const db = require('../../models');
const { ECpay_result, Order, Product_model } = db;
const { getDate, getRandomMerchantTradeNo } = require('../../utils')

const paymentController = {
  handlePayment: async (req, res) => {
    const { UUID } = req.params;

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

    if (totalPrice >= 30000) {
      console.log("post payment error: total price must below 30,000");
      return res.status(400).json({
        message: "total price must below 30,000"
      })
    }

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
      console.log(`payment error: ${err.toString()}`);
      return res.status(500).json({
        message: err.toString()
      })
    }

    // 產生購買商品的字串
    let productsString = ''
    Product_models.forEach((product, index) => {
      const { modelName } = product
      const { count } = product.Order_product
      productsString += `${index !== 0 ? "#" : ""}${modelName}*${count}`
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
