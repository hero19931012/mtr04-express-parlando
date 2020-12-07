const db = require('../models');
const { RecipientInfo } = db;

const recipientController = {
  index: (req, res) => {
    RecipientInfo.findAll()
      .then((addresses) => {
        res.status(200).json(addresses);
      })
      .catch(err => {
        console.log(err);
      });
  },
}

module.exports = recipientController;