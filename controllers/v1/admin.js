const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../../models');
const { SECRET } = process.env;
const { Admin } = db;

const adminController = {
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log("admin login error: username and password required");
      return res.status(400).json({
        message: "username and password required"
      })
    }
    Admin.findOne({ where: { username } })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            console.log(`admin login error: bcrypt compare false`);
            return res.status(401).json({
              success: false,
              message: "invalid username and password"
            })
          }
          const payload = {
            id: user.id,
            username: user.username,
            role: "admin"
          }
          const options = {
            expiresIn: "7 day"
          }
          jwt.sign(payload, SECRET, options, (err, token) => {
            if (err || !token) {
              console.log(`jwt sign error: ${err.toString()}`);
              return res.status(500).json({
                success: false,
                message: "jwt sign error"
              })
            }
            res.status(200).json({
              success: true,
              data: { token }
            })
          })
        })
      })
      .catch(err => {
        console.log(`admin login error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  },
}

module.exports = adminController;