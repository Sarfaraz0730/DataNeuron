const express = require('express');
const router = express.Router();

router.use("*", (req, res, next) => {
    res.status(404).send("wrong end point");
});

module.exports = router;