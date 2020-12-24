const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models');
const { SECRET, saltRounds } = require('../env/env')
const { User } = db;



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
        message: "register data incomplete"
      })
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err || !hash) {
        return res.status(400).json({
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
                message: err.toString()
              })
            }
            res.status(200).json({
              token
            })
          })
        })
        .catch(err => {
          res.status(400).json({
            message: "username had been registered"
          })
        });
    })
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "login error1: username and password required"
      })
    }
    User.findOne({ where: { username } })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            console.log("login error2: invalid username and password");
            return res.status(400).json({
              message: "invalid username and password"
            })
          }

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
              return res.status(400).json({
                message: "jwt sign error: " + err.toString()
              })
            }
            res.status(200).json({
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
  getOne: (req, res) => {
    const id = req.user.id
    
    User.findOne({ where: { id } })
      .then(user => {
        const { username, realName, email, phone } = user
        res.status(200).json({
          user: {
            id,
            username,
            realName,
            email,
            phone
          }
        })
      })
  },
  update: (req, res) => {
    const { id } = req.user.id;

    const { realName, email, phone } = req.body;
    if (!realName || !email || !phone) {
      return res.status(400).json({
        message: "update user error1: user data incomplete"
      })
    }

    User.findOne({ where: { id } })
      .then((user) => {
        return user.update({
          realName, email, phone
        })
      })
      .then((user) => {
        res.status(200).json({
          user: {
            id,
            username: user.username,
            realName,
            email,
            phone
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "update user error2: " + err.toString()
        })
      })
  }
}

module.exports = userController;