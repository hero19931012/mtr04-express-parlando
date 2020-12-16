const jwt = require('jsonwebtoken');
const db = require('../models');
const { SECRET } = require('../env/env');
const { User } = db

function auth(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send("unauthorized")
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, SECRET, (err, jwtUser) => {
    if (err) {
      res.status(401).json({
        ok: 0,
        message: "unauthorized"
      })
    } else {
      User.findOne({ where: { username: jwtUser.username } })
      .then((user) => {
        req.user = jwtUser
        next()
      })
      .catch(err => {
        res.status(403).json({
          ok: 0,
          message: err.toString()
        })
      })
    }
  })
}

module.exports = auth;