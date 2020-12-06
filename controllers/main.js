const { render } = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models');
const { User } = db;

/// JWT key => 之後要放在 env
const SECRET = 'lidemymtr04parlando'
///


const mainController = {
  login: (req, res) => {
    res.render("login")
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        ok: 0,
        message: "username and password required"
      })
    }
    User.findOne({
      where: {
        username
      }
    })
      .then((user) => {

        bcrypt.compare(password, user.password, (err, result) => {
          if (!result) {
            res.status(400).json({
              ok: 0,
              message: 'password invalid'
            })
          } else {
            // JWT signing
            const token = jwt.sign(
              // user info
              {
                id: user.id.toString(),
                username: user.username,
              },
              SECRET,
              // options
              {
                expiresIn: "1 day"
              })

            res.status(200).json({
              ok: 1,
              token
            })
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          errorMessage: err.toString()
        })
      });
  },
  verify: (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, SECRET, (err, user) => {
      if (err || !user) {
        res.status(400).json({
          ok: 0,
          message: "verify fail"
        })
      } else {
        res.status(200).json({
          ok: 1,
          user
        })
      }
    })
  },
  add: (req, res) => {

  },

}

module.exports = mainController;