const db = require('../utils/db')

class UserModel {
    constructor() {
        this.userModel = db.model('users',{
            username : String,
            password : String
        })
    }

    //存数据
    insert(data){
        let users = new this.userModel(data)
        //数据库存储是异步操作
        return users.save()
    }
    select(data){
        return this.userModel.findOne({username:data.username})
    }
}

module.exports = new UserModel()
