const db = require('../../models');
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
        if (req.user.role !== 'admin' && req.user.id !== recipient.Order.userId) {
          return res.status(401).json({
            message: "invalid user"
          })
        }
        res.status(200).json({
          recipient
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "get recipient error: " + err.toString()
        })
      });
  },
  add: async (req, res) => {
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

    // 檢查 order.userId === req.user.id
    let order = await Order.findOne({ where: orderId })
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(401).json({
        message: "invalid user"
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
    const { id } = req.params;
    const { name, phone, email, address, cityId, districtId } = req.body;
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !cityId ||
      !districtId
    ) {
      console.log("update recipient error1: recipient data incomplete");
      return res.status(400).json({
        message: "recipient data incomplete"
      })
    }

    Recipient.update(
      { name, phone, email, address, cityId, districtId },
      { where: { id } }
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(err => {
        console.log(`update recipient error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  }
}

module.exports = recipientController;