const mongoose = require("mongoose");
const {Schema} = mongoose;

const tableSchema = new Schema({
    description:{type:String, required:true},
    count:{type:Number,default: 0 }
})
module.exports =  mongoose.model("table",tableSchema)