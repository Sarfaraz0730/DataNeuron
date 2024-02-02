const express = require("express");
const addTableDataModel = require("../../model/addTableDataModel");
const router = express.Router();

router.patch("/:_id", async (req, res) => {
    const _id = req.params
    console.log("_id",_id,)
    try {
        const data = req.body;
        const description =data.description;
        // const _id =data._id
   

        const existingData = await addTableDataModel.findById(_id);
        if (!existingData) {
            return res.status(404).send("Data not found");
        }


        console.log("existingData ====",existingData)
        if (typeof existingData.count !== 'number') {
            return res.status(500).send("Invalid count value");
        }

 
        const count = existingData.count + 1;

        const update = await addTableDataModel.findByIdAndUpdate(_id, { description, count });
        return res.status(200).send(`Edited, ${update}`);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
