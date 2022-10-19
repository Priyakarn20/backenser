const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    code:Number,
    title:String,
    description:String,
    mrp:Number
})

module.exports = mongoose.model('Product' , productSchema);