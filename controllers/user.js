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
          console.log(result);
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
          message: "username had been registered"
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
  handleUpdate: (req, res) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    // jwt.verify(token, SECRET, (err, jwtUser) => {
    //   if (err || !jwtUser) {
    //     res.status(400).json({
    //       ok: 0,
    //       message: "verify fail"
    //     })
    //   } else {
    //     res.status(200).json({
    //       ok: 1,
    //       user
    //     })
    //   }
    // })

    const id = req.params.id;
    const { realName, email, phone } = req.body;
    if (!realName || !email || !phone) {
      return res.status(400).json({
        ok: 0,
        message: "data incomplete"
      })
    }
    User.findOne({ where: { id } })
      .then((user) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, SECRET, (err, jwtUser) => {
          console.log(jwtUser)
          if (err || !jwtUser || jwtUser.username !== user.username) {
            return res.status(400).json({
              ok: 0,
              message: "verify fail"
            })
          } else {
            return user.update({
              realName, email, phone
            })
          }
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