const { render } = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models');
const { SECRET } = require('../env/env')
const { User } = db;

const saltRounds = 10;

const userController = {
  handleRegister: (req, res) => {
    const {
      username, password, realName, email,
      phone
    } = req.body;
    if (
      !username || !password || !realName || !email || !phone
    ) {
      return res.status(400).json({
        ok: 0,
        message: "register data incomplete"
      })
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err || !hash) {
        return res.status(400).json({
          ok: 0,
          message: err.toString()
        })
      }
      User.create({
        username,
        password: hash,
        realName,
        email,
        phone
      })
        .then((user) => {
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
            if (err) {
              return res.status(400).json({
                ok: 0,
                message: err.toString()
              })
            }
            res.status(200).json({
              ok: 1,
              token
            })
          })
        })
        .catch(err => {
          res.status(400).json({
            ok: 0,
            message: "username had been registered"
          })
        });
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
            return res.status(400).json({
              ok: 0,
              message: `password invalid`
            })
          } else {
            // JWT signing
            const payload = {
              // user info
              id: user.id,
              username: user.username,
              role: "user"
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
      })
  },
  handleUpdate: (req, res) => {
    const id = req.params.id;
    if (!req.user || Number(id) !== req.user.id) {
      return res.status(401).json({
        ok: 0,
        message: "unauthorized or invalid userId"
      })
    }

    const { realName, email, phone } = req.body;
    if (!realName || !email || !phone) {
      return res.status(400).json({
        ok: 0,
        message: "data incomplete"
      })
    }

    User.findOne({ where: { id } })
      .then((user) => {
        return user.update({
          realName, email, phone
        })
      })
      .then(() => {
        res.status(200).json({
          ok: 1,
          message: "update succeeded"
        })
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          message: err.toString()
        })
      })
  }
}

module.exports = userController;