const db = require('../models');
const { Recipient_info, User, Order, Address_city, Address_district } = db;

const recipientController = {
  getAll: (req, res) => {
    Recipient_info.findAll()
      .then((addresses) => {
        res.status(200).json(addresses);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getOne: (req, res) => {
    const id = req.params.id;
    Recipient_info.findOne({
      where: {
        id
      },
      include: [Order, Address_city, Address_district]
    })
      .then((recipient) => {
        res.status(200).json(recipient);
      })
      .catch(err => {
        console.log(err);
      });
  },
}

module.exports = recipientController;