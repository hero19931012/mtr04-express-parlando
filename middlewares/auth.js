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
        ok: 0,
        message: "invalid token"
      })
    }
    if (decodedToken.role === "admin") {
      Admin.findOne({ where: { username: decodedToken.username } })
        .then((user) => {
          req.user = decodedToken.role
          return next()
        })
        .catch(err => {
          res.status(403).json({
            ok: 0,
            message: "Admin verify error: " + err.toString()
          })
        })
    }
    if (decodedToken.role === "user") {
      User.findOne({ where: { username: decodedToken.username } })
        .then((user) => {
          req.user = decodedToken.role
          return next()
        })
        .catch(err => {
          res.status(403).json({
            ok: 0,
            message: "User verify error: " + err.toString()
          })
        })
    }
  })
}

module.exports = checkAuth;