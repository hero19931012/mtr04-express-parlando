const { render } = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models');
const { User } = db;

/// JWT key => 之後要放在 env
const SECRET = 'lidemymtr04parlando'
///

const saltRounds = 10;

const userController = {
  handleRegister: (req, res) => {
    const {
      username,
      password,
      realName,
      email,
      phone
    } = req.body;
    console.log(username,
      password,
      realName,
      email,
      phone);
    if (
      !username ||
      !password ||
      !realName ||
      !email ||
      !phone
    ) {
      return res.status(400).json({
        ok: 0,
        message: "register data incomplete"
      })
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(400).json({
          ok: 0,
          message: err.toString()
        })
      }
      User.create({
        username,
        password,
        realName,
        email,
        phone
      }).then((user) => {
        // JWT signing
        const payload = {
          // user info
          id: user.id,
          username,
        }

        const options = {
          expiresIn: "1 day"
        }

        jwt.sign(payload, SECRET, options, (err, token) => {
          if (err || !token) {
            res.status(400).json({
              ok: 0,
              message: err.toString()
            })
          } else {
            res.status(200).json({
              ok: 1,
              token
            })
          }
        })
        res.status(200).json({
          ok: 1,
          token
        })
      }).catch(err => {
        res.status(400).json({
          ok: 0,
          message: err.toString()
        })
      })
    })
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
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
          if (err || !result) {
            res.status(400).json({
              ok: 0,
              message: 'password invalid'
            })
          } else {
            // JWT signing
            const payload = {
              // user info
              id: user.id,
              username: user.username,
            }

            const options = {
              expiresIn: "1 day"
            }

            jwt.sign(payload, SECRET, options, (err, token) => {
              if (err || !token) {
                res.status(400).json({
                  ok: 0,
                  message: err.toString()
                })
              } else {
                res.status(200).json({
                  ok: 1,
                  token
                })
              }
            })
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          message: err.toString()
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

module.exports = userController;