const express = require("express");
const addData = require("./addData")
const update= require("./update")
const error = require("./error")

const router = express.Router()

router.use("/add",addData)
router.use("/edit",update)







router.use("*",error)

module.exports = router