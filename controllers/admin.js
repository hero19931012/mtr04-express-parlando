const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models');
const { SECRET } = require('../env/env')
const { Admin } = db;

const adminController = {
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        ok: 0,
        message: "login error1: username and password required"
      })
    }
    Admin.findOne({ where: { username } })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            return res.status(400).json({
              message: `login error2: invalid username and password`
            })
          }

          // JWT signing
          const payload = {
            // user info
            id: user.id,
            username: user.username,
            role: "admin"
          }
          const options = {
            expiresIn: "1 day"
          }
          jwt.sign(payload, SECRET, options, (err, token) => {
            if (err || !token) {
              return res.status(400).json({
                ok: 0,
                message: "jwt sign error: " + err.toString()
              })
            }
            res.status(200).json({
              ok: 1,
              token
            })
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "login error3: " + err.toString()
        })
      })
  },
}

module.exports = adminController;