const ecpay_payment = require('ecpay-payment');
const db = require('../models');
const { ECpay_result } = db;

const getRandomUid = () => {
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

const paymentController = {
  renderPaymentPage: (req, res) => {

    const tradeDate = (new Date()).toLocaleString().replace('-', '/').replace('-', '/')
    console.log(tradeDate);

    // 結帳資訊
    const base_param = {
      MerchantTradeNo: getRandomUid(),
      MerchantTradeDate: tradeDate,
      TotalAmount: '100',
      TradeDesc: 'TradeDesc test',
      ItemName: 'ItemName test123',
      ReturnURL: 'http://18.236.235.107:3000/paymentResult',
      // Remark: '交易備註123',
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
    ECpay_result.findAll()
      .then((payments) => {
        res.render('paymentResult', { payments });
      });
  },
  handlePaymentResult: (req, res) => {
    console.log("get payment result");
    const {
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
    } = req.body;

    console.log(
      MerchantID,
      MerchantTradeNo,
      StoreID,
      RtnCode,
      RtnMsg,
      TradeNo,
      PaymentDate,
      PaymentType,
      TradeDate);

    Payment_result.create({
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
    })
      .then(result => {
        console.log(result);
        res.statsu(200).json({
          ok: 1
        })
      })
  },
};

module.exports = paymentController;