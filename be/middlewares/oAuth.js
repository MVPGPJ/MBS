const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const oAuth = (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let token = req.header('X-Access-Token')

  let cert = fs.readFileSync(path.resolve(__dirname, '../key/rsa_public_key.pem'))

  jwt.verify(token, cert, (err, decoded) => {
    if (err) {
      res.render('fail', {
        data: JSON.stringify({
          isSignin: false
        })
      })
    } else {
      res.render('success', {
        data: JSON.stringify({
          username: decoded.username,
          isSignin: true
        })
      })
    }
  })
}

module.exports = oAuth