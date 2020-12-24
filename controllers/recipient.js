const db = require('../models');
const { Recipient, User, Order, Address_city, Address_district } = db;

const recipientController = {
  getAll: (req, res) => {
    Recipient.findAll()
      .then((recipient) => {
        if (req.user === 'admin') {

        }
        res.status(200).json(recipient);
      })
      .catch(err => {
        console.log(`get recipients error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      });
  },
  getOne: (req, res) => {
    const { id } = req.params;
    Recipient.findOne({
      where: { id },
      include: [Order, Address_city, Address_district]
    })
      .then((recipient) => {
        res.status(200).json(recipient);
      })
      .catch(err => {
        res.status(500).json({
          message: "get recipient error: " + err.toString()
        })
      });
  },
  add: (req, res) => {
    const { orderId, name, phone, email, address, cityId, districtId } = req.body;

    if (
      !orderId ||
      !name ||
      !phone ||
      !email ||
      !address ||
      !cityId ||
      !districtId
    ) {
      console.log("add recipient error1: recipient data incomplete");
      return res.status(400).json({
        message: "recipient data incomplete"
      })
    }

    Recipient.create({ orderId, name, phone, email, address, cityId, districtId })
    .then(recipient => {
      res.status(200).json({
        recipient
      })
    })
    .catch(err => {
      console.log(`add recipient error2: ${err.toString()}`);
      res.status(500).json({
        message: err.toString()
      })
    })
  },
  update: (req, res) => {

  }
}

module.exports = recipientController;