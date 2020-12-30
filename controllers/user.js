const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models');
const { SECRET, saltRounds } = process.env
const { User, Admin } = db;

const userController = {
  handleRegister: (req, res) => {
    const {
      username, password, realName, email, phone
    } = req.body;
    if (
      !username || !password || !realName || !email || !phone
    ) {
      console.log("register error1: register data incomplete");
      return res.status(400).json({
        message: "register data incomplete"
      })
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err || !hash) {
        console.log(`register error2: ${err.toString()}`);
        return res.status(500).json({
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
            role: "user"
          }

          const options = {
            expiresIn: "1 day"
          }
          jwt.sign(payload, SECRET, options, (err, token) => {
            if (err) {
              console.log(`register error3: ${err.toString()}`);
              return res.status(500).json({
                message: err.toString()
              })
            }
            res.status(200).json({
              token
            })
          })
        })
        .catch(err => {
          console.log(`register error4: ${err.toString()}`);
          res.status(400).json({
            message: "username had been registered"
          })
        });
    })
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log(`login error1: username and password required`);
      return res.status(400).json({
        message: "username and password required"
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
              console.log(`login error2: ${err.toString()}`);
              return res.status(500).json({
                message: "jwt sign error"
              })
            }
            res.status(200).json({
              token
            })
          })
        })
      })
      .catch(err => {
        console.log(`login error3: ${err.toString()}`);
        res.status(500).json({
          message: "invalid username and password"
        })
      })
  },
  getOne: async (req, res) => {
    const { id, role } = req.user
    if (role === 'admin') {
      await Admin.findOne({ where: id })
        .then(admin => {
          return res.status(200).json({
            admin: {
              id: admin.id,
              username: admin.username
            }
          })
        })
      return
    }

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
    const { id } = req.user;
    const { realName, email, phone } = req.body;
    if (!realName || !email || !phone) {
      console.log(`update user error1: user data incomplete`);
      return res.status(400).json({
        message: "user data incomplete"
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
        console.log(`update user error2: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  }
}

module.exports = userController;