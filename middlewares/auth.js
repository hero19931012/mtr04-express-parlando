const jwt = require('jsonwebtoken');
const db = require('../models');
const { SECRET } = require('../env/env');
const { User, Admin } = db

function checkAuth(req, res, next) {
  if (!req.header('Authorization')) {
    return next()
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: "invalid token"
      })
    }
    if (decodedToken.role === "admin") {
      Admin.findOne({ where: { username: decodedToken.username } })
        .then((user) => {
          const { id, username, role } = decodedToken;
          req.user = {
            id, username, role
          }
          return next()
        })
        .catch(err => {
          res.status(401).json({
            message: "Admin verify error: " + err.toString()
          })
        })
    }
    if (decodedToken.role === "user") {
      User.findOne({ where: { username: decodedToken.username } })
        .then((user) => {
          const { id, username, role } = decodedToken;
          req.user = {
            id, username, role
          }
          return next()
        })
        .catch(err => {
          res.status(401).json({
            message: "User verify error: " + err.toString()
          })
        })
    }
  })
}

module.exports = checkAuth;