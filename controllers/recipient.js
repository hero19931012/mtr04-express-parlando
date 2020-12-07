const db = require('../models');
const { RecipientInfo, User, Order, AddressCity } = db;

const recipientController = {
  getAll: (req, res) => {
    RecipientInfo.findAll()
      .then((addresses) => {
        res.status(200).json(addresses);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getOne: (req, res) => {
    const id = req.params.id;
    RecipientInfo.findOne({
      where: {
        id
      },
      // include: [AddressCity]
    })
      .then((addresse) => {
        res.status(200).json(addresse);
      })
      .catch(err => {
        console.log(err);
      });
  },
}

module.exports = recipientController;