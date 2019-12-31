//定义socket区域//因为如果封装工具包中，异步的socket在外面取不到
let express = require('express')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)

let mySocket = null
io.on('connection', function (socket) {
    mySocket = socket;
    mySocket.emit('message', 'send')
})

server.listen(8081, 'localhost')

//暴露对象区域
const positionModel = require('../models/position')
const dateTime = require("date-time")

class PositionController {
    constructor() { }

    async findAll (req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await positionModel.findAll()
        res.render('success', { data: JSON.stringify(result) })
    }

    async findMany (req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let { page = 0, pagesize = 10, keywords = '' } = req.query

        let result = await positionModel.findMany({
            page: ~~page,
            pagesize: ~~pagesize,
            keywords
        })

        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    result,
                    total: (await positionModel.findAll(keywords)).length
                })
            })
        }
    }

    async findOne (req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await positionModel.findOne(req.query.id)
        // console.log(result)
        res.render('success', { data: JSON.stringify(result) })
    }

    async save (req, res, next) {
        // 从对象里删除 companyLogo 属性
        delete req.body.phoneImg
        let result = await positionModel.save({
            ...req.body,
            phoneImg: req.filename
        })


        if (result) {
            res.set('Content-Type', 'application/json; charset=utf-8')
            res.render('success', {
                data: JSON.stringify({
                    message: '数据保存成功.'
                })
            })
            mySocket.emit('message', 'send')
        }
    }

    async update (req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        delete req.body.phoneImg;
        req.body = req.filename ? { ...req.body, phoneImg: req.filename } : req.body


        req.body = { ...req.body, createTime: dateTime() }
        let result = await positionModel.update(req.body.id, req.body)
        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    message: '数据修改成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '数据修改成功'
                })
            })
        }
    }

    async delete (req, res, next) {
        let result = await positionModel.delete(req.body.id)
        if (result) {
            res.render('success', { data: JSON.stringify({ message: '数据删除成功' }) })
        } else {
            res.render('fail', { data: JSON.stringify({ message: '数据删除失败' }) })
        }

    }
}

const positionController = new PositionController()

module.exports = positionController