const mongoose = require("mongoose");
const {Schema} = mongoose;

const tableSchema = new Schema({
    description:{type:String, required:true},
    count:{type:Number}
})
module.exports =  mongoose.model("table",tableSchema)