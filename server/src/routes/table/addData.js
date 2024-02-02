const express = require("express")
const addTableDataModel = require("../../model/addTableDataModel")
const router = express.Router()
var count=0;
router.post("/", async(req,res,next)=>{
    count++
    const data = req.body;
    const { description } = data; 
    var saveData = { description, count }
    console.log("saveData", saveData)
    try{
       const addData = await addTableDataModel.create(saveData)
       return res.send(addData)
    }catch(err){
        return res.send(err.message)
    }
})
module.exports = router