const db = require('../models');
const { Recipient, User, Order, Address_city, Address_district } = db;

const recipientController = {
  getAll: (req, res) => {
    Recipient.findAll()
      .then((recipient) => {
        res.status(200).json(recipient);
      })
      .catch(err => {
        res.status(500).json({
          message: "get recipients error: " + err.toString()
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
  update: (req, res) => {
    
  }
}

module.exports = recipientController;