const db = require('../../models');
const { Recipient, User, Order, Address_city, Address_district } = db;

const recipientController = {
  add: async (req, res) => {
    const { UUID } = req.params;
    const { name, phone, email, address, cityId, districtId } = req.body;
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !cityId ||
      !districtId
    ) {
      console.log("add recipient error: recipient data incomplete");
      return res.status(403).json({
        success: false,
        message: "recipient data incomplete"
      })
    }

    // 檢查 order.userId === req.user.id
    let order = await Order.findOne({ where: { UUID } })
    const { id: orderId } = order

    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({
        message: "invalid user"
      })
    }

    Recipient.create({ orderId, name, phone, email, address, cityId, districtId })
      .then(recipient => {
        res.status(200).json({
          success: true,
          data: { recipient }
        })
      })
      .catch(err => {
        console.log(`add recipient error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  }
}
module.exports = recipientController;