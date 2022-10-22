const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    title: String,
    description:String,
    mrp:Number, 
    imagePath:String
})

module.exports = mongoose.model('Item', itemSchema);