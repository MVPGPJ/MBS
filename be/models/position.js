const db = require('../utils/db')
const dateTime = require('date-time')

class PositionModel {
    constructor(){
      let PositionSchema = {
        phoneImg:String,
        phoneName:String,
        desc:String,
        phoneCpu:String,
        phonePhoto:String,
        searchValue:String,
        price:String,
        comments_total:String,
        createTime:String,
      }
      this.positionModel = db.model('positions',PositionSchema)
    }

    save(data){
      let position = new this.positionModel({
        ...data,
        createTime:dateTime(),
      })
      return position.save()
    }

    findAll(keywords) {
      let regexp = new RegExp(keywords,'i')
      return this.positionModel.find({}).sort({_id:-1})
      .or([
        {phoneName : regexp},
        {desc : regexp},
        {phoneCpu : regexp},
        {phonePhoto : regexp},
        {searchValue : regexp},
        {price : regexp},
        {comments_total : regexp},
        {createTime : regexp}
      ])
    }

    findMany({page,pagesize,keywords}){
      let regexp = new RegExp(keywords,'i')
      return this.positionModel.find({}).sort({_id:-1}).skip(page*pagesize).limit(pagesize)
      .or([
        {phoneName : regexp},
        {desc : regexp},
        {phoneCpu : regexp},
        {phonePhoto : regexp},
        {searchValue : regexp},
        {price : regexp},
        {comments_total : regexp},
        {createTime : regexp}
      ])
    }

    findOne(id){
      return this.positionModel.findById(id)
    }

    delete(id){
      return this.positionModel.findByIdAndRemove(id)
    }

    update(id,update){
      return this.positionModel.findByIdAndUpdate(id,update)
    }
  }
  
  const positionModel = new PositionModel()
  
  module.exports = positionModel