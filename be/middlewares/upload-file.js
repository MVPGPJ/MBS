const multer = require('multer')
const path = require('path')
const randomString = require('node-random-string')

class FileUpload {
    _fileFilter(req, file, cb) {
        let mimeRegexp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)', 'gi')
        if (mimeRegexp.test(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('上传文件类型不正确'))
        }
    }
    uploadFile(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let filename = '';
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.resolve(__dirname, '../public/upload'))
            },
            filename: function (req, file, cb) {
                let fileOriName = file.originalname;
                let lastDot = fileOriName.lastIndexOf('.');
                let extFilename = fileOriName.slice(lastDot)

                let rs = randomString({
                    length: 10,
                    lowerCase: true
                })

                filename = rs + extFilename
                cb(null, filename)
            }
        })
        var upload = multer({
            storage,
            limits: {
                fileSize: 1024 * 1024 * 10
            },
            fileFilter: fileUpload._fileFilter
        }).single('phoneImg')

        upload(req, res, (err) => {
            if (req.body.phoneImg === '') {
                next()
            } else {
                if (err) {
                    res.render('fail', {
                        data: JSON.stringify(err.message)
                    })
                } else {
                    // 在req上可以传值，挂在参数
                    req.filename = filename
                    next()
                }
            }

        })
    }
}

const fileUpload = new FileUpload()
module.exports = fileUpload