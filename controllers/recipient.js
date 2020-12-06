const db = require('../models');
const { Recipient_info } = db;

const recipientController = {
  index: (req, res) => {
    Recipient_info.findAll()
      .then((addresses) => {
        res.status(200).json(addresses);
      })
      .catch(err => {
        console.log(err);
      });
  },
}

module.exports = recipientController;