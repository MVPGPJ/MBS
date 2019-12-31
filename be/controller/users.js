const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

class UserController {
    _hashPassword (password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                resolve(hash)
            })
        })
    }

    _comparePassword (password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, res) => {
                resolve(res)
            })
        })
    }

    getToken (username) {
        let cert = fs.readFileSync(path.resolve(__dirname, '../key/rsa_private_key.pem'))
        return jwt.sign({ username }, cert, { algorithm: 'RS256' })
    }

    async signup (req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        let user = await userModel.select(req.body)
        if (user) {
            res.render('success', {
                data: JSON.stringify({
                    message: '用户名已经存在。'
                })
            })
            return
        }

        let passwordHash = await userController._hashPassword(req.body.password)
        let result = await userModel.insert({ ...req.body, password: passwordHash });
        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    message: '用户注册成功。'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户注册失败。'
                })
            })
        }
    }

    async signin (req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        let result = await userModel.select(req.body)
        if (result) {
            if (await userController._comparePassword(req.body.password, result['password'])) {
                //插入session，在登录成功的时候
                // req.session.username = result['username']

                //插入token的方式
                res.header('X-Access-Token', userController.getToken(result.username))
                res.render('success', {
                    data: JSON.stringify({
                        username: result['username'],
                        message: '登录成功。'
                    })
                })
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        message: '密码错误。'
                    })
                })
            }
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户不存在。'
                })
            })
        }


    }

    // issignin(req, res, next) {
    //     res.set('Content-Type', 'application/json; charset=utf-8');
    //     if (req.session.username) {
    //         res.render('success', {
    //             data: JSON.stringify({
    //                 username: req.session.username,
    //                 isSignin: true
    //             })
    //         })
    //     }
    // }
}

const userController = new UserController()
module.exports = userController