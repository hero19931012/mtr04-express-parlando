const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../../models');
const { SECRET } = process.env
const { User, Admin } = db;

const userController = {
  handleRegister: (req, res) => {
    const { username, password, realName, email, phone } = req.body;
    if (!username || !password || !realName || !email || !phone) {
      console.log("register error: register data incomplete");
      return res.status(400).json({
        success: false,
        message: "register data incomplete"
      })
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err || !salt) {
        console.log(`bcrypt genSalt error: ${err.toString()}`);
        return res.status(500).json({
          success: false,
          message: err.toString()
        })
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err || !hash) {
          console.log(`bcrypt hash error: ${err.toString()}`);
          return res.status(500).json({
            success: false,
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
            // expire time
            const options = { expiresIn: "7 day" }
            jwt.sign(payload, SECRET, options, (err, token) => {
              if (err) {
                console.log(`jwt sign error: ${err.toString()}`);
                return res.status(500).json({
                  success: false,
                  message: err.toString()
                })
              }
              res.status(201).json({
                success: true,
                data: { token },
              })
            })
          })
          .catch(err => {
            console.log(`register error: ${err.toString()}`);
            return res.status(403).json({
              success: false,
              message: "username has been registered"
            })
          });
      })
    })
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log(`login error: username and password required`);
      return res.status(403).json({
        success: false,
        message: "username and password required"
      })
    }
    User.findOne({ where: { username } })
      .then((user) => {
        if (user === null) {
          console.log(`login error: invalid username`);
          return res.status(401).json({
            success: false,
            message: "invalid username"
          })
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            console.log(`login error: bcrypt compare false`);
            return res.status(401).json({
              success: false,
              message: "invalid username and password"
            })
          }
          const payload = {
            id: user.id,
            username: user.username,
            role: "user"
          }
          const options = { expiresIn: "7 day" }
          jwt.sign(payload, SECRET, options, (err, token) => {
            if (err || !token) {
              console.log(`jwt sign error: ${err.toString()}`);
              return res.status(500).json({
                success: false,
                message: err.toString()
              })
            }
            res.status(200).json({
              success: true,
              data: { token },
            })
          })
        })
      })
      .catch(err => {
        console.log(`login error: ${err.toString()}`);
        res.status(401).json({
          success: false,
          message: "invalid username and password"
        })
      })
  },
  getOne: async (req, res) => {
    const { id, role } = req.user
    if (role === 'admin') {
      const admin = await Admin.findOne({ where: id })
      if (admin !== null) {
        return res.status(200).json({
          success: true,
          data: {
            admin: {
              id: admin.id,
              username: admin.username
            }
          },
        })
      }
    }

    User.findOne({ where: { id } })
      .then(user => {
        const { username, realName, email, phone } = user
        res.status(200).json({
          success: true,
          data: {
            user: {
              id,
              username,
              realName,
              email,
              phone
            }
          },
        })
      })
  },
  update: (req, res) => {
    const { id } = req.user;
    const { realName, email, phone } = req.body;
    if (!realName || !email || !phone) {
      console.log(`update user error: user data incomplete`);
      return res.status(400).json({
        success: false,
        message: "user data incomplete"
      })
    }

    User.update(
      { realName, email, phone },
      { where: { id } }
    )
      .then((user) => {
        res.status(200).json({
          success: true,
          data: {
            user: {
              id,
              username: user.username,
              realName,
              email,
              phone
            }
          },
        })
      })
      .catch(err => {
        console.log(`update user error: ${err.toString()}`);
        res.status(500).json({
          success: true,
          message: err.toString()
        })
      })
  }
}

module.exports = userController;